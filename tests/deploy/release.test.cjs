const {test} = require('node:test');
const assert = require('node:assert/strict');
const {spawnSync, execFileSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {DatabaseSync} = require('node:sqlite');

const repo = path.resolve(__dirname, '../..');
const release = `release-${'a'.repeat(40)}-123-1`;
const previous = `release-${'b'.repeat(40)}-122-1`;
const imageId = `sha256:${'c'.repeat(64)}`;
const oldImageId = `sha256:${'d'.repeat(64)}`;

function fixture(t, {existing = true, failNew = false, failBackup = false} = {}) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'riad-deploy-'));
    t.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const directory = path.join(root, 'releases', release);
    const bin = path.join(root, 'bin');
    fs.mkdirSync(directory, {recursive: true});
    fs.mkdirSync(bin);
    function metadata(location, tag, id) {
        fs.mkdirSync(location, {recursive: true});
        for (const [file, data] of Object.entries({
            'image-tag': tag,
            'image-id': id,
            'cdn-url': 'https://cdn.example.org/riad/',
            'runtime.env': 'APP_MAILJET_KEY=fake\nAPP_MAILJET_SECRET=fake\nSTAFF_AUTH_SECRET=fake-test-secret\n',
            'docker-compose.production.yml': 'services: {}',
            'image.tar.gz': 'fake-image',
        }))
            fs.writeFileSync(path.join(location, file), data);
    }
    metadata(directory, release, imageId);
    fs.mkdirSync(path.join(directory, 'deploy'));
    fs.copyFileSync(path.join(repo, 'deploy/backup-staff-db.cjs'), path.join(directory, 'deploy/backup-staff-db.cjs'));
    fs.writeFileSync(
        path.join(directory, 'SHA256SUMS'),
        execFileSync(
            'sha256sum',
            [
                'image.tar.gz',
                'image-tag',
                'image-id',
                'cdn-url',
                'docker-compose.production.yml',
                'deploy/backup-staff-db.cjs',
            ],
            {cwd: directory},
        ),
    );
    if (existing) {
        metadata(path.join(root, 'releases', previous), previous, oldImageId);
        fs.symlinkSync(`releases/${previous}`, path.join(root, 'current'));
    }
    fs.writeFileSync(path.join(root, 'state'), existing ? previous : '');
    fs.writeFileSync(
        path.join(bin, 'docker'),
        `#!/usr/bin/env node
const fs = require('node:fs');
const root = process.env.FAKE_ROOT;
const args = process.argv.slice(2);
fs.appendFileSync(root + '/commands', JSON.stringify(args) + String.fromCharCode(10));
const read = () => fs.readFileSync(root + '/state', 'utf8');
if(args[0] === 'compose') {
  const file = args[args.indexOf('-f')+1];
  const tag = fs.readFileSync(require('node:path').join(require('node:path').dirname(file), 'image-tag'), 'utf8').trim();
  if(args.includes('up')) fs.writeFileSync(root + '/state', tag);
  if(args.includes('ps')) console.log('fake-container');
} else if(args[0] === 'inspect') {
  if(args[2].includes('.State.Health')) console.log(read() === '${release}' && process.env.FAIL_NEW === '1' ? 'unhealthy' : 'healthy');
  else console.log(read() === '${release}' ? '${imageId}' : '${oldImageId}');
} else if(args[0] === 'image' && args[1] === 'inspect') {
  console.log(args.at(-1).endsWith('${release}') ? '${imageId}' : '${oldImageId}');
} else if(args[0] === 'volume' && !${existing}) process.exit(1);
else if(args[0] === 'run' && process.env.FAIL_BACKUP === '1') process.exit(1);
`,
    );
    fs.writeFileSync(path.join(bin, 'curl'), '#!/bin/sh\ncase "$*" in *http_code*) printf 401;; esac\n');
    for (const file of ['docker', 'curl']) fs.chmodSync(path.join(bin, file), 0o700);
    const env = {
        ...process.env,
        PATH: `${bin}:${process.env.PATH}`,
        FAKE_ROOT: root,
        FAIL_NEW: failNew ? '1' : '0',
        FAIL_BACKUP: failBackup ? '1' : '0',
    };
    return {
        root,
        directory,
        run: () => spawnSync('bash', [path.join(repo, 'deploy/release.sh'), root, release], {env, encoding: 'utf8'}),
        commands: () =>
            fs.existsSync(path.join(root, 'commands'))
                ? fs.readFileSync(path.join(root, 'commands'), 'utf8').trim().split('\n').map(JSON.parse)
                : [],
    };
}

