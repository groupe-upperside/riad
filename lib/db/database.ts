import 'server-only';

import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import path from 'node:path';

let database: DatabaseSync | undefined;

export function getDatabase(): DatabaseSync {
    if (database) return database;
    const filename = process.env.STAFF_DATABASE_PATH || path.join(process.cwd(), 'data', 'staff.sqlite');
    mkdirSync(path.dirname(filename), {recursive: true, mode: 0o700});
    database = new DatabaseSync(filename);
    database.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
    database.exec(`
        CREATE TABLE IF NOT EXISTS stay_confirmations (
            id TEXT PRIMARY KEY,
            reference TEXT NOT NULL,
            reference_key TEXT NOT NULL,
            recipient TEXT NOT NULL,
            booking_key TEXT NOT NULL,
            guest_name TEXT NOT NULL,
            language TEXT NOT NULL CHECK(language IN ('fr', 'en')),
            check_in TEXT NOT NULL,
            check_out TEXT NOT NULL,
            subject TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('draft','sending','sent','failed','uncertain','expired')),
            input_json TEXT NOT NULL,
            html TEXT NOT NULL,
            preview_token_hash TEXT NOT NULL,
            created_by TEXT NOT NULL,
            created_by_name TEXT NOT NULL,
            created_at INTEGER NOT NULL,
            updated_at INTEGER NOT NULL,
            expires_at INTEGER NOT NULL,
            sent_at INTEGER,
            provider_message_id TEXT,
            error TEXT
        );
        CREATE UNIQUE INDEX IF NOT EXISTS confirmation_active_reference ON stay_confirmations(reference_key)
            WHERE status IN ('draft','sending','sent','uncertain');
        CREATE UNIQUE INDEX IF NOT EXISTS confirmation_active_booking ON stay_confirmations(booking_key)
            WHERE status IN ('draft','sending','sent','uncertain');
        CREATE INDEX IF NOT EXISTS confirmation_created_at ON stay_confirmations(created_at DESC);
    `);
    return database;
}
