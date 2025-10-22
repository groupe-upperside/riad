import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {
    FaCalendar,
    FaCheckCircle,
    FaExpand,
    FaHammer,
    FaHeart,
    FaPalette,
    FaStar,
    FaUser,
    FaUsers
} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures from "@/components/rooms/rooms-features";
import PerfectForSection, {PerfectForItem} from "@/components/rooms/perfect-for-section";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";

const confortGalleryItems: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/9571959619-cc22f503e6583057876d.png",
        alt: "Moroccan comfort room bedroom area with traditional bed, warm textiles, carved wood headboard, soft lighting, cozy atmosphere",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/437bbed603-2018053487a323de0180.png",
        alt: "Traditional Moroccan tadelakt bathroom with Italian shower, natural stone, warm lighting, luxury hotel amenities",
        colSpan: 2,
        rowSpan: 2,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/acf79a0003-0321473a3521e240497e.png",
        alt: "Intimate seating area in Moroccan comfort room with traditional cushions, low table, warm ambiance, authentic decor",
        colSpan: 1,
        rowSpan: 1,
    },
];

const items: PerfectForItem[] = [
    {
        id: "couple-stay",
        icon: FaHeart,
        title: "Séjour en Couple",
        description:
            "Atmosphère romantique et intime, parfaite pour une escapade à deux dans un cadre authentique et chaleureux au cœur de la Médina.",
    },
    {
        id: "solo-travel",
        icon: FaUser,
        title: "Voyage Solo",
        description:
            "Espace personnel idéal pour la réflexion et la détente, offrant tout le confort nécessaire pour un séjour en solo enrichissant et reposant.",
    },
    {
        id: "authentic-experience",
        icon: FaStar,
        title: "Expérience Authentique",
        description:
            "Immersion totale dans l'art de vivre marocain, avec un excellent rapport qualité-prix pour découvrir le charme du Riad Nashira.",
    },
];

const bullets: Bullet[] = [
    { icon: FaCheckCircle, label: "Réservation immédiate" },
    { icon: FaCheckCircle, label: "Annulation gratuite" },
    { icon: FaCheckCircle, label: "Meilleur prix garanti" },
];

const actions: CtaAction[] = [
    { label: "RÉSERVER MAINTENANT", href: "/reservation", icon: FaCalendar, variant: "primary" }
];

const riads: RiadCard[] = [
    {
        id: "deluxes-card",
        imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/933ab16edf-4753b6bbdb49d5859196.png",
        imageAlt:
            "Dark and moody interior of a premier Moroccan riad suite, with intricate latticework, plush armchairs, and atmospheric lighting, sophisticated style",
        meta: "30–42 M² | 9 CHAMBRES DELUXE",
        title: "Deluxe",
        description:
            "Avec leurs 30 à 42 m², nos chambres Deluxe marient un confort généreux à l’authenticité marocaine. "
            + "Boiseries finement sculptées, matières nobles et palette chaleureuse composent une atmosphère apaisante, "
            + "idéale pour se détendre après une journée dans la Médina. Chaque détail a été pensé pour offrir de l’espace, "
            + "de la douceur et une élégance discrète, entre modernité et artisanat.",
        ctaLabel: "Découvrir",
        href: "/riads/deluxes",
    },
    {
        id: "suites-card",
        imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e6fb9a6e07-c31d7466bc3063c3ed84.png",
        imageAlt:
            "Rooftop dining setup at a Moroccan riad at dusk, with candlelight, white tablecloth, and city views, romantic and exclusive",
        meta: "45–60 M² | 3 SUITES",
        title: "Suites",
        description:
            "De 45 à 60 m², nos Suites privilégient l’espace et la lumière pour sublimer l’élégance des lieux. "
            + "Les volumes harmonieux, le mobilier sur mesure et les textures raffinées créent un cocon haut de gamme "
            + "où l’on savoure un véritable sentiment de liberté. Parfaites pour un séjour prolongé, elles conjuguent "
            + "intimité, confort contemporain et sens du détail.",
        ctaLabel: "Découvrir",
        href: "/riads/suites",
    },
    {
        id: "suites-speciales-card",
        imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/933ab16edf-4753b6bbdb49d5859196.png",
        imageAlt:
            "Dark and moody interior of a premier Moroccan riad suite, with intricate latticework, plush armchairs, and atmospheric lighting, sophisticated style",
        meta: "60–90 M² | 2 SUITES SPÉCIALES",
        title: "Suites Spéciales",
        description:
            "Comprises entre 60 et 90 m², nos Suites Spéciales portent une signature unique : la Riner, hommage à l’un des propriétaires, "
            + "multiple champion de judo, célèbre la force tranquille et la précision des gestes ; la Nashira, plus grande suite du Riad, "
            + "déploie des espaces majestueux baignés de lumière. Toutes deux offrent une expérience rare, où le luxe discret se mêle à "
            + "l’âme marocaine pour un séjour d’exception.",
        ctaLabel: "Découvrir",
        href: "/riads/suites-speciales",
    },
];


