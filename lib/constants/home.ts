import {asset} from '@/lib/utils/asset';
import type {Activity, Room, Testimonial} from '@/types/room.type';

import {images} from './images';
import type {Slide, SlideCategory} from '@/types/experience.type';

export const getRooms = (t: (key: string) => string): Room[] => [
    {
        id: '1',
        title: t('Constants.RoomComfortTitle.translation.content'),
        image: images.rooms.confort,
        href: '/rooms/comfort',
        description: t('Constants.RoomComfortDescription.translation.content'),
    },
    {
        id: '2',
        title: t('Constants.RoomDeluxeTitle.translation.content'),
        image: images.rooms.deluxe,
        href: '/rooms/deluxe',
        description: t('Constants.RoomDeluxeDescription.translation.content'),
    },
    {
        id: '3',
        title: t('Constants.RoomSuiteTitle.translation.content'),
        image: images.rooms.suite,
        href: '/rooms/suites',
        description: t('Constants.RoomSuiteDescription.translation.content'),
    },
    {
        id: '4',
        title: t('Constants.RoomSpecialSuiteTitle.translation.content'),
        image: images.rooms.nashira,
        href: '/rooms/special-suites',
        description: t('Constants.RoomSpecialSuiteDescription.translation.content'),
    },
];

export const getTestimonials = (t: (key: string) => string): Testimonial[] => [
    {
        id: '1',
        name: t('Constants.Testimonial1Name.translation.content'),
        location: t('Constants.Testimonial1Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial1Review.translation.content'),
        avatar: images.avatars.avatar1,
    },
    {
        id: '2',
        name: t('Constants.Testimonial2Name.translation.content'),
        location: t('Constants.Testimonial2Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial2Review.translation.content'),
        avatar: images.avatars.avatar2,
    },
    {
        id: '3',
        name: t('Constants.Testimonial3Name.translation.content'),
        location: t('Constants.Testimonial3Location.translation.content'),
        rating: 5,
        review: t('Constants.Testimonial3Review.translation.content'),
        avatar: images.avatars.avatar3,
    },
];

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
        src: asset('gallery/' + 'gallery_1.jpeg'),
        alt: 'A serene Moroccan courtyard garden with a central fountain',
        width: 1200,
        height: 1400,
    },
    {
        id: '2',
        src: asset('gallery/' + 'gallery_2.jpeg'),
        alt: 'Traditional Moroccan tagine dish',
        width: 1200,
        height: 800,
    },
    {
        id: '3',
        src: asset('gallery/' + 'gallery_3.jpeg'),
        alt: 'Rooftop terrace at sunset with Atlas Mountains view',
        width: 1200,
        height: 1400,
    },
    {
        id: '4',
        src: asset('gallery/' + 'gallery_4.jpeg'),
        alt: 'Traditional Moroccan Hammam and spa',
        width: 1200,
        height: 1000,
    },
    {
        id: '5',
        src: asset('gallery/' + 'gallery_5.jpeg'),
        alt: 'Bustling Marrakech souk with colorful displays',
        width: 1200,
        height: 1000,
    },
    {
        id: '6',
        src: asset('gallery/' + 'gallery_6.jpeg'),
        alt: 'Moroccan hotel bedroom with traditional carved wooden bed',
        width: 1200,
        height: 1400,
    },
    {
        id: '7',
        src: asset('gallery/' + 'gallery_7.jpeg'),
        alt: 'Traditional Moroccan mint tea ceremony',
        width: 1200,
        height: 800,
    },
    {
        id: '8',
        src: asset('gallery/' + 'gallery_8.jpeg'),
        alt: 'Luxurious hotel spa treatment room',
        width: 1200,
        height: 1000,
    },
    {
        id: '9',
        src: asset('gallery/' + 'gallery_9.jpeg'),
        alt: 'Moroccan riad courtyard at night',
        width: 1200,
        height: 1400,
    },
    {
        id: '10',
        src: asset('gallery/' + 'gallery_10.jpeg'),
        alt: 'Hotel restaurant dining area',
        width: 1200,
        height: 1000,
    },
    {
        id: '11',
        src: asset('gallery/' + 'gallery_11.jpeg'),
        alt: 'Intricate Moroccan mosaic tilework',
        width: 1200,
        height: 800,
    },
    {
        id: '12',
        src: asset('gallery/' + 'gallery_12.jpeg'),
        alt: 'Hotel concierge desk',
        width: 1200,
        height: 1000,
    },
    {
        id: '13',
        src: asset('gallery/' + 'gallery_13.jpeg'),
        alt: 'Moroccan hotel balcony overlooking medina',
        width: 1200,
        height: 1400,
    },
    {
        id: '14',
        src: asset('gallery/' + 'gallery_14.jpeg'),
        alt: 'Traditional Moroccan carpet weaving',
        width: 1200,
        height: 1000,
    },
    {
        id: '15',
        src: asset('gallery/' + 'gallery_15.jpeg'),
        alt: 'Hotel fitness center',
        width: 1200,
        height: 800,
    },
    {
        id: '16',
        src: asset('gallery/' + 'gallery_16.jpeg'),
        alt: 'Moroccan hotel library',
        width: 1200,
        height: 1000,
    },
];

