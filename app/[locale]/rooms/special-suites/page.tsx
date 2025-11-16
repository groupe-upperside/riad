'use client'

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {
    FaCheckCircle,
    FaConciergeBell,
    FaCrown,
    FaDumbbell,
    FaExpand,
    FaGem,
    FaHome,
    FaHotTub,
    FaMedal,
    FaMountain,
    FaSpa,
    FaStar,
    FaUsers
} from "react-icons/fa";
import {FaLocationDot, FaUpDownLeftRight} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";
import SuiteFeaturesSection, {SuiteFeatureItem} from "@/components/rooms/suite-features";
import {useTranslations} from 'next-intl';

export default function SpecialSuitesPage() {
    const t = useTranslations('SpecialSuitesPage');

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

    const bullets: Bullet[] = [
        {icon: FaCheckCircle, label: t('BulletImmediate.translation.content')},
        {icon: FaCheckCircle, label: t('BulletCancellation.translation.content')},
        {icon: FaCheckCircle, label: t('BulletBestPrice.translation.content')},
    ];

    const actions: CtaAction[] = [
        {
            label: t('ActionBookRiner.translation.content'),
            href: "/booking",
            icon: FaMedal,
            variant: "primary"
        },
        {
            label: t('ActionBookNashira.translation.content'),
            href: "/booking",
            icon: FaCrown,
            variant: "outline"
        }
    ];

    const riads: RiadCard[] = [
        {
            id: "comfort-card",
            imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6b8b83c359-dad4974c3cc4d2c74a06.png",
            imageAlt: t('OtherRoomComfortImageAlt.translation.content'),
            meta: t('OtherRoomComfortMeta.translation.content'),
            title: t('OtherRoomComfortTitle.translation.content'),
            description: t('OtherRoomComfortDescription.translation.content'),
            ctaLabel: t('OtherRoomCtaLabel.translation.content'),
            href: "/rooms/comfort",
        },
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

    const rinerSuiteFeatures: SuiteFeatureItem[] = [
        {
            id: "riner-space",
            icon: FaUpDownLeftRight,
            title: t('RinerSuiteFeature1Title.translation.content'),
            description: t('RinerSuiteFeature1Description.translation.content'),
        },
        {
            id: "riner-theme",
            icon: FaDumbbell,
            title: t('RinerSuiteFeature2Title.translation.content'),
            description: t('RinerSuiteFeature2Description.translation.content'),
        },
        {
            id: "riner-spa",
            icon: FaHotTub,
            title: t('RinerSuiteFeature3Title.translation.content'),
            description: t('RinerSuiteFeature3Description.translation.content'),
        },
    ];

    const nashiraSuiteFeatures: SuiteFeatureItem[] = [
        {
            id: "nashira-space",
            icon: FaUpDownLeftRight,
            title: t('NashiraSuiteFeature1Title.translation.content'),
            description: t('NashiraSuiteFeature1Description.translation.content'),
        },
        {
            id: "nashira-theme",
            icon: FaDumbbell,
            title: t('NashiraSuiteFeature2Title.translation.content'),
            description: t('NashiraSuiteFeature2Description.translation.content'),
        },
        {
            id: "nashira-spa",
            icon: FaHotTub,
            title: t('NashiraSuiteFeature3Title.translation.content'),
            description: t('NashiraSuiteFeature3Description.translation.content'),
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
                id="suites-riner-overview-section"
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
                    {icon: <FaLocationDot className="h-4 w-4"/>, label: t('FactLounge.translation.content')},
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/954b102df9-45140dd4a93b11517a0b.png"
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
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/6d1482e77c-7f210c8db8908548d1ad.png"
                imageAlt={t('RinerImageAlt.translation.content')}
                imagePriority
                imagePosition="left"
                bgClass="bg-white"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <SuiteFeaturesSection
                id="riner-features"
                title={t('RinerFeaturesTitle.translation.content')}
                items={rinerSuiteFeatures}
                bgClass="bg-brand-beige"
                cardBgClass="bg-white"
                titleClass="text-brand-dark"
                bodyClass="text-brand-gray"
                iconClass="text-brand-gold text-4xl"
                columns={3}
                rounded
            />
            <RoomFeatures
                id="room-nashira-features"
                title={t('NashiraTitle.translation.content')}
                subtitle={t('NashiraSubtitle.translation.content')}
                description={t('NashiraDescription.translation.content')}
                features={nashiraFeatures}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/acb4ebc0a0-3ed38b744976512362a4.png"
                imageAlt={t('NashiraImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-brand-dark"
                textTone="light"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <SuiteFeaturesSection
                id="nashira-features"
                title={t('NashiraFeaturesTitle.translation.content')}
                items={nashiraSuiteFeatures}
                bgClass="bg-white"
                cardBgClass="bg-brand-beige"
                titleClass="text-brand-dark"
                bodyClass="text-brand-gray"
                iconClass="text-brand-gold text-4xl"
                columns={3}
                rounded
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