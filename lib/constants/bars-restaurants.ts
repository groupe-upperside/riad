import {asset} from '@/lib/utils/asset';
import type {Facility} from '@/types/facility.type';
import type {SecondaryFacility} from '@/types/facility.type';

import type {Slide} from '@/types/experience.type';

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
            main: asset('bars/' + 'bars_slider_1.jpeg'),
            secondary: asset('bars/' + 'bars_slider_2.jpeg'),
        },
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
            main: asset('bars/' + 'bars_slider_4.jpeg'),
            secondary: asset('bars/' + 'bars_slider_3.jpeg'),
        },
    },
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
        image: asset('bars/' + 'bars_introduction.jpg'),
        imageAlt: t('RestaurantsNourImageAlt.translation.content'),
        icon: 'FaUtensils',
        menuText: t('RestaurantsMenuText.translation.content'),
        reservationText: t('RestaurantsReservationText.translation.content'),
        menuLink: asset('/menus/nour.pdf'),
        reservationLink: 'mailto:restauration@riadnashira.com?subject=Réservation Nour',
        phone: '+212 (0) 524.39.06.03',
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
        image: asset('bars/' + 'bars_introduction_3.jpg'),
        imageAlt: t('RestaurantsRiveImageAlt.translation.content'),
        icon: 'FaFish',
        menuText: t('RestaurantsMenuText.translation.content'),
        reservationText: t('RestaurantsReservationText.translation.content'),
        menuLink: asset('/menus/rive.pdf'),
        reservationLink: 'mailto:restauration@riadnashira.com?subject=Réservation Rive',
        phone: '+212 (0) 524.39.06.03',
    },
];

export const getBarsData = (t: (key: string) => string): SecondaryFacility[] => [
    {
        id: 'rinlip-bar',
        name: t('BarsRinlipName.translation.content'),
        description: t('BarsRinlipDescription.translation.content'),
        image: asset('bars/' + 'bars_rinlip.jpg'),
        imageAlt: t('BarsRinlipImageAlt.translation.content'),
    },
    {
        id: 'rooftop-rinlip',
        name: t('BarsRooftopName.translation.content'),
        description: t('BarsRooftopDescription.translation.content'),
        image: asset('bars/' + 'bars_rooftop.jpg'),
        imageAlt: t('BarsRooftopImageAlt.translation.content'),
    },
];
