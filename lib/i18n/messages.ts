import type {AbstractIntlMessages} from 'next-intl';

import type {TranslationCatalog} from '@/types/i18n.type';

// POEditor metadata is kept in the source JSON; next-intl receives only message strings.
export function toIntlMessages(catalog: TranslationCatalog): AbstractIntlMessages {
    return Object.fromEntries(
        Object.entries(catalog).map(([namespace, entries]) => [
            namespace,
            Object.fromEntries(
                Object.entries(entries).map(([key, entry]) => [
                    key,
                    {translation: {content: entry.translation.content}},
                ]),
            ),
        ]),
    );
}
