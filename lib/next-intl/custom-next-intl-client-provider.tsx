'use client';

import type {AbstractIntlMessages} from 'next-intl';
import {IntlErrorCode, NextIntlClientProvider} from 'next-intl';
import type {ReactNode} from 'react';
import type {IntlError} from 'use-intl';

import enMessages from '@/translations/en.json';

type CustomNextIntlProviderProps = {
  messages: AbstractIntlMessages;
  locale: string;
  children: ReactNode;
  now?: Date;
  timeZone?: string;
};

function getNestedMessage(obj: Record<string, any>, path: string, defaultValue: string): string {
  const value = path.split('.').reduce((o, key) => (o && key in o ? o[key] : defaultValue), obj);
  return typeof value === 'string' ? value : defaultValue;
}

function getMessageFallback({ namespace, key, error }: { namespace: string; key: string; error: IntlError }) {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    try {
      return getNestedMessage(enMessages, path, `${path} is not yet translated`);
    } catch (enError) {
      return '';
    }
  }
  return '';
}

const onErrorMessage = (error: IntlError) => {
  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return null;
  }
  return error.message;
};

export default function CustomNextIntlClientProvider({
  messages,
  locale,
  children,
  now,
  ...props
}: CustomNextIntlProviderProps) {
  return (
    <NextIntlClientProvider
      getMessageFallback={getMessageFallback}
      locale={locale}
      messages={messages}
      onError={onErrorMessage}
        // @ts-expect-error sssss
      defaultTranslationValues={{
          // @ts-expect-error sssss
        i: (text) => <i>{text}</i>,
      }}
      now={now}
      {...props}
    >
      {children}
    </NextIntlClientProvider>
  );
}
