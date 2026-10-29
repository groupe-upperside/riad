import 'server-only';

import {readFileSync} from 'node:fs';
import path from 'node:path';
import type {ConfirmationLanguage, StayConfirmationInput} from '@/types/confirmation.type';
import {ConfirmationError} from '@/types/confirmation.type';
import {moneyCents, stayNights} from '@/lib/confirmations/validation';
import assets from '../../email-templates/assets.json';
import {CONFIRMATION_DOCUMENTS} from '@/lib/constants/confirmation';

export const escapeHtml = (value: string): string =>
    value.replace(
        /[&<>"']/g,
        (char) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[char]!,
    );

function pdfUrl(value: string | undefined, label: string): string {
    try {
        const url = new URL(value ?? '');
        if (url.protocol !== 'https:' || url.username || url.password || url.hostname === 'lien-a-remplacer')
            throw new Error();
        return url.href;
    } catch {
        throw new ConfirmationError(`Le lien ${label} n’est pas configuré. Contactez l’administrateur.`, 503);
    }
}

export function templateLinks(language: ConfirmationLanguage) {
    return {
        nourMenuUrl: pdfUrl(process.env.CONFIRMATION_NOUR_MENU_URL || CONFIRMATION_DOCUMENTS.nour, 'du menu Nour'),
        riveMenuUrl: pdfUrl(process.env.CONFIRMATION_RIVE_MENU_URL || CONFIRMATION_DOCUMENTS.rive, 'du menu Rive'),
        spaMenuUrl: pdfUrl(
            (language === 'fr' ? process.env.CONFIRMATION_SPA_MENU_FR_URL : process.env.CONFIRMATION_SPA_MENU_EN_URL) ||
                CONFIRMATION_DOCUMENTS.spa,
            'de la carte du spa',
        ),
        experiencesUrl: pdfUrl(
            process.env.CONFIRMATION_EXPERIENCES_URL || CONFIRMATION_DOCUMENTS.activities,
            'du livret d’activités',
        ),
    };
}

function formattedDate(value: string, language: ConfirmationLanguage) {
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    }).format(new Date(`${value}T00:00:00Z`));
}

export function renderConfirmation(input: StayConfirmationInput) {
    const {language, guestName, title, paymentKind} = input;
    const fr = language === 'fr';
    const amount = (value: string) =>
        new Intl.NumberFormat(fr ? 'fr-FR' : 'en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(moneyCents(value, 'Montant') / 100);
    const guests = fr
        ? `${input.adults} adulte${input.adults > 1 ? 's' : ''}${input.children ? `, ${input.children} enfant${input.children > 1 ? 's' : ''} (${input.childrenAges})` : ''}`
        : `${input.adults} adult${input.adults > 1 ? 's' : ''}${input.children ? `, ${input.children} ${input.children > 1 ? 'children' : 'child'} (${input.childrenAges})` : ''}`;
    const variables: Record<string, string> = {
        greeting: fr
            ? `${title === 'mr' ? 'Cher Monsieur' : 'Chère Madame'} ${guestName}`
            : `${title === 'mr' ? 'Mr' : 'Ms'} ${guestName}`,
        payment: fr
            ? `Votre ${paymentKind === 'full' ? 'règlement' : 'acompte'} de ${amount(input.paymentAmount)} MAD a été dûment reçu`
            : `Your ${paymentKind === 'full' ? 'payment' : 'deposit'} of ${amount(input.paymentAmount)} MAD`,
        checkIn: formattedDate(input.checkIn, language),
        checkOut: formattedDate(input.checkOut, language),
        confirmedOn: formattedDate(input.confirmedOn, language),
        nights: String(stayNights(input.checkIn, input.checkOut)),
        guestName: `${fr ? (title === 'mr' ? 'Monsieur' : 'Madame') : title === 'mr' ? 'Mr' : 'Ms'} ${guestName}`,
        guests,
        room: input.room,
        totalAmount: amount(input.totalAmount),
        ...templateLinks(language),
    };
    const template = readFileSync(path.join(process.cwd(), 'email-templates', `confirmation.${language}.html`), 'utf8');
    const html = template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
        if (!(key in variables)) throw new Error(`Unknown confirmation template variable: ${key}`);
        return escapeHtml(variables[key]);
    });
    if (/\{\{|LIEN-A-REMPLACER|\[(?:n|date|amount|montant)\]/i.test(html))
        throw new Error('Incomplete confirmation template');
    const subject = `${fr ? 'Confirmation de séjour' : 'Stay confirmation'} – Riad Nashira – ${input.reference}`;
    return {subject, html};
}

export function inlineAttachments(html: string) {
    return assets
        .filter((asset) => html.includes(`cid:${asset.contentId}`))
        .map((asset) => ({
            ContentType: asset.contentType,
            Filename: asset.filename,
            ContentID: asset.contentId,
            Base64Content: readFileSync(path.join(process.cwd(), 'email-templates', 'assets', asset.filename)).toString(
                'base64',
            ),
        }));
}

export function previewHtml(html: string) {
    return inlineAttachments(html).reduce(
        (result, asset) =>
            result.replaceAll(
                `src="cid:${asset.ContentID}"`,
                `src="data:${asset.ContentType};base64,${asset.Base64Content}"`,
            ),
        html,
    );
}
