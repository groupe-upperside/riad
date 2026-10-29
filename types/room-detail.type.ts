import type {ComponentType} from 'react';

export type RoomBullet = {icon?: ComponentType<{className?: string}>; label: string};
export type RoomBookingAction = {
    label: string;
    href: string;
    icon?: ComponentType<{className?: string}>;
    variant?: 'primary' | 'outline';
};
export type RelatedRoom = {
    id: string;
    imageSrc: string;
    imageAlt: string;
    meta: string;
    title: string;
    description: string;
    ctaLabel?: string;
    href?: string;
};
export type RelatedRoomSource = {
    id: string;
    namespace: 'Comfort' | 'Deluxe' | 'Suites' | 'Special';
    image: string;
    href: string;
};
