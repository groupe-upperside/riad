import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {loadMessagesFromDisk} from "@/lib/i18n/loadMessages";

const locales = ['fr', 'en', 'it', 'es', 'pt', 'de'] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'fr';

export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;

    const locale: Locale =
        locales.includes((requested as Locale) ?? ('' as Locale))
            ? (requested as Locale)
            : defaultLocale;

    if (!locales.includes(locale)) notFound();

    const messages = await loadMessagesFromDisk(locale);

    return {
        locale,
        messages,
        timeZone: 'Europe/Paris'
    };
});
