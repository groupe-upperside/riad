import {galleryItems} from '@/lib/utils/gallery';

import {asset} from '@/lib/utils/asset';

import {getTranslations} from 'next-intl/server';
import RoomsHeroSection from '@/components/features/rooms/rooms-hero-section';
import ExperiencesSlider from '@/components/features/home/experience-slider';
import {FacilityShowcase} from '@/components/common/facility-showcase';
import {FacilityCard} from '@/components/common/facility-card';
import {fitnessData, getMedispaData, getSpaData, getSpaSlides} from '@/lib/constants/spa';
import {FeatureItem, FeatureShowcase, FeatureShowcaseImage} from '@/components/common/feature-showcase';
import {SecondaryFacilityShowcase} from '@/components/common/secondary-facility-showcase';
import RoomsGallerySection from '@/components/features/rooms/rooms-gallery';
import type {GalleryItem} from '@/types/gallery.type';
import BookingBanner from '@/components/common/booking-banner';

export default async function SpaLayout() {
    const t = await getTranslations('SpaPage');
    const tConstant = await getTranslations('Constants');
    const spaSlides = getSpaSlides(tConstant);
    const spaData = getSpaData(t);
    const medispaData = getMedispaData(t);
    const items: GalleryItem[] = galleryItems(
        t,
        [asset('spa/' + 'spa_gallery_1.jpg'), asset('spa/' + 'spa_gallery_2.jpg'), asset('spa/' + 'spa_gallery_3.jpg')],
        true,
    );

    const poolsFeatures: FeatureItem[] = [
        {
            id: 'pool-item-rooftop',
            title: t('PoolsFeatureRooftopTitle.translation.content'),
            description: t('PoolsFeatureRooftopDescription.translation.content'),
        },
        {
            id: 'pool-item-patio',
            title: t('PoolsFeaturePatioTitle.translation.content'),
            description: t('PoolsFeaturePatioDescription.translation.content'),
        },
        {
            id: 'pool-item-indoor',
            title: t('PoolsFeatureIndoorTitle.translation.content'),
            description: t('PoolsFeatureIndoorDescription.translation.content'),
        },
    ];

    const poolsImages: FeatureShowcaseImage[] = [
        {
            src: asset('spa/' + 'spa_pools_1.jpg'),
            alt: t('PoolsImage1Alt.translation.content'),
            span: 'double',
        },
        {
            src: asset('spa/' + 'spa_pools_2.jpg'),
            alt: t('PoolsImage2Alt.translation.content'),
            span: 'single',
        },
        {
            src: asset('spa/' + 'spa_pools_3_new.jpg'),
            alt: t('PoolsImage3Alt.translation.content'),
            span: 'single',
        },
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={asset('spa/' + 'spa_header.jpeg')}
            />
            <ExperiencesSlider sliderContent={spaSlides} />
            <FacilityShowcase
                id="spa"
                title={t('SpaFacilityTitle.translation.content')}
                subtitle={t('SpaFacilitySubtitle.translation.content')}
                facilities={spaData}
            />
            <FeatureShowcase
                id="pools"
                label={t('PoolsLabel.translation.content')}
                title={t('PoolsTitle.translation.content')}
                description={t('PoolsDescription.translation.content')}
                features={poolsFeatures}
                images={poolsImages}
                backgroundColor="bg-white"
            />
            <section className="py-24 bg-brand-beige-100" id="medispa">
                <div className="container mx-auto px-4">
                    <FacilityCard facility={medispaData} index={0} imageRight />
                </div>
            </section>
            <SecondaryFacilityShowcase
                id="fitness"
                title={t('FitnessTitle.translation.content')}
                subtitle={t('FitnessSubtitle.translation.content')}
                secondaryFacilities={fitnessData}
            />
            <RoomsGallerySection items={items} rounded className="bg-brand-beige-100" />
            <BookingBanner namespace="SpaPage" buttonKey="ButtonReserveTreatment" href={'mailto:spa@riadnashira.com'} />
        </>
    );
}
