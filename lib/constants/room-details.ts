import {FaCrown, FaHammer, FaHeart, FaPalette, FaStar} from 'react-icons/fa';
import {FaDiamond} from 'react-icons/fa6';
import type {IconType} from 'react-icons';
import type {RelatedRoom, RelatedRoomSource} from '@/types/room-detail.type';
import {asset} from '@/lib/utils/asset';

interface StandardRoomConfig {
    namespace: 'ComfortPage' | 'DeluxePage' | 'SuitesPage';
    folder: string;
    overviewId: string;
    gallery: readonly [string, string, string];
    introduction: string;
    featureImage: string;
    ctaImage: string;
    locationKey: 'FactLocation' | 'FactTerrace';
    perfectFor: 'Authentic' | 'Luxury';
    featureIcons: readonly IconType[];
    related: readonly RelatedRoomSource[];
}

export const ROOM_DETAILS = {
    comfort: {
        namespace: 'ComfortPage',
        folder: 'comfort',
        overviewId: 'confort-overview-section',
        gallery: ['comfort_gallery_1.jpeg', 'comfort_gallery_3.jpg', 'comfort_gallery_5.jpeg'],
        introduction: 'comfort_introduction.jpg',
        featureImage: 'comfort_features.jpg',
        ctaImage: 'comfort_features_2.jpeg',
        locationKey: 'FactLocation',
        perfectFor: 'Authentic',
        featureIcons: [FaPalette, FaHammer, FaHeart],
        related: [
            {id: 'deluxes-card', namespace: 'Deluxe', image: 'comfort/deluxe_slider.jpeg', href: '/rooms/deluxe'},
            {id: 'suites-card', namespace: 'Suites', image: 'comfort/suites_slider.jpeg', href: '/rooms/suites'},
            {
                id: 'suites-speciales-card',
                namespace: 'Special',
                image: 'comfort/nashira_slider.jpeg',
                href: '/rooms/special-suites',
            },
        ],
    },
    deluxe: {
        namespace: 'DeluxePage',
        folder: 'deluxe',
        overviewId: 'deluxe-overview-section',
        gallery: ['deluxe_gallery_1.jpeg', 'deluxe_gallery_2.jpeg', 'deluxe_gallery_3.jpeg'],
        introduction: 'deluxe_introduction.jpeg',
        featureImage: 'deluxe_features.jpeg',
        ctaImage: 'deluxe_cta.jpeg',
        locationKey: 'FactTerrace',
        perfectFor: 'Luxury',
        featureIcons: [FaCrown, FaDiamond, FaStar],
        related: [
            {id: 'comfort-card', namespace: 'Comfort', image: 'deluxe/comfort_2_slider.jpeg', href: '/rooms/comfort'},
            {id: 'suites-card', namespace: 'Suites', image: 'deluxe/suites_slider.jpeg', href: '/rooms/suites'},
            {
                id: 'suites-speciales-card',
                namespace: 'Special',
                image: 'deluxe/nashira_slider.jpeg',
                href: '/rooms/special-suites',
            },
        ],
    },
    suites: {
        namespace: 'SuitesPage',
        folder: 'suites',
        overviewId: 'suites-overview-section',
        gallery: ['suites_gallery_1.jpeg', 'suites_gallery_2.jpeg', 'suites_gallery_3.jpeg'],
        introduction: 'suites_introduction.jpeg',
        featureImage: 'suites_features.jpeg',
        ctaImage: 'suites_cta.jpeg',
        locationKey: 'FactTerrace',
        perfectFor: 'Luxury',
        featureIcons: [FaCrown, FaDiamond, FaStar],
        related: [
            {id: 'deluxes-card', namespace: 'Deluxe', image: 'suites/deluxe_slider.jpeg', href: '/rooms/deluxe'},
            {id: 'comfort-card', namespace: 'Comfort', image: 'suites/comfort_2_slider.jpeg', href: '/rooms/comfort'},
            {
                id: 'suites-speciales-card',
                namespace: 'Special',
                image: 'suites/nashira_slider.jpeg',
                href: '/rooms/special-suites',
            },
        ],
    },
} as const satisfies Record<string, StandardRoomConfig>;

export function relatedRooms(t: (key: string) => string, sources: readonly RelatedRoomSource[]): RelatedRoom[] {
    return sources.map(({id, namespace, image, href}) => ({
        id,
        href,
        imageSrc: asset(image),
        imageAlt: t(`OtherRoom${namespace}ImageAlt.translation.content`),
        meta: t(`OtherRoom${namespace}Meta.translation.content`),
        title: t(`OtherRoom${namespace}Title.translation.content`),
        description: t(`OtherRoom${namespace}Description.translation.content`),
        ctaLabel: t('OtherRoomCtaLabel.translation.content'),
    }));
}
