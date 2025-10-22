import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {FaCalendar, FaCheckCircle, FaCrown, FaExpand, FaHeart, FaStar, FaUser, FaUsers} from "react-icons/fa";
import {FaDiamond, FaLocationDot} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomAmenities from "@/components/rooms/rooms-amenities";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures from "@/components/rooms/rooms-features";
import PerfectForSection, {PerfectForItem} from "@/components/rooms/perfect-for-section";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";

const confortGalleryItems: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/93dfa0b752-9aa007470cad12a6d676.png",
        alt: "Moroccan comfort room bedroom area with traditional bed, warm textiles, carved wood headboard, soft lighting, cozy atmosphere",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/01061b8302-00783a80652b299cce39.png",
        alt: "Traditional Moroccan tadelakt bathroom with Italian shower, natural stone, warm lighting, luxury hotel amenities",
        colSpan: 2,
        rowSpan: 2,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/813c38b161-6a5adc417ee581ade436.png",
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
        title: "Expérience Luxueuse",
        description:
            "Confort supérieur et services premium pour découvrir Marrakech dans les meilleures conditions. Art de vivre marocain dans toute sa splendeur.",
    },
];

const bullets: Bullet[] = [
    {icon: FaCheckCircle, label: "Réservation immédiate"},
    {icon: FaCheckCircle, label: "Annulation gratuite"},
    {icon: FaCheckCircle, label: "Meilleur prix garanti"},
];

const actions: CtaAction[] = [
    {label: "RÉSERVER MAINTENANT", href: "/reservation", icon: FaCalendar, variant: "primary"}
];

const riads: RiadCard[] = [
    {
        id: "comfort-card",
        imageSrc: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6b8b83c359-dad4974c3cc4d2c74a06.png",
        imageAlt:
            "Dark and moody interior of a premier Moroccan riad suite, with intricate latticework, plush armchairs, and atmospheric lighting, sophisticated style",
        meta: "25-30 M² | 3 CHAMBRES CONFORT",
        title: "Confort",
        description:
            "Avec leurs 25 à 30 m², nos chambres Confort offrent un cadre intime et chaleureux, mariant harmonies de couleurs et artisanat marocain. Matières naturelles, luminaires doux et boiseries finement travaillées composent une atmosphère apaisante, idéale pour se ressourcer après une journée dans la Médina. Pensées pour le bien-être, elles allient fonctionnalité moderne (literie haut de gamme, rangements astucieux, salle de bain en tadelakt) et élégance discrète pour un séjour tout en douceur.",
        ctaLabel: "Découvrir",
        href: "/rooms/comfort",
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
        href: "/rooms/suites",
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
        href: "/rooms/suites-speciales",
    },
];


export default function ComfortPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Élégance raffinée et confort supérieur dans l'art de vivre marocain"
                              title="Chambres Deluxe"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/960d9a09cf-74e9d46a57c9ec0c874b.png"}/>
            <OverviewSection
                id="deluxe-overview-section"
                badge="9 CHAMBRES"
                badgeToneClass="bg-brand-gold text-white"
                meta="30-42m²"
                title="Élégance & Volumes"
                paragraphs={[
                    "Le riad comporte 9 chambres deluxe, situées au RDC ou au 1er étage. Avec une superficie généreuse, elles offrent un cadre raffiné et spacieux, mariant couleurs sophistiquées et artisanat d'exception.",
                    " Parfaites pour un séjour en couple ou pour ceux recherchant plus d'espace, elles allient charme authentique et fonctionnalité moderne. Deux de nos chambres deluxe disposent d'une petite terrasse privée pour des moments d'intimité absolue.",
                ]}
                facts={[
                    {icon: <FaUsers className="h-4 w-4"/>, label: "1-2 personnes"},
                    {icon: <FaExpand className="h-4 w-4"/>, label: "30-42m²"},
                    {icon: <FaLocationDot className="h-4 w-4"/>, label: "2 avec terrasse"},
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/76034b8280-85a115bc57d0fead5214.png"
                imageAlt="Cozy Moroccan comfort room with traditional tadelakt bathroom, warm earth tones, handcrafted details, intimate lighting."
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded/>
            <RoomAmenities/>
            <RoomFeatures
                id="room-features-section"
                title="Excellence & Raffinement"
                description={
                    "Nos chambres deluxe incarnent l'excellence de l'hospitalité marocaine. Chaque espace reflète un savoir-faire artisanal exceptionnel, allié aux technologies modernes pour créer une expérience de séjour incomparable dans un cadre d'exception."}
                features={[
                    {
                        icon: FaCrown,
                        label: "Artisanat d'exception",
                        description:
                            "Détails sculptés à la main par les meilleurs artisans de Marrakech",
                    },
                    {
                        icon: FaDiamond,
                        label: "Matériaux nobles",
                        description:
                            "Tadelakt authentique, bois précieux et textiles de soie",
                    },
                    {
                        icon: FaStar,
                        label: "Service personnalisé",
                        description:
                            "Attention particulière à chaque détail de votre séjour",
                    },
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/f0441a701a-b2c31e6e0db1583f2146.png"
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
                intro=" Nos chambres deluxe s'adaptent parfaitement à tous types de séjours, offrant le parfait équilibre entre tradition marocaine et confort moderne."
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
                title="Réservez Votre Chambre Deluxe"
                subtitle="Vivez une expérience d'exception dans nos chambres deluxe. Élégance, confort et authenticité marocaine vous attendent pour un séjour mémorable."
                bullets={bullets}
                actions={actions}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/65f0acc00d-b21a69d47836bbd9d4e9.png"
                imageAlt="Cozy Moroccan comfort room at golden hour, warm ambient lighting, traditional decor, inviting atmosphere, luxury hotel photography"
                imagePriority
                imageHeightClass="h-[400px]"
                imagePosition="right"
                bgClass="bg-brand-gold"
                textTone="light"
                accentClass="text-brand-gold"
            />
            <OtherRiadsSlider items={riads}/>;
        </>
    )
}