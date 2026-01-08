'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {
    FaCheckCircle,
    FaConciergeBell,
    FaCrown,
    FaGem,
    FaHome,
    FaMedal,
    FaMountain,
    FaSpa,
    FaStar
} from "react-icons/fa";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";
import {useTranslations} from 'next-intl';

export default function SpecialSuitesPage() {
    const t = useTranslations('SpecialSuitesPage');

    const confortGalleryItems: GalleryItem[] = [
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_gallery_1.jpeg',
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_gallery_2.jpeg',
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_gallery_3.jpeg',
            alt: t('GalleryItem3Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    const bullets: Bullet[] = [
        {icon: FaCheckCircle, label: t('BulletImmediate.translation.content')},
        {icon: FaCheckCircle, label: t('BulletCancellation.translation.content')},
        {icon: FaCheckCircle, label: t('BulletBestPrice.translation.content')},
    ];

    const actions: CtaAction[] = [
        {
            label: t('ActionBookRiner.translation.content'),
            href: "https://riad-nashira-spa.hotelrunner.com/bv3/search",
            icon: FaMedal,
            variant: "primary"
        },
        {
            label: t('ActionBookNashira.translation.content'),
            href: "https://riad-nashira-spa.hotelrunner.com/bv3/search",
            icon: FaCrown,
            variant: "outline"
        }
    ];

    const riads: RiadCard[] = [
        {
            id: "comfort-card",
            imageSrc: process.env.NEXT_PUBLIC_CDN_URL + 'deluxe/' + 'comfort_2_slider.jpeg',
            imageAlt: t('OtherRoomComfortImageAlt.translation.content'),
            meta: t('OtherRoomComfortMeta.translation.content'),
            title: t('OtherRoomComfortTitle.translation.content'),
            description: t('OtherRoomComfortDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/comfort",
        },
        {
            id: "deluxes-card",
            imageSrc:  process.env.NEXT_PUBLIC_CDN_URL + 'comfort/' + 'deluxe_slider.jpeg',
            imageAlt: t('OtherRoomDeluxeImageAlt.translation.content'),
            meta: t('OtherRoomDeluxeMeta.translation.content'),
            title: t('OtherRoomDeluxeTitle.translation.content'),
            description: t('OtherRoomDeluxeDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/deluxe",
        },
        {
            id: "suites-card",
            imageSrc: process.env.NEXT_PUBLIC_CDN_URL + 'deluxe/' + 'suites_slider.jpeg',
            imageAlt: t('OtherRoomSuitesImageAlt.translation.content'),
            meta: t('OtherRoomSuitesMeta.translation.content'),
            title: t('OtherRoomSuitesTitle.translation.content'),
            description: t('OtherRoomSuitesDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/suites",
        },
    ];

    const rinerFeatures: Feature[] = [
        {icon: FaMedal, label: t('RinerFeature1Label.translation.content')},
        {icon: FaCrown, label: t('RinerFeature2Label.translation.content')},
        {icon: FaSpa, label: t('RinerFeature3Label.translation.content')},
        {icon: FaMountain, label: t('RinerFeature4Label.translation.content')},
    ];

    const nashiraFeatures: Feature[] = [
        {icon: FaGem, label: t('NashiraFeature1Label.translation.content')},
        {icon: FaHome, label: t('NashiraFeature2Label.translation.content')},
        {icon: FaConciergeBell, label: t('NashiraFeature3Label.translation.content')},
        {icon: FaStar, label: t('NashiraFeature4Label.translation.content')},
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_header.jpeg'}
            />
            <OverviewSection
                id="suites-riner-overview-section"
                badge={t('OverviewBadge.translation.content')}
                badgeToneClass="bg-brand-gold text-white"
                meta={t('OverviewMeta.translation.content')}
                title={t('OverviewTitle.translation.content')}
                paragraphs={[
                    t('OverviewParagraph1.translation.content'),
                    t('OverviewParagraph2.translation.content'),
                ]}
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_introduction.jpeg'}
                imageAlt={t('OverviewImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded/>
            <RoomFeatures
                id="room-riner-features"
                title={t('RinerTitle.translation.content')}
                subtitle={t('RinerSubtitle.translation.content')}
                description={t('RinerDescription.translation.content')}
                features={rinerFeatures}
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_riner.jpeg'}
                imageAlt={t('RinerImageAlt.translation.content')}
                imagePriority
                imagePosition="left"
                bgClass="bg-white"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <RoomFeatures
                id="room-nashira-features"
                title={t('NashiraTitle.translation.content')}
                subtitle={t('NashiraSubtitle.translation.content')}
                description={t('NashiraDescription.translation.content')}
                features={nashiraFeatures}
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_nashira.jpeg'}
                imageAlt={t('NashiraImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-brand-dark"
                textTone="light"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <BookingCtaSection
                title={t('BookingCtaTitle.translation.content')}
                subtitle={t('BookingCtaSubtitle.translation.content')}
                bullets={bullets}
                actions={actions}
                imageSrc={process.env.NEXT_PUBLIC_CDN_URL + 'special-suites/' + 'suites_riner.jpg'}
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