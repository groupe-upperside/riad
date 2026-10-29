'use client';

import {NextIntlClientProvider, type AbstractIntlMessages} from 'next-intl';
import type {ReactNode} from 'react';

import {getMessageFallback, onErrorMessage} from '@/lib/i18n/message-fallback';

type CustomNextIntlProviderProps = {
    messages: AbstractIntlMessages;
    locale: string;
    children: ReactNode;
    now?: Date;
    timeZone?: string;
};

export default function CustomNextIntlClientProvider(props: CustomNextIntlProviderProps) {
    return <NextIntlClientProvider getMessageFallback={getMessageFallback} onError={onErrorMessage} {...props} />;
}
