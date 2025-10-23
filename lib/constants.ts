import type {Activity, Amenity, Room, Testimonial} from '@/lib/types'
import {
    FaBed,
    FaConciergeBell,
    FaCouch,
    FaCrown,
    FaSnowflake,
    FaSpa,
    FaSwimmingPool,
    FaUtensils,
    FaWifi
} from "react-icons/fa";
import {IoIosFitness} from "react-icons/io";
import {MdDeck, MdElevator} from "react-icons/md";
import {Facility} from "@/components/common/facility-card";
import {SecondaryFacility} from "@/components/common/secondary-facility-card";
import {EventSpace} from "@/components/events/events-showcase";

export const images = {
    hero: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/92e2273a04-b5f14e21a0c1ed168958.png',
    aboutRiad: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4f19248be1-361b5188a53dc6e33bfc.png',
    experienceSuite: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0b98983862-ad0abfe6da44ee70e37b.png',
    patternOverlay: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/dc765237cd-ef220abc13ff04563495.png',
    goldLight: 'https://storage.googleapis.com/uxpilot-images-and-prompts/images/1706612450849-gold-light.png',
    rooms: {
        deluxe: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a699041c02-80fbfd2bd61526107246.png',
        junior: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1a792e274a-ff4b71d1c3d7ad473292.png',
        patio: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ec1e6b951b-c088ea06b3dbe52828bd.png',
        nashira: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3fa88d1502-498ae2aa5eaf06ab6c35.png',
    },
    activities: {
        transport: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f34877789a-867779bb1e7523bcf56e.png',
        coach: "https://storage.googleapis.com/uxpilot-auth.appspot.com/a34f760bd2-455672029b1e6c4e95dd.png",
        hair: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/33a82979b3-0baabc21182ebae8c615.png',
        events: "https://storage.googleapis.com/uxpilot-auth.appspot.com/2a2078c3a1-dfe846e8a7a93bb39977.png",
        activities: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3ba7229b14-95aa6aa2e7b5015f18dc.png',
        pressing: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1340fb335f-c09b1d90dbd378dc0ca8.png",
        shop: "https://storage.googleapis.com/uxpilot-auth.appspot.com/d220cf195e-9c318a4b0f864976c34d.png"
    },
    gallery: {
        courtyard: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fbd2ef6416-519eb0fe1a16159a24f9.png',
        cuisine: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02d7f1c424-700fae45d8e1b7bceb5f.png',
        rooftop: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/580707640f-ebdcf2aa6c8a51e8acd7.png',
        hammam: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02532e2b78-93b0259644fe3a57c82d.png',
        souk: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c27775db0f-be53cf174d6ec01e228b.png',
    },
    avatars: {
        avatar1: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        avatar2: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        avatar3: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    }
}

export const amenities: Amenity[] = [
    {id: '1', icon: FaSpa, label: 'SPA & Jacuzzi'},
    {id: '2', icon: FaSwimmingPool, label: 'Piscines & Solarium'},
    {id: '3', icon: FaUtensils, label: 'Restaurants & Bars'},
    {id: '4', icon: IoIosFitness, label: 'Fitness'},
    {id: '5', icon: MdElevator, label: 'Ascenceur'},
    {id: '6', icon: FaWifi, label: 'WIFI Gratuit'},
]


