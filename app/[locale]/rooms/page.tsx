'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomCategoriesGrid from "@/components/rooms/rooms-categories";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsIntroduction from "@/components/rooms/rooms-introduction";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {FaBrush, FaHammer, FaLightbulb, FaPalette} from "react-icons/fa";
import {CTASection} from "@/components/common/CTA-section";
import {getRoomsCTA} from "@/components/rooms/rooms-cta-section";
import {useTranslations} from 'next-intl';

export default function RoomsPage() {
    const t = useTranslations('RoomsPage');
    const tConstant = useTranslations()

    const items: GalleryItem[] = [
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_gallery_1.jpeg',
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_gallery_2.jpeg',
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_gallery_3.jpeg',
            alt: t('GalleryItem3Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    const features: Feature[] = [
        { icon: FaPalette,    label: t('Feature1Label.translation.content') },
        { icon: FaLightbulb,  label: t('Feature2Label.translation.content') },
        { icon: FaHammer,     label: t('Feature3Label.translation.content') },
        { icon: FaBrush,      label: t('Feature4Label.translation.content') },
    ];

    const roomsCTA = getRoomsCTA(tConstant);

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_header.jpeg'}
            />
            <RoomsIntroduction/>
            <RoomCategoriesGrid/>
            <RoomFeatures
                id="room-features"
                title={t('FeaturesTitle.translation.content')}
                subtitle={t('FeaturesSubtitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={features}
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_features.jpeg'}
                imageAlt={t('FeaturesImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-[#F9F5F0]"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <RoomAmenities/>
            <RoomsGallerySection items={items} rounded />
            <CTASection {...roomsCTA} />
        </>
    )
}