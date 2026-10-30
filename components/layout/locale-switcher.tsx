'use client';

import {useLocale} from 'next-intl';
import {getPathname, locales, pathnames, type Locale, usePathname} from '@/lib/i18n/routing';
import {ChangeEvent} from 'react';

export default function LocaleSwitcher({full, textColor}: {full?: boolean; textColor?: string}) {
    const locale = useLocale();
    const pathname = usePathname();

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const to = e.target.value as Locale;
        if (!locales.includes(to) || to === locale) return;
        const target = new URL(
            getPathname({locale: to, href: (pathname || '/') as keyof typeof pathnames}),
            window.location.origin,
        );
        target.search = window.location.search;
        target.hash = window.location.hash;
        // A document navigation avoids duplicating fragments through the client route cache.
        window.location.assign(target.href);
    };

    return (
        <select
            value={locale}
            onChange={onChange}
            className={`${full ? 'w-full text-left' : ''} cursor-pointer text-sm focus:outline-0 px-3 py-1 rounded-full ${textColor ? textColor : 'text-white'}`}
            aria-label="Select language"
        >
            {locales.map((l) => (
                <option key={l} value={l} className="text-brand-dark-900">
                    {l.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
