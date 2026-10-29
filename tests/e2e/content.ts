import type {Page} from '@playwright/test';

export async function collectPublicContent(page: Page) {
    const base = process.env.NEXT_PUBLIC_CDN_URL || 'https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/';
    const normalize = (value: string) => value.replace(/\s+/g, ' ').trim().replaceAll(base, '<CDN>/');
    const main = page.locator('main');
    return {
        lang: await page.locator('html').getAttribute('lang'),
        text: normalize(await main.innerText()),
        images: (
            await main
                .locator('img')
                .evaluateAll((images) =>
                    images.map((img) => ({src: img.getAttribute('src') || '', alt: img.getAttribute('alt') || ''})),
                )
        ).map((image) => ({src: normalize(image.src), alt: normalize(image.alt)})),
        links: (
            await main
                .locator('a')
                .evaluateAll((links) =>
                    links.map((link) => ({href: link.getAttribute('href'), text: link.textContent || ''})),
                )
        ).map((link) => ({href: link.href === null ? null : normalize(link.href), text: normalize(link.text)})),
    };
}
