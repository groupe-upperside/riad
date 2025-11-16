'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {
    FaCalendar,
    FaCheckCircle,
    FaExpand,
    FaHammer,
    FaHeart,
    FaPalette,
    FaStar,
    FaUser,
    FaUsers
} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures from "@/components/rooms/rooms-features";
import PerfectForSection, {PerfectForItem} from "@/components/rooms/perfect-for-section";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";
import {useTranslations} from 'next-intl';

export default function ComfortPage() {
    const t = useTranslations('ComfortPage');

    const confortGalleryItems: GalleryItem[] = [
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/9571959619-cc22f503e6583057876d.png",
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/437bbed603-2018053487a323de0180.png",
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/acf79a0003-0321473a3521e240497e.png",
            alt: t('GalleryItem3Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    const items: PerfectForItem[] = [
        {
            id: "couple-stay",
            icon: FaHeart,
            title: t('PerfectForCoupleTitle.translation.content'),
            description: t('PerfectForCoupleDescription.translation.content'),
        },
        {
            id: "solo-travel",
            icon: FaUser,
            title: t('PerfectForSoloTitle.translation.content'),
            description: t('PerfectForSoloDescription.translation.content'),
        },
        {
            id: "authentic-experience",
            icon: FaStar,
            title: t('PerfectForAuthenticTitle.translation.content'),
            description: t('PerfectForAuthenticDescription.translation.content'),
        },
    ];

    const bullets: Bullet[] = [
        { icon: FaCheckCircle, label: t('BulletImmediate.translation.content') },
        { icon: FaCheckCircle, label: t('BulletCancellation.translation.content') },
        { icon: FaCheckCircle, label: t('BulletBestPrice.translation.content') },
    ];

    const actions: CtaAction[] = [
        {
            label: t('ActionBookNow.translation.content'),
            href: "/booking",
            icon: FaCalendar,
            variant: "primary"
        }
    ];

    const riads: RiadCard[] = [
        {
            id: "deluxes-card",
            imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/933ab16edf-4753b6bbdb49d5859196.png",
            imageAlt: t('OtherRoomDeluxeImageAlt.translation.content'),
            meta: t('OtherRoomDeluxeMeta.translation.content'),
            title: t('OtherRoomDeluxeTitle.translation.content'),
            description: t('OtherRoomDeluxeDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/deluxe",
        },
        {
            id: "suites-card",
            imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e6fb9a6e07-c31d7466bc3063c3ed84.png",
            imageAlt: t('OtherRoomSuitesImageAlt.translation.content'),
            meta: t('OtherRoomSuitesMeta.translation.content'),
            title: t('OtherRoomSuitesTitle.translation.content'),
            description: t('OtherRoomSuitesDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/suites",
        },
        {
            id: "suites-speciales-card",
            imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/933ab16edf-4753b6bbdb49d5859196.png",
            imageAlt: t('OtherRoomSpecialImageAlt.translation.content'),
            meta: t('OtherRoomSpecialMeta.translation.content'),
            title: t('OtherRoomSpecialTitle.translation.content'),
            description: t('OtherRoomSpecialDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/special-suites",
        },
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/65044f8887-a01d2336709dbbf2c5ef.png"}
            />
            <OverviewSection
                id="confort-overview-section"
                badge={t('OverviewBadge.translation.content')}
                badgeToneClass="bg-brand-gold text-white"
                meta={t('OverviewMeta.translation.content')}
                title={t('OverviewTitle.translation.content')}
                paragraphs={[
                    t('OverviewParagraph1.translation.content'),
                    t('OverviewParagraph2.translation.content'),
                ]}
                facts={[
                    { icon: <FaUsers className="h-4 w-4" />, label: t('FactCapacity.translation.content') },
                    { icon: <FaExpand className="h-4 w-4" />, label: t('FactSize.translation.content') },
                    { icon: <FaLocationDot className="h-4 w-4" />, label: t('FactLocation.translation.content') },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/6b8b83c359-cf2cdeb3e6cc0f82226a.png"
                imageAlt={t('OverviewImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded />
            <RoomAmenities/>
            <RoomFeatures
                id="room-features-section"
                title={t('FeaturesTitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={[
                    {
                        icon: FaPalette,
                        label: t('Feature1Label.translation.content'),
                        description: t('Feature1Description.translation.content'),
                    },
                    {
                        icon: FaHammer,
                        label: t('Feature2Label.translation.content'),
                        description: t('Feature2Description.translation.content'),
                    },
                    {
                        icon: FaHeart,
                        label: t('Feature3Label.translation.content'),
                        description: t('Feature3Description.translation.content'),
                    },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/89c6091dde-d38904cd3df458dbb94a.png"
                imageAlt={t('FeaturesImageAlt.translation.content')}
                imagePriority
                bgClass="bg-brand-dark"
                accentClass="text-brand-gold"
                textTone='light'
                imagePosition="left"
                featuresColumns={1}
            />
            <PerfectForSection
                title={t('PerfectForTitle.translation.content')}
                intro={t('PerfectForIntro.translation.content')}
                items={items}
                bgClass="bg-brand-beige"
                cardBgClass="bg-white"
                accentClass="bg-brand-gold text-white"
                textTitleClass="text-brand-dark"
                textBodyClass="text-base text-brand-gray-500"
                columns={3}
                iconSizeClass="text-2xl"
            />
            <BookingCtaSection
                title={t('BookingCtaTitle.translation.content')}
                subtitle={t('BookingCtaSubtitle.translation.content')}
                bullets={bullets}
                actions={actions}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/3c5cbf24fc-15885a8ed29fc8749ad5.png"
                imageAlt={t('BookingCtaImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[400px]"
                imagePosition="right"
                bgClass="bg-brand-gold"
                textTone="light"
                accentClass="text-brand-gold"
            />
            <OtherRiadsSlider items={riads} />
        </>
    )
}