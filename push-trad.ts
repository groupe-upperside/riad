#!/usr/bin/env ts-node
/* eslint-disable no-console */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { pushToPoeditor } = require('./lib/i18n/poeditor-push');


function arg(flag: string, fallback?: string) {
    const i = process.argv.indexOf(flag);
    return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

(async () => {
    const lang = arg('--lang', 'en')!;
    const file = arg('--file') || path.join(process.cwd(), 'translations', `${lang}.json`);
    const overwrite = arg('--overwrite', 'false') === 'true';
    const batchSize = parseInt(arg('--batch', '100')!, 10);

    const apiUrl = process.env.POEDITOR_URL || 'https://api.poeditor.com/v2';
    const apiToken = process.env.POEDITOR_SECRET;
    const projectId = process.env.POEDITOR_APP_ID;

    if (!apiToken || !projectId) {
        console.error('Missing POEDITOR_SECRET or POEDITOR_APP_ID in env.');
        process.exit(1);
    }

    const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const res = await pushToPoeditor(json, {
        apiUrl,
        apiToken,
        projectId,
        lang,
        overwrite,
        batchSize,
    });

    console.log(`✅ Pushed ${res.terms} terms and ${res.translations} translations to '${res.lang}'.`);
})().catch((e) => {
    console.error('❌ Push failed:', e?.response?.data || e.message);
    process.exit(1);
});
