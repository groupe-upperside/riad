import type {AbstractIntlMessages} from 'next-intl';
import {toIntlMessages} from '@/lib/i18n/messages';
import type {TranslationCatalog} from '@/types/i18n.type';

const LOCALE_MAP: Record<string, () => Promise<TranslationCatalog>> = {
    fr: () => import('@/translations/fr.json').then((m) => m.default),
    en: () => import('@/translations/en.json').then((m) => m.default),
    it: () => import('@/translations/it.json').then((m) => m.default),
    es: () => import('@/translations/es.json').then((m) => m.default),
    pt: () => import('@/translations/pt.json').then((m) => m.default),
    de: () => import('@/translations/de.json').then((m) => m.default),
};

export async function loadMessagesFromDisk(locale: string): Promise<AbstractIntlMessages> {
    const loader = LOCALE_MAP[locale];
    if (!loader) throw new Error(`Unknown locale: ${locale}`);
    return toIntlMessages(await loader());
}
