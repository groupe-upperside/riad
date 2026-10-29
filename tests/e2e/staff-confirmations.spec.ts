import {randomUUID} from 'node:crypto';
import {test, expect, capturedMailjet} from './fixtures';
import {confirmationInput} from '../fixtures/stay-confirmation';
import type {Page} from '@playwright/test';

const origin = `http://localhost:${process.env.E2E_PORT || 3101}`;
const headers = {origin};
function input(prefix = 'confirmation') {
    const id = randomUUID();
    return {...confirmationInput, reference: `RN-${id}`, recipient: `${prefix}-${id}@example.com`};
}
function sentCount(recipient: string) {
    return capturedMailjet().messages.filter((item) => item.Messages[0].To[0].Email === recipient).length;
}
async function login(page: Page, worker: number, email = 'staff-e2e@example.com') {
    await page.context().setExtraHTTPHeaders({'x-real-ip': `198.51.100.${worker + 1}`});
    const response = await page.request.post('/api/staff/auth/sign-in/email', {
        headers,
        data: {email, password: 'isolated-test-password-12345'},
    });
    expect(response.status()).toBe(200);
}
async function draft(page: Page, data = input()) {
    const response = await page.request.post('/api/staff/confirmations', {headers, data: {input: data}});
    expect(response.status()).toBe(201);
    return {...(await response.json()), input: data} as {
        id: string;
        previewToken: string;
        input: ReturnType<typeof input>;
    };
}

test('staff pages and all business endpoints reject anonymous or forged sessions', async ({page}) => {
    await page.goto('/admin/confirmations/new');
    await expect(page).toHaveURL(/\/admin\/login$/);
    for (const [url, method] of [
        ['/api/staff/confirmations', 'get'],
        ['/api/staff/confirmations', 'post'],
        ['/api/staff/confirmations/unknown/preview', 'get'],
        ['/api/staff/confirmations/unknown/send', 'post'],
    ] as const) {
        const response = await page.request[method](url, {
            headers: {...headers, cookie: 'riad_staff.session_token=forged'},
            data: method === 'post' ? {} : undefined,
        });
        expect(response.status()).toBe(401);
        expect(response.headers()['cache-control']).toContain('no-store');
    }
    const registration = await page.request.post('/api/staff/auth/sign-up/email', {
        headers,
        data: {email: 'uninvited@example.com', name: 'Intruder', password: 'uninvited-password-12345'},
    });
    expect(registration.ok()).toBe(false);
});

