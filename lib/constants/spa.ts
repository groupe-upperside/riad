import {asset} from '@/lib/utils/asset';
import type {Facility} from '@/types/facility.type';
import type {SecondaryFacility} from '@/types/facility.type';

import type {Slide} from '@/types/experience.type';

export const getSpaData = (t: (key: string) => string): Facility[] => [
    {
        id: 'spa',
        category: t('SpaCategory.translation.content'),
        name: t('SpaName.translation.content'),
        description: [t('SpaDescription1.translation.content'), t('SpaDescription2.translation.content')],
        image: asset('spa/' + 'spa_features_1.jpg'),
        imageAlt: t('SpaImageAlt.translation.content'),
        menuText: t('SpaMenuText.translation.content'),
        reservationText: t('SpaReservationText.translation.content'),
        menuLink: asset('/menus/spa_new.pdf'),
        reservationLink: 'mailto:spa@riadnashira.com',
    },
    {
        id: 'hammam',
        category: t('HammamCategory.translation.content'),
        name: t('HammamName.translation.content'),
        description: [t('HammamDescription1.translation.content'), t('HammamDescription2.translation.content')],
        image: asset('spa/' + 'spa_features_2.jpg'),
        imageAlt: t('HammamImageAlt.translation.content'),
    },
];

export const getMedispaData = (t: (key: string) => string): Facility => ({
    id: 'medispa',
    category: t('MedispaCategory.translation.content'),
    name: t('MedispaName.translation.content'),
    description: [
        t('MedispaDescription1.translation.content'),
        t('MedispaDescription2.translation.content'),
        t('MedispaDescription3.translation.content'),
        t('MedispaDescription4.translation.content'),
    ],
    image: asset('spa/atp.png'),
    imageAlt: t('MedispaImageAlt.translation.content'),
});

export const fitnessData: SecondaryFacility[] = [
    {
        id: 'fitness',
        name: 'Fitness',
        description:
            'Pour ceux qui souhaitent allier voyage et équilibre, le rooftop du riad accueille un espace fitness moderne baigné de lumière et ouvert sur les toits de Marrakech. Un cadre insolite pour s’entrainer en toute tranquilité.',
        image: asset('spa/' + 'spa_fitness.jpg'),
        imageAlt:
            'Cozy and sophisticated speakeasy bar with dark wood paneling, leather armchairs, a glowing bar with premium spirits, and intimate lighting, classic style',
    },
    {
        id: 'yoga',
        name: 'Coach & Yoga',
        description: 'Un coach personnalisé, des cours de yoga peuvent aussi être proposés sur demande.',
        image: asset('spa/' + 'spa_coach.jpg'),
        imageAlt:
            'Stunning rooftop bar in Marrakech at sunset, with panoramic views of the Atlas mountains, stylish lounge furniture, infinity pool, and vibrant ambiance',
    },
];

export const getSpaSlides = (t: (key: string) => string): Slide[] => [
    {
        id: 1,
        category: t('SpaSlides1Category.translation.content'),
        title: t('SpaSlides1Title.translation.content'),
        description: [t('SpaSlides1Description1.translation.content'), t('SpaSlides1Description2.translation.content')],
        features: [
            t('SpaSlides1Feature1.translation.content'),
            t('SpaSlides1Feature2.translation.content'),
            t('SpaSlides1Feature3.translation.content'),
            t('SpaSlides1Feature4.translation.content'),
        ],
        images: {
            main: asset('spa/' + 'spa_slider_1.jpeg'),
            secondary: asset('spa/' + 'spa_slider_2.jpeg'),
        },
    },
    {
        id: 2,
        category: t('SpaSlides2Category.translation.content'),
        title: t('SpaSlides2Title.translation.content'),
        description: [t('SpaSlides2Description1.translation.content'), t('SpaSlides2Description2.translation.content')],
        features: [
            t('SpaSlides2Feature1.translation.content'),
            t('SpaSlides2Feature2.translation.content'),
            t('SpaSlides2Feature3.translation.content'),
            t('SpaSlides2Feature4.translation.content'),
        ],
        images: {
            main: asset('spa/' + 'spa_slider_3.jpg'),
            secondary: asset('spa/' + 'spa_slider_4.jpg'),
        },
    },
];
