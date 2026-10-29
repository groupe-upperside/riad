import type {routing} from '@/lib/i18n/routing';

export type SlideCategory =
    | 'HÉBERGEMENTS'
    | 'ÉVÉNEMENTS PRIVÉS'
    | 'EXCLUSIVITÉ TOTALE'
    | 'ÉVÉNEMENTS PROFESSIONNELS'
    | 'GASTRONOMIE'
    | 'AVENTURE EXTRÊME'
    | 'SPORT DE PRESTIGE'
    | 'DÉTENTE'
    | 'BIEN-ÊTRE & SPA'
    | 'AMBIANCE'
    | 'MIXOLOGIE'
    | 'MOMENTS PRÉCIEUX';

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
    link?: keyof typeof routing.pathnames;
}
