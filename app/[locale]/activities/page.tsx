import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {activitiesSlides, otherActivitiesData} from "@/lib/constants";
import ExperiencesSlider from "@/components/home/experience-slider";
import ActivitiesShowcase from "@/components/activities/activities-showcase";

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


export default function ActivitiesPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Un cadre unique pour vos plus beaux moments."
                              title="Événements & Privatisation"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/92e2273a04-fa6f75627272bce3ff9e.png"}/>
            <ExperiencesSlider sliderContent={activitiesSlides}/>
            <ActivitiesShowcase spaces={otherActivitiesData} title="Autres Activités" subtitle="Une sélection d'expériences authentiques pour enrichir votre séjour marocain."/>
            <RoomsGallerySection items={items} rounded className={"bg-white"}/>
        </>
    )
}