export default function ComfortPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Simplicité raffinée et confort moderne au cœur de la Médina"
                              title="Chambres Confort"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/65044f8887-a01d2336709dbbf2c5ef.png"}/>
            <OverviewSection
                id="confort-overview-section"
                badge="3 CHAMBRES"
                badgeToneClass="bg-brand-gold text-white"
                meta="25-30m²"
                title="Simplicité Raffinée et Confort Moderne"
                paragraphs={[
                    "Le riad comporte 3 chambres confort, situées au RDC ou au 1er étage. Avec une superficie de 25 à 30m², elles offrent un cadre intime et chaleureux, mariant couleurs et artisanat.",
                    "Parfaites pour un séjour en couple ou en solo, elles allient charme authentique et fonctionnalité dans un environnement pensé pour votre bien-être et votre détente.",
                ]}
                facts={[
                    { icon: <FaUsers className="h-4 w-4" />, label: "1-2 personnes" },
                    { icon: <FaExpand className="h-4 w-4" />, label: "25-30m²" },
                    { icon: <FaLocationDot className="h-4 w-4" />, label: "RDC ou 1er étage" },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/6b8b83c359-cf2cdeb3e6cc0f82226a.png"
                imageAlt="Cozy Moroccan comfort room with traditional tadelakt bathroom, warm earth tones, handcrafted details, intimate lighting."
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded />
            <RoomAmenities/>
            <RoomFeatures
                id="room-features-section"
                title="Intimité & Chaleur"
                description={
                    "Nos chambres confort incarnent l'esprit authentique du Riad Nashira. Chaque espace a été pensé pour créer une atmosphère intime et chaleureuse, où les couleurs douces et l'artisanat traditionnel marocain se marient harmonieusement."}
                features={[
                    {
                        icon: FaPalette,
                        label: "Harmonie des couleurs",
                        description:
                            "Palette de tons chauds et apaisants inspirée de la tradition marocaine",
                    },
                    {
                        icon: FaHammer,
                        label: "Artisanat authentique",
                        description:
                            "Détails artisanaux réalisés par des maîtres artisans locaux",
                    },
                    {
                        icon: FaHeart ,
                        label: "Cadre intime",
                        description:
                            "Espace parfait pour un séjour romantique ou une retraite personnelle",
                    },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/89c6091dde-d38904cd3df458dbb94a.png"
                imageAlt="Intimate Moroccan comfort room showcasing traditional craftsmanship, warm color harmony, subtle lighting effects, authentic textiles, cozy atmosphere"
                imagePriority
                bgClass="bg-brand-dark"
                accentClass="text-brand-gold"
                textTone='light'
                imagePosition="left"
                featuresColumns={1}
            />
            <PerfectForSection
                title="Parfaites Pour"
                intro="Nos chambres confort s'adaptent parfaitement à différents types de séjours, alliant charme authentique et fonctionnalité moderne."
                items={items}
                bgClass="bg-brand-beige"
                cardBgClass="bg-white"
                accentClass="bg-brand-gold text-white"
                textTitleClass="text-brand-dark"
                textBodyClass="text-base text-brand-gray-500"
                columns={3}
                iconSizeClass="text-2xl"
            />
            <BookingCtaSection
                title="Réservez Votre Chambre Confort"
                subtitle="Découvrez l'authenticité et le charme de nos chambres confort. Un séjour inoubliable vous attend dans un cadre intime et raffiné."
                bullets={bullets}
                actions={actions}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/3c5cbf24fc-15885a8ed29fc8749ad5.png"
                imageAlt="Cozy Moroccan comfort room at golden hour, warm ambient lighting, traditional decor, inviting atmosphere, luxury hotel photography"
                imagePriority
                imageHeightClass="h-[400px]"
                imagePosition="right"
                bgClass="bg-brand-gold"
                textTone="light"
                accentClass="text-brand-gold"
            />
            <OtherRiadsSlider items={riads} />;
        </>
    )
}