for (const language of ['fr', 'en'] as const) {
    test(`previews, explicitly sends and archives the supplied ${language} email without allowing a duplicate`, async ({
        page,
    }, info) => {
        await page.context().setExtraHTTPHeaders({
            'x-real-ip': `198.51.100.${info.testId.charCodeAt(0) + (language === 'fr' ? 10 : 20)}`,
        });
        await page.goto('/admin/login');
        await page.getByLabel('Email professionnel').fill('staff-e2e@example.com');
        await page.getByLabel('Mot de passe', {exact: true}).fill('isolated-test-password-12345');
        await page.getByRole('button', {name: 'Se connecter', exact: true}).click();
        await expect(page).toHaveURL(/\/admin\/confirmations$/);
        await page.getByRole('link', {name: 'Nouvelle confirmation', exact: true}).click();
        const data = {...input(), language};
        for (const name of [
            'reference',
            'guestName',
            'recipient',
            'checkIn',
            'checkOut',
            'room',
            'confirmedOn',
            'totalAmount',
            'paymentAmount',
        ] as const)
            await page.locator(`[name="${name}"]`).fill(data[name]);
        await page.getByLabel('Langue de l’email', {exact: true}).selectOption(language);
        await page.getByLabel('Civilité', {exact: true}).selectOption('ms');
        await page.getByRole('button', {name: 'Prévisualiser l’email', exact: true}).click();
        await expect(page.getByRole('heading', {name: 'Vérifiez le message avant l’envoi'})).toBeVisible();
        expect(sentCount(data.recipient)).toBe(0);
        const frame = page.frameLocator('iframe');
        await expect(frame.locator('body')).toContainText(
            language === 'fr' ? 'Chère Madame Alice Martin' : 'Ms Alice Martin',
        );
        await expect(frame.locator('body')).not.toContainText('LIEN-A-REMPLACER');
        await page.getByRole('button', {name: 'Confirmer l’envoi', exact: true}).click();
        await expect(page.getByRole('status')).toContainText('Envoi accepté par Mailjet');
        expect(sentCount(data.recipient)).toBe(1);
        const message = capturedMailjet().messages.find((item) => item.Messages[0].To[0].Email === data.recipient)!
            .Messages[0];
        expect(message.HTMLPart).toContain(language === 'fr' ? 'Chère Madame Alice Martin' : 'Ms Alice Martin');
        await expect(page.frameLocator('iframe').locator('body')).toContainText(data.room);
        await page.getByRole('link', {name: 'Retour à l’historique', exact: true}).click();
        await page.getByLabel('Rechercher un client ou une réservation').fill(data.recipient);
        await page.getByRole('button', {name: 'Rechercher', exact: true}).click();
        await expect(page.getByRole('table')).toContainText(data.reference);
        await expect(page.getByRole('table')).toContainText('Envoyé');
        const duplicate = await page.request.post('/api/staff/confirmations', {
            headers,
            data: {input: {...data, language: language === 'fr' ? 'en' : 'fr'}},
        });
        expect(duplicate.status()).toBe(409);
        expect(sentCount(data.recipient)).toBe(1);
    });
}

test('checks origin and payload limits and binds a preview to its author and version', async ({
    page,
    browser,
}, info) => {
    await login(page, info.workerIndex + 30);
    const rejected = await page.request.post('/api/staff/confirmations', {
        headers: {origin: 'https://attacker.example'},
        data: {input: input()},
    });
    expect(rejected.status()).toBe(403);
    const oversized = await page.request.post('/api/staff/confirmations', {
        headers: {...headers, 'content-type': 'application/json'},
        data: JSON.stringify({input: 'x'.repeat(20_000)}),
    });
    expect(oversized.status()).toBe(413);
    const first = await draft(page);
    const other = await browser.newPage();
    try {
        await login(other, info.workerIndex + 40, 'other-staff-e2e@example.com');
        const stolen = await other.request.post(`/api/staff/confirmations/${first.id}/send`, {
            headers,
            data: {previewToken: first.previewToken},
        });
        expect(stolen.status()).toBe(409);
        const changed = await page.request.post('/api/staff/confirmations', {
            headers,
            data: {input: {...first.input, room: 'Suite Nashira'}, draftId: first.id},
        });
        expect(changed.status()).toBe(201);
        const replay = await page.request.post(`/api/staff/confirmations/${first.id}/send`, {
            headers,
            data: {previewToken: first.previewToken},
        });
        expect(replay.status()).toBe(409);
        expect(sentCount(first.input.recipient)).toBe(0);
    } finally {
        await other.close();
    }
});

test('concurrent confirmations enqueue only one email and a completed draft cannot be replayed', async ({
    page,
}, info) => {
    await login(page, info.workerIndex + 50);
    const item = await draft(page);
    const replies = await Promise.all(
        [0, 1].map(() =>
            page.request.post(`/api/staff/confirmations/${item.id}/send`, {
                headers,
                data: {previewToken: item.previewToken},
            }),
        ),
    );
    expect(replies.map((response) => response.status()).sort()).toEqual([200, 409]);
    expect(sentCount(item.input.recipient)).toBe(1);
    const anotherReference = await page.request.post('/api/staff/confirmations', {
        headers,
        data: {input: {...item.input, reference: randomUUID()}},
    });
    expect(anotherReference.status()).toBe(409);
});

