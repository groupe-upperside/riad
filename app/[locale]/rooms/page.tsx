import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomCategoriesGrid from "@/components/rooms/rooms-categories";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import PatioViews from "@/components/rooms/rooms-patio-view";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsIntroduction from "@/components/rooms/rooms-introduction";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import {FaBrush, FaHammer, FaLightbulb, FaPalette} from "react-icons/fa";
import {CTASection} from "@/components/common/CTA-section";
import {roomsCTA} from "@/components/rooms/rooms-cta-section";

const items: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/27efb571a6-bfb5549702fe34d5cc45.png",
        alt: "Close-up of a luxurious Moroccan bedroom detail, showing a carved wooden nightstand, elegant lamp, and rich textiles, moody lighting",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/7a6eb71fb4-fbb2cfff33f63bb0a351.png",
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

const features: Feature[] = [
    { icon: FaPalette,    label: "Harmonies de couleurs" },
    { icon: FaLightbulb,  label: "Jeux de lumière" },
    { icon: FaHammer,     label: "Artisanat marocain" },
    { icon: FaBrush,      label: "Design contemporain" },
];

export default function RoomsPage() {
    return (
        <>
            <RoomsHeroSection subtitle="17 chambres et suites uniques, chacune avec une atmosphère singulière"
                              title="Nos Hébergements"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/528ecabd16-5b28210d28f530c83c2d.png"}/>
            <RoomsIntroduction/>
            <RoomCategoriesGrid/>
            <RoomFeatures
                id="room-features"
                title="Chaque Chambre, Un Univers Unique"
                subtitle="SIGNATURE ESTHÉTIQUE"
                description="Nos chambres se distinguent par leurs harmonies de couleurs uniques, leurs jeux de lumière soigneusement étudiés et le dialogue subtil entre design contemporain et artisanat marocain traditionnel."
                features={features}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/2b319d51f8-bdd709bd88a137ae9b34.png"
                imageAlt="Artisanat marocain"
                imagePriority
                imagePosition="right"
                bgClass="bg-white"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <PatioViews/>
            <RoomAmenities/>
            <RoomsGallerySection items={items} rounded />
            <CTASection {...roomsCTA} />
        </>
    )
}