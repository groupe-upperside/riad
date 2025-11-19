"use client"

import {getRestaurantsCTA} from "@/components/common/booking-cta";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {getBarsAndRestaurantsSlides, getBarsData, getRestaurantsData} from "@/lib/constants";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import {CTASection} from "@/components/common/CTA-section";
import {useTranslations} from "next-intl";

export default function BarsRestaurantsLayout() {
    const t = useTranslations("BarsRestaurantsPage");
    const constantsT = useTranslations("RestaurantsCTA");
    const restaurantsCTA = getRestaurantsCTA(constantsT);
    const tSlides = useTranslations('Constants');
    const barsAndRestaurantsSlides = getBarsAndRestaurantsSlides(tSlides);
    const restaurantsData = getRestaurantsData(t);
    const barsData = getBarsData(t);

    const items: GalleryItem[] = [
        {
            src:process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_gallery_1.jpeg',
            alt: t("GalleryItem1Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_gallery_2.jpeg',
            alt: t("GalleryItem2Alt.translation.content"),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_gallery_3.jpeg',
            alt: t("GalleryItem3Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    return (
        <>
            <RoomsHeroSection
                subtitle={t("HeroSubtitle.translation.content")}
                title={t("HeroTitle.translation.content")}
                image={
                    process.env.NEXT_PUBLIC_CDN_URL + 'bars/' + 'bars_header_2.jpg'
                }
            />
            <ExperiencesSlider sliderContent={barsAndRestaurantsSlides} />
            <FacilityShowcase
                id="restaurants"
                title={t("RestaurantsTitle.translation.content")}
                subtitle={t("RestaurantsSubtitle.translation.content")}
                facilities={restaurantsData}
            />
            <SecondaryFacilityShowcase
                id="bars"
                title={t("BarsTitle.translation.content")}
                subtitle={t("BarsSubtitle.translation.content")}
                secondaryFacilities={barsData}
            />
            <RoomsGallerySection items={items} rounded />
            <CTASection {...restaurantsCTA} />
        </>
    );
}