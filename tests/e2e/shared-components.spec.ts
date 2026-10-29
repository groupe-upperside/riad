import {test, expect} from './fixtures';
import fr from '../../translations/fr.json';

const detailsLabel = fr.RoomCard.ButtonViewDetails.translation.content;
const backLabel = fr.RoomCard.ButtonBack.translation.content;

test('room details follow the breakpoint, close on mobile and keep their room destination', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('/fr/hebergements', {waitUntil: 'domcontentloaded'});
    const details = page.getByRole('button', {name: detailsLabel, exact: true});
    await expect(details).toHaveCount(4);
    await details.first().click();
    const back = page.getByRole('button', {name: backLabel, exact: true});
    await expect(back).toBeVisible();
    await back.click();
    await expect(back).toHaveCount(0);
    await page.setViewportSize({width: 1280, height: 900});
    await expect(details).toHaveCount(0);
    const roomTitle = fr.Constants.RoomComfortTitle.translation.content;
    await expect(page.getByRole('main').getByRole('link', {name: roomTitle, exact: true})).toHaveAttribute(
        'href',
        '/rooms/comfort',
    );
    await page.setViewportSize({width: 390, height: 844});
    await expect(details).toHaveCount(4);
});

test('shared reservation links have a single interactive element and remain focusable', async ({page}) => {
    await page.goto('/fr', {waitUntil: 'domcontentloaded'});
    await expect(page.locator('main > div')).toHaveCSS('opacity', '1', {timeout: 15000});
    await expect(page.locator('a button, button a')).toHaveCount(0);
    const allRooms = page.getByRole('link', {name: fr.RoomsSuites.ButtonAllRooms.translation.content, exact: true});
    await allRooms.focus();
    await expect(allRooms).toBeFocused();
    await expect(allRooms).toHaveAttribute('href', '/rooms');
});
