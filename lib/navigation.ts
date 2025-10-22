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
                href: '/bars-restaurants/le-nour'
            },
            {
                id: 'le-rive',
                label: 'Le Rive',
                href: '/bars-restaurants/le-rive'
            },
            {
                id: 'le-rintip',
                label: 'Le Rintlip',
                href: '/bars-restaurants/le-rintlip'
            },
            {
                id: 'le-rintip-rooftop',
                label: 'Le Rintlip rooftop',
                href: '/bars-restaurants/le-rintlip-rooftop'
            }
        ]
    },
    {
        id: 'spa-fitness',
        label: 'Spa, fitness et piscines',
        href: '/spa-fitness',
        children: [
            {
                id: 'notre-spa',
                label: 'Notre spa',
                href: '/spa-fitness/spa',
                children: [
                    {
                        id: 'massages',
                        label: 'Les massages',
                        href: '/spa-fitness/spa/massages'
                    },
                    {
                        id: 'hammams',
                        label: 'Les hammams',
                        href: '/spa-fitness/spa/hammams'
                    },
                    {
                        id: 'relaxation',
                        label: 'Notre espace de relaxation',
                        href: '/spa-fitness/spa/relaxation'
                    },
                    {
                        id: 'coiffure',
                        label: "L'espace coiffure",
                        href: '/spa-fitness/spa/coiffure'
                    }
                ]
            },
            {
                id: 'salle-sport',
                label: 'Notre salle de sport',
                href: '/spa-fitness/salle-sport'
            },
            {
                id: 'piscines',
                label: 'Nos piscines',
                href: '/spa-fitness/piscines'
            }
        ]
    },
    {
        id: 'evenements',
        label: 'Évènements',
        href: '/evenements',
        children: [
            {
                id: 'seminaire',
                label: 'Séminaire',
                href: '/evenements/seminaire'
            },
            {
                id: 'privatisation',
                label: 'Privatisation',
                href: '/evenements/privatisation'
            },
            {
                id: 'mariage',
                label: 'Mariage, célébration',
                href: '/evenements/mariage'
            }
        ]
    },
    {
        id: 'activites',
        label: 'Activités',
        href: '/activites'
    },
    {
        id: 'boutique',
        label: 'Boutique',
        href: '/boutique'
    }
]