/** @jest-environment node */
import {mkdtempSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {getDatabase} from '@/lib/db/database';
import {
    createDraft,
    claimDraft,
    markSent,
    markUnsuccessful,
    listConfirmations,
    getConfirmation,
} from '@/lib/confirmations/repository';
import {confirmationInput} from '@/tests/fixtures/stay-confirmation';

const folder = mkdtempSync(path.join(os.tmpdir(), 'riad-confirmations-'));
const actor = {id: 'staff-1', name: 'Reception', email: 'reception@example.com'};
const rendered = {subject: 'Confirmation', html: '<p>Bonjour Alice</p>'};
beforeAll(() => {
    process.env.STAFF_DATABASE_PATH = path.join(folder, 'staff.sqlite');
});
beforeEach(() => {
    getDatabase().exec('DELETE FROM stay_confirmations');
});
afterAll(() => {
    getDatabase().close();
    delete process.env.STAFF_DATABASE_PATH;
    rmSync(folder, {recursive: true, force: true});
});

it('only claims a draft once and archives the exact previewed HTML', () => {
    const draft = createDraft(confirmationInput, rendered, actor);
    expect(() => claimDraft(draft.id, draft.previewToken, 'another-user')).toThrow();
    const claimed = claimDraft(draft.id, draft.previewToken, actor.id);
    expect(claimed.html).toBe(rendered.html);
    expect(() => claimDraft(draft.id, draft.previewToken, actor.id)).toThrow();
    markSent(draft.id, 'provider-123');
    expect(getConfirmation(draft.id)).toMatchObject({
        status: 'sent',
        providerMessageId: 'provider-123',
        html: rendered.html,
    });
    expect(listConfirmations({query: 'alice@example.com'}).total).toBe(1);
});
it('blocks duplicate references across languages and duplicate stays even under a new reference', () => {
    const draft = createDraft(confirmationInput, rendered, actor);
    claimDraft(draft.id, draft.previewToken, actor.id);
    markSent(draft.id, '123');
    expect(() => createDraft({...confirmationInput, language: 'en'}, rendered, actor)).toThrow('existe déjà');
    expect(() => createDraft({...confirmationInput, reference: 'ANOTHER-REFERENCE'}, rendered, actor)).toThrow(
        'existe déjà',
    );
});
it('invalidates an older preview when the same draft is edited', () => {
    const first = createDraft(confirmationInput, rendered, actor);
    const second = createDraft(
        {...confirmationInput, room: 'Suite'},
        {...rendered, html: '<p>Suite</p>'},
        actor,
        first.id,
    );
    expect(() => claimDraft(first.id, first.previewToken, actor.id)).toThrow();
    expect(claimDraft(second.id, second.previewToken, actor.id).html).toBe('<p>Suite</p>');
});
it('retains a persistent lock after an ambiguous result, but permits a new preview after an explicit refusal', () => {
    const first = createDraft(confirmationInput, rendered, actor);
    claimDraft(first.id, first.previewToken, actor.id);
    markUnsuccessful(first.id, false);
    expect(getConfirmation(first.id)?.status).toBe('uncertain');
    expect(() => createDraft(confirmationInput, rendered, actor)).toThrow();
    getDatabase().exec('DELETE FROM stay_confirmations');
    const rejected = createDraft(confirmationInput, rendered, actor);
    claimDraft(rejected.id, rejected.previewToken, actor.id);
    markUnsuccessful(rejected.id, true);
    expect(createDraft(confirmationInput, rendered, actor, rejected.id).id).toBe(rejected.id);
});
it('expires abandoned drafts and does not interpret search wildcards as a request for all clients', () => {
    const draft = createDraft(confirmationInput, rendered, actor);
    getDatabase().prepare('UPDATE stay_confirmations SET expires_at=0 WHERE id=?').run(draft.id);
    expect(listConfirmations({query: '%'}).total).toBe(0);
    expect(getConfirmation(draft.id)?.status).toBe('expired');
    expect(() => claimDraft(draft.id, draft.previewToken, actor.id)).toThrow();
    expect(createDraft(confirmationInput, rendered, actor).id).not.toBe(draft.id);
});
