import {test, expect} from '@playwright/test';

const freezeStyles = `
    *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
    html { scroll-behavior: auto !important; }
    main > div { opacity: 1 !important; transform: none !important; }
`;

for (const viewport of [
    {name: 'desktop', width: 1440, height: 1000},
    {name: 'mobile', width: 390, height: 844},
]) {
    for (const route of [
        {name: 'home', url: '/fr'},
        {name: 'rooms', url: '/fr/hebergements'},
        {name: 'booking', url: '/fr/reservation'},
    ]) {
        test(`${route.name} layout on ${viewport.name}`, async ({page}) => {
            await page.setViewportSize(viewport);
            const fixedTime = new Date('2026-10-29T12:00:00Z');
            await page.clock.setFixedTime(fixedTime);
            await page.addInitScript(() => {
                Object.defineProperty(window, 'setInterval', {value: () => 0, configurable: true});
            });
            // Stable local image responses keep remote CDN availability out of the pixel comparison.
            await page.route('**/*', (request) => {
                if (request.request().resourceType() !== 'image') return request.continue();
                return request.fulfill({
                    contentType: 'image/svg+xml',
                    body: '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#d8c4ab"/></svg>',
                });
            });
            await page.goto(route.url, {waitUntil: 'domcontentloaded'});
            await expect(page.locator('main > div')).toHaveCSS('opacity', '1', {timeout: 15000});
            await page.addStyleTag({content: freezeStyles});
            await expect(page.locator('main')).toContainText(/\S/);
            await page.locator('img').evaluateAll((images) => {
                for (const image of images) image.setAttribute('loading', 'eager');
            });
            await expect
                .poll(() =>
                    page.locator('img').evaluateAll((images) =>
                        images.every((image) => {
                            const img = image as HTMLImageElement;
                            return img.complete && img.naturalWidth > 0;
                        }),
                    ),
                )
                .toBe(true);
            await page.evaluate(() => document.fonts.ready);
            await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
                timeout: 20000,
                fullPage: true,
                animations: 'disabled',
                maxDiffPixelRatio: 0.001,
            });
        });
    }
}
