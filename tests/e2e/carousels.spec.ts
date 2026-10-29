import {test, expect} from './fixtures';
import fr from '../../translations/fr.json';

const title = (key: keyof typeof fr.ExperiencesSlider) => fr.ExperiencesSlider[key].translation.content;

async function openCarousel(page: import('@playwright/test').Page) {
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('main > div')).toHaveCSS('opacity', '1', {timeout: 15000});
    const carousel = page.locator('section[aria-roledescription="carousel"]');
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide1Title')]);
    return carousel;
}

test('experience carousel responds to pagination and keyboard and wraps around', async ({page}) => {
    const carousel = await openCarousel(page);
    const buttons = carousel.getByRole('button');
    await buttons.nth(1).click();
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide2Title')]);
    await carousel.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide1Title')]);
    await page.keyboard.press('ArrowLeft');
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide5Title')]);
    await page.keyboard.press('ArrowRight');
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide1Title')]);
});

test('experience carousel advances automatically', async ({page}) => {
    await page.clock.install();
    const carousel = await openCarousel(page);
    await page.clock.runFor(6500);
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide2Title')]);
});

test('experience carousel supports a drag gesture on mobile', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    const carousel = await openCarousel(page);
    const box = await carousel.boundingBox();
    if (!box) throw new Error('Carousel has no layout box');
    const y = Math.max(100, Math.min(500, box.y + 100));
    await page.mouse.move(box.x + box.width * 0.85, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.15, y, {steps: 12});
    await page.mouse.up();
    await expect(carousel.locator('h2:visible')).toHaveText([title('Slide2Title')]);
});

test('activity carousel respects its first and last positions', async ({page}) => {
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    const previous = page.getByRole('button', {
        name: fr.ActivitiesSlider.AriaLabelPrevious.translation.content,
        exact: true,
    });
    const next = page.getByRole('button', {name: fr.ActivitiesSlider.AriaLabelNext.translation.content, exact: true});
    await expect(previous).toBeDisabled();
    await next.click();
    await expect(previous).toBeEnabled();
    const section = previous.locator('xpath=ancestor::section');
    const track = section.locator('div.flex.transition-transform');
    await expect
        .poll(() => track.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41))
        .toBeLessThan(0);
    for (let i = 0; i < 3; i++) await next.click();
    await expect(next).toBeDisabled();
    for (let i = 0; i < 4; i++) await previous.click();
    await expect(previous).toBeDisabled();
    await expect
        .poll(() => track.evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).m41))
        .toBe(0);
});

test('hero imagery rotates without changing its text', async ({page}) => {
    await page.clock.install();
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('main > div')).toHaveCSS('opacity', '1', {timeout: 15000});
    const hero = page.locator('main section').first();
    await expect(hero.locator('img.opacity-100')).toHaveCount(1);
    const first = await hero.locator('img.opacity-100').getAttribute('src');
    await page.clock.runFor(2200);
    await expect(hero.locator('img.opacity-100')).toHaveCount(1);
    await expect(hero.locator('img.opacity-100')).not.toHaveAttribute('src', first!);
    await expect(hero.locator('h2')).toHaveText(fr.HeroSection.Subtitle.translation.content);
});

test('the other rooms track scrolls forward and back', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('/fr/hebergements/confort', {waitUntil: 'domcontentloaded'});
    const section = page.locator('#other-riads-section');
    const track = section.locator('div.overflow-x-auto');
    await section
        .getByRole('button', {name: fr.OtherRiadsSlider.AriaLabelNext.translation.content, exact: true})
        .click();
    await expect.poll(() => track.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
    await section
        .getByRole('button', {name: fr.OtherRiadsSlider.AriaLabelPrevious.translation.content, exact: true})
        .click();
    await expect.poll(() => track.evaluate((node) => node.scrollLeft)).toBeLessThan(2);
});
