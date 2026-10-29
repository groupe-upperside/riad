import {galleryItems} from '@/lib/utils/gallery';

import {asset} from '@/lib/utils/asset';

import {getActivitiesSlides, getOtherActivitiesData} from '@/lib/constants/activities';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import ExperiencesSlider from '@/components/features/home/experience-slider';
import ActivitiesShowcase from '@/components/features/activities/activities-showcase';
import {getTranslations} from 'next-intl/server';

export default async function ActivitiesLayout() {
    const t = await getTranslations('ActivitiesPage');

    const otherActivitiesData = getOtherActivitiesData(t);

    const tConstant = await getTranslations('Constants');
    const activitiesSlides = getActivitiesSlides(tConstant);
    const items: GalleryItem[] = galleryItems(
        t,
        [
            asset('activities/' + 'activities_gallery_2.jpg'),
            asset('activities/' + 'activities_gallery_1.jpeg'),
            asset('activities/' + 'activities_gallery_3.jpg'),
        ],
        true,
    );

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset('activities/' + 'activities_header.jpeg')}
            />
            <ExperiencesSlider sliderContent={activitiesSlides} />
            <ActivitiesShowcase
                spaces={otherActivitiesData}
                title={t('ActivitiesTitle.translation.content')}
                subtitle={t('ActivitiesSubtitle.translation.content')}
            />
            <RoomsGallerySection items={items} rounded className="bg-white" />
        </>
    );
}
