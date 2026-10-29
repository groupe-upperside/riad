import {asset} from '@/lib/utils/asset';
import type {Slide} from '@/types/experience.type';

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
            secondary: asset('activities/' + 'activities_slider_1.jpeg'),
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/11c079ca96-699a5154a3fc4a4286f0.png',
        },
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
            main: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b8927524b2-a48d98923a544bed8973.png',
            secondary: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c27f84a6af-bc8129bd50aa1ba899aa.png',
        },
    },
];

export const getOtherActivitiesData = (t: (key: string) => string) => [
    {
        id: 'desert-excursion-card',
        title: t('OtherActivitiesDesertTitle.translation.content'),
        description: t('OtherActivitiesDesertDescription.translation.content'),
        image: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/bf8d658fa1-3c567cdec2565ebf0bcf.png',
            alt: t('OtherActivitiesDesertImageAlt.translation.content'),
        },
    },
    {
        id: 'horse-riding-card',
        title: t('OtherActivitiesHorseRidingTitle.translation.content'),
        description: t('OtherActivitiesHorseRidingDescription.translation.content'),
        image: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ff0f2f42a8-7a4347d908e14d14d959.png',
            alt: t('OtherActivitiesHorseRidingImageAlt.translation.content'),
        },
    },
    {
        id: 'essaouira-card',
        title: t('OtherActivitiesEssaouiraTitle.translation.content'),
        description: t('OtherActivitiesEssaouiraDescription.translation.content'),
        image: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e8114fc3cb-1700b859c31688cf5b27.png',
            alt: t('OtherActivitiesEssaouiraImageAlt.translation.content'),
        },
    },
    {
        id: 'cooking-class-card',
        title: t('OtherActivitiesCookingTitle.translation.content'),
        description: t('OtherActivitiesCookingDescription.translation.content'),
        image: {
            src: asset('activities/' + 'activities_cooking.jpeg'),
            alt: t('OtherActivitiesCookingImageAlt.translation.content'),
        },
    },
    {
        id: 'medina-tour-card',
        title: t('OtherActivitiesMedinaTitle.translation.content'),
        description: t('OtherActivitiesMedinaDescription.translation.content'),
        image: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/673726ac87-ba0c37d34e4547597665.png',
            alt: t('OtherActivitiesMedinaImageAlt.translation.content'),
        },
    },
    {
        id: 'atlas-mountains-card',
        title: t('OtherActivitiesAtlasTitle.translation.content'),
        description: t('OtherActivitiesAtlasDescription.translation.content'),
        image: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/37793ac69d-275b036d343274fa9974.png',
            alt: t('OtherActivitiesAtlasImageAlt.translation.content'),
        },
    },
];
