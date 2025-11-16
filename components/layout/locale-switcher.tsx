'use client'

import {usePathname, useRouter} from 'next/navigation'
import {useLocale} from 'next-intl'
import {locales} from '@/lib/i18n/routing'
import {ChangeEvent} from "react";

export default function LocaleSwitcher({full, textColor}: {full?: boolean, textColor?: string}) {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const switchPath = (path: string, to: string) =>
        path.replace(/^\/(fr|en|it|es|pt|de)(?=\/|$)/, `/${to}`)

    const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const to = e.target.value
        const target = pathname ? switchPath(pathname, to) : `/${to}`
        router.push(target)
    }

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
    )
}
