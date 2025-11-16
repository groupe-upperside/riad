'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {FaCalendar, FaCheckCircle, FaCrown, FaExpand, FaHeart, FaStar, FaUser, FaUsers} from "react-icons/fa";
import {FaDiamond, FaLocationDot} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures from "@/components/rooms/rooms-features";
import PerfectForSection, {PerfectForItem} from "@/components/rooms/perfect-for-section";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";
import {useTranslations} from 'next-intl';

export default function SuitesPage() {
    const t = useTranslations('SuitesPage');

    const confortGalleryItems: GalleryItem[] = [
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/90ee5ab427-305e8d6f2ce0b90bd450.png",
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8c48eafdaa-0b4207e8945399016d15.png",
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ce00edbb79-75ece5ea27168dcddbdf.png",
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
            title: t('PerfectForLuxuryTitle.translation.content'),
            description: t('PerfectForLuxuryDescription.translation.content'),
        },
    ];

    const bullets: Bullet[] = [
        {icon: FaCheckCircle, label: t('BulletImmediate.translation.content')},
        {icon: FaCheckCircle, label: t('BulletCancellation.translation.content')},
        {icon: FaCheckCircle, label: t('BulletBestPrice.translation.content')},
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
            imageAlt: t('OtherRoomComfortImageAlt.translation.content'),
            meta: t('OtherRoomComfortMeta.translation.content'),
            title: t('OtherRoomComfortTitle.translation.content'),
            description: t('OtherRoomComfortDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/comfort",
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
                image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9c2af6dedf-4e1d2db8acbf899200a2.png"}
            />
            <OverviewSection
                id="suites-overview-section"
                badge={t('OverviewBadge.translation.content')}
                badgeToneClass="bg-brand-gold text-white"
                meta={t('OverviewMeta.translation.content')}
                title={t('OverviewTitle.translation.content')}
                paragraphs={[
                    t('OverviewParagraph1.translation.content'),
                    t('OverviewParagraph2.translation.content'),
                ]}
                facts={[
                    {icon: <FaUsers className="h-4 w-4"/>, label: t('FactCapacity.translation.content')},
                    {icon: <FaExpand className="h-4 w-4"/>, label: t('FactSize.translation.content')},
                    {icon: <FaLocationDot className="h-4 w-4"/>, label: t('FactTerrace.translation.content')},
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/954b102df9-45140dd4a93b11517a0b.png"
                imageAlt={t('OverviewImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded/>
            <RoomAmenities/>
            <RoomFeatures
                id="room-features-section"
                title={t('FeaturesTitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={[
                    {
                        icon: FaCrown,
                        label: t('Feature1Label.translation.content'),
                        description: t('Feature1Description.translation.content'),
                    },
                    {
                        icon: FaDiamond,
                        label: t('Feature2Label.translation.content'),
                        description: t('Feature2Description.translation.content'),
                    },
                    {
                        icon: FaStar,
                        label: t('Feature3Label.translation.content'),
                        description: t('Feature3Description.translation.content'),
                    },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/f0441a701a-b2c31e6e0db1583f2146.png"
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
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/072d875d2b-972eb328df761ae0b2fe.png"
                imageAlt={t('BookingCtaImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[400px]"
                imagePosition="right"
                bgClass="bg-brand-gold"
                textTone="light"
                accentClass="text-brand-gold"
            />
            <OtherRiadsSlider items={riads}/>
        </>
    )
}