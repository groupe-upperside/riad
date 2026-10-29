import {asset} from '@/lib/utils/asset';

import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import EventsIntroduction from '@/components/features/events/events-introduction';
import {EventSpacesDetailed} from '@/components/features/events/events-view';
import {ServicesIncluded} from '@/components/features/events/services-inluded';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import {getTranslations} from 'next-intl/server';

const items: GalleryItem[] = [
    {
        src: asset('events/' + 'events_gallery_1.jpg'),
        alt: 'Close-up of a luxurious Moroccan bedroom detail, showing a carved wooden nightstand, elegant lamp, and rich textiles, moody lighting',
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: asset('events/' + 'events_gallery_2.jpg'),
        alt: 'Elegant Moroccan bedroom with a four-poster bed, dark wood paneling, and sophisticated decor, warm and intimate',
        colSpan: 2,
        rowSpan: 2,
        priority: true,
    },
    {
        src: asset('events/' + 'event_gallery_3.jpeg'),
        alt: 'Comfortable seating area in a Moroccan riad with colorful patterned cushions against a backdrop of intricate zellige tiles, vibrant and detailed',
        colSpan: 1,
        rowSpan: 1,
    },
];

export default async function EventsLayout() {
    const t = await getTranslations('EventsPage');
    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset('events/' + 'events_header.jpeg')}
            />
            <EventsIntroduction />
            <EventSpacesDetailed />
            <ServicesIncluded />
            <RoomsGallerySection items={items} rounded className={'bg-white'} />
        </>
    );
}
