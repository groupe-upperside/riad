import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {barsAndRestaurantsSlides, barsData, restaurantsData} from "@/lib/constants";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import {CTASection} from "@/components/common/CTA-section";
import {restaurantsCTA} from "@/components/common/booking-cta";

export default function BarsRestaurantsPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Une invitation à un voyage sensoriel inoubliable, où chaque saveur raconte une histoire."
                              title="Gastronomie & Cocktails"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9ffe227a17-c390c05fd6b3b180c57c.png"}/>
            <ExperiencesSlider sliderContent={barsAndRestaurantsSlides}/>
            <FacilityShowcase
                title="Nos Restaurants"
                subtitle="Deux destinations culinaires pour une immersion complète dans les saveurs marocaines et méditerranéennes."
                facilities={restaurantsData}
            />
            <SecondaryFacilityShowcase
                title="Nos Bars"
                subtitle="Deux ambiances distinctes, un même esprit convivial, pour savourer des cocktails créatifs et des moments de détente inoubliables."
                secondaryFacilities={barsData}
            />
            <CTASection {...restaurantsCTA} />
        </>
    )}