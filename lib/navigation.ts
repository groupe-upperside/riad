export interface MenuItem {
    id: string
    label: string
    href?: string
    children?: MenuItem[]
}

export const navigationMenu: MenuItem[] = [
    {
        id: 'accueil',
        label: 'Accueil',
        href: '/'
    },
    {
        id: 'hebergements',
        label: 'Hébergements',
        href: '/hebergements',
        children: [
            {
                id: 'Confort',
                label: 'Confort',
                href: '/hebergements/confort'
            },
            {
                id: 'Deluxe',
                label: 'Deluxe',
                href: '/hebergements/deluxe'
            },
            {
                id: 'suites',
                label: 'Suites',
                href: '/hebergements/suites'
            },
            {
                id: 'suites-spéciales',
                label: "Suites spéciales",
                href: '/hebergements/suites-speciales'
            }
        ]
    },
    {
        id: 'bars-restaurants',
        label: 'Bars et restaurants',
        href: '/bars-restaurants',
        children: [
            {
                id: 'le-nour',
                label: 'Le Nour',
                href: '/bars-restaurants#restaurants'
            },
            {
                id: 'le-rive',
                label: 'Le Rive',
                href: '/bars-restaurants#restaurants'
            },
            {
                id: 'le-rinlip',
                label: 'Le Rinlip',
                href: '/bars-restaurants#bars'
            },
            {
                id: 'le-rinlip-rooftop',
                label: 'Le Rinlip rooftop',
                href: '/bars-restaurants#bars'
            }
        ]
    },
    {
        id: 'spa',
        label: 'Spa ET Bien-être',
        href: '/spa',
        children: [
            {
                id: 'notre-spa',
                label: 'Notre spa',
                href: '/spa#spa',
            },
            {
                id: 'piscines',
                label: 'Nos piscines',
                href: '/spa#pools'
            },
            {
                id: 'salle-sport',
                label: 'Notre salle de sport',
                href: '/spa#fitness'
            },
        ]
    },
    {
        id: 'evenements',
        label: 'Évènements',
        href: '/events',
        children: [
            {
                id: 'professionnels',
                label: 'Professionnels',
                href: '/evenements#events'
            },
            {
                id: 'prives',
                label: 'Privés',
                href: '/evenements#events'
            },
            {
                id: 'moments-precieux',
                label: 'Moments précieux',
                href: '/evenements#events'
            },
            {
                id: 'privatisation',
                label: 'Privatisation',
                href: '/evenements#events'
            }
        ]
    },
    {
        id: 'activites',
        label: 'Activités',
        href: '/activites'
    },
    {
        id: 'services',
        label: 'Services',
        href: '/services'
    }
]