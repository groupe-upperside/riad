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
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c089dca217-3a27a0cc05bcbe64b5b9.png",
            alt: t('GalleryItem1Alt.translation.content'),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fa6a98b30e-098ad1353861b1d43e3d.png",
            alt: t('GalleryItem2Alt.translation.content'),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6a2ae5f694-e509340f023df548f5e4.png",
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
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d3387085e4-4deb9cb8e79193578bc8.png',
            alt: t('PoolsImage1Alt.translation.content'),
            span: 'double'
        },
        {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/187e0b9e99-7c09947ff759f8669bd7.png',
            alt: t('PoolsImage2Alt.translation.content'),
            span: 'single'
        },
        {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2c572fd2ec-f9e7ecedb31ec7b51955.png',
            alt: t('PoolsImage3Alt.translation.content'),
            span: 'single'
        }
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t('HeroSubtitle.translation.content')}
                title={t('HeroTitle.translation.content')}
                image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/0fe39abce0-497a549a4cecfd8d9f4a.png"}
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
