import {relatedRooms} from '@/lib/constants/room-details';
import {galleryItems} from '@/lib/utils/gallery';
import type {RoomBookingAction as CtaAction} from '@/types/room-detail.type';
import RoomBookingCta from '@/components/features/rooms/room-booking-cta';
import {asset} from '@/lib/utils/asset';
import {BOOKING_URL} from '@/lib/constants/site';
import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import {FaConciergeBell, FaCrown, FaGem, FaHome, FaMedal, FaMountain, FaSpa, FaStar} from 'react-icons/fa';
import OverviewSection from '@/components/features/rooms/rooms-overview';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import RoomFeatures, {Feature} from '@/components/features/rooms/rooms-features';

import OtherRiadsSlider from '@/components/features/rooms/other-rooms-slider';
import {getTranslations} from 'next-intl/server';

export default async function SpecialSuitesPage() {
    const t = await getTranslations('SpecialSuitesPage');

    const confortGalleryItems: GalleryItem[] = galleryItems(t, [
        asset('special-suites/' + 'suites_gallery_1.jpeg'),
        asset('special-suites/' + 'suites_gallery_2.jpeg'),
        asset('special-suites/' + 'suites_gallery_3.jpeg'),
    ]);

    const actions: CtaAction[] = [
        {
            label: t('ActionBookRiner.translation.content'),
            href: BOOKING_URL,
            icon: FaMedal,
            variant: 'primary',
        },
        {
            label: t('ActionBookNashira.translation.content'),
            href: BOOKING_URL,
            icon: FaCrown,
            variant: 'outline',
        },
    ];

    const riads = relatedRooms(t, [
        {id: 'comfort-card', namespace: 'Comfort', image: 'deluxe/comfort_2_slider.jpeg', href: '/rooms/comfort'},
        {id: 'deluxes-card', namespace: 'Deluxe', image: 'comfort/deluxe_slider.jpeg', href: '/rooms/deluxe'},
        {id: 'suites-card', namespace: 'Suites', image: 'deluxe/suites_slider.jpeg', href: '/rooms/suites'},
    ]);

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
                image={asset('special-suites/' + 'suites_header.jpeg')}
            />
            <OverviewSection
                id="suites-riner-overview-section"
                badge={t('OverviewBadge.translation.content')}
                badgeToneClass="bg-brand-gold text-white"
                meta={t('OverviewMeta.translation.content')}
                title={t('OverviewTitle.translation.content')}
                paragraphs={[t('OverviewParagraph1.translation.content'), t('OverviewParagraph2.translation.content')]}
                imageSrc={asset('special-suites/' + 'suites_introduction.jpeg')}
                imageAlt={t('OverviewImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded />
            <RoomFeatures
                id="room-riner-features"
                title={t('RinerTitle.translation.content')}
                subtitle={t('RinerSubtitle.translation.content')}
                description={t('RinerDescription.translation.content')}
                features={rinerFeatures}
                imageSrc={asset('special-suites/' + 'suites_riner.jpeg')}
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
                imageSrc={asset('special-suites/' + 'suites_nashira.jpeg')}
                imageAlt={t('NashiraImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-brand-dark"
                textTone="light"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <RoomBookingCta
                namespace="SpecialSuitesPage"
                image={asset('special-suites/' + 'suites_riner.jpg')}
                actions={actions}
            />
            <OtherRiadsSlider items={riads} />
        </>
    );
}
