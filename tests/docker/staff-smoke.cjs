const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {mkdtempSync, writeFileSync, rmSync} = require('node:fs');
const {tmpdir} = require('node:os');
const path = require('node:path');
const {randomBytes} = require('node:crypto');

const image = process.argv[2] || 'riad-front:check';
if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/@-]*$/.test(image)) throw new Error('Invalid Docker image name');
const name = `riad-staff-check-${randomBytes(5).toString('hex')}`;
const volume = `${name}-data`;
const folder = mkdtempSync(path.join(tmpdir(), 'riad-staff-docker-'));
const origin = 'https://www.riadnashira.com';
const password = randomBytes(24).toString('base64url');
let cookie = '';
const docker = (args, input) =>
    execFileSync('docker', args, {input, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']}).trim();

async function request(route, body, authenticated = false) {
    const headers = {
        Host: 'www.riadnashira.com',
        Origin: origin,
        'X-Forwarded-Proto': 'https',
        'X-Forwarded-Host': 'www.riadnashira.com',
        'X-Real-IP': '198.51.100.200',
    };
    if (authenticated) headers.Cookie = cookie;
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    return fetch(`http://127.0.0.1:3106${route}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(15_000),
    });
}
async function ready(route = '/api/health', authenticated = false) {
    for (let attempt = 0; attempt < 60; attempt++) {
        try {
            const response = await request(route, undefined, authenticated);
            if (response.ok) return response;
        } catch {}
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    throw new Error('Container did not become ready');
}

(async () => {
    try {
        const envfile = path.join(folder, 'container.env');
        writeFileSync(
            envfile,
            `STAFF_BASE_URL=${origin}\nSTAFF_AUTH_SECRET=${randomBytes(48).toString('hex')}\nSTAFF_BOOTSTRAP_PASSWORD=${password}\nAPP_MAILJET_KEY=isolated-invalid-test-key\nAPP_MAILJET_SECRET=isolated-invalid-test-secret\n`,
            {mode: 0o600},
        );
        docker(['volume', 'create', volume]);
        docker([
            'run',
            '-d',
            '--name',
            name,
            '--env-file',
            envfile,
            '-p',
            '127.0.0.1:3106:3000',
            '-v',
            `${volume}:/app/data`,
            image,
        ]);
        await ready();
        assert.equal(docker(['exec', name, 'id', '-u']), '1000');
        assert.equal((await request('/api/staff/confirmations')).status, 401);
        docker(
            [
                'exec',
                '-i',
                name,
                'node',
                '--experimental-strip-types',
                '--conditions=react-server',
                'scripts/staff-user.mjs',
                'create',
                'docker-staff@example.com',
                'Docker test',
            ],
            password,
        );
        const auth = await request('/api/staff/auth/sign-in/email', {email: 'booking@riadnashira.com', password});
        assert.equal(auth.status, 200, 'Staff login must succeed');
        const cookies = auth.headers.getSetCookie();
        assert.ok(cookies.some((value) => value.includes('HttpOnly') && value.includes('Secure')));
        cookie = cookies.map((value) => value.split(';')[0]).join('; ');
        const prepared = await request(
            '/api/staff/confirmations',
            {
                input: {
                    reference: 'DOCKER-CHECK',
                    recipient: 'docker-guest@example.com',
                    language: 'en',
                    title: 'ms',
                    guestName: 'Docker Guest',
                    checkIn: new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10),
                    checkOut: new Date(Date.now() + 17 * 86_400_000).toISOString().slice(0, 10),
                    confirmedOn: new Date().toISOString().slice(0, 10),
                    adults: 2,
                    children: 0,
                    childrenAges: '',
                    room: 'Deluxe room',
                    totalAmount: '6000',
                    paymentKind: 'deposit',
                    paymentAmount: '3000',
                },
            },
            true,
        );
        assert.equal(prepared.status, 201, 'Draft preparation must succeed');
        const draft = await prepared.json();
        const preview = await request(`/api/staff/confirmations/${draft.id}/preview`, undefined, true);
        assert.equal(preview.status, 200);
        assert.ok(preview.headers.get('content-security-policy').includes("default-src 'none'"));
        const html = await preview.text();
        assert.ok(html.includes('Ms Docker Guest') && html.includes('data:image/jpeg;base64,'));
        for (const document of ['nour.pdf', 'rive.pdf', 'spa.pdf', 'activites.pdf'])
            assert.ok(html.includes(`/mail/${document}`));
        const passwordHash = () =>
            docker([
                'exec',
                name,
                'node',
                '-e',
                'const {DatabaseSync}=require("node:sqlite");const db=new DatabaseSync(process.env.STAFF_DATABASE_PATH);console.log(db.prepare("SELECT password FROM account WHERE userId=(SELECT id FROM user WHERE email=?) AND providerId=?").get("booking@riadnashira.com","credential").password);db.close();',
            ]);
        const originalHash = passwordHash();
        docker(['restart', name]);
        const history = await (await ready('/api/staff/confirmations', true)).json();
        assert.equal(history.items[0].id, draft.id, 'History and session must survive restart');
        assert.equal(passwordHash(), originalHash, 'Release seed must preserve the existing password hash');
        docker([
            'exec',
            name,
            'node',
            '--experimental-strip-types',
            '--conditions=react-server',
            'scripts/staff-user.mjs',
            'disable',
            'booking@riadnashira.com',
        ]);
        docker(['restart', name]);
        await ready();
        assert.equal((await request('/api/staff/confirmations', undefined, true)).status, 401);
        console.log(
            'Staff Docker checks passed: release seed, account CLI, secure session, private API, template/assets, unchanged password, restart persistence and account revocation. No email sent.',
        );
    } finally {
        try {
            docker(['rm', '-f', name]);
        } catch {}
        try {
            docker(['volume', 'rm', volume]);
        } catch {}
        rmSync(folder, {recursive: true, force: true});
    }
})().catch((error) => {
    console.error(error instanceof Error ? error.message : 'Docker staff verification failed');
    process.exitCode = 1;
});
