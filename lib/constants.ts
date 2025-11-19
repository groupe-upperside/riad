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
    hero1: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_4.jpg',
    hero2: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_3.jpeg',
    hero3: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_2.jpeg',
    hero4: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_1.jpeg',
    hero5: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_5.jpeg',
    hero6: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_6.jpeg',
    hero7: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_7.jpeg',
    hero8: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_8.jpeg',
    hero9: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_9.jpeg',
    hero10: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_10.jpeg',
    hero11: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_11.jpeg',
    hero12: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_12.jpeg',
    hero13: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_13.jpeg',
    hero14: process.env.NEXT_PUBLIC_CDN_URL + 'home_slider/' + 'slide_14.jpeg',
    aboutRiad: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_about.jpeg',
    experienceSuite: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_luxe.jpeg',
    patternOverlay: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/dc765237cd-ef220abc13ff04563495.png',
    goldLight: 'https://storage.googleapis.com/uxpilot-images-and-prompts/images/1706612450849-gold-light.png',
    rooms: {
        confort: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_comfort.jpg',
        deluxe: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_deluxe.jpg',
        suite: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_suite.jpg',
        nashira: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_nashira.jpg',
    },
    activities: {
        transport: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f34877789a-867779bb1e7523bcf56e.png',
        coach: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_fitness.png',
        hair: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_coiffure.jpeg',
        events: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_events.jpeg',
        activities: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_activities.jpeg',
        pressing: "https://storage.googleapis.com/uxpilot-auth.appspot.com/1340fb335f-c09b1d90dbd378dc0ca8.png",
        shop: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_boutique.jpeg',
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

export const getAmenities = (t: (key: string) => string): Amenity[] => [
    {id: '1', icon: FaSpa, label: t('AmenitySpa.translation.content')},
    {id: '2', icon: FaSwimmingPool, label: t('AmenityPools.translation.content')},
    {id: '3', icon: FaUtensils, label: t('AmenityRestaurants.translation.content')},
    {id: '4', icon: IoIosFitness, label: t('AmenityFitness.translation.content')},
    {id: '5', icon: MdElevator, label: t('AmenityElevator.translation.content')},
    {id: '6', icon: FaWifi, label: t('AmenityWifi.translation.content')},
];

export const getRooms = (t: (key: string) => string): Room[] => [
    {
        id: '1',
        title: t('Constants.RoomComfortTitle.translation.content'),
        price: 299,
        image: images.rooms.confort,
        slug: 'confort-room',
        description: t('Constants.RoomComfortDescription.translation.content'),
        amenities: [
            {icon: FaBed, label: t('Constants.RoomComfortAmenity1.translation.content')},
            {icon: FaSnowflake, label: t('Constants.RoomComfortAmenity2.translation.content')},
        ]
    },
    {
        id: '2',
        title: t('Constants.RoomDeluxeTitle.translation.content'),
        price: 399,
        image: images.rooms.deluxe,
        slug: 'deluxe-room',
        description: t('Constants.RoomDeluxeDescription.translation.content'),
        amenities: [
            {icon: FaBed, label: t('Constants.RoomDeluxeAmenity1.translation.content')},
            {icon: MdDeck, label: t('Constants.RoomDeluxeAmenity2.translation.content')},
        ]
    },
    {
        id: '3',
        title: t('Constants.RoomSuiteTitle.translation.content'),
        price: 599,
        image: images.rooms.suite,
        slug: 'suite-room',
        description: t('Constants.RoomSuiteDescription.translation.content'),
        amenities: [
            {icon: FaBed, label: t('Constants.RoomSuiteAmenity1.translation.content')},
            {icon: MdDeck, label: t('Constants.RoomSuiteAmenity2.translation.content')},
        ]
    },
    {
        id: '4',
        title: t('Constants.RoomSpecialSuiteTitle.translation.content'),
        price: 799,
        image: images.rooms.nashira,
        slug: 'suite-speciale',
        description: t('Constants.RoomSpecialSuiteDescription.translation.content'),
        amenities: [
            {icon: FaCrown, label: t('Constants.RoomSpecialSuiteAmenity1.translation.content')},
            {icon: MdDeck, label: t('Constants.RoomSpecialSuiteAmenity2.translation.content')},
            {icon: FaCouch, label: t('Constants.RoomSpecialSuiteAmenity3.translation.content')},
            {icon: FaConciergeBell, label: t('Constants.RoomSpecialSuiteAmenity4.translation.content')}
        ]
    }
];

export const getTestimonials = (t: (key: string) => string): Testimonial[] => [
    {
        id: '1',
        name: t('Constants.Testimonial1Name.translation.content'),
        location: t('Constants.Testimonial1Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial1Review.translation.content'),
        avatar: images.avatars.avatar1
    },
    {
        id: '2',
        name: t('Constants.Testimonial2Name.translation.content'),
        location: t('Constants.Testimonial2Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial2Review.translation.content'),
        avatar: images.avatars.avatar2
    },
    {
        id: '3',
        name: t('Constants.Testimonial3Name.translation.content'),
        location: t('Constants.Testimonial3Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial3Review.translation.content'),
        avatar: images.avatars.avatar3
    },
];

type GalleryItem = {
    id: string | number;
    src: string;
    alt: string;
    width: number;
    height: number;
};

export const getActivities = (t: (key: string) => string): Activity[] => [
    {id: '1', title: t('Constants.ActivityTransport.translation.content'), image: images.activities.transport},
    {id: '2', title: t('Constants.ActivityYoga.translation.content'), image: images.activities.coach},
    {id: '3', title: t('Constants.ActivityEvents.translation.content'), image: images.activities.events},
    {id: '4', title: t('Constants.ActivityActivities.translation.content'), image: images.activities.activities},
    {id: '5', title: t('Constants.ActivityLaundry.translation.content'), image: images.activities.pressing},
    {id: '6', title: t('Constants.ActivityHair.translation.content'), image: images.activities.hair},
    {id: '7', title: t('Constants.ActivityShop.translation.content'), image: images.activities.shop},
];

export const galleryImages: GalleryItem[] = [
    {
        id: '1',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_1.jpeg',
        alt: 'A serene Moroccan courtyard garden with a central fountain',
        width: 1200,
        height: 1400,
    },
    {
        id: '2',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_2.jpeg',
        alt: 'Traditional Moroccan tagine dish',
        width: 1200,
        height: 800,
    },
    {
        id: '3',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_3.jpeg',
        alt: 'Rooftop terrace at sunset with Atlas Mountains view',
        width: 1200,
        height: 1400,
    },
    {
        id: '4',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_4.jpeg',
        alt: 'Traditional Moroccan Hammam and spa',
        width: 1200,
        height: 1000,
    },
    {
        id: '5',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_5.jpeg',
        alt: 'Bustling Marrakech souk with colorful displays',
        width: 1200,
        height: 1000,
    },
    {
        id: '6',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_6.jpeg',
        alt: 'Moroccan hotel bedroom with traditional carved wooden bed',
        width: 1200,
        height: 1400,
    },
    {
        id: '7',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_7.jpeg',
        alt: 'Traditional Moroccan mint tea ceremony',
        width: 1200,
        height: 800,
    },
    {
        id: '8',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_8.jpeg',
        alt: 'Luxurious hotel spa treatment room',
        width: 1200,
        height: 1000,
    },
    {
        id: '9',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_9.jpeg',
        alt: 'Moroccan riad courtyard at night',
        width: 1200,
        height: 1400,
    },
    {
        id: '10',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_10.jpeg',
        alt: 'Hotel restaurant dining area',
        width: 1200,
        height: 1000,
    },
    {
        id: '11',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_11.jpeg',
        alt: 'Intricate Moroccan mosaic tilework',
        width: 1200,
        height: 800,
    },
    {
        id: '12',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_12.jpeg',
        alt: 'Hotel concierge desk',
        width: 1200,
        height: 1000,
    },
    {
        id: '13',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_13.jpeg',
        alt: 'Moroccan hotel balcony overlooking medina',
        width: 1200,
        height: 1400,
    },
    {
        id: '14',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_14.jpeg',
        alt: 'Traditional Moroccan carpet weaving',
        width: 1200,
        height: 1000,
    },
    {
        id: '15',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_15.jpeg',
        alt: 'Hotel fitness center',
        width: 1200,
        height: 800,
    },
    {
        id: '16',
        src: process.env.NEXT_PUBLIC_CDN_URL + 'gallery/' + 'gallery_16.jpeg',
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
    category: SlideCategory | string;
    title: string;
    description: string[];
    features: string[];
    images: SlideImages;
    link?: string;
}


export const getExperienceSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('Slide1Category.translation.content') as SlideCategory,
        title: t('Slide1Title.translation.content'),
        description: [
            t('Slide1Description1.translation.content'),
            t('Slide1Description2.translation.content')
        ],
        features: [
            t('Slide1Feature1.translation.content'),
            t('Slide1Feature2.translation.content'),
            t('Slide1Feature3.translation.content'),
            t('Slide1Feature4.translation.content')
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_rooms.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_room_2.jpeg',
        },
        link: '/rooms'
    },
    {
        id: 2,
        category: t('Slide2Category.translation.content') as SlideCategory,
        title: t('Slide2Title.translation.content'),
        description: [
            t('Slide2Description1.translation.content'),
            t('Slide2Description2.translation.content')
        ],
        features: [
            t('Slide2Feature1.translation.content'),
            t('Slide2Feature2.translation.content'),
            t('Slide2Feature3.translation.content')
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_restaurant.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_restaurant_2.jpeg',
        },
        link: '/bars-restaurants'
    },
    {
        id: 3,
        category: t('Slide3Category.translation.content') as SlideCategory,
        title: t('Slide3Title.translation.content'),
        description: [
            t('Slide3Description1.translation.content'),
            t('Slide3Description2.translation.content')
        ],
        features: [
            t('Slide3Feature1.translation.content'),
            t('Slide3Feature2.translation.content'),
            t('Slide3Feature3.translation.content'),
            t('Slide3Feature4.translation.content')
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_pool.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_pool_2.jpg',
        },
        link: '/spa'
    },
    {
        id: 4,
        category: t('Slide4Category.translation.content') as SlideCategory,
        title: t('Slide4Title.translation.content'),
        description: [
            t('Slide4Description1.translation.content'),
            t('Slide4Description2.translation.content')
        ],
        features: [
            t('Slide4Feature1.translation.content'),
            t('Slide4Feature2.translation.content'),
            t('Slide4Feature3.translation.content'),
            t('Slide4Feature4.translation.content')
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_spa.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_spa_2.jpeg',
        },
        link: '/spa'
    },
    {
        id: 5,
        category: t('Slide5Category.translation.content') as SlideCategory,
        title: t('Slide5Title.translation.content'),
        description: [
            t('Slide5Description1.translation.content'),
            t('Slide5Description2.translation.content')
        ],
        features: [
            t('Slide5Feature1.translation.content'),
            t('Slide5Feature2.translation.content'),
            t('Slide5Feature3.translation.content')
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_bar.jpg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'home_sections/' + 'home_bar_2.jpg',
        },
        link: '/bars-restaurants'
    }
];

