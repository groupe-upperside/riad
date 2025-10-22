import HeroSection from "@/components/home/hero-section";
import AmenitiesBar from "@/components/home/amenities-bar";
import GalleryMasonry from "@/components/home/gallery";
import Testimonials from "@/components/home/testimonials";
import RoomsSuites from "@/components/home/room-suites";
import ActivitiesSlider from "@/components/home/activities-slider";
import AboutSection from "@/components/home/about";
import ExperiencesSlider from "@/components/home/experience-slider";
import {experienceSlides} from "@/lib/constants";


export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <AmenitiesBar/>
            <ExperiencesSlider sliderContent={experienceSlides}/>
            <AboutSection/>
            <RoomsSuites/>
            <ActivitiesSlider/>
            <Testimonials/>
            <GalleryMasonry/>
        </>
    )
}
