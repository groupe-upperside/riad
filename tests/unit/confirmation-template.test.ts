/** @jest-environment node */
import {renderConfirmation, previewHtml, inlineAttachments} from '@/lib/confirmations/template';
import {confirmationInput} from '@/tests/fixtures/stay-confirmation';
import assets from '../../email-templates/assets.json';
import {MAIL_CDN} from '@/lib/constants/confirmation';

beforeEach(() => {
    process.env.CONFIRMATION_SPA_MENU_FR_URL = 'https://example.com/spa-fr.pdf';
    process.env.CONFIRMATION_SPA_MENU_EN_URL = 'https://example.com/spa-en.pdf';
    process.env.CONFIRMATION_EXPERIENCES_URL = 'https://example.com/experiences.pdf';
});
it.each(['fr', 'en'] as const)(
    'renders the supplied %s template with six CDN images and no authoring placeholders',
    (language) => {
        const {html, subject} = renderConfirmation({...confirmationInput, language});
        expect(html).toContain(language === 'fr' ? 'Chère Madame Alice Martin' : 'Ms Alice Martin');
        expect(html).toContain(language === 'fr' ? 'mardi 1 juin 2027' : 'Tuesday, 1 June 2027');
        expect(html).not.toMatch(/LIEN-A-REMPLACER|\{\{|\[jour|\[day|Remplacer les deux|Replace the two/);
        expect(subject).toContain(confirmationInput.reference);
        const images = [...html.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map((match) => match[1]);
        expect(images).toEqual(assets.map((asset) => `${MAIL_CDN}${asset.filename}`));
        expect(html).not.toMatch(/cid:|data:image/);
        expect(inlineAttachments(html)).toEqual([]);
        expect(previewHtml(html)).toBe(html);
    },
);
it('still previews and attaches images from archived emails using Content-ID', () => {
    const asset = assets[0];
    const html = `<img src="cid:${asset.contentId}">`;
    expect(inlineAttachments(html)).toEqual([
        expect.objectContaining({ContentID: asset.contentId, Filename: asset.filename}),
    ]);
    expect(previewHtml(html)).toContain('src="data:image/jpeg;base64,');
    expect(previewHtml(html)).not.toContain('cid:');
});
it('escapes customer content instead of allowing it to introduce markup', () => {
    const {html} = renderConfirmation({
        ...confirmationInput,
        guestName: '<script>alert("x")</script>',
        room: '<img src=x onerror=alert(1)>',
    });
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&quot;x&quot;');
});
it('refuses to generate a sendable email with unsafe document links', () => {
    process.env.CONFIRMATION_EXPERIENCES_URL = 'javascript:alert(1)';
    expect(() => renderConfirmation(confirmationInput)).toThrow('livret');
});

it('uses the four exact CDN documents supplied by the user by default', () => {
    delete process.env.CONFIRMATION_SPA_MENU_FR_URL;
    delete process.env.CONFIRMATION_SPA_MENU_EN_URL;
    delete process.env.CONFIRMATION_EXPERIENCES_URL;
    const {html} = renderConfirmation(confirmationInput);
    for (const name of ['nour', 'rive', 'spa', 'activites'])
        expect(html).toContain(`https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/mail/${name}.pdf`);
});

it.each(['fr', 'en'] as const)('lets a %s guest book a transfer separately from Fast Track', (language) => {
    const {html} = renderConfirmation({...confirmationInput, language});
    const label = language === 'fr' ? 'Réserver un transfert' : 'Book a transfer';
    const link = html.match(new RegExp(`<a href="([^"]+)"[^>]*>${label}</a>`));
    expect(link).not.toBeNull();
    const url = new URL(link![1]);
    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/212666840828');
    expect(url.searchParams.get('text')).toContain(language === 'fr' ? 'transfert aéroport' : 'airport transfer');
    expect(html.indexOf(label)).toBeGreaterThan(html.indexOf('Fast Track'));
    expect(html).toContain(language === 'fr' ? '(en plus du transfert)' : '(in addition to the transfer)');
    expect(html).not.toMatch(/Acompte de 50|50% deposit due|15 jours avant l’arrivée|15 days before arrival/);
});
