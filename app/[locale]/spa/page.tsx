import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {fitnessData, spaData, spaSlides} from "@/lib/constants";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import {CTASection} from "@/components/common/CTA-section";
import {spaCTA} from "@/components/common/booking-cta";

export default function SpaPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Une parenthèse de détente et d’équilibre au Riad Nashira et Spa."
                              title="Spa & Bien-être"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/0fe39abce0-497a549a4cecfd8d9f4a.png"}/>
            <ExperiencesSlider sliderContent={spaSlides}/>
            <FacilityShowcase
                title="Une évasion sensorielle"
                subtitle="Le spa du Riad Nashira est un havre de paix dédié à votre bien-être. Inspiré des rituels de beauté marocains ancestraux, notre espace vous propose une expérience holistique unique. Laissez-vous envelopper par la chaleur du hammam, plongez dans nos piscines rafraîchissantes et abandonnez-vous aux mains expertes de nos thérapeutes pour un moment de pure félicité."
                facilities={spaData}
            />
            <SecondaryFacilityShowcase
                title="Fitness & énergie sur le rooftop"
                subtitle="Personnalisez votre expérience bien-être avec nos services de coaching personnel et séances de yoga adaptées à tous les niveaux."
                secondaryFacilities={fitnessData}
            />
            <CTASection {...spaCTA} />
        </>
    )}