export const experienceSlides: Slide[] = [];

export const getBarsAndRestaurantsSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('BarsSlides1Category.translation.content'),
        title: t('BarsSlides1Title.translation.content'),
        description: [
            t('BarsSlides1Description1.translation.content'),
            t('BarsSlides1Description2.translation.content'),
        ],
        features: [
            t('BarsSlides1Feature1.translation.content'),
            t('BarsSlides1Feature2.translation.content'),
            t('BarsSlides1Feature3.translation.content'),
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_slider_1.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_slider_2.jpeg',
        }
    },
    {
        id: 2,
        category: t('BarsSlides2Category.translation.content'),
        title: t('BarsSlides2Title.translation.content'),
        description: [
            t('BarsSlides2Description1.translation.content'),
            t('BarsSlides2Description2.translation.content'),
        ],
        features: [
            t('BarsSlides2Feature1.translation.content'),
            t('BarsSlides2Feature2.translation.content'),
            t('BarsSlides2Feature3.translation.content'),
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_slider_4.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_slider_3.jpeg',
        }
    },
];


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

export const getSpaData = (t: (key: string) => string): Facility[] => [
    {
        id: 'spa',
        category: t('SpaCategory.translation.content'),
        name: t('SpaName.translation.content'),
        description: [
            t('SpaDescription1.translation.content'),
            t('SpaDescription2.translation.content'),
        ],
        image: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_features_1.jpg',
        imageAlt: t('SpaImageAlt.translation.content'),
        menuText: t('SpaMenuText.translation.content'),
        reservationText: t('SpaReservationText.translation.content'),
    },
    {
        id: 'hammam',
        category: t('HammamCategory.translation.content'),
        name: t('HammamName.translation.content'),
        description: [
            t('HammamDescription1.translation.content'),
            t('HammamDescription2.translation.content'),
        ],
        image: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_features_2.jpg',
        imageAlt: t('HammamImageAlt.translation.content'),
    }
];


