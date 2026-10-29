import {expect, test, fillBooking, futureStay, capturedMailjet} from './fixtures';

import {PUBLIC_ROUTES} from './routes';
import fr from '../../translations/fr.json';
import baseline from '../fixtures/public-content.json';
import {collectPublicContent} from './content';

for (const [locale, urls] of Object.entries(PUBLIC_ROUTES)) {
    for (const url of urls) {
        test(`${url} keeps its localized public content`, async ({page}) => {
            await page.addInitScript(() => {
                Object.defineProperty(window, 'setInterval', {value: () => 0, configurable: true});
            });
            const errors: string[] = [];
            page.on('pageerror', (error) => errors.push(error.message));
            const response = await page.goto(url, {waitUntil: 'domcontentloaded'});
            expect(response?.status()).toBe(200);
            await expect(page.locator('html')).toHaveAttribute('lang', locale);
            await expect(page.locator('main')).toContainText(/\S/);
            await expect(page.locator('main')).not.toContainText(/is not yet translated/i);
            await expect(page.locator('header')).toBeVisible();
            await expect(page.locator('footer')).toBeVisible();
            const {status, ...expectedContent} = baseline[url as keyof typeof baseline];
            expect(response?.status()).toBe(status);
            await expect.poll(() => collectPublicContent(page), {timeout: 10000}).toEqual(expectedContent);
            expect(errors).toEqual([]);
        });
    }
}

test('switches the home language without changing the route', async ({page}) => {
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    await page.getByRole('combobox', {name: 'Select language'}).first().selectOption('en');
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('opens and closes the mobile navigation', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    const toggle = page.getByRole('button', {name: fr.Header.AriaLabelOpenMenu.translation.content, exact: true});
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeInViewport();
});

test('preserves booking defaults and reports a Mailjet error without sending email', async ({page}) => {
    expect(capturedMailjet().isolated).toBe(true);
    const {checkIn, checkOut} = futureStay();
    await page.goto(`/fr/reservation?checkIn=${checkIn}&checkOut=${checkOut}`, {waitUntil: 'domcontentloaded'});
    await expect(page.locator('[name="check-in"]')).toHaveValue(checkIn);
    await expect(page.locator('[name="check-out"]')).toHaveValue(checkOut);
    await fillBooking(page, 'mailjet-failure@example.com');
    await page.locator('#booking-form button[type="submit"]').click();
    await expect(page.getByText("La réservation n'a pas pu être envoyée.", {exact: true})).toBeVisible();
    const {messages} = capturedMailjet();
    expect(JSON.stringify(messages)).toContain('mailjet-failure@example.com');
});

test('submits a successful booking through the real server action and mocked Mailjet HTTP', async ({page}) => {
    expect(capturedMailjet().isolated).toBe(true);
    const email = 'booking-success@example.com';
    const {checkIn, checkOut} = futureStay();
    await page.goto(`/fr/reservation?checkIn=${checkIn}&checkOut=${checkOut}`, {waitUntil: 'domcontentloaded'});
    await fillBooking(page, email);
    await page.locator('#booking-form button[type="submit"]').click();
    await expect(page.getByText('Réservation envoyée.', {exact: true})).toBeVisible();
    const {messages} = capturedMailjet();
    const booking = messages.find((body: {Messages: Array<{HTMLPart?: string}>}) =>
        body.Messages[0].HTMLPart?.includes(email),
    );
    expect(booking).toBeDefined();
    if (!booking) throw new Error('Booking did not reach the Mailjet HTTP boundary');
    expect(booking.Messages[0]).toMatchObject({
        From: {Email: 'noreply@riadnashira.com', Name: 'Riad Nashira'},
        To: [{Email: 'info@riadnashira.com'}],
        Subject: 'Réservation',
    });
    for (const value of ['Alice', 'Martin', email, checkIn, checkOut, 'Lit bébé, arrivée tardive'])
        expect(booking.Messages[0].HTMLPart).toContain(value);
});

test('native form validation blocks an incomplete booking before Mailjet', async ({page}) => {
    await page.goto('/fr/reservation', {waitUntil: 'domcontentloaded'});
    const email = 'incomplete-booking@example.com';
    await page.locator('#email').fill(email);
    await page.locator('#booking-form button[type="submit"]').click();
    expect(await page.locator('#booking-form').evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false);
    const after = capturedMailjet();
    expect(JSON.stringify(after.messages)).not.toContain(email);
});
