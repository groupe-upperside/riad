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
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/925b1db0bb-8ae59c63c6dcd46c5865.png",
            alt: t("GalleryItem1Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b70eac3837-41486d2a6f64cbfb3242.png",
            alt: t("GalleryItem2Alt.translation.content"),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f49c5a3e37-bec3436e20f016a5e417.png",
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
                    "https://storage.googleapis.com/uxpilot-auth.appspot.com/9ffe227a17-c390c05fd6b3b180c57c.png"
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