'use client';

import {useLocale} from 'next-intl';
import {useRouter} from 'next/navigation';
import {getPathname, locales, pathnames, type Locale, usePathname} from '@/lib/i18n/routing';
import {ChangeEvent} from 'react';

export default function LocaleSwitcher({full, textColor}: {full?: boolean; textColor?: string}) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const to = e.target.value as Locale;
        if (!locales.includes(to)) return;
        const query: Record<string, string | string[]> = {};
        const search = new URLSearchParams(window.location.search);
        for (const key of new Set(search.keys())) {
            const values = search.getAll(key);
            query[key] = values.length > 1 ? values : values[0];
        }
        const target = getPathname({locale: to, href: {pathname: (pathname || '/') as keyof typeof pathnames, query}});
        router.push(`${target}${window.location.hash}`);
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
