process.env.NODE_ENV = 'production';
const fs = require('node:fs');
const path = require('node:path');
const nock = require('nock');
const {execFileSync} = require('node:child_process');

const port = Number(process.env.E2E_PORT || 3101);
const captureFile = path.join(process.cwd(), 'test-results', `mailjet-${port}.json`);
const messages = [];
fs.mkdirSync(path.dirname(captureFile), {recursive: true});
const save = () => {
    fs.writeFileSync(`${captureFile}.tmp`, JSON.stringify({isolated: true, messages}));
    fs.renameSync(`${captureFile}.tmp`, captureFile);
};
save();
process.env.APP_MAILJET_KEY = 'e2e-key';
process.env.APP_MAILJET_SECRET = 'e2e-secret';
process.env.STAFF_BASE_URL = `http://localhost:${port}`;
process.env.STAFF_AUTH_SECRET = 'isolated-e2e-staff-secret-with-at-least-32-characters';
process.env.STAFF_DATABASE_PATH = path.join(process.cwd(), 'test-results', `staff-${port}.sqlite`);
process.env.CONFIRMATION_SPA_MENU_FR_URL = 'https://example.com/spa-fr.pdf';
process.env.CONFIRMATION_SPA_MENU_EN_URL = 'https://example.com/spa-en.pdf';
process.env.CONFIRMATION_EXPERIENCES_URL = 'https://example.com/experiences.pdf';
for (const suffix of ['', '-wal', '-shm']) fs.rmSync(process.env.STAFF_DATABASE_PATH + suffix, {force: true});
for (const email of ['staff-e2e@example.com', 'other-staff-e2e@example.com', 'disabled-staff-e2e@example.com']) {
    execFileSync(process.execPath, ['--experimental-strip-types', '--conditions=react-server', 'scripts/staff-user.mjs', 'create', email, 'Équipe E2E'], {
        input: 'isolated-test-password-12345', env: process.env, stdio: ['pipe', 'pipe', 'pipe'],
    });
}
execFileSync(process.execPath, ['--experimental-strip-types', '--conditions=react-server', 'scripts/staff-user.mjs', 'disable', 'disabled-staff-e2e@example.com'], {env: process.env, stdio: ['pipe', 'pipe', 'pipe']});
process.env.NO_PROXY = '127.0.0.1,localhost';
for (const key of ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy'])
    delete process.env[key];
nock.disableNetConnect();
nock.enableNetConnect(/^(127\.0\.0\.1|localhost)(:\d+)?$/);
nock('https://api.mailjet.com')
    .persist()
    .post('/v3.1/send')
    .reply((_uri, body) => {
        messages.push(body);
        save();
        const recipient = body.Messages?.[0]?.To?.[0]?.Email || '';
        if (recipient.startsWith('confirmation-reject-')) return [400, {ErrorMessage: 'Invalid recipient'}];
        if (recipient.startsWith('confirmation-ambiguous-')) return [503, {ErrorMessage: 'Service unavailable'}];
        if (recipient.startsWith('confirmation-body-error-')) return [200, {Messages: [{Status: 'error', Errors: [{ErrorMessage: 'Rejected'}]}]}];
        if (JSON.stringify(body).includes('mailjet-failure@example.com'))
            return [503, {ErrorMessage: 'Service unavailable'}];
        return [200, {Messages: [{Status: 'success', To: [{Email: recipient, MessageID: messages.length}]}]}];
    });

const {nextStart} = require('next/dist/cli/next-start');
nextStart({hostname: 'localhost', port}, process.cwd()).catch((error) => {
    console.error(error);
    process.exit(1);
});