export const rooms: Room[] = [
    {
        id: '1',
        title: 'Confort',
        price: 299,
        image: images.rooms.deluxe,
        slug: 'confort-room',
        description: 'Simplicité raffinée et confort moderne au cœur de la Médina.',
        amenities: [
            {icon: FaBed, label: 'Trois chambres confort'},
            {icon: FaSnowflake, label: '25 à 30 m²'},
        ]
    },
    {
        id: '2',
        title: 'Deluxe',
        price: 399,
        image: images.rooms.junior,
        slug: 'deluxe-room',
        description: 'L’alliance du confort spacieux et du charme marocain.',
        amenities: [
            {icon: FaBed, label: 'Neuf chambres deluxe'},
            {icon: MdDeck, label: '30 à 42 m²'},
        ]
    },
    {
        id: '3',
        title: 'Suite',
        price: 599,
        image: images.rooms.patio,
        slug: 'suite-room',
        description: 'L’espace, la lumière et l’élégance pour un séjour d’exception.',
        amenities: [
            {icon: FaBed, label: 'trois suites'},
            {icon: MdDeck, label: '45 à 60 m²'},
        ]
    },
    {
        id: '4',
        title: 'Suite spéciale',
        price: 799,
        image: images.rooms.nashira,
        slug: 'suite-speciale',
        description: 'Deux suites d\'exception : la Riner en hommage au champion de judo, et la Nashira, la plus grande suite du Riad.',
        amenities: [
            {icon: FaCrown, label: 'Suites Riner & Nashira'},
            {icon: MdDeck, label: 'Terrasse panoramique'},
            {icon: FaCouch, label: 'Plus grande suite'},
            {icon: FaConciergeBell, label: 'Service butler'}
        ]
    }
]

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'John Wick',
        location: 'Moscou / Russie',
        rating: 5,
        review: "Le meilleur riad où j’aie jamais eu le privilège de séjourner. Le bâtiment est superbe, et il ne cesse d’émerveiller. Une expérience véritablement inoubliable.",
        avatar: images.avatars.avatar1
    },
    {
        id: '2',
        name: 'Nathalie Portman',
        location: 'Paris / France',
        rating: 5,
        review: 'C’est l’une des meilleures décisions que nous ayons jamais prises. Nous pensions réserver un riad, mais nous avons trouvé une famille qui nous soutient. Le personnel est incroyable.',
        avatar: images.avatars.avatar2
    },
    {
        id: '3',
        name: 'Will Smith',
        location: 'Madrid / Espagne',
        rating: 5,
        review: 'L’ambiance était fabuleuse. Le bar de la piscine est idéal pour se détendre. Le personnel est très aimable et chaleureux. Une escapade parfaite loin de l’agitation de la ville.',
        avatar: images.avatars.avatar3
    },
]

type GalleryItem = {
    id: string | number;
    src: string;
    alt: string;
    width: number;
    height: number;
};

export const activities: Activity[] = [
    {id: '1', title: 'Transport aéroport & VIP', image: images.activities.transport},
    {id: '2', title: 'Yoga & Coach Fitness', image: images.activities.coach},
    {id: '3', title: 'Service coiffure', image: images.activities.hair},
    {id: '4', title: 'Evènements & Privatisation', image: images.activities.events},
    {id: '5', title: 'Activités & Excursions', image: images.activities.activities},
    {id: '6', title: 'Blanchisserie & Pressing', image: images.activities.pressing},
    {id: '7', title: 'Boutique', image: images.activities.shop},
]

export const galleryImages: GalleryItem[] = [
    {
        id: '1',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fbd2ef6416-519eb0fe1a16159a24f9.png',
        alt: 'A serene Moroccan courtyard garden with a central fountain',
        width: 1200,
        height: 1400,
    },
    {
        id: '2',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02d7f1c424-700fae45d8e1b7bceb5f.png',
        alt: 'Traditional Moroccan tagine dish',
        width: 1200,
        height: 800,
    },
    {
        id: '3',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/580707640f-ebdcf2aa6c8a51e8acd7.png',
        alt: 'Rooftop terrace at sunset with Atlas Mountains view',
        width: 1200,
        height: 1400,
    },
    {
        id: '4',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02532e2b78-93b0259644fe3a57c82d.png',
        alt: 'Traditional Moroccan Hammam and spa',
        width: 1200,
        height: 1000,
    },
    {
        id: '5',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c27775db0f-be53cf174d6ec01e228b.png',
        alt: 'Bustling Marrakech souk with colorful displays',
        width: 1200,
        height: 1000,
    },
    {
        id: '6',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05f166391a-3aba4f8574f7917e1958.png',
        alt: 'Moroccan hotel bedroom with traditional carved wooden bed',
        width: 1200,
        height: 1400,
    },
    {
        id: '7',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/24912c6018-ee69d26990ac0d0c7bfb.png',
        alt: 'Traditional Moroccan mint tea ceremony',
        width: 1200,
        height: 800,
    },
    {
        id: '8',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cf1456705d-c7a03e291a07282251ae.png',
        alt: 'Luxurious hotel spa treatment room',
        width: 1200,
        height: 1000,
    },
    {
        id: '9',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f0e537146e-8218d985fd0779604e26.png',
        alt: 'Moroccan riad courtyard at night',
        width: 1200,
        height: 1400,
    },
    {
        id: '10',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3c8af76559-86c0b3869d7e58372e0d.png',
        alt: 'Hotel restaurant dining area',
        width: 1200,
        height: 1000,
    },
    {
        id: '11',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c44b1f9fea-a3e92de5b0b57a7a15ee.png',
        alt: 'Intricate Moroccan mosaic tilework',
        width: 1200,
        height: 800,
    },
    {
        id: '12',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/7799a529ce-38018d13e9db661afced.png',
        alt: 'Hotel concierge desk',
        width: 1200,
        height: 1000,
    },
    {
        id: '13',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0830ecfa41-f8aaabc1e3a16b1ac79a.png',
        alt: 'Moroccan hotel balcony overlooking medina',
        width: 1200,
        height: 1400,
    },
    {
        id: '14',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/23f932cf8b-21687faecdd12b6e150e.png',
        alt: 'Traditional Moroccan carpet weaving',
        width: 1200,
        height: 1000,
    },
    {
        id: '15',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1ccb1ab89c-c4cfa3ca134f0b3c7440.png',
        alt: 'Hotel fitness center',
        width: 1200,
        height: 800,
    },
    {
        id: '16',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/812360b1d9-338ec2b582ebf1ecfeea.png',
        alt: 'Moroccan hotel library',
        width: 1200,
        height: 1000,
    },
];

