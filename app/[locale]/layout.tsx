import '@/styles/globals.css';

import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Toaster} from 'react-hot-toast';
import {Playfair_Display, Poppins} from 'next/font/google'

import CustomNextIntlClientProvider from '@/lib/next-intl/custom-next-intl-client-provider';
import {ReactNode} from "react";

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
    display: 'swap',
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Hotel Royel Palace - Luxury Accommodation',
    description: 'Experience luxury at Hotel Royel Palace. Book your unforgettable stay today.',
}

async function getMessages(locale: string) {
    try {
        return (await import(`../../translations/${locale}.json`)).default;
    } catch {
        return notFound();
    }
}

export default async function RootLayout({
                                             children,
                                             params,
                                         }: { children: ReactNode, params: Promise<{ locale: string }> }) {
    const {locale} = await params;
    const messages = await getMessages(locale);

    return (
        <html lang={locale} className={`${playfair.variable} ${poppins.variable}`}>
        <body>
        <CustomNextIntlClientProvider locale={locale} messages={messages}>
                    <Toaster position="top-center" reverseOrder={false}/>
                    <main className="h-screen w-screen bg-[#F9FAFB]">{children}</main>
        </CustomNextIntlClientProvider>
        </body>
        </html>
    );
}
