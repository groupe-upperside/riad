import 'server-only';

import {createHash, randomBytes, randomUUID} from 'node:crypto';
import {getDatabase} from '@/lib/db/database';
import {
    ConfirmationError,
    type ConfirmationDetail,
    type ConfirmationRecord,
    type ConfirmationStatus,
    type StaffIdentity,
    type StayConfirmationInput,
} from '@/types/confirmation.type';

const ACTIVE = "('draft','sending','sent','uncertain')";
const hash = (value: string) => createHash('sha256').update(value).digest('hex');
const referenceKey = (input: StayConfirmationInput) =>
    input.reference.trim().normalize('NFKC').toLocaleUpperCase('en-US');
const bookingKey = (input: StayConfirmationInput) =>
    hash(JSON.stringify([input.recipient.toLowerCase(), input.checkIn, input.checkOut]));
type Row = Record<string, string | number | null>;

function record(row: Row): ConfirmationRecord {
    return {
        id: String(row.id),
        reference: String(row.reference),
        recipient: String(row.recipient),
        guestName: String(row.guest_name),
        language: row.language as ConfirmationRecord['language'],
        checkIn: String(row.check_in),
        checkOut: String(row.check_out),
        subject: String(row.subject),
        status: row.status as ConfirmationStatus,
        createdBy: String(row.created_by),
        createdByName: String(row.created_by_name),
        createdAt: Number(row.created_at),
        updatedAt: Number(row.updated_at),
        sentAt: row.sent_at === null ? null : Number(row.sent_at),
        providerMessageId: row.provider_message_id === null ? null : String(row.provider_message_id),
        error: row.error === null ? null : String(row.error),
    };
}

function expireDrafts() {
    const now = Date.now();
    const db = getDatabase();
    db.prepare(
        "UPDATE stay_confirmations SET status='expired', updated_at=? WHERE status='draft' AND expires_at<=?",
    ).run(now, now);
    db.prepare(
        "UPDATE stay_confirmations SET status='uncertain', error=?, updated_at=? WHERE status='sending' AND updated_at<?",
    ).run(
        'Le résultat de l’envoi doit être vérifié dans Mailjet avant toute nouvelle tentative.',
        now,
        now - 5 * 60_000,
    );
}

export function getConfirmation(id: string): ConfirmationDetail | null {
    expireDrafts();
    const row = getDatabase().prepare('SELECT * FROM stay_confirmations WHERE id=?').get(id) as Row | undefined;
    if (!row) return null;
    return {
        ...record(row),
        input: JSON.parse(String(row.input_json)) as StayConfirmationInput,
        html: String(row.html),
        previewTokenHash: String(row.preview_token_hash),
        expiresAt: Number(row.expires_at),
    };
}