test('successful upgrade backs up before replacing the image and advances current', (t) => {
    const f = fixture(t);
    const result = f.run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readlinkSync(path.join(f.root, 'current')), `releases/${release}`);
    const commands = f.commands();
    const backup = commands.findIndex((args) => args[0] === 'run');
    const up = commands.findIndex((args) => args[0] === 'compose' && args.includes('up'));
    assert.ok(backup >= 0 && backup < up);
    assert.ok(commands[backup].includes('--network'));
    assert.equal(fs.statSync(path.join(f.directory, 'runtime.env')).mode & 0o777, 0o600);
});

test('unhealthy upgrade restores previous image and configuration, keeping history', (t) => {
    const f = fixture(t, {failNew: true});
    const result = f.run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Previous release restored/);
    assert.equal(fs.readlinkSync(path.join(f.root, 'current')), `releases/${previous}`);
    assert.equal(fs.readFileSync(path.join(f.root, 'state'), 'utf8'), previous);
    assert.equal(f.commands().filter((args) => args[0] === 'compose' && args.includes('up')).length, 2);
    assert.ok(
        !f
            .commands()
            .some(
                (args) =>
                    args.includes('prune') || args.includes('down') || (args.includes('volume') && args.includes('rm')),
            ),
    );
});

test('backup failure leaves the running release untouched', (t) => {
    const f = fixture(t, {failBackup: true});
    assert.notEqual(f.run().status, 0);
    assert.ok(f.commands().some((args) => args[0] === 'run'));
    assert.ok(!f.commands().some((args) => args.includes('up') || args[0] === 'load'));
    assert.equal(fs.readFileSync(path.join(f.root, 'state'), 'utf8'), previous);
});

test('existing data without release metadata is never silently replaced', (t) => {
    const f = fixture(t);
    fs.unlinkSync(path.join(f.root, 'current'));
    const result = f.run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Existing staff volume/);
    assert.ok(!f.commands().some((args) => args.includes('up')));
});

test('corrupt artifact fails before any Docker operation', (t) => {
    const f = fixture(t);
    fs.appendFileSync(path.join(f.directory, 'image.tar.gz'), 'corrupt');
    assert.notEqual(f.run().status, 0);
    assert.equal(f.commands().length, 0);
});

test('failed first deployment stops its service and preserves the volume', (t) => {
    const f = fixture(t, {existing: false, failNew: true});
    assert.notEqual(f.run().status, 0);
    assert.ok(!fs.existsSync(path.join(f.root, 'current')));
    assert.ok(f.commands().some((args) => args[0] === 'compose' && args.includes('stop')));
    assert.ok(!f.commands().some((args) => args.includes('rm') || args.includes('prune') || args.includes('down')));
});

test('SQLite backup includes committed WAL data and leaves the original history intact', (t) => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'riad-backup-'));
    t.after(() => fs.rmSync(directory, {recursive: true, force: true}));
    const source = path.join(directory, 'staff.sqlite');
    const database = new DatabaseSync(source);
    try {
        database.exec(
            "PRAGMA journal_mode=WAL; CREATE TABLE history (id TEXT); INSERT INTO history VALUES ('sent-email')",
        );
        const result = spawnSync(process.execPath, [path.join(repo, 'deploy/backup-staff-db.cjs'), release], {
            env: {...process.env, STAFF_DATABASE_PATH: source},
            encoding: 'utf8',
        });
        assert.equal(result.status, 0, result.stderr);
        const filename = path.join(directory, 'backups', `pre-${release}.sqlite`);
        const backup = new DatabaseSync(filename, {readOnly: true});
        try {
            assert.deepEqual(
                backup.prepare('SELECT id FROM history').all(),
                database.prepare('SELECT id FROM history').all(),
            );
            assert.equal(backup.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
            assert.equal(fs.statSync(filename).mode & 0o777, 0o600);
        } finally {
            backup.close();
        }
        assert.notEqual(
            spawnSync(process.execPath, [path.join(repo, 'deploy/backup-staff-db.cjs'), release], {
                env: {...process.env, STAFF_DATABASE_PATH: source},
                encoding: 'utf8',
            }).status,
            0,
            'Never overwrite a release backup',
        );
    } finally {
        database.close();
    }
});
