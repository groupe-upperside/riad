const fs = require('node:fs');

const publicNames = ['NEXT_PUBLIC_CDN_URL', 'POEDITOR_URL', 'POEDITOR_APP_ID'];
const runtimeNames = [
    'NEXT_PUBLIC_CDN_URL',
    'APP_MAILJET_KEY',
    'APP_MAILJET_SECRET',
    'STAFF_AUTH_SECRET',
    'STAFF_BOOTSTRAP_PASSWORD',
    ...[
        'CONFIRMATION_NOUR_MENU_URL',
        'CONFIRMATION_RIVE_MENU_URL',
        'CONFIRMATION_SPA_MENU_FR_URL',
        'CONFIRMATION_SPA_MENU_EN_URL',
        'CONFIRMATION_EXPERIENCES_URL',
    ].filter((name) => process.env[name]),
];
const runtimeFile = process.env.RUNTIME_ENV_FILE;
const required = runtimeFile
    ? [...publicNames, 'POEDITOR_SECRET', 'APP_MAILJET_KEY', 'APP_MAILJET_SECRET', 'STAFF_AUTH_SECRET']
    : publicNames;
for (const name of required) {
    if (!process.env[name]?.trim()) throw new Error(`Missing ${name}`);
}
const names = [...new Set([...publicNames, 'POEDITOR_SECRET', ...runtimeNames])];
const values = Object.fromEntries(names.map((name) => [name, process.env[name] || '']));
for (const name of names) {
    if (/[\r\n]/.test(values[name])) throw new Error(`Invalid multiline value for ${name}`);
}
for (const name of ['NEXT_PUBLIC_CDN_URL', 'POEDITOR_URL']) {
    if (new URL(values[name]).protocol !== 'https:') throw new Error(`Expected HTTPS for ${name}`);
}
if (!values.NEXT_PUBLIC_CDN_URL.endsWith('/')) throw new Error('NEXT_PUBLIC_CDN_URL must end with /');
if (!/^\d+$/.test(values.POEDITOR_APP_ID)) throw new Error('Invalid POEDITOR_APP_ID');

const buildNames = [...publicNames, 'POEDITOR_SECRET'];
for (const name of buildNames) {
    if (values[name].includes("'")) throw new Error(`Unsupported quote in ${name}`);
}
const writePrivate = (filename, content) => {
    fs.writeFileSync(filename, content, {mode: 0o600});
    fs.chmodSync(filename, 0o600);
};
writePrivate('.env', buildNames.map((name) => `${name}='${values[name]}'`).join('\n') + '\n');
if (runtimeFile) {
    // Compose expands dollars in double-quoted values; $$ preserves the literal character.
    writePrivate(
        runtimeFile,
        runtimeNames.map((name) => `${name}=${JSON.stringify(values[name].replace(/\$/g, '$$$$'))}`).join('\n') + '\n',
    );
}
if (process.env.GITHUB_ENV) {
    fs.appendFileSync(process.env.GITHUB_ENV, publicNames.map((name) => `${name}=${values[name]}`).join('\n') + '\n');
}
console.log('Environment files generated.');