export const getRestaurantsData = (t: (key: string) => string): Facility[] => [
    {
        id: 'nour-marocain',
        category: t('RestaurantsNourCategory.translation.content'),
        name: t('RestaurantsNourName.translation.content'),
        description: [
            t('RestaurantsNourDescription1.translation.content'),
            t('RestaurantsNourDescription2.translation.content'),
        ],
        cuisine: t('RestaurantsNourCuisine.translation.content'),
        hours: t('RestaurantsNourHours.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_introduction.jpg',
        imageAlt: t('RestaurantsNourImageAlt.translation.content'),
        icon: 'FaUtensils',
        menuText: t('RestaurantsMenuText.translation.content'),
        reservationText: t('RestaurantsReservationText.translation.content'),
    },
    {
        id: 'rive-mediterraneen',
        category: t('RestaurantsRiveCategory.translation.content'),
        name: t('RestaurantsRiveName.translation.content'),
        description: [
            t('RestaurantsRiveDescription1.translation.content'),
            t('RestaurantsRiveDescription2.translation.content'),
        ],
        cuisine: t('RestaurantsRiveCuisine.translation.content'),
        hours: t('RestaurantsRiveHours.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_introduction_2.jpg',
        imageAlt: t('RestaurantsRiveImageAlt.translation.content'),
        icon: 'FaFish',
        menuText: t('RestaurantsMenuText.translation.content'),
        reservationText: t('RestaurantsReservationText.translation.content'),
    },
];

export const getBarsData = (t: (key: string) => string): SecondaryFacility[] => [
    {
        id: 'rinlip-bar',
        name: t('BarsRinlipName.translation.content'),
        description: t('BarsRinlipDescription.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_rinlip.jpg',
        imageAlt: t('BarsRinlipImageAlt.translation.content'),
    },
    {
        id: 'rooftop-rinlip',
        name: t('BarsRooftopName.translation.content'),
        description: t('BarsRooftopDescription.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_rooftop.jpg',
        imageAlt: t('BarsRooftopImageAlt.translation.content'),
    },
];


export const fitnessData: SecondaryFacility[] = [
    {
        id: 'fitness',
        name: 'Fitness',
        description: 'Pour ceux qui souhaitent allier voyage et équilibre, le rooftop du riad accueille un espace fitness moderne baigné de lumière et ouvert sur les toits de Marrakech. Un cadre insolite pour s’entrainer en toute tranquilité.',
        image: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_fitness.jpg',
        imageAlt: 'Cozy and sophisticated speakeasy bar with dark wood paneling, leather armchairs, a glowing bar with premium spirits, and intimate lighting, classic style'
    },
    {
        id: 'yoga',
        name: 'Coach & Yoga',
        description: 'Un coach personnalisé, des cours de yoga peuvent aussi être proposés sur demande.',
        image: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_coach.jpg',
        imageAlt: 'Stunning rooftop bar in Marrakech at sunset, with panoramic views of the Atlas mountains, stylish lounge furniture, infinity pool, and vibrant ambiance'
    }
];

export const getSpaSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('SpaSlides1Category.translation.content'),
        title: t('SpaSlides1Title.translation.content'),
        description: [
            t('SpaSlides1Description1.translation.content'),
            t('SpaSlides1Description2.translation.content'),
        ],
        features: [
            t('SpaSlides1Feature1.translation.content'),
            t('SpaSlides1Feature2.translation.content'),
            t('SpaSlides1Feature3.translation.content'),
            t('SpaSlides1Feature4.translation.content'),
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_slider_1.jpeg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_slider_2.jpeg',
        }
    },
    {
        id: 2,
        category: t('SpaSlides2Category.translation.content'),
        title: t('SpaSlides2Title.translation.content'),
        description: [
            t('SpaSlides2Description1.translation.content'),
            t('SpaSlides2Description2.translation.content'),
        ],
        features: [
            t('SpaSlides2Feature1.translation.content'),
            t('SpaSlides2Feature2.translation.content'),
            t('SpaSlides2Feature3.translation.content'),
            t('SpaSlides2Feature4.translation.content'),
        ],
        images: {
            main: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_slider_3.jpg',
            secondary: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_slider_4.jpg',
        }
    },
];

export const getEventsSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('Constants.EventsSlides.Slide1.Category.translation.content') as SlideCategory,
        title: t('Constants.EventsSlides.Slide1.Title.translation.content'),
        description: [
            t('Constants.EventsSlides.Slide1.Description1.translation.content'),
            t('Constants.EventsSlides.Slide1.Description2.translation.content')
        ],
        features: [
            t('Constants.EventsSlides.Slide1.Feature1.translation.content'),
            t('Constants.EventsSlides.Slide1.Feature2.translation.content'),
            t('Constants.EventsSlides.Slide1.Feature3.translation.content')
        ],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/9f194e8d44-73d7ed8e3f5811381e05.png'
        }
    },
    {
        id: 2,
        category: t('Constants.EventsSlides.Slide2.Category.translation.content') as SlideCategory,
        title: t('Constants.EventsSlides.Slide2.Title.translation.content'),
        description: [
            t('Constants.EventsSlides.Slide2.Description1.translation.content'),
            t('Constants.EventsSlides.Slide2.Description2.translation.content')
        ],
        features: [
            t('Constants.EventsSlides.Slide2.Feature1.translation.content'),
            t('Constants.EventsSlides.Slide2.Feature2.translation.content'),
            t('Constants.EventsSlides.Slide2.Feature3.translation.content')
        ],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/61e7871271-6dd1d996f7a4cc2c0992.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/89055ea760-73006c17bb6da7a6f155.png'
        }
    },
    {
        id: 3,
        category: t('Constants.EventsSlides.Slide3.Category.translation.content') as SlideCategory,
        title: t('Constants.EventsSlides.Slide3.Title.translation.content'),
        description: [
            t('Constants.EventsSlides.Slide3.Description1.translation.content'),
            t('Constants.EventsSlides.Slide3.Description2.translation.content')
        ],
        features: [
            t('Constants.EventsSlides.Slide3.Feature1.translation.content'),
            t('Constants.EventsSlides.Slide3.Feature2.translation.content'),
            t('Constants.EventsSlides.Slide3.Feature3.translation.content')
        ],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f64c1a0ffb-976c7943c5562cb6b6a9.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4a62406da9-30273bf52e80cf233724.png'
        }
    },
    {
        id: 4,
        category: t('Constants.EventsSlides.Slide4.Category.translation.content') as SlideCategory,
        title: t('Constants.EventsSlides.Slide4.Title.translation.content'),
        description: [
            t('Constants.EventsSlides.Slide4.Description1.translation.content'),
            t('Constants.EventsSlides.Slide4.Description2.translation.content')
        ],
        features: [
            t('Constants.EventsSlides.Slide4.Feature1.translation.content'),
            t('Constants.EventsSlides.Slide4.Feature2.translation.content'),
            t('Constants.EventsSlides.Slide4.Feature3.translation.content')
        ],
        images: {
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8ead5dc2-9b054213d63436e9568a.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b9d9b0a36c-30c1db56b54cd8485586.png'
        }
    }
];