export type SlideCategory =
    | 'HÉBERGEMENTS' | 'ÉVÉNEMENTS PRIVÉS' | 'EXCLUSIVITÉ TOTALE' | 'ÉVÉNEMENTS PROFESSIONNELS'
    | 'GASTRONOMIE' | 'AVENTURE EXTRÊME' | 'SPORT DE PRESTIGE'
    | 'DÉTENTE'
    | 'BIEN-ÊTRE & SPA'
    | 'AMBIANCE' | 'MIXOLOGIE' | 'MOMENTS PRÉCIEUX';

export interface SlideImages {
    main: string;
    secondary: string;
}

export interface Slide {
    id: number;
    category: SlideCategory;
    title: string;
    description: string[];
    features: string[];
    images: SlideImages;
    link?: string;
}


export const experienceSlides: Slide[] = [
    {
        id: 1,
        category: 'HÉBERGEMENTS',
        title: '17 Chambres Et Suites Uniques',
        description: [
            'Le Riad Nashira vous offre 17 chambres et suites élégamment conçues au cœur de la Médina de Marrakech.',
            'Chaque espace allie le charme traditionnel marocain au confort moderne. Un refuge de luxe pour un séjour inoubliable avec architecture authentique et décoration raffinée.'
        ],
        features: ['Chambres Confort', 'Chambres Deluxe', 'Suites', 'Suites Spéciales'],
        images: {
            main: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80'
        },
        link: '/rooms'
    },
    {
        id: 2,
        category: 'GASTRONOMIE',
        title: 'Expériences Culinaires Raffinées',
        description: [
            'Entre Le Nour, restaurant marocain, et Le Rive, restaurant méditerranéen, laissez-vous séduire par deux univers culinaires complémentaires.',
            'Des plats raffinés, une inspiration locale et méditerranéenne, et des ingrédients frais pour un voyage gustatif unique.',
        ],
        features: ['Restaurant Marocain', 'Restaurant Méditerranéen', 'Produits Locaux'],
        images: {
            main: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
        },
        link: '/bars-restaurants'
    },
    {
        id: 3,
        category: 'DÉTENTE',
        title: 'Trois Espaces Aquatiques Uniques',
        description: [
            'Profitez de nos trois piscines pour vous ressourcer dans un cadre exceptionnel.',
            'Une piscine sur le rooftop avec vue panoramique sur la Médina, une piscine intérieure chauffée et une piscine au cœur du patio. Des oasis de tranquillité.'
        ],
        features: ['Piscine Rooftop', 'Piscine Chauffée', 'Piscine Patio', 'Transats Premium'],
        images: {
            main: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80'
        },
        link: '/spa'
    },
    {
        id: 4,
        category: 'BIEN-ÊTRE & SPA',
        title: 'Spa Et Rituels De Bien-Être',
        description: [
            'Notre spa vous invite à un voyage sensoriel unique inspiré des traditions marocaines.',
            'Entre hammam traditionnel, piscines chauffées et fitness en rooftop , notre riad offre une expérience de bien-être totale , unique dans la Médina'
        ],
        features: ['Hammam Traditionnel', 'Massages', 'Soins Naturels', 'Espace Fitness'],
        images: {
            main: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
        },
        link: '/spa'
    },
    {
        id: 5,
        category: 'AMBIANCE',
        title: 'Une Ambiance Raffinée Et Authentique',
        description: [
            'Découvrez deux bars et une terrasse panoramique où le raffinement rencontre la tradition marocaine.',
            'Architecture authentique, décoration soignée et service personnalisé : chaque espace a été conçu pour offrir une expérience unique et mémorable au cœur de Marrakech.'
        ],
        features: ['Architecture Traditionnelle', 'Boutique artisanale', 'Rooftop Panoramique'],
        images: {
            main: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80'
        },
        link: '/bars-restaurants'
    }
]

