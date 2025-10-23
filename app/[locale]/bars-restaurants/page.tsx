import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {barsAndRestaurantsSlides, barsData, restaurantsData} from "@/lib/constants";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import {CTASection} from "@/components/common/CTA-section";
import {restaurantsCTA} from "@/components/common/booking-cta";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";

const items: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/925b1db0bb-8ae59c63c6dcd46c5865.png",
        alt: "Interior of a luxurious Moroccan restaurant with intricate tilework, hanging lanterns, plush seating, and a warm, inviting ambiance, authentic decor",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b70eac3837-41486d2a6f64cbfb3242.png",
        alt: "Elegant Moroccan bedroom with a four-poster bed, dark wood paneling, and sophisticated decor, warm and intimate",
        colSpan: 2,
        rowSpan: 2,
        priority: true,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f49c5a3e37-bec3436e20f016a5e417.png",
        alt: "Comfortable seating area in a Moroccan riad with colorful patterned cushions against a backdrop of intricate zellige tiles, vibrant and detailed",
        colSpan: 1,
        rowSpan: 1,
    },
];

export default function BarsRestaurantsPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Une invitation à un voyage sensoriel inoubliable, où chaque saveur raconte une histoire."
                              title="Gastronomie & Cocktails"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9ffe227a17-c390c05fd6b3b180c57c.png"}/>
            <ExperiencesSlider sliderContent={barsAndRestaurantsSlides}/>
            <FacilityShowcase
                id="restaurants"
                title="Nos Restaurants"
                subtitle="Deux destinations culinaires pour une immersion complète dans les saveurs marocaines et méditerranéennes."
                facilities={restaurantsData}
            />
            <SecondaryFacilityShowcase
                id="bars"
                title="Nos Bars"
                subtitle="Deux ambiances distinctes, un même esprit convivial, pour savourer des cocktails créatifs et des moments de détente inoubliables."
                secondaryFacilities={barsData}
            />
            <RoomsGallerySection items={items} rounded />
            <CTASection {...restaurantsCTA} />
        </>
    )}