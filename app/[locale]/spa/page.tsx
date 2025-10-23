import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import ExperiencesSlider from "@/components/home/experience-slider";
import {fitnessData, spaData, spaSlides} from "@/lib/constants";
import {FacilityShowcase} from "@/components/common/facility-showcase";
import {SecondaryFacilityShowcase} from "@/components/common/secondary-facility-showcase";
import {CTASection} from "@/components/common/CTA-section";
import {spaCTA} from "@/components/common/booking-cta";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {FeatureItem, FeatureShowcase, FeatureShowcaseImage} from "@/components/common/feature-showcase";

const items: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c089dca217-3a27a0cc05bcbe64b5b9.png",
        alt: "Close-up of a luxurious Moroccan bedroom detail, showing a carved wooden nightstand, elegant lamp, and rich textiles, moody lighting",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fa6a98b30e-098ad1353861b1d43e3d.png",
        alt: "Elegant Moroccan bedroom with a four-poster bed, dark wood paneling, and sophisticated decor, warm and intimate",
        colSpan: 2,
        rowSpan: 2,
        priority: true,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6a2ae5f694-e509340f023df548f5e4.png",
        alt: "Comfortable seating area in a Moroccan riad with colorful patterned cushions against a backdrop of intricate zellige tiles, vibrant and detailed",
        colSpan: 1,
        rowSpan: 1,
    },
];

const poolsFeatures: FeatureItem[] = [
    {
        id: 'pool-item-rooftop',
        title: 'Piscine Rooftop',
        description: 'La piscine rooftop, au sommet du riad parfaite pour se détendre au soleil et contempler l’Atlas et la Médina. Idéale aussi pour déguster un cocktail.'
    },
    {
        id: 'pool-item-patio',
        title: 'Piscine extérieure',
        description: 'La piscine extérieure, nichée dans un patio, idéale pour se rafraichir et faire quelques longueurs et profiter de l’atmosphère du riad.'
    },
    {
        id: 'pool-item-indoor',
        title: 'Piscine Intérieure Chauffée',
        description: 'La piscine intérieure chauffée, un cocon de bien–être accessible toute l’année.'
    }
];

const poolsImages: FeatureShowcaseImage[] = [
    {
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/d3387085e4-4deb9cb8e79193578bc8.png',
        alt: 'stunning rooftop infinity pool at a luxury Moroccan riad',
        span: 'double' // This image takes full width (2 columns)
    },
    {
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/187e0b9e99-7c09947ff759f8669bd7.png',
        alt: 'serene indoor heated pool in a Moroccan spa',
        span: 'single' // Takes 1 column
    },
    {
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/2c572fd2ec-f9e7ecedb31ec7b51955.png',
        alt: 'beautiful courtyard pool in a Moroccan riad',
        span: 'single' // Takes 1 column
    }
];

export default function SpaPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Une parenthèse de détente et d’équilibre au Riad Nashira et Spa."
                              title="Spa & Bien-être"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/0fe39abce0-497a549a4cecfd8d9f4a.png"}/>
            <ExperiencesSlider sliderContent={spaSlides}/>
            <FacilityShowcase
                id="spa"
                title="Une évasion sensorielle"
                subtitle="Le spa du Riad Nashira est un havre de paix dédié à votre bien-être. Inspiré des rituels de beauté marocains ancestraux, notre espace vous propose une expérience holistique unique. Laissez-vous envelopper par la chaleur du hammam, plongez dans nos piscines rafraîchissantes et abandonnez-vous aux mains expertes de nos thérapeutes pour un moment de pure félicité."
                facilities={spaData}
            />
            <FeatureShowcase
                id="pools"
                label="Espaces Aquatiques"
                title="Trois Piscines, Trois Ambiances"
                description='Le Riad Nashira offre une rareté à Marrakech : trois piscines, dont deux chauffées et pensées pour les différents moments de la journée.'
                features={poolsFeatures}
                images={poolsImages}
                backgroundColor="bg-white"
            />
            <SecondaryFacilityShowcase
                id="fitness"
                title="Fitness & énergie sur le rooftop"
                subtitle="Personnalisez votre expérience bien-être avec nos services de coaching personnel et séances de yoga adaptées à tous les niveaux."
                secondaryFacilities={fitnessData}
                bgWhite={false}
            />
            <RoomsGallerySection items={items} rounded className={"bg-white"}/>
            <CTASection {...spaCTA} />
        </>
    )}