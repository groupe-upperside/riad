const {test} = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync, spawnSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {createHash} = require('node:crypto');

const repo = path.resolve(__dirname, '../..');
const release = `release-${'a'.repeat(40)}-123-1`;
function fixture(t) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'riad-upload-'));
    t.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const bin = path.join(root, 'bin');
    fs.mkdirSync(bin);
    fs.mkdirSync(path.join(root, 'release'));
    fs.writeFileSync(path.join(root, 'production.env'), 'APP_MAILJET_KEY=fake-do-not-print\n', {mode: 0o600});
    execFileSync('ssh-keygen', ['-q', '-t', 'ed25519', '-N', '', '-f', path.join(root, 'key')]);
    const publicKey = fs.readFileSync(path.join(root, 'key.pub'), 'utf8').trim().split(' ').slice(0, 2).join(' ');
    fs.writeFileSync(path.join(root, 'release/image-tag'), release);
    fs.writeFileSync(
        path.join(root, 'release/SHA256SUMS'),
        `${createHash('sha256').update(release).digest('hex')}  image-tag\n`,
    );
    for (const tool of ['ssh', 'scp']) {
        fs.writeFileSync(
            path.join(bin, tool),
            `#!/usr/bin/env node
const fs = require('node:fs');
const assert = require('node:assert/strict');
const args = process.argv.slice(2);
const config = fs.readFileSync(args[args.indexOf('-F')+1], 'utf8');
assert.match(config, /ProxyJump riad-bastion/);
assert.match(config, /StrictHostKeyChecking yes/);
assert.match(config, /ForwardAgent no/);
assert.match(config, /HostName 10.3.34.55/);
const directory = require('node:path').dirname(args[args.indexOf('-F')+1]);
for(const file of ['key','runtime.env']) assert.equal(fs.statSync(directory + '/' + file).mode & 0o777, 0o600);
fs.appendFileSync(process.env.UPLOAD_LOG, '${tool}' + String.fromCharCode(10));
`,
        );
        fs.chmodSync(path.join(bin, tool), 0o700);
    }
    const env = {
        ...process.env,
        PATH: `${bin}:${process.env.PATH}`,
        SSH_PRIVATE_KEY: fs.readFileSync(path.join(root, 'key'), 'utf8'),
        SSH_KNOWN_HOSTS: `[212.106.125.38]:3615 ${publicKey}\n10.3.34.55 ${publicKey}\n`,
        PRODUCTION_ENV_FILE: path.join(root, 'production.env'),
        RELEASE_ID: release,
        UPLOAD_LOG: path.join(root, 'calls'),
    };
    const run = (overrides = {}) =>
        spawnSync('bash', [path.join(repo, '.github/actions/deployment/upload-release.sh')], {
            cwd: root,
            env: {...env, ...overrides},
            encoding: 'utf8',
        });
    return {root, run, publicKey};
}

test('uploads with ProxyJump, strict host verification and private temporary secrets', (t) => {
    const f = fixture(t);
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(fs.readFileSync(path.join(f.root, 'calls'), 'utf8').trim().split('\n'), [
        'ssh',
        'scp',
        'scp',
        'ssh',
    ]);
    assert.ok(!`${result.stdout}${result.stderr}`.includes('fake-do-not-print'));
});

test('missing production host key stops before contacting either server', (t) => {
    const f = fixture(t);
    assert.notEqual(f.run({SSH_KNOWN_HOSTS: `[212.106.125.38]:3615 ${f.publicKey}\n`}).status, 0);
    assert.ok(!fs.existsSync(path.join(f.root, 'calls')));
});

test('invalid release identifier stops before any remote command', (t) => {
    const f = fixture(t);
    assert.notEqual(f.run({RELEASE_ID: 'release-123;touch /tmp/unsafe'}).status, 0);
    assert.ok(!fs.existsSync(path.join(f.root, 'calls')));
});
