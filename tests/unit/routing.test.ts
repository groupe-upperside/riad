import {getPathname, locales, routing} from '@/lib/i18n/routing';

const paths = {
    fr: '/fr/hebergements/confort',
    en: '/en/rooms/comfort',
    it: '/it/camere/comfort',
    es: '/es/habitaciones/confort',
    pt: '/pt/quartos/conforto',
    de: '/de/zimmer/komfort',
};

describe('public URL compatibility', () => {
    it('preserves all six languages and mandatory locale prefixes', () => {
        expect(locales).toEqual(['fr', 'en', 'it', 'es', 'pt', 'de']);
        expect(routing.localePrefix).toBe('always');
        expect(routing.localeDetection).toBe(false);
    });

    it.each(locales)('preserves the %s accommodation route', (locale) => {
        expect(getPathname({locale, href: '/rooms/comfort'})).toBe(paths[locale]);
    });

    it.each(locales)('preserves the %s home route', (locale) => {
        expect(getPathname({locale, href: '/'})).toBe(`/${locale}`);
    });
});
