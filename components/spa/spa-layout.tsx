"use client";

import {useTranslations} from "next-intl";
import {getSpaCTA} from "@/components/common/booking-cta";
import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {fitnessData, getSpaData, getSpaSlides} from "@/lib/constants";
import {FeatureItem, FeatureShowcase, FeatureShowcaseImage} from "@/components/common/feature-showcase";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {CTASection} from "@/components/common/CTA-section";

export default function SpaLayout() {
    const t = useTranslations('SpaPage');
    const tConstant = useTranslations("Constants")
    const tCta = useTranslations("SpaPage")
    const spaCTA = getSpaCTA(tCta);
    const spaSlides = getSpaSlides(tConstant)
    const spaData = getSpaData(t);
    const items: GalleryItem[] = [
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_gallery_1.jpg',
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_gallery_2.jpg',
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_gallery_3.jpg',
            alt: t('GalleryItem3Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

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
        }
    ];

    const poolsImages: FeatureShowcaseImage[] = [
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_pools_1.jpg',
            alt: t('PoolsImage1Alt.translation.content'),
            span: 'double'
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_pools_2.jpg',
            alt: t('PoolsImage2Alt.translation.content'),
            span: 'single'
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_pools_3.jpg',
            alt: t('PoolsImage3Alt.translation.content'),
            span: 'single'
        }
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={process.env.NEXT_PUBLIC_CDN_URL + 'spa/' + 'spa_header.jpeg'}
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
            <SecondaryFacilityShowcase
                id="fitness"
                title={t('FitnessTitle.translation.content')}
                subtitle={t('FitnessSubtitle.translation.content')}
                secondaryFacilities={fitnessData}
                bgWhite={false}
            />
            <RoomsGallerySection items={items} rounded className="bg-white" />
            <CTASection {...spaCTA} />
        </>
    );
}
