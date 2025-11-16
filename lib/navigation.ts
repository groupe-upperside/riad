export interface MenuItem {
    id: string;
    label: string;
    href?: string;
    children?: MenuItem[];
}

// t is a translation function from next-intl (useTranslations / getTranslations)
export const getNavigationMenu = (t: (key: string) => string): MenuItem[] => [
    {
        id: 'accueil',
        label: t('AccueilLabel.translation.content'),
        href: '/'
    },
    {
        id: 'hebergements',
        label: t('HebergementsLabel.translation.content'),
        href: '/hebergements',
        children: [
            {
                id: 'Confort',
                label: t('HebergementsConfortLabel.translation.content'),
                href: '/hebergements/confort'
            },
            {
                id: 'Deluxe',
                label: t('HebergementsDeluxeLabel.translation.content'),
                href: '/hebergements/deluxe'
            },
            {
                id: 'suites',
                label: t('HebergementsSuitesLabel.translation.content'),
                href: '/hebergements/suites'
            },
            {
                id: 'suites-spéciales',
                label: t('HebergementsSuitesSpecialesLabel.translation.content'),
                href: '/hebergements/suites-speciales'
            }
        ]
    },
    {
        id: 'bars-restaurants',
        label: t('BarsRestaurantsLabel.translation.content'),
        href: '/bars-restaurants',
        children: [
            {
                id: 'le-nour',
                label: t('BarsRestaurantsLeNourLabel.translation.content'),
                href: '/bars-restaurants#restaurants'
            },
            {
                id: 'le-rive',
                label: t('BarsRestaurantsLeRiveLabel.translation.content'),
                href: '/bars-restaurants#restaurants'
            },
            {
                id: 'le-rinlip',
                label: t('BarsRestaurantsLeRinlipLabel.translation.content'),
                href: '/bars-restaurants#bars'
            },
            {
                id: 'le-rinlip-rooftop',
                label: t('BarsRestaurantsLeRinlipRooftopLabel.translation.content'),
                href: '/bars-restaurants#bars'
            }
        ]
    },
    {
        id: 'spa',
        label: t('SpaLabel.translation.content'),
        href: '/spa',
        children: [
            {
                id: 'notre-spa',
                label: t('SpaNotreSpaLabel.translation.content'),
                href: '/spa#spa',
            },
            {
                id: 'piscines',
                label: t('SpaPiscinesLabel.translation.content'),
                href: '/spa#pools'
            },
            {
                id: 'salle-sport',
                label: t('SpaSalleSportLabel.translation.content'),
                href: '/spa#fitness'
            },
        ]
    },
    {
        id: 'evenements',
        label: t('EvenementsLabel.translation.content'),
        href: '/events',
        children: [
            {
                id: 'professionnels',
                label: t('EvenementsProfessionnelsLabel.translation.content'),
                href: '/evenements#events'
            },
            {
                id: 'prives',
                label: t('EvenementsPrivesLabel.translation.content'),
                href: '/evenements#events'
            },
            {
                id: 'moments-precieux',
                label: t('EvenementsMomentsPrecieuxLabel.translation.content'),
                href: '/evenements#events'
            },
            {
                id: 'privatisation',
                label: t('EvenementsPrivatisationLabel.translation.content'),
                href: '/evenements#events'
            }
        ]
    },
    {
        id: 'activites',
        label: t('ActivitesLabel.translation.content'),
        href: '/activites'
    },
    {
        id: 'services',
        label: t('ServicesLabel.translation.content'),
        href: '/services'
    }
];