export const barsAndRestaurantsSlides: Slide[] = [
    {
        id: 1,
        category: 'GASTRONOMIE',
        title: 'Expériences Culinaires Raffinées',
        description: [
            'Au Riad Nashira, la gastronomie fait partie intégrante du voyage. De la finesse des saveurs marocaines aux assiettes méditeraneennes les plus raffinées nos restaurants et bars sont des lieux de partage, de découverte et de convivialité.',
            'Chaque espace a été pensé comme une escale sensorielle : intimiste, élégante et authentique.',
        ],
        features: ['Restaurant Marocain', 'Restaurant Méditerranéen', 'Produits Locaux'],
        images: {
            main: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
        }
    },
    {
        id: 2,
        category: 'MIXOLOGIE',
        title: 'Ambiance & Cocktails Signature',
        description: [
            'Découvrez le Rinlip, notre bar intimiste, et le Rooftop Rinlip, offrant une vue imprenable sur Marrakech. Deux atmosphères, une même excellence.',
            'Des créations uniques de nos mixologues, une sélection de vins fins et des spiritueux premium dans des cadres exceptionnels.'
        ],
        features: ['Bar Intimiste', 'Rooftop Panoramique', 'Musique Live'],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4a62ee7e92-0dee6221cf659278bcca.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/498a4d7e0f-c87a7fb0c2a1cedf230c.png'
        }
    },
]

export const restaurantsData: Facility[] = [
    {
        id: 'nour-marocain',
        category: 'SAVEURS AUTHENTIQUES',
        name: 'Nour - Cuisine Marocaine',
        description:
            ['Le restaurant Nour rend hommage à l’art culinaire marocain dans toute sa richesse. Dans un cadre raffiné au rez de chaussée du riad, dégustez tajines délicatement parfumés, couscous généreux, pastillas croustillantes ou encore desserts marocains aux notes sucrées et subtiles.',
                'Les produits locaux et de saison sont travaillés avec soin par notre chef Abdel, pour une expérience qui mêle authenticité et élégance'],
        cuisine: 'Marocaine',
        hours: '19:00 - 23:00',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/925b1db0bb-8ae59c63c6dcd46c5865.png',
        imageAlt: 'Interior of a luxurious Moroccan restaurant with intricate tilework, hanging lanterns, plush seating, and a warm, inviting ambiance, authentic decor',
        icon: 'FaUtensils',
        menuText: "VOIR LE MENU",
        reservationText: "Réserver une table"
    },
    {
        id: 'rive-mediterraneen',
        category: 'FRAÎCHEUR & LÉGÈRETÉ',
        name: 'Rive - Cuisine Méditerranéenne',
        description: [
            'Avec en toile de fond la Médina et la Koutoubia, chaque repas devient une expérience inoubliable, entre ciel et terre',
            'Sur le rooftop du riad, le restaurant RIVE vous invite à un voyage culinaire entre les deux rives de la Méditerannee. Il propose une cuisine raffinée, légère et colorée. Certains plats de la carte portent l’empreinte du chef étoilé Alexandre Lechêne, qui a insuflé son savoir-faire et sa créativité dans la conception culinaire du lieu.'],
        cuisine: 'Méditerranéenne',
        hours: '12:00 - 15:00 / 19:00 - 23:00',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b70eac3837-41486d2a6f64cbfb3242.png',
        imageAlt: 'Bright and airy Mediterranean restaurant interior with white and blue decor, fresh flowers on tables, large windows with natural light, and a coastal vibe',
        icon: 'FaFish',
        menuText: "VOIR LE MENU",
        reservationText: "Réserver une table"
    }
];

