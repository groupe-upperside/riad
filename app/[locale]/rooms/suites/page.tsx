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
            src: process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_gallery_1.jpeg',
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_gallery_2.jpeg',
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_gallery_3.jpeg',
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
            href: "https://riad-nashira-spa.hotelrunner.com/bv3/search",
            icon: FaCalendar,
            variant: "primary"
        }
    ];

    const riads: RiadCard[] = [
        {
            id: "deluxes-card",
            imageSrc: process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'deluxe_slider.jpeg',
            imageAlt: t('OtherRoomDeluxeImageAlt.translation.content'),
            meta: t('OtherRoomDeluxeMeta.translation.content'),
            title: t('OtherRoomDeluxeTitle.translation.content'),
            description: t('OtherRoomDeluxeDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/deluxe",
        },
        {
            id: "comfort-card",
            imageSrc: process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'comfort_2_slider.jpeg',
            imageAlt: t('OtherRoomComfortImageAlt.translation.content'),
            meta: t('OtherRoomComfortMeta.translation.content'),
            title: t('OtherRoomComfortTitle.translation.content'),
            description: t('OtherRoomComfortDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/comfort",
        },
        {
            id: "suites-speciales-card",
            imageSrc:process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'nashira_slider.jpeg',
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
                image={process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_header.jpeg'}
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
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_introduction.jpeg'}
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
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_features.jpeg'}
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
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'suites/' + 'suites_cta.jpeg'}
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