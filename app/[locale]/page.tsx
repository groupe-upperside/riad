"use client"

import HeroSection from "@/components/home/hero-section";
import AmenitiesBar from "@/components/home/amenities-bar";
import GalleryMasonry from "@/components/home/gallery";
import Testimonials from "@/components/home/testimonials";
import RoomsSuites from "@/components/home/room-suites";
import ActivitiesSlider from "@/components/home/activities-slider";
import AboutSection from "@/components/home/about";
import ExperiencesSlider from "@/components/home/experience-slider";
import {getExperienceSlides} from "@/lib/constants";
import {useTranslations} from "next-intl";


export default function HomePage() {
    const t = useTranslations('ExperiencesSlider');

    const sliderContent = getExperienceSlides(t);
    return (
        <>
            <HeroSection/>
            <AmenitiesBar/>
            <ExperiencesSlider sliderContent={sliderContent}/>
            <AboutSection/>
            <RoomsSuites/>
            <ActivitiesSlider/>
            <Testimonials/>
            <GalleryMasonry/>
        </>
    )
}
