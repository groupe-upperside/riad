import {IntlErrorCode, type IntlError} from 'next-intl';

import enMessages from '@/translations/en.json';

export function getNestedMessage(messages: Record<string, unknown>, path: string, fallback: string): string {
    let value: unknown = messages;
    for (const key of path.split('.')) {
        // Preserve the original empty result when an intermediate English namespace is missing.
        if (!value) {
            value = fallback;
            continue;
        }
        if (typeof value !== 'object') return '';
        value = key in value ? (value as Record<string, unknown>)[key] : fallback;
    }
    return typeof value === 'string' ? value : fallback;
}

export function getMessageFallback({namespace, key, error}: {namespace?: string; key: string; error: IntlError}) {
    const path = [namespace, key].filter((part) => part != null).join('.');
    return error.code === IntlErrorCode.MISSING_MESSAGE
        ? getNestedMessage(enMessages, path, `${path} is not yet translated`)
        : '';
}

export function onErrorMessage(error: IntlError) {
    return error.code === IntlErrorCode.MISSING_MESSAGE ? null : error.message;
}