export const spaData: Facility[] = [
    {
        id: 'spa',
        category: 'SANCTUAIRE DE QUIÉTUDE',
        name: 'Un spa raffiné',
        description:
            ['Le spa Nashira est un sanctuaire dédié au ressourcement. Dans une atmosphère douce et apaisante , profitez de 3 cabines de massage pour des soins personnalisés (relaxants, énérgétiques, signatures à l’huile d’argan). Un espace de relaxation vous permettra de prolonger ces instants de détente dans le calme.',
                'Un service "coiffeur" est aussi à votre disposition sur demande.'],
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1e8781d502-0bcb5ebf0de2cf37c8d1.png',
        imageAlt: 'Serene spa treatment room with massage table, natural stone walls, soft lighting, aromatherapy candles, peaceful ambiance',
        menuText: "Carte des soins",
        reservationText: "Réserver votre massage"
    },
    {
        id: 'hammam',
        category: 'TRADITION ANCESTRALE',
        name: 'Deux hammams traditionnels',
        description: [
            'Immergez-vous dans la tradition millénaire du hammam marocain. Cette expérience purifiante combine vapeur chaude, gommage au savon noir et rhassoul pour une régénération complète de la peau.',
            'Nos deux hammams authentiques, construits selon les techniques traditionnelles, vous transportent dans un rituel de purification ancestral, suivi d\'un moment de détente absolue.',
        ],
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d88c3415bb-270587d94437037719d8.png',
        imageAlt: 'Traditional Moroccan hammam interior with marble surfaces, steam, warm lighting, authentic architecture, spa luxury',
    }
];

export const barsData: SecondaryFacility[] = [
    {
        id: 'rinlip-bar',
        name: 'Rinlip',
        description: 'Un refuge feutré et élégant au rez-de-chaussée, idéal pour un apéritif ou un digestif. Laissez-vous tenter par nos cocktails classiques et nos créations signature dans une atmosphère confidentielle.',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/aa75bc1473-d418b8a3dff98c57245e.png',
        imageAlt: 'Cozy and sophisticated speakeasy bar with dark wood paneling, leather armchairs, a glowing bar with premium spirits, and intimate lighting, classic style'
    },
    {
        id: 'rooftop-rinlip',
        name: 'Rinlip Rooftop',
        description: 'Le point culminant de votre soirée. Profitez d\'une vue à 360° sur Marrakech, de la musique live et d\'une ambiance festive. Le lieu parfait pour admirer le coucher de soleil, un cocktail à la main.',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b699b38764-1967ceb92cee9547429b.png',
        imageAlt: 'Stunning rooftop bar in Marrakech at sunset, with panoramic views of the Atlas mountains, stylish lounge furniture, infinity pool, and vibrant ambiance'
    }
];

export const fitnessData: SecondaryFacility[] = [
    {
        id: 'fitness',
        name: 'Fitness',
        description: 'Pour ceux qui souhaitent allier voyage et équilibre, le rooftop du riad accueille un espace fitness moderne baigné de lumière et ouvert sur les toits de Marrakech. Un cadre insolite pour s’entrainer en toute tranquilité.',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0cf4c4d830-da169879529c69d95a67.png',
        imageAlt: 'Cozy and sophisticated speakeasy bar with dark wood paneling, leather armchairs, a glowing bar with premium spirits, and intimate lighting, classic style'
    },
    {
        id: 'yoga',
        name: 'Coach & Yoga',
        description: 'Un coach personnalisé, des cours de yoga peuvent aussi être proposés sur demande.',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/8f54bdda5d-9914f6738cbfa93ae961.png',
        imageAlt: 'Stunning rooftop bar in Marrakech at sunset, with panoramic views of the Atlas mountains, stylish lounge furniture, infinity pool, and vibrant ambiance'
    }
];