for (const prefix of ['confirmation-reject', 'confirmation-body-error', 'confirmation-ambiguous']) {
    test(`${prefix} is recorded and cannot silently become a successful or duplicate send`, async ({page}, info) => {
        await login(page, info.workerIndex + 60 + prefix.length);
        const item = await draft(page, input(prefix));
        const response = await page.request.post(`/api/staff/confirmations/${item.id}/send`, {
            headers,
            data: {previewToken: item.previewToken},
        });
        expect(response.status()).toBe(502);
        await page.goto(`/admin/confirmations/${item.id}`);
        await expect(page.getByRole('main').getByRole('alert')).toContainText(
            prefix === 'confirmation-ambiguous' ? 'incertain' : 'refusé',
        );
        const replay = await page.request.post(`/api/staff/confirmations/${item.id}/send`, {
            headers,
            data: {previewToken: item.previewToken},
        });
        expect(replay.status()).toBe(409);
        expect(sentCount(item.input.recipient)).toBe(1);
    });
}

test('logout revokes the server session and disabled accounts cannot access confirmations', async ({page}, info) => {
    await login(page, info.workerIndex + 90);
    const cookies = await page.context().cookies();
    const logout = await page.request.post('/api/staff/auth/sign-out', {headers, data: {}});
    expect(logout.status()).toBe(200);
    const oldSession = await page.request.get('/api/staff/confirmations', {
        headers: {cookie: cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')},
    });
    expect(oldSession.status()).toBe(401);
    const disabled = await page.request.post('/api/staff/auth/sign-in/email', {
        headers,
        data: {email: 'disabled-staff-e2e@example.com', password: 'isolated-test-password-12345'},
    });
    expect(disabled.ok()).toBe(false);
});

test('limits password guessing without allowing public registration', async ({page}) => {
    await page.context().setExtraHTTPHeaders({'x-real-ip': '198.51.100.240'});
    for (let attempt = 0; attempt < 6; attempt++) {
        const response = await page.request.post('/api/staff/auth/sign-in/email', {
            headers,
            data: {email: 'unknown-staff@example.com', password: 'wrong-password-12345'},
        });
        expect(response.status()).toBe(attempt < 5 ? 401 : 429);
    }
});

test('keeps maximum allowed unbroken client values readable on narrow staff screens', async ({page}, info) => {
    await login(page, info.workerIndex + 100);
    const data = {
        ...input(),
        reference: 'R'.repeat(68) + randomUUID().replaceAll('-', ''),
        guestName: 'N'.repeat(150),
        recipient: 'u'.repeat(64) + '@' + 'd'.repeat(63) + '.' + 'e'.repeat(63) + '.' + 'f'.repeat(57) + '.com',
    };
    const item = await draft(page, data);
    await page.setViewportSize({width: 390, height: 1000});
    await page.goto(`/admin/confirmations/new?draft=${item.id}`);
    await page.getByRole('button', {name: 'Prévisualiser l’email', exact: true}).click();
    await expect(page.getByRole('heading', {name: 'Vérifiez le message avant l’envoi', exact: true})).toBeVisible();
    const capture = async (state: string) => {
        await page.evaluate(async () => {
            await document.fonts.ready;
            window.scrollTo(0, 0);
        });
        await expect
            .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
            .toBe(true);
        await page.screenshot({path: `.impeccable/review/staff-overlong-${state}-390.png`, fullPage: true});
    };
    await expect(page.frameLocator('iframe').locator('body')).toContainText(data.guestName);
    await capture('preview');
    await page.getByRole('button', {name: 'Confirmer l’envoi', exact: true}).click();
    await expect(page.getByRole('status')).toContainText('Envoi accepté par Mailjet');
    await expect(page.frameLocator('iframe').locator('body')).toContainText(data.guestName);
    await capture('sent');
    await page.goto(`/admin/confirmations?q=${encodeURIComponent(data.recipient)}`);
    await expect(page.getByRole('list', {name: 'Historique partagé des confirmations de séjour'})).toContainText(
        data.reference,
    );
    await capture('history');
});
