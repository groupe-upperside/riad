"use client"

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {EventsIntroduction} from "@/components/rooms/rooms-introduction";
import {EventSpacesDetailed} from "@/components/events/events-view";
import {ServicesIncluded} from "@/components/events/services-inluded";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {useTranslations} from "next-intl";

const items: GalleryItem[] = [
    {
        src: process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_gallery_1.jpg',
        alt: "Close-up of a luxurious Moroccan bedroom detail, showing a carved wooden nightstand, elegant lamp, and rich textiles, moody lighting",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src:process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_gallery_2.jpg',
        alt: "Elegant Moroccan bedroom with a four-poster bed, dark wood paneling, and sophisticated decor, warm and intimate",
        colSpan: 2,
        rowSpan: 2,
        priority: true,
    },
    {
        src:process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'event_gallery_3.jpeg',
        alt: "Comfortable seating area in a Moroccan riad with colorful patterned cushions against a backdrop of intricate zellige tiles, vibrant and detailed",
        colSpan: 1,
        rowSpan: 1,
    },
];

export default function EventsLayout() {
    const t = useTranslations('EventsPage');
    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_header.jpeg'}
            />
            <EventsIntroduction />
            <EventSpacesDetailed />
            <ServicesIncluded />
            <RoomsGallerySection items={items} rounded className={"bg-white"}/>
        </>
    )
}