#!/usr/bin/env ts-node

require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { pullFromPoeditor } = require('./lib/i18n/poeditor-pull');

function arg(flag: string, fallback?: string) {
    const i = process.argv.indexOf(flag);
    return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

(async () => {
    const minPct = parseInt(arg('--min', '95')!, 10);
    const onlyWith = arg('--onlyWith', 'true') === 'true';
    const langs = arg('--langs'); // comma separated
    const langCodes = langs ? langs.split(',').map((s) => s.trim()) : undefined;

    const apiUrl = process.env.POEDITOR_URL || 'https://api.poeditor.com/v2';
    const apiToken = process.env.POEDITOR_SECRET!;
    const projectId = process.env.POEDITOR_APP_ID!;
    if (!apiToken || !projectId) {
        console.error('Missing POEDITOR_SECRET or POEDITOR_APP_ID');
        process.exit(1);
    }

    const { byLang, summary } = await pullFromPoeditor(
        { apiUrl, apiToken, projectId, minPercentage: minPct, onlyWithTranslations: onlyWith },
        langCodes
    );

    const dir = path.join(process.cwd(), 'translations');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    for (const code of Object.keys(byLang)) {
        fs.writeFileSync(path.join(dir, `${code}.json`), JSON.stringify(byLang[code]));
    }

    console.log(`✅ Pulled ${summary.totalTerms} terms across ${summary.languages} languages.`);
})().catch((e) => {
    console.error('❌ Pull failed:', e?.response?.data || e.message);
    process.exit(1);
});