export const spaSlides: Slide[] = [
    {
        id: 1,
        category: 'BIEN-ÊTRE & SPA',
        title: 'Spa Et Rituels De Bien-Être',
        description: [
            'Notre spa vous invite à un voyage sensoriel unique inspiré des traditions marocaines.',
            'Entre hammam traditionnel, piscines chauffées et fitness en rooftop , notre riad offre une expérience de bien-être totale , unique dans la Médina'
        ],
        features: ['Hammam Traditionnel', 'Massages', 'Soins Naturels', 'Espace Fitness'],
        images: {
            main: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80'
        }
    },
    {
        id: 2,
        category: 'DÉTENTE',
        title: 'Trois Espaces Aquatiques Uniques',
        description: [
            'Profitez de nos trois piscines pour vous ressourcer dans un cadre exceptionnel.',
            'Une piscine sur le rooftop avec vue panoramique sur la Médina, une piscine intérieure chauffée et une piscine au cœur du patio. Des oasis de tranquillité.'
        ],
        features: ['Piscine Rooftop', 'Piscine Chauffée', 'Piscine Patio', 'Transats Premium'],
        images: {
            main: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
            secondary: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80'
        }
    },
]

export const eventsSlides: Slide[] = [
    {
        id: 1,
        category: 'ÉVÉNEMENTS PROFESSIONNELS',
        title: 'Séminaires et Réunions Professionnelles',
        description: [
            'Organisez vos événements d\'entreprise dans un cadre inspirant et raffiné. Nos espaces modulables s\'adaptent à tous vos besoins professionnels.',
            'Équipements audiovisuels de pointe, service de restauration personnalisé et accompagnement dédié pour la réussite de vos événements.'
        ],
        features: ['Salles Modulables', 'Équipements High-Tech', 'Service Traiteur'],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/9f194e8d44-73d7ed8e3f5811381e05.png'
        }
    },
    {
        id: 2,
        category: 'ÉVÉNEMENTS PRIVÉS',
        title: 'Dîners Privés et Soirées Exclusives',
        description: [
            'Créez des moments intimes et raffinés pour vos invités. Nos chefs conçoivent des menus sur mesure dans des espaces privatisés d\'exception.',
            'Service personnalisé, ambiance sur mesure et attention aux moindres détails pour des soirées mémorables et exclusives.'
        ],
        features: ['Menus Personnalisés', 'Service Exclusif', 'Ambiance Sur Mesure'],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/61e7871271-6dd1d996f7a4cc2c0992.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/89055ea760-73006c17bb6da7a6f155.png'
        }
    },
    {
        id: 3,
        category: 'MOMENTS PRÉCIEUX',
        title: 'Célébrations et Moments de Vie',
        description: [
            'Mariages, anniversaires, baptêmes... Chaque moment important mérite un cadre à la hauteur de vos émotions et de vos rêves.',
            'Notre équipe vous accompagne dans la création d\'événements uniques, reflétant votre personnalité et vos souhaits les plus chers.'
        ],
        features: ['Mariages', 'Anniversaires', 'Événements Familiaux'],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f64c1a0ffb-976c7943c5562cb6b6a9.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4a62406da9-30273bf52e80cf233724.png'
        }
    },
    {
        id: 4,
        category: 'EXCLUSIVITÉ TOTALE',
        title: 'Privatisation Totale du Riad',
        description: [
            'L\'expérience ultime : le Riad Nashira entièrement à votre disposition. Un privilège rare pour des événements d\'exception et une intimité absolue.',
            'Tous nos espaces, services et équipes dédiés exclusivement à votre événement pour une expérience sur mesure et inoubliable.'
        ],
        features: ['Riad Entier', 'Service Dédié', 'Intimité Absolue'],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8ead5dc2-9b054213d63436e9568a.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b9d9b0a36c-30c1db56b54cd8485586.png'
        }
    }
];

export const eventSpacesData: EventSpace[] = [
    {
        id: "courtyard-space",
        title: "Cour Centrale",
        description: "Le cœur du riad, idéal pour les cérémonies intimes et les cocktails.",
        capacity: 80,
        locationType: "Intérieur/Extérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6558f36621-e20e0706a6c5c022bf86.png",
            alt: "Beautiful central courtyard of Moroccan riad with fountain, traditional tiles, orange trees, perfect for intimate ceremonies"
        }
    },
    {
        id: "rooftop-space",
        title: "Terrasse Panoramique",
        description: "Vue imprenable sur Marrakech pour des soirées mémorables.",
        capacity: 120,
        locationType: "Extérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/863856695e-5849c187e15562a08213.png",
            alt: "Stunning rooftop terrace in Marrakech with panoramic views, set up for elegant evening reception with string lights"
        }
    },
    {
        id: "salon-space",
        title: "Salon Marocain",
        description: "Ambiance authentique pour des réunions privilégiées.",
        capacity: 30,
        locationType: "Intérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/74a5b35bbe-3bebfecc45f28de0ed52.png",
            alt: "Elegant Moroccan salon with traditional seating, ornate decorations, perfect for private meetings and intimate gatherings"
        }
    }
];