export function listConfirmations({query = '', page = 1}: {query?: string; page?: number} = {}) {
    expireDrafts();
    const limit = 25;
    const safePage = Number.isSafeInteger(page) && page > 0 ? Math.min(page, 1_000_000) : 1;
    const search = `%${query
        .trim()
        .slice(0, 150)
        .replace(/[\\%_]/g, '\\$&')}%`;
    const where = "WHERE reference LIKE ? ESCAPE '\\' OR recipient LIKE ? ESCAPE '\\' OR guest_name LIKE ? ESCAPE '\\'";
    const total = Number(
        getDatabase().prepare(`SELECT count(*) AS count FROM stay_confirmations ${where}`).get(search, search, search)
            ?.count ?? 0,
    );
    const rows = getDatabase()
        .prepare(
            `SELECT id,reference,recipient,guest_name,language,check_in,check_out,subject,status,created_by,created_by_name,created_at,updated_at,sent_at,provider_message_id,error FROM stay_confirmations ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        )
        .all(search, search, search, limit, (safePage - 1) * limit) as Row[];
    return {items: rows.map(record), total, page: safePage, pages: Math.max(1, Math.ceil(total / limit))};
}

export function createDraft(
    input: StayConfirmationInput,
    rendered: {subject: string; html: string},
    actor: StaffIdentity,
    previousId?: string,
) {
    expireDrafts();
    const db = getDatabase(),
        now = Date.now();
    const id = previousId || randomUUID();
    const previewToken = randomBytes(32).toString('base64url');
    const previous = previousId ? getConfirmation(previousId) : null;
    if (
        previousId &&
        (!previous || previous.createdBy !== actor.id || !['draft', 'failed', 'expired'].includes(previous.status))
    )
        throw new ConfirmationError(
            'Ce brouillon ne peut plus être modifié. Consultez son état dans l’historique.',
            409,
        );
    try {
        if (previous) {
            const result = db
                .prepare(
                    `UPDATE stay_confirmations SET reference=?,reference_key=?,recipient=?,booking_key=?,guest_name=?,language=?,check_in=?,check_out=?,subject=?,status='draft',input_json=?,html=?,preview_token_hash=?,updated_at=?,expires_at=?,error=NULL
                WHERE id=? AND created_by=? AND status IN ('draft','failed','expired')`,
                )
                .run(
                    input.reference,
                    referenceKey(input),
                    input.recipient,
                    bookingKey(input),
                    input.guestName,
                    input.language,
                    input.checkIn,
                    input.checkOut,
                    rendered.subject,
                    JSON.stringify(input),
                    rendered.html,
                    hash(previewToken),
                    now,
                    now + 24 * 60 * 60_000,
                    id,
                    actor.id,
                );
            if (result.changes !== 1)
                throw new ConfirmationError('Ce brouillon vient d’être utilisé. Actualisez l’historique.', 409);
        } else {
            db.prepare(
                `INSERT INTO stay_confirmations(id,reference,reference_key,recipient,booking_key,guest_name,language,check_in,check_out,subject,status,input_json,html,preview_token_hash,created_by,created_by_name,created_at,updated_at,expires_at)
                VALUES(?,?,?,?,?,?,?,?,?,?,'draft',?,?,?,?,?,?,?,?)`,
            ).run(
                id,
                input.reference,
                referenceKey(input),
                input.recipient,
                bookingKey(input),
                input.guestName,
                input.language,
                input.checkIn,
                input.checkOut,
                rendered.subject,
                JSON.stringify(input),
                rendered.html,
                hash(previewToken),
                actor.id,
                actor.name,
                now,
                now,
                now + 24 * 60 * 60_000,
            );
        }
    } catch (error) {
        const duplicate = db
            .prepare(
                `SELECT id,status FROM stay_confirmations WHERE (reference_key=? OR booking_key=?) AND status IN ${ACTIVE} AND id!=? LIMIT 1`,
            )
            .get(referenceKey(input), bookingKey(input), id);
        if (duplicate)
            throw new ConfirmationError(
                'Une confirmation existe déjà pour cette réservation ou pour ce client aux mêmes dates. Consultez l’historique avant de poursuivre.',
                409,
                String(duplicate.id),
            );
        throw error;
    }
    return {id, previewToken, subject: rendered.subject};
}

export function claimDraft(id: string, previewToken: string, actorId: string): ConfirmationDetail {
    if (!/^[\w-]{36}$/.test(id) || !/^[\w-]{43}$/.test(previewToken))
        throw new ConfirmationError('Prévisualisation invalide. Préparez à nouveau le message.', 400);
    const now = Date.now();
    const result = getDatabase()
        .prepare(
            "UPDATE stay_confirmations SET status='sending',updated_at=? WHERE id=? AND created_by=? AND preview_token_hash=? AND status='draft' AND expires_at>?",
        )
        .run(now, id, actorId, hash(previewToken), now);
    if (result.changes !== 1)
        throw new ConfirmationError(
            'Cette prévisualisation a expiré, a été remplacée ou a déjà été utilisée. Consultez l’historique avant de poursuivre.',
            409,
        );
    return getConfirmation(id)!;
}

export function markSent(id: string, providerMessageId: string | null) {
    const now = Date.now();
    getDatabase()
        .prepare(
            "UPDATE stay_confirmations SET status='sent',sent_at=?,updated_at=?,provider_message_id=?,error=NULL WHERE id=? AND status IN ('sending','uncertain')",
        )
        .run(now, now, providerMessageId, id);
}

export function markUnsuccessful(id: string, definiteFailure: boolean) {
    const message = definiteFailure
        ? 'Mailjet a refusé cet envoi. Vous pouvez préparer une nouvelle tentative.'
        : 'Résultat incertain : vérifiez cet envoi dans Mailjet avant toute nouvelle tentative.';
    getDatabase()
        .prepare(
            "UPDATE stay_confirmations SET status=?,error=?,updated_at=? WHERE id=? AND status IN ('sending','uncertain')",
        )
        .run(definiteFailure ? 'failed' : 'uncertain', message, Date.now(), id);
}
