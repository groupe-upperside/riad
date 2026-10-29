import fs from 'node:fs';
import path from 'node:path';
import {test as base, expect, type Page} from '@playwright/test';

export const test = base.extend({
    page: async ({page}, use) => {
        await page.route('**/*', (route) => {
            return ['image', 'media'].includes(route.request().resourceType()) ? route.abort() : route.continue();
        });
        await use(page);
    },
});
export {expect};

export function futureStay() {
    const start = new Date();
    start.setUTCFullYear(start.getUTCFullYear() + 1);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 2);
    return {checkIn: start.toISOString().slice(0, 10), checkOut: end.toISOString().slice(0, 10)};
}

export async function fillBooking(page: Page, email: string) {
    await page.locator('[name="first-name"]').fill('Alice');
    await page.locator('[name="last-name"]').fill('Martin');
    await page.locator('#email').fill(email);
    await page.locator('[name="phone"]').fill('0102030405');
    for (const name of ['adults', 'children', 'rooms', 'room-type-select'])
        await page.locator(`[name="${name}"]`).selectOption({index: 1});
    await page.locator('[name="special-requirements"]').fill('Lit bébé, arrivée tardive');
}

export function capturedMailjet() {
    const port = Number(process.env.E2E_PORT || 3101);
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'test-results', `mailjet-${port}.json`), 'utf8')) as {
        isolated: boolean;
        messages: Array<{
            Messages: Array<{
                From: {Email: string; Name: string};
                To: Array<{Email: string}>;
                Subject: string;
                HTMLPart: string;
            }>;
        }>;
    };
}