export const activitiesSlides: Slide[] = [
    {
        id: 1,
        category: "AVENTURE EXTRÊME",
        title: "Excursion en Quad et Buggy",
        description: [
            "Vivez l'adrénaline pure en explorant les paysages spectaculaires du désert marocain. Une aventure tout-terrain inoubliable.",
            "Équipement professionnel fourni, guides expérimentés et circuit adapté à tous les niveaux pour une expérience sécurisée."
        ],
        features: ["Équipement Inclus", "Guide Expert", "Tous Niveaux"],
        images: {
            main: "https://storage.googleapis.com/uxpilot-auth.appspot.com/0b7ff82c22-64ad22472bcaae938859.png",
            secondary: "https://storage.googleapis.com/uxpilot-auth.appspot.com/11c079ca96-699a5154a3fc4a4286f0.png"
        }
    },
    {
        id: 2,
        category: "SPORT DE PRESTIGE",
        title: "Golf à Marrakech",
        description: [
            "Découvrez les plus beaux parcours de golf de Marrakech avec vue imprenable sur l'Atlas. Excellence et raffinement garantis.",
            "Accès privilégié aux clubs prestigieux, équipement haut de gamme et service personnalisé pour une expérience d'exception."
        ],
        features: ["Parcours Premium", "Équipement Fourni", "Transport Inclus"],
        images: {
            main: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b8927524b2-a48d98923a544bed8973.png",
            secondary: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c27f84a6af-bc8129bd50aa1ba899aa.png"
        }
    }
];

export const otherActivitiesData =  [
    {
        id: "desert-excursion-card",
        title: "Excursions Désert",
        description:
            "Partez à la découverte du désert d'Agafay, nuit sous les étoiles et rencontre avec les nomades.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bf8d658fa1-3c567cdec2565ebf0bcf.png",
            alt: "Sahara desert excursion with camels and Berber camp, golden sand dunes, traditional nomadic experience",
        },
    },
    {
        id: "horse-riding-card",
        title: "Balade à Cheval",
        description:
            "Explorez la palmeraie et les environs de Marrakech à cheval, une expérience unique.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ff0f2f42a8-7a4347d908e14d14d959.png",
            alt: "Horseback riding in Moroccan countryside, Atlas Mountains background, equestrian adventure, traditional riding",
        },
    },
    {
        id: "essaouira-card",
        title: "Journée Essaouira",
        description:
            "Accompagnez d'un guide, découvrez la perle de l'Atlantique, ses remparts et son ambiance bohème unique.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e8114fc3cb-1700b859c31688cf5b27.png",
            alt: "Essaouira coastal city Morocco, blue and white medina, Atlantic Ocean, fishing port, historic ramparts",
        },
    },
    {
        id: "cooking-class-card",
        title: "Cours de Cuisine",
        description:
            "Apprenez les secrets de la cuisine marocaine avec nos chefs expérimentés.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ae8263489e-b83b032f87ae704c3841.png",
            alt: "Moroccan cooking class, traditional tagine preparation, spices market visit, culinary experience, chef instruction",
        },
    },
    {
        id: "medina-tour-card",
        title: "Visite Guidée Médina",
        description:
            "Plongez au cœur de la médina et de ses souks avec un guide local expert et passionné.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/673726ac87-ba0c37d34e4547597665.png",
            alt: "Guided tour of Marrakech medina, traditional souks, local guide, cultural discovery, historic monuments",
        },
    },
    {
        id: "atlas-mountains-card",
        title: "Randonnée Atlas",
        description:
            "Explorez les villages berbères et les sommets de l'Atlas marocain.",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/37793ac69d-275b036d343274fa9974.png",
            alt: "Atlas Mountains hiking trail, Berber villages, mountain landscape, trekking adventure, traditional architecture",
        },
    },
];






