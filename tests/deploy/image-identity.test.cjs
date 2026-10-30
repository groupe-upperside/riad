const {test} = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync, spawnSync} = require('node:child_process');
const {createHash} = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const script = path.resolve(__dirname, '../../scripts/image-manifest-id.cjs');
function fixture(t) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'riad-image-identity-'));
    t.after(() => fs.rmSync(root, {recursive: true, force: true}));
    const content = path.join(root, 'content');
    fs.mkdirSync(path.join(content, 'blobs/sha256'), {recursive: true});
    const blob = (value) => {
        const data = JSON.stringify(value);
        const digest = createHash('sha256').update(data).digest('hex');
        fs.writeFileSync(path.join(content, 'blobs/sha256', digest), data);
        return `sha256:${digest}`;
    };
    const configId = blob({architecture: 'amd64', os: 'linux'});
    const manifestId = blob({schemaVersion: 2, config: {digest: configId}});
    fs.writeFileSync(path.join(content, 'index.json'), JSON.stringify({manifests: [{digest: manifestId}]}));
    const archive = path.join(root, 'image.tar.gz');
    const run = (testedId) => {
        execFileSync('tar', ['-czf', archive, '-C', content, 'index.json', 'blobs']);
        return spawnSync(process.execPath, [script, archive, testedId], {encoding: 'utf8'});
    };
    return {content, configId, manifestId, run};
}

for (const identity of ['configId', 'manifestId']) {
    test(`extracts the verified manifest when Docker exposes ${identity}`, (t) => {
        const f = fixture(t);
        const result = f.run(f[identity]);
        assert.equal(result.status, 0, result.stderr);
        assert.equal(result.stdout.trim(), f.manifestId);
    });
}

test('refuses an archive that does not contain the tested image', (t) => {
    const f = fixture(t);
    const result = f.run(`sha256:${'a'.repeat(64)}`);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Archive does not contain the tested image/);
});

test('rejects a modified config blob even when the descriptor claims the tested ID', (t) => {
    const f = fixture(t);
    fs.appendFileSync(path.join(f.content, 'blobs/sha256', f.configId.slice(7)), ' ');
    const result = f.run(f.configId);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Corrupt image descriptor/);
});
