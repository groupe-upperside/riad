import '@/styles/globals.css';

import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import {Providers} from '@/components/common/providers';
import {bodyFace, displayFace} from '@/lib/fonts';
import {loadMessagesFromDisk} from '@/lib/i18n/loadMessages';
import {locales, type Locale} from '@/lib/i18n/routing';

import CustomNextIntlClientProvider from '@/lib/i18n/custom-next-intl-client-provider';
import {ReactNode} from 'react';

export const metadata: Metadata = {
    title: 'Riad Nashira & SPA - Luxury Accommodation',
    description: 'Experience luxury at Riad Nashira and SPA. Book your unforgettable stay today.',
};

export default async function RootLayout({children, params}: {children: ReactNode; params: Promise<{locale: string}>}) {
    const {locale} = await params;
    if (!locales.includes(locale as Locale)) notFound();
    setRequestLocale(locale);
    const messages = await loadMessagesFromDisk(locale);

    return (
        <html lang={locale} className={`${displayFace.variable} ${bodyFace.variable}`}>
            <body>
                <CustomNextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">
                    <Providers>{children}</Providers>
                </CustomNextIntlClientProvider>
            </body>
        </html>
    );
}
