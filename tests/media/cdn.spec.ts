import {test, expect} from '@playwright/test';
import baseline from '../fixtures/public-content.json';

const cdn = process.env.NEXT_PUBLIC_CDN_URL || 'https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/';
const images = [
    ...new Set(Object.values(baseline).flatMap((page) => page.images.map((image) => image.src.replace('<CDN>/', cdn)))),
];

for (const src of images) {
    test(`image is available: ${new URL(src).pathname}`, async ({request}) => {
        const response = await request.get(src, {timeout: 45000});
        expect(response.status(), src).toBe(200);
        expect(response.headers()['content-type'], src).toMatch(/^image\//);
        expect((await response.body()).byteLength, src).toBeGreaterThan(0);
    });
}

test('the browser decodes the real home hero image', async ({page}) => {
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    const image = page.locator('main section').first().locator('img').first();
    await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), {timeout: 45000})
        .toBe(true);
});
