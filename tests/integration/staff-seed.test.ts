/** @jest-environment node */
import {execFileSync, spawnSync} from 'node:child_process';
import {mkdtempSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';

const email = 'booking@riadnashira.com';
const password = 'isolated-bootstrap-password-12345';
const command = ['--experimental-strip-types', '--conditions=react-server', 'scripts/staff-seed.mjs'];
let directory: string;
let env: NodeJS.ProcessEnv;

beforeEach(() => {
    directory = mkdtempSync(path.join(tmpdir(), 'riad-staff-seed-'));
    env = {
        ...process.env,
        STAFF_BASE_URL: 'http://localhost:3001',
        STAFF_AUTH_SECRET: 'isolated-seed-test-secret-with-at-least-32-characters',
        STAFF_DATABASE_PATH: path.join(directory, 'staff.sqlite'),
        STAFF_BOOTSTRAP_PASSWORD: password,
    };
});
afterEach(() => rmSync(directory, {recursive: true, force: true}));
const seed = (overrides: Partial<NodeJS.ProcessEnv> = {}) =>
    execFileSync(process.execPath, command, {
        env: {...env, ...overrides},
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    });

it('creates the designated booking account with a hashed password and no logged-in session', () => {
    const output = seed();
    const database = new DatabaseSync(env.STAFF_DATABASE_PATH!);
    try {
        const user = database.prepare('SELECT id,email,enabled FROM user').get()!;
        expect(user.email).toBe(email);
        expect(user.enabled).toBe(1);
        const account = database
            .prepare("SELECT password FROM account WHERE userId=? AND providerId='credential'")
            .get(user.id)!;
        expect(typeof account.password).toBe('string');
        expect(account.password).not.toBe(password);
        expect(database.prepare('SELECT count(*) AS count FROM session').get()?.count).toBe(0);
        expect(output).not.toContain(password);
        expect(output).toContain(email);
    } finally {
        database.close();
    }
});

it('does not reset credentials, reactivate a disabled account or revoke sessions on subsequent releases', () => {
    seed();
    const database = new DatabaseSync(env.STAFF_DATABASE_PATH!);
    try {
        const original = database
            .prepare(
                "SELECT user.id,account.password FROM user JOIN account ON account.userId=user.id WHERE user.email=? AND account.providerId='credential'",
            )
            .get(email)!;
        database.prepare('UPDATE user SET enabled=0 WHERE id=?').run(original.id);
        database
            .prepare('INSERT INTO session(id,userId,token,expiresAt,createdAt,updatedAt) VALUES(?,?,?,?,?,?)')
            .run(
                'preserved-session',
                original.id,
                'isolated-session-token',
                Date.now() + 3600000,
                Date.now(),
                Date.now(),
            );
        expect(seed({STAFF_BOOTSTRAP_PASSWORD: 'a-different-bootstrap-password-12345'})).toContain('inchangé');
        expect(seed({STAFF_BOOTSTRAP_PASSWORD: ''})).toContain('inchangé');
        const actual = database
            .prepare(
                "SELECT user.id,user.enabled,account.password FROM user JOIN account ON account.userId=user.id WHERE user.email=? AND account.providerId='credential'",
            )
            .get(email)!;
        expect(actual).toMatchObject({id: original.id, password: original.password, enabled: 0});
        expect(database.prepare('SELECT count(*) AS count FROM user').get()?.count).toBe(1);
        expect(
            database.prepare('SELECT count(*) AS count FROM session WHERE id=?').get('preserved-session')?.count,
        ).toBe(1);
    } finally {
        database.close();
    }
});

it('fails before release startup when a new database has no valid bootstrap password', () => {
    for (const candidate of ['', 'short']) {
        const result = spawnSync(process.execPath, command, {
            env: {...env, STAFF_BOOTSTRAP_PASSWORD: candidate},
            encoding: 'utf8',
        });
        expect(result.status).toBe(1);
        expect(result.stderr).toContain('STAFF_BOOTSTRAP_PASSWORD');
        expect(result.stderr).not.toContain(password);
    }
    const database = new DatabaseSync(env.STAFF_DATABASE_PATH!);
    try {
        expect(database.prepare('SELECT count(*) AS count FROM user').get()?.count).toBe(0);
    } finally {
        database.close();
    }
});
