import {getRequestConfig} from 'next-intl/server';

import {loadMessagesFromDisk} from '@/lib/i18n/loadMessages';
import {getMessageFallback, onErrorMessage} from '@/lib/i18n/message-fallback';
import {defaultLocale, type Locale, locales} from '@/lib/i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
    const requested = await requestLocale;
    const locale: Locale = locales.includes(requested as Locale) ? (requested as Locale) : defaultLocale;
    return {
        locale,
        messages: await loadMessagesFromDisk(locale),
        timeZone: 'Europe/Paris',
        getMessageFallback,
        onError: onErrorMessage,
    };
});
