'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomCategoriesGrid from "@/components/rooms/rooms-categories";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import {PatioViews} from "@/components/rooms/rooms-patio-view";
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
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/27efb571a6-bfb5549702fe34d5cc45.png",
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/7a6eb71fb4-fbb2cfff33f63bb0a351.png",
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f49c5a3e37-bec3436e20f016a5e417.png",
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
                image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/528ecabd16-5b28210d28f530c83c2d.png"}
            />
            <RoomsIntroduction/>
            <RoomCategoriesGrid/>
            <RoomFeatures
                id="room-features"
                title={t('FeaturesTitle.translation.content')}
                subtitle={t('FeaturesSubtitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={features}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/2b319d51f8-bdd709bd88a137ae9b34.png"
                imageAlt={t('FeaturesImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-white"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <PatioViews/>
            <RoomAmenities/>
            <RoomsGallerySection items={items} rounded />
            <CTASection {...roomsCTA} />
        </>
    )
}