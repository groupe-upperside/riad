import {BOOKING_URL} from '@/lib/constants/site';
import {galleryItems} from '@/lib/utils/gallery';
import {asset} from '@/lib/utils/asset';
import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import RoomCategoriesGrid from '@/components/features/rooms/rooms-categories';
import RoomFeatures, {Feature} from '@/components/features/rooms/rooms-features';
import RoomAmenities from '@/components/features/rooms/rooms-amenities';
import RoomsIntroduction from '@/components/features/rooms/rooms-introduction';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import {FaBrush, FaHammer, FaLightbulb, FaPalette} from 'react-icons/fa';
import BookingBanner from '@/components/common/booking-banner';
import {getTranslations} from 'next-intl/server';

export default async function RoomsPage() {
    const t = await getTranslations('RoomsPage');

    const items: GalleryItem[] = galleryItems(
        t,
        [
            asset('rooms/' + 'rooms_gallery_1.jpeg'),
            asset('rooms/' + 'rooms_gallery_5.jpeg'),
            asset('rooms/' + 'rooms_gallery_4.jpeg'),
        ],
        true,
    );

    const features: Feature[] = [
        {icon: FaPalette, label: t('Feature1Label.translation.content')},
        {icon: FaLightbulb, label: t('Feature2Label.translation.content')},
        {icon: FaHammer, label: t('Feature3Label.translation.content')},
        {icon: FaBrush, label: t('Feature4Label.translation.content')},
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset('rooms/' + 'rooms_header.jpeg')}
            />
            <RoomsIntroduction />
            <RoomCategoriesGrid />
            <RoomFeatures
                id="room-features"
                title={t('FeaturesTitle.translation.content')}
                subtitle={t('FeaturesSubtitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={features}
                imageSrc={asset('rooms/' + 'rooms_features.jpeg')}
                imageAlt={t('FeaturesImageAlt.translation.content')}
                imagePriority
                imagePosition="right"
                bgClass="bg-[#F9F5F0]"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <RoomAmenities />
            <RoomsGallerySection items={items} rounded />
            <BookingBanner namespace="RoomsCTA" buttonKey="ButtonBookNow" href={BOOKING_URL} />
        </>
    );
}
