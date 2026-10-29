const {test} = require('node:test');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const dotenv = require('dotenv');

function fixture(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'riad-define-env-'));
    t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
    const runtime = path.join(directory, 'runtime.env');
    const exported = path.join(directory, 'github-env');
    const env = {
        ...process.env,
        NEXT_PUBLIC_CDN_URL: 'https://cdn.example.org/riad/',
        POEDITOR_URL: 'https://api.example.org/v2',
        POEDITOR_APP_ID: '123',
        POEDITOR_SECRET: 'fake-translation-secret',
        APP_MAILJET_KEY: 'fake-mailjet-key',
        APP_MAILJET_SECRET: 'fake-mailjet-secret',
        STAFF_AUTH_SECRET: 'fake-session-secret',
        STAFF_BOOTSTRAP_PASSWORD: 'fake-bootstrap-password',
        RUNTIME_ENV_FILE: runtime,
        GITHUB_ENV: exported,
    };
    const run = (overrides) =>
        spawnSync(process.execPath, [path.resolve(__dirname, '../../scripts/define-env.cjs')], {
            cwd: directory,
            env: {...env, ...overrides},
            encoding: 'utf8',
        });
    return {directory, runtime, exported, env, run};
}

test('defines public build variables and private runtime secrets without exporting credentials', (t) => {
    const f = fixture(t);
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    const build = dotenv.parse(fs.readFileSync(path.join(f.directory, '.env')));
    assert.equal(build.NEXT_PUBLIC_CDN_URL, f.env.NEXT_PUBLIC_CDN_URL);
    assert.equal(build.POEDITOR_SECRET, f.env.POEDITOR_SECRET);
    assert.equal(build.APP_MAILJET_SECRET, undefined);
    const exported = dotenv.parse(fs.readFileSync(f.exported));
    assert.deepEqual(Object.keys(exported), ['NEXT_PUBLIC_CDN_URL', 'POEDITOR_URL', 'POEDITOR_APP_ID']);
    const runtime = fs.readFileSync(f.runtime, 'utf8');
    assert.ok(runtime.includes(f.env.APP_MAILJET_SECRET));
    assert.ok(!runtime.includes('POEDITOR'));
    assert.equal(fs.statSync(f.runtime).mode & 0o777, 0o600);
    assert.equal(fs.statSync(path.join(f.directory, '.env')).mode & 0o777, 0o600);
    for (const name of ['APP_MAILJET_SECRET', 'POEDITOR_SECRET', 'STAFF_AUTH_SECRET', 'STAFF_BOOTSTRAP_PASSWORD'])
        assert.ok(!`${result.stdout}${result.stderr}`.includes(f.env[name]));
});

test('public CI configuration does not require production credentials', (t) => {
    const f = fixture(t);
    assert.equal(
        f.run({
            RUNTIME_ENV_FILE: '',
            POEDITOR_SECRET: '',
            APP_MAILJET_KEY: '',
            APP_MAILJET_SECRET: '',
            STAFF_AUTH_SECRET: '',
            STAFF_BOOTSTRAP_PASSWORD: '',
        }).status,
        0,
    );
    assert.ok(!fs.existsSync(f.runtime));
});

test('missing production credentials fail before writing either environment file', (t) => {
    const f = fixture(t);
    const result = f.run({APP_MAILJET_SECRET: ''});
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Missing APP_MAILJET_SECRET/);
    assert.ok(!fs.existsSync(f.runtime));
    assert.ok(!fs.existsSync(path.join(f.directory, '.env')));
});

test('multiline values cannot inject environment variables', (t) => {
    const f = fixture(t);
    assert.notEqual(f.run({STAFF_AUTH_SECRET: 'first\nINJECTED=value'}).status, 0);
    assert.ok(!fs.existsSync(f.runtime));
    assert.ok(!fs.existsSync(f.exported));
});

test('malformed CDN URLs fail instead of producing a different asset base', (t) => {
    const f = fixture(t);
    assert.notEqual(f.run({NEXT_PUBLIC_CDN_URL: 'https://cdn.example.org/riad'}).status, 0);
    assert.ok(!fs.existsSync(f.runtime));
});