export const getEventSpacesData = (t: (key: string) => string): EventSpace[] => [
    {
        id: "courtyard-space",
        title: t('Constants.EventSpaces.Courtyard.Title.translation.content'),
        description: t('Constants.EventSpaces.Courtyard.Description.translation.content'),
        capacity: 80,
        locationType: t('Constants.EventSpaces.Courtyard.LocationType.translation.content') as "Intérieur" | "Extérieur" | "Intérieur/Extérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6558f36621-e20e0706a6c5c022bf86.png",
            alt: t('Constants.EventSpaces.Courtyard.ImageAlt.translation.content')
        }
    },
    {
        id: "rooftop-space",
        title: t('Constants.EventSpaces.Rooftop.Title.translation.content'),
        description: t('Constants.EventSpaces.Rooftop.Description.translation.content'),
        capacity: 120,
        locationType: t('Constants.EventSpaces.Rooftop.LocationType.translation.content') as "Intérieur" | "Extérieur" | "Intérieur/Extérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/863856695e-5849c187e15562a08213.png",
            alt: t('Constants.EventSpaces.Rooftop.ImageAlt.translation.content')
        }
    },
    {
        id: "salon-space",
        title: t('Constants.EventSpaces.Salon.Title.translation.content'),
        description: t('Constants.EventSpaces.Salon.Description.translation.content'),
        capacity: 30,
        locationType: t('Constants.EventSpaces.Salon.LocationType.translation.content') as "Intérieur" | "Extérieur" | "Intérieur/Extérieur",
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/74a5b35bbe-3bebfecc45f28de0ed52.png",
            alt: t('Constants.EventSpaces.Salon.ImageAlt.translation.content')
        }
    }
];