export const getExperienceSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('Slide1Category.translation.content') as SlideCategory,
        title: t('Slide1Title.translation.content'),
        description: [t('Slide1Description1.translation.content'), t('Slide1Description2.translation.content')],
        features: [
            t('Slide1Feature1.translation.content'),
            t('Slide1Feature2.translation.content'),
            t('Slide1Feature3.translation.content'),
            t('Slide1Feature4.translation.content'),
        ],
        images: {
            main: asset('home_sections/' + 'home_rooms_12.jpeg'),
            secondary: asset('home_sections/' + 'home_rooms_11.jpeg'),
        },
        link: '/rooms',
    },
    {
        id: 2,
        category: t('Slide2Category.translation.content') as SlideCategory,
        title: t('Slide2Title.translation.content'),
        description: [t('Slide2Description1.translation.content'), t('Slide2Description2.translation.content')],
        features: [
            t('Slide2Feature1.translation.content'),
            t('Slide2Feature2.translation.content'),
            t('Slide2Feature3.translation.content'),
        ],
        images: {
            main: asset('home_sections/' + 'home_restaurant.jpeg'),
            secondary: asset('home_sections/' + 'home_bars_11.jpeg'),
        },
        link: '/bars-restaurants',
    },
    {
        id: 3,
        category: t('Slide3Category.translation.content') as SlideCategory,
        title: t('Slide3Title.translation.content'),
        description: [t('Slide3Description1.translation.content'), t('Slide3Description2.translation.content')],
        features: [
            t('Slide3Feature1.translation.content'),
            t('Slide3Feature2.translation.content'),
            t('Slide3Feature3.translation.content'),
            t('Slide3Feature4.translation.content'),
        ],
        images: {
            main: asset('home_sections/' + 'home_pool.jpeg'),
            secondary: asset('home_sections/' + 'home_pool_4.jpeg'),
        },
        link: '/spa',
    },
    {
        id: 4,
        category: t('Slide4Category.translation.content') as SlideCategory,
        title: t('Slide4Title.translation.content'),
        description: [t('Slide4Description1.translation.content'), t('Slide4Description2.translation.content')],
        features: [
            t('Slide4Feature1.translation.content'),
            t('Slide4Feature2.translation.content'),
            t('Slide4Feature3.translation.content'),
            t('Slide4Feature4.translation.content'),
        ],
        images: {
            main: asset('home_sections/' + 'home_spa.jpeg'),
            secondary: asset('home_sections/' + 'home_spa_3.jpeg'),
        },
        link: '/spa',
    },
    {
        id: 5,
        category: t('Slide5Category.translation.content') as SlideCategory,
        title: t('Slide5Title.translation.content'),
        description: [t('Slide5Description1.translation.content'), t('Slide5Description2.translation.content')],
        features: [
            t('Slide5Feature1.translation.content'),
            t('Slide5Feature2.translation.content'),
            t('Slide5Feature3.translation.content'),
        ],
        images: {
            main: asset('home_sections/' + 'home_ambiance.jpeg'),
            secondary: asset('home_sections/' + 'home_bar_2.jpg'),
        },
        link: '/bars-restaurants',
    },
];

type GalleryItem = {
    id: string | number;
    src: string;
    alt: string;
    width: number;
    height: number;
};
