// Runs inside the previous production image, with the existing data volume.
const {DatabaseSync} = require('node:sqlite');
const {existsSync, mkdirSync, chmodSync} = require('node:fs');
const path = require('node:path');

const release = process.argv[2];
if (!/^release-[a-f0-9]{40}-\d+-\d+$/.test(release || '')) throw new Error('Invalid release identifier');
const source = process.env.STAFF_DATABASE_PATH || '/app/data/staff.sqlite';
if (!existsSync(source)) throw new Error('Existing staff database is missing; deployment stopped');
const directory = path.join(path.dirname(source), 'backups');
mkdirSync(directory, {recursive: true, mode: 0o700});
const destination = path.join(directory, `pre-${release}.sqlite`);
const database = new DatabaseSync(source, {readOnly: true});
try {
    // Includes committed WAL records while other connections remain open.
    database.prepare('VACUUM INTO ?').run(destination);
    chmodSync(destination, 0o600);
} finally {
    database.close();
}
console.log('Staff database backup created.');