export const getActivitiesSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('ActivitiesSlides1Category.translation.content'),
        title: t('ActivitiesSlides1Title.translation.content'),
        description: [
            t('ActivitiesSlides1Description1.translation.content'),
            t('ActivitiesSlides1Description2.translation.content'),
        ],
        features: [
            t('ActivitiesSlides1Feature1.translation.content'),
            t('ActivitiesSlides1Feature2.translation.content'),
            t('ActivitiesSlides1Feature3.translation.content'),
        ],
        images: {
            main:  process.env.NEXT_PUBLIC_CDN_URL + 'activities/' + 'activities_slider_1.jpeg',
            secondary: "https://storage.googleapis.com/uxpilot-auth.appspot.com/11c079ca96-699a5154a3fc4a4286f0.png"
        }
    },
    {
        id: 2,
        category: t('ActivitiesSlides2Category.translation.content'),
        title: t('ActivitiesSlides2Title.translation.content'),
        description: [
            t('ActivitiesSlides2Description1.translation.content'),
            t('ActivitiesSlides2Description2.translation.content'),
        ],
        features: [
            t('ActivitiesSlides2Feature1.translation.content'),
            t('ActivitiesSlides2Feature2.translation.content'),
            t('ActivitiesSlides2Feature3.translation.content'),
        ],
        images: {
            main: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b8927524b2-a48d98923a544bed8973.png",
            secondary: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c27f84a6af-bc8129bd50aa1ba899aa.png"
        }
    }
];

