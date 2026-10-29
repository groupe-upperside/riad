import {test, expect} from './fixtures';
import {PUBLIC_ROUTES} from './routes';

for (const [index, description] of [
    [2, 'a room detail'],
    [11, 'the booking page'],
] as const) {
    test(`switches all six languages from ${description} and preserves query values and anchors`, async ({page}) => {
        test.setTimeout(90000);
        const search = '?checkIn=2027-06-01&adults=2&tag=spa&tag=room';
        await page.goto(`${PUBLIC_ROUTES.fr[index]}${search}#booking-form-container`, {waitUntil: 'domcontentloaded'});
        for (const [locale, urls] of Object.entries(PUBLIC_ROUTES)) {
            await page.getByRole('combobox', {name: 'Select language'}).first().selectOption(locale);
            await expect(page).toHaveURL(
                (url) => url.pathname === urls[index] && url.hash === '#booking-form-container',
            );
            await expect(page.locator('html')).toHaveAttribute('lang', locale);
            const url = new URL(page.url());
            expect(url.searchParams.get('checkIn')).toBe('2027-06-01');
            expect(url.searchParams.get('adults')).toBe('2');
            expect(url.searchParams.getAll('tag')).toEqual(['spa', 'room']);
            await expect(page.locator('main')).toContainText(/\S/);
        }
    });
}

for (const locale of Object.keys(PUBLIC_ROUTES)) {
    test(`preserves the existing home redirect for an unknown ${locale} URL`, async ({page}) => {
        await page.goto(`/${locale}/unknown-page-for-e2e`, {waitUntil: 'domcontentloaded'});
        await expect(page).toHaveURL(/\/fr$/);
        await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
    });
}

test('returns an HTTP 404 for an unknown API endpoint', async ({request}) => {
    const response = await request.get('/api/unknown-endpoint-for-e2e');
    expect(response.status()).toBe(404);
});

test('serves public files without a locale redirect and returns 404 for a missing file', async ({request}) => {
    const icon = await request.get('/favicon.ico', {maxRedirects: 0});
    expect(icon.status()).toBe(200);
    expect(icon.headers()['content-type']).toMatch(/image/);
    const missing = await request.get('/missing-file-for-e2e.png', {maxRedirects: 0});
    expect(missing.status()).toBe(404);
});
