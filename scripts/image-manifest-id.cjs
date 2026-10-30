const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const {createHash} = require('node:crypto');

const [archive, testedId] = process.argv.slice(2);
const digestPattern = /^sha256:[a-f0-9]{64}$/;
assert.ok(archive && digestPattern.test(testedId), 'Expected an image archive and tested image ID.');
const read = (name) => execFileSync('tar', ['-xOzf', archive, name], {maxBuffer: 1024 * 1024});
const blob = (digest) => {
    assert.match(digest, digestPattern, 'Invalid image descriptor digest.');
    const content = read(`blobs/sha256/${digest.slice(7)}`);
    assert.equal(`sha256:${createHash('sha256').update(content).digest('hex')}`, digest, 'Corrupt image descriptor.');
    return JSON.parse(content);
};

const index = JSON.parse(read('index.json'));
assert.equal(index.manifests?.length, 1, 'Expected a single-platform release image.');
const manifestId = index.manifests[0].digest;
const manifest = blob(manifestId);
const configId = manifest.config.digest;
const config = blob(configId);
assert.equal(config.os, 'linux');
assert.equal(config.architecture, 'amd64');
assert.ok([configId, manifestId].includes(testedId), 'Archive does not contain the tested image.');
console.log(manifestId);
