import {IntlError, IntlErrorCode} from 'next-intl';

import {getMessageFallback, getNestedMessage} from '@/lib/i18n/message-fallback';
import {loadMessagesFromDisk} from '@/lib/i18n/loadMessages';
import {locales} from '@/lib/i18n/routing';
import en from '@/translations/en.json';
import type {TranslationCatalog} from '@/types/i18n.type';

describe('existing translations', () => {
    it.each(locales)('loads the unchanged %s dictionary', async (locale) => {
        const messages = await loadMessagesFromDisk(locale);
        const original = jest.requireActual<TranslationCatalog>(`../../translations/${locale}.json`);
        expect(Object.keys(messages)).toEqual(Object.keys(original));
        for (const [namespace, entries] of Object.entries(original)) {
            expect(Object.keys(messages[namespace])).toEqual(Object.keys(entries));
            for (const [key, entry] of Object.entries(entries)) {
                expect(messages).toHaveProperty(`${namespace}.${key}.translation.content`, entry.translation.content);
            }
        }
    });

    it('rejects an unsupported locale', async () => {
        await expect(loadMessagesFromDisk('../unknown')).rejects.toThrow('Unknown locale');
    });

    it('keeps the English fallback for a missing translation', () => {
        const error = new IntlError(IntlErrorCode.MISSING_MESSAGE, 'Missing translation');
        expect(getMessageFallback({namespace: 'HeroSection', key: 'Subtitle.translation.content', error})).toBe(
            en.HeroSection.Subtitle.translation.content,
        );
    });

    it('keeps the original empty output when an English namespace is missing', () => {
        const error = new IntlError(IntlErrorCode.MISSING_MESSAGE, 'Missing translation');
        expect(getMessageFallback({namespace: 'Unknown', key: 'key', error})).toBe('');
    });

    it('keeps the original placeholder when only the final English key is missing', () => {
        const error = new IntlError(IntlErrorCode.MISSING_MESSAGE, 'Missing translation');
        expect(getMessageFallback({namespace: 'HeroSection', key: 'Unknown', error})).toBe(
            'HeroSection.Unknown is not yet translated',
        );
    });

    it('keeps an empty result for a formatting error', () => {
        const error = new IntlError(IntlErrorCode.FORMATTING_ERROR, 'Formatting failed');
        expect(getMessageFallback({namespace: 'HeroSection', key: 'Subtitle.translation.content', error})).toBe('');
    });

    it('handles non-object and non-string message values', () => {
        expect(getNestedMessage({a: {b: 'value'}}, 'a.b', 'fallback')).toBe('value');
        expect(getNestedMessage({a: null}, 'a.b', 'fallback')).toBe('fallback');
        expect(getNestedMessage({a: 2}, 'a', 'fallback')).toBe('fallback');
    });
});
