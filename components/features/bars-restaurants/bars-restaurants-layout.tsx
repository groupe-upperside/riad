import {galleryItems} from '@/lib/utils/gallery';

import {asset} from '@/lib/utils/asset';

import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import ExperiencesSlider from '@/components/features/home/experience-slider';
import {FacilityShowcase} from '@/components/common/facility-showcase';
import {getBarsAndRestaurantsSlides, getBarsData, getRestaurantsData} from '@/lib/constants/bars-restaurants';
import {SecondaryFacilityShowcase} from '@/components/common/secondary-facility-showcase';
import BookingBanner from '@/components/common/booking-banner';
import {getTranslations} from 'next-intl/server';

export default async function BarsRestaurantsLayout() {
    const t = await getTranslations('BarsRestaurantsPage');
    const tSlides = await getTranslations('Constants');
    const barsAndRestaurantsSlides = getBarsAndRestaurantsSlides(tSlides);
    const restaurantsData = getRestaurantsData(t);
    const barsData = getBarsData(t);

    const items: GalleryItem[] = galleryItems(
        t,
        [
            asset('bars/' + 'bars_gallery_1.jpeg'),
            asset('bars/' + 'bars_gallery_2.jpeg'),
            asset('bars/' + 'bars_gallery_3.jpeg'),
        ],
        true,
    );

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset('bars/' + 'bars_header_2.jpg')}
            />
            <ExperiencesSlider sliderContent={barsAndRestaurantsSlides} />
            <FacilityShowcase
                id="restaurants"
                title={t('RestaurantsTitle.translation.content')}
                subtitle={t('RestaurantsSubtitle.translation.content')}
                facilities={restaurantsData}
            />
            <SecondaryFacilityShowcase
                id="bars"
                title={t('BarsTitle.translation.content')}
                subtitle={t('BarsSubtitle.translation.content')}
                secondaryFacilities={barsData}
            />
            <RoomsGallerySection items={items} rounded />
            <BookingBanner
                namespace="RestaurantsCTA"
                buttonKey="ButtonReserveTable"
                href={'mailto:restauration@riadnashira.com'}
            />
        </>
    );
}
