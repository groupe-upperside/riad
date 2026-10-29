import {test, expect} from '@playwright/test';
import {confirmationInput} from '../fixtures/stay-confirmation';

const origin = `http://localhost:${process.env.E2E_PORT || 3101}`;
for (const width of [1440, 390]) {
    test(`staff pages remain usable at ${width}px`, async ({page}) => {
        await page.setViewportSize({width, height: 1000});
        const capture = async (name: string) => {
            await page.evaluate(async () => {
                await document.fonts.ready;
                window.scrollTo(0, 0);
            });
            await expect
                .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
                .toBe(true);
            await page.screenshot({path: `.impeccable/review/staff-${name}-${width}.png`, fullPage: true});
        };
        await page.context().setExtraHTTPHeaders({'x-real-ip': `198.51.100.${width === 390 ? 200 : 201}`});
        await page.goto('/admin/login');
        await capture('login');
        const auth = await page.request.post('/api/staff/auth/sign-in/email', {
            headers: {origin},
            data: {email: 'staff-e2e@example.com', password: 'isolated-test-password-12345'},
        });
        expect(auth.status()).toBe(200);
        await page.goto('/admin/confirmations');
        await capture('history');
        await page.getByRole('link', {name: 'Nouvelle confirmation', exact: true}).click();
        await expect(page.getByRole('heading', {name: 'Nouvelle confirmation', exact: true})).toBeVisible();
        await expect(page.locator('fieldset')).toHaveCount(3);
        await capture('form');
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
        ] as const) {
            const value =
                name === 'reference'
                    ? `REVIEW-${width}`
                    : name === 'recipient'
                      ? `review-${width}@example.com`
                      : confirmationInput[name];
            await page.locator(`[name="${name}"]`).fill(value);
        }
        await page.getByRole('button', {name: 'Prévisualiser l’email', exact: true}).click();
        await expect(page.frameLocator('iframe').locator('body')).toContainText('Alice Martin');
        await expect
            .poll(() =>
                page
                    .frameLocator('iframe')
                    .locator('img')
                    .evaluateAll((images) =>
                        images.every(
                            (image) =>
                                (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
                        ),
                    ),
            )
            .toBe(true);
        await capture('preview');
        await page.getByRole('button', {name: 'Confirmer l’envoi', exact: true}).click();
        await expect(page.getByRole('status')).toContainText('Envoi accepté par Mailjet');
        await expect(page.frameLocator('iframe').locator('body')).toContainText('Alice Martin');
        await capture('sent');
        await page.getByRole('link', {name: 'Retour à l’historique', exact: true}).click();
        await expect(page.getByRole('heading', {name: 'Confirmations de séjour', exact: true})).toBeVisible();
        await capture('history-filled');
    });
}
