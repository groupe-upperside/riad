import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'en', 'it', 'es', 'pt', 'de'],
    defaultLocale: 'fr',
    localePrefix: 'always',
    pathnames: {
        '/': {
            en: '/',
            fr: '/',
            it: '/',
            es: '/',
            pt: '/',
            de: '/'
        },
        '/rooms': {
            en: '/rooms',
            fr: '/hebergements',
            it: '/camere',
            es: '/habitaciones',
            pt: '/quartos',
            de: '/zimmer'
        },
        '/rooms/comfort': {
            en: '/rooms/comfort',
            fr: '/hebergements/confort',
            it: '/camere/comfort',
            es: '/habitaciones/confort',
            pt: '/quartos/conforto',
            de: '/zimmer/komfort'
        },
        '/rooms/deluxe': {
            en: '/rooms/deluxe',
            fr: '/hebergements/deluxe',
            it: '/camere/deluxe',
            es: '/habitaciones/deluxe',
            pt: '/quartos/deluxe',
            de: '/zimmer/deluxe'
        },
        '/rooms/special-suites': {
            en: '/rooms/special-suites',
            fr: '/hebergements/suites-speciales',
            it: '/camere/suites-speciali',
            es: '/habitaciones/suites-especiales',
            pt: '/quartos/suites-especiais',
            de: '/zimmer/besondere-suiten'
        },
        '/rooms/suites': {
            en: '/rooms/suites',
            fr: '/hebergements/suites',
            it: '/camere/suite',
            es: '/habitaciones/suites',
            pt: '/quartos/suites',
            de: '/zimmer/suiten'
        },
        '/bars-restaurants': {
            en: '/bars-restaurants',
            fr: '/bars-restaurants',
            it: '/bar-ristoranti',
            es: '/bares-restaurantes',
            pt: '/bares-restaurantes',
            de: '/bars-und-restaurants'
        },
        '/events': {
            en: '/events',
            fr: '/evenements',
            it: '/eventi',
            es: '/eventos',
            pt: '/eventos',
            de: '/veranstaltungen'
        },
        '/activities': {
            en: '/activities',
            fr: '/activites',
            it: '/attivita',
            es: '/actividades',
            pt: '/atividades',
            de: '/aktivitaeten'
        },
        '/services': {
            en: '/services',
            fr: '/services',
            it: '/servizi',
            es: '/servicios',
            pt: '/servicos',
            de: '/dienstleistungen'
        },
        '/booking': {
            en: '/booking',
            fr: '/reservation',
            it: '/prenotazione',
            es: '/reserva',
            pt: '/reserva',
            de: '/buchung'
        },
        '/spa': {
            en: '/spa',
            fr: '/spa',
            it: '/spa',
            es: '/spa',
            pt: '/spa',
            de: '/spa'
        }
    }
});

export const {locales, defaultLocale, localePrefix, pathnames} = routing;
export type Locale = (typeof locales)[number];