export const getOtherActivitiesData = (t: (key: string) => string) => [
    {
        id: "desert-excursion-card",
        title: t('OtherActivitiesDesertTitle.translation.content'),
        description: t('OtherActivitiesDesertDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/bf8d658fa1-3c567cdec2565ebf0bcf.png",
            alt: t('OtherActivitiesDesertImageAlt.translation.content'),
        },
    },
    {
        id: "horse-riding-card",
        title: t('OtherActivitiesHorseRidingTitle.translation.content'),
        description: t('OtherActivitiesHorseRidingDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ff0f2f42a8-7a4347d908e14d14d959.png",
            alt: t('OtherActivitiesHorseRidingImageAlt.translation.content'),
        },
    },
    {
        id: "essaouira-card",
        title: t('OtherActivitiesEssaouiraTitle.translation.content'),
        description: t('OtherActivitiesEssaouiraDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e8114fc3cb-1700b859c31688cf5b27.png",
            alt: t('OtherActivitiesEssaouiraImageAlt.translation.content'),
        },
    },
    {
        id: "cooking-class-card",
        title: t('OtherActivitiesCookingTitle.translation.content'),
        description: t('OtherActivitiesCookingDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ae8263489e-b83b032f87ae704c3841.png",
            alt: t('OtherActivitiesCookingImageAlt.translation.content'),
        },
    },
    {
        id: "medina-tour-card",
        title: t('OtherActivitiesMedinaTitle.translation.content'),
        description: t('OtherActivitiesMedinaDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/673726ac87-ba0c37d34e4547597665.png",
            alt: t('OtherActivitiesMedinaImageAlt.translation.content'),
        },
    },
    {
        id: "atlas-mountains-card",
        title: t('OtherActivitiesAtlasTitle.translation.content'),
        description: t('OtherActivitiesAtlasDescription.translation.content'),
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/37793ac69d-275b036d343274fa9974.png",
            alt: t('OtherActivitiesAtlasImageAlt.translation.content'),
        },
    },
];







