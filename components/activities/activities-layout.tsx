"use client"

import {getActivitiesSlides, getOtherActivitiesData} from "@/lib/constants";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import ActivitiesShowcase from "@/components/activities/activities-showcase";
import {useTranslations} from "next-intl";

export default function ActivitiesLayout() {
    const t =useTranslations("ActivitiesPage");

    const otherActivitiesData = getOtherActivitiesData(t);

    const tConstant = useTranslations("Constants")
    const activitiesSlides = getActivitiesSlides(tConstant)
    const items: GalleryItem[] = [
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c089dca217-3a27a0cc05bcbe64b5b9.png",
            alt: t("GalleryItem1Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fa6a98b30e-098ad1353861b1d43e3d.png",
            alt: t("GalleryItem2Alt.translation.content"),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6a2ae5f694-e509340f023df548f5e4.png",
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
                    "https://storage.googleapis.com/uxpilot-auth.appspot.com/92e2273a04-fa6f75627272bce3ff9e.png"
                }
            />
            <ExperiencesSlider sliderContent={activitiesSlides} />
            <ActivitiesShowcase
                spaces={otherActivitiesData}
                title={t("ActivitiesTitle.translation.content")}
                subtitle={t("ActivitiesSubtitle.translation.content")}
            />
            <RoomsGallerySection items={items} rounded className="bg-white" />
        </>
    );
}
