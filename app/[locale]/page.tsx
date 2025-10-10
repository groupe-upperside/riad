import HeroSection from "@/components/sections/hero-section";
import AmenitiesBar from "@/components/sections/amenities-bar";
import GalleryMasonry from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import RoomsSuites from "@/components/sections/room-suites";
import ActivitiesSlider from "@/components/sections/activities-slider";
import AboutSection from "@/components/sections/about";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";


export default function HomePage() {
    return (
        <main>
            <Header />
            <HeroSection />
            <AmenitiesBar />
            <AboutSection />
            <RoomsSuites />
            <ActivitiesSlider />
            <Testimonials />
            <GalleryMasonry />
            <Footer />
        </main>
    )
}
