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
        '/forbidden': {
            en: '/forbidden',
            fr: '/interdit',
            it: '/vietato',
            es: '/prohibido',
            pt: '/proibido',
            de: '/verboten'
        },
        '/credits': {
            en: '/credits',
            fr: '/credits',
            it: '/crediti',
            es: '/creditos',
            pt: '/creditos',
            de: '/credits'
        },
        '/contact': {
            en: '/contact',
            fr: '/contact',
            it: '/contatto',
            es: '/contacto',
            pt: '/contato',
            de: '/kontakt'
        },
        '/login': {
            en: '/login',
            fr: '/connexion',
            it: '/accesso',
            es: '/iniciar-sesion',
            pt: '/entrar',
            de: '/anmelden'
        },
        '/register': {
            en: '/register',
            fr: '/inscription',
            it: '/registrazione',
            es: '/registro',
            pt: '/registrar',
            de: '/registrieren'
        },
        '/invoices': {
            en: '/invoices',
            fr: '/factures',
            it: '/fatture',
            es: '/facturas',
            pt: '/faturas',
            de: '/rechnungen'
        },
        '/faqs': {
            en: '/faqs',
            fr: '/faqs',
            it: '/faq',
            es: '/preguntas-frecuentes',
            pt: '/perguntas-frequentes',
            de: '/haeufig-gestellte-fragen'
        },
        '/documentations': {
            en: '/documentations',
            fr: '/documentations',
            it: '/documentazioni',
            es: '/documentaciones',
            pt: '/documentacoes',
            de: '/dokumentationen'
        },
        '/profile': {
            en: '/profile',
            fr: '/compte',
            it: '/profilo',
            es: '/perfil',
            pt: '/perfil',
            de: '/profil'
        },
        '/account/activate': {
            en: '/account/activate',
            fr: '/compte/activation',
            it: '/account/attivazione',
            es: '/cuenta/activar',
            pt: '/conta/ativar',
            de: '/konto/aktivieren'
        },
        '/orders/new': {
            en: '/orders/new',
            fr: '/commandes/creer',
            it: '/ordini/nuovo',
            es: '/pedidos/nuevo',
            pt: '/pedidos/novo',
            de: '/bestellungen/neu'
        },
        '/order/[id]': {
            en: '/order/[id]',
            fr: '/commande/[id]',
            it: '/ordine/[id]',
            es: '/pedido/[id]',
            pt: '/pedido/[id]',
            de: '/bestellung/[id]'
        },
        '/wishlists': {
            en: '/wishlists',
            fr: '/favoris',
            it: '/preferiti',
            es: '/favoritos',
            pt: '/favoritos',
            de: '/wunschlisten'
        },
        '/messages': {
            en: '/messages',
            fr: '/messages',
            it: '/messaggi',
            es: '/mensajes',
            pt: '/mensagens',
            de: '/nachrichten'
        },
        '/admin': {
            en: '/admin',
            fr: '/admin',
            it: '/admin',
            es: '/admin',
            pt: '/admin',
            de: '/admin'
        },
        '/admin/orders': {
            en: '/admin/orders',
            fr: '/admin/commandes',
            it: '/admin/ordini',
            es: '/admin/pedidos',
            pt: '/admin/pedidos',
            de: '/admin/bestellungen'
        },
        '/admin/orders/new': {
            en: '/admin/orders/new',
            fr: '/admin/commandes/creer',
            it: '/admin/ordini/nuovo',
            es: '/admin/pedidos/nuevo',
            pt: '/admin/pedidos/novo',
            de: '/admin/bestellungen/neu'
        },
        '/admin/orders/archived': {
            en: '/admin/orders/archived',
            fr: '/admin/commandes/archives',
            it: '/admin/ordini/archiviati',
            es: '/admin/pedidos/archivados',
            pt: '/admin/pedidos/arquivados',
            de: '/admin/bestellungen/archiviert'
        },
        '/admin/documentations': {
            en: '/admin/documentations',
            fr: '/admin/documentations',
            it: '/admin/documentazioni',
            es: '/admin/documentaciones',
            pt: '/admin/documentacoes',
            de: '/admin/dokumentationen'
        },
        '/admin/news': {
            en: '/admin/news',
            fr: '/admin/actualites',
            it: '/admin/notizie',
            es: '/admin/noticias',
            pt: '/admin/noticias',
            de: '/admin/nachrichten'
        },
        '/admin/analytics': {
            en: '/admin/analytics',
            fr: '/admin/analyses',
            it: '/admin/analisi',
            es: '/admin/analiticas',
            pt: '/admin/analiticas',
            de: '/admin/analysen'
        },
        '/admin/faqs': {
            en: '/admin/faqs',
            fr: '/admin/faqs',
            it: '/admin/faq',
            es: '/admin/preguntas-frecuentes',
            pt: '/admin/perguntas-frequentes',
            de: '/admin/haeufig-gestellte-fragen'
        },
        '/admin/users': {
            en: '/admin/users',
            fr: '/admin/utilisateurs',
            it: '/admin/utenti',
            es: '/admin/usuarios',
            pt: '/admin/usuarios',
            de: '/admin/benutzer'
        },
        '/admin/users/orders/[id]': {
            en: '/admin/users/orders/[id]',
            fr: '/admin/utilisateurs/commandes/[id]',
            it: '/admin/utenti/ordini/[id]',
            es: '/admin/usuarios/pedidos/[id]',
            pt: '/admin/usuarios/pedidos/[id]',
            de: '/admin/benutzer/bestellungen/[id]'
        },
        '/admin/users/[id]': {
            en: '/admin/users/[id]',
            fr: '/admin/utilisateurs/[id]',
            it: '/admin/utenti/[id]',
            es: '/admin/usuarios/[id]',
            pt: '/admin/usuarios/[id]',
            de: '/admin/benutzer/[id]'
        },
        '/admin/orders/[id]': {
            en: '/admin/orders/[id]',
            fr: '/admin/commandes/[id]',
            it: '/admin/ordini/[id]',
            es: '/admin/pedidos/[id]',
            pt: '/admin/pedidos/[id]',
            de: '/admin/bestellungen/[id]'
        }
    }
});

export const {locales, defaultLocale, localePrefix, pathnames} = routing;
export type Locale = (typeof locales)[number];