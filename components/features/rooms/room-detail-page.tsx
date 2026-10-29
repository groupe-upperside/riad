import {galleryItems} from '@/lib/utils/gallery';
import {ROOM_DETAILS, relatedRooms} from '@/lib/constants/room-details';
import RoomBookingCta from '@/components/features/rooms/room-booking-cta';
import {asset} from '@/lib/utils/asset';

import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import {FaExpand, FaHeart, FaStar, FaUser, FaUsers} from 'react-icons/fa';
import {FaLocationDot} from 'react-icons/fa6';
import OverviewSection from '@/components/features/rooms/rooms-overview';
import RoomAmenities from '@/components/features/rooms/rooms-amenities';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';

import RoomFeatures from '@/components/features/rooms/rooms-features';
import PerfectForSection, {PerfectForItem} from '@/components/features/rooms/perfect-for-section';

import OtherRiadsSlider from '@/components/features/rooms/other-rooms-slider';
import {getTranslations} from 'next-intl/server';

export default async function RoomDetailPage({room}: {room: keyof typeof ROOM_DETAILS}) {
    const config = ROOM_DETAILS[room];
    const t = await getTranslations(config.namespace);

    const confortGalleryItems = galleryItems(
        t,
        config.gallery.map((file) => asset(`${config.folder}/${file}`)),
    );

    const items: PerfectForItem[] = [
        {
            id: 'couple-stay',
            icon: FaHeart,
            title: t('PerfectForCoupleTitle.translation.content'),
            description: t('PerfectForCoupleDescription.translation.content'),
        },
        {
            id: 'solo-travel',
            icon: FaUser,
            title: t('PerfectForSoloTitle.translation.content'),
            description: t('PerfectForSoloDescription.translation.content'),
        },
        {
            id: 'authentic-experience',
            icon: FaStar,
            title: t(`PerfectFor${config.perfectFor}Title.translation.content`),
            description: t(`PerfectFor${config.perfectFor}Description.translation.content`),
        },
    ];

    const riads = relatedRooms(t, config.related);

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset(`${config.folder}/${config.folder}_header.jpeg`)}
            />
            <OverviewSection
                id={config.overviewId}
                badge={t('OverviewBadge.translation.content')}
                badgeToneClass="bg-brand-gold text-white"
                meta={t('OverviewMeta.translation.content')}
                title={t('OverviewTitle.translation.content')}
                paragraphs={[t('OverviewParagraph1.translation.content'), t('OverviewParagraph2.translation.content')]}
                facts={[
                    {icon: <FaUsers className="h-4 w-4" />, label: t('FactCapacity.translation.content')},
                    {icon: <FaExpand className="h-4 w-4" />, label: t('FactSize.translation.content')},
                    {
                        icon: <FaLocationDot className="h-4 w-4" />,
                        label: t(`${config.locationKey}.translation.content`),
                    },
                ]}
                imageSrc={asset(`${config.folder}/${config.introduction}`)}
                imageAlt={t('OverviewImageAlt.translation.content')}
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded />
            <RoomAmenities />
            <RoomFeatures
                id="room-features-section"
                title={t('FeaturesTitle.translation.content')}
                description={t('FeaturesDescription.translation.content')}
                features={config.featureIcons.map((icon, index) => ({
                    icon,
                    label: t(`Feature${index + 1}Label.translation.content`),
                    description: t(`Feature${index + 1}Description.translation.content`),
                }))}
                imageSrc={asset(`${config.folder}/${config.featureImage}`)}
                imageAlt={t('FeaturesImageAlt.translation.content')}
                imagePriority
                bgClass="bg-brand-dark"
                accentClass="text-brand-gold"
                textTone="light"
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
            <RoomBookingCta namespace={config.namespace} image={asset(`${config.folder}/${config.ctaImage}`)} />
            <OtherRiadsSlider items={riads} />
        </>
    );
}
