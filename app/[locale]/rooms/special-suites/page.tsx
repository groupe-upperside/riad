import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {
    FaCheckCircle,
    FaConciergeBell,
    FaCrown,
    FaDumbbell,
    FaExpand,
    FaGem,
    FaHeart,
    FaHome,
    FaHotTub,
    FaMedal,
    FaMountain,
    FaSpa,
    FaStar,
    FaUser,
    FaUsers
} from "react-icons/fa";
import {FaLocationDot, FaUpDownLeftRight} from "react-icons/fa6";
import OverviewSection from "@/components/rooms/rooms-overview";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import RoomFeatures, {Feature} from "@/components/rooms/rooms-features";
import {PerfectForItem} from "@/components/rooms/perfect-for-section";
import BookingCtaSection, {Bullet, CtaAction} from "@/components/rooms/booking-cta";
import OtherRiadsSlider, {RiadCard} from "@/components/rooms/other-rooms-slider";
import SuiteFeaturesSection, {SuiteFeatureItem} from "@/components/rooms/suite-features";

const confortGalleryItems: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/90ee5ab427-305e8d6f2ce0b90bd450.png",
        alt: "Moroccan comfort room bedroom area with traditional bed, warm textiles, carved wood headboard, soft lighting, cozy atmosphere",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/8c48eafdaa-0b4207e8945399016d15.png",
        alt: "Traditional Moroccan tadelakt bathroom with Italian shower, natural stone, warm lighting, luxury hotel amenities",
        colSpan: 2,
        rowSpan: 2,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ce00edbb79-75ece5ea27168dcddbdf.png",
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
    {label: "RÉSERVER LA RINER", href: "/booking", icon: FaMedal, variant: "primary"},
    {label: "RÉSERVER LA NASHIRA", href: "/booking", icon: FaCrown, variant: "outline"}
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
        href: "/riads/deluxe",
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
];

const rinerFeatures: Feature[] = [
    { icon: FaMedal,    label: "Décor inspiré du judo" },
    { icon: FaCrown,  label: "Mobilier d'exception" },
    { icon: FaSpa,     label: "Espace bien-être privé" },
    { icon: FaMountain,      label: "Vue panoramique" },
];

const nashiraFeatures: Feature[] = [
    { icon: FaGem,    label: "Luxe absolu" },
    { icon: FaHome,  label: "Espace le plus vaste" },
    { icon: FaConciergeBell,     label: "Service personnalisé" },
    { icon: FaStar,      label: "Prestations exclusives" },
];

const rinerSuiteFeatures: SuiteFeatureItem[] = [
    {
        id: "riner-space",
        icon: FaUpDownLeftRight,
        title: "Espace Généreux",
        description: "65 m² d'espace luxueux avec salon séparé et terrasse privée de 15 m².",
    },
    {
        id: "riner-theme",
        icon: FaDumbbell,
        title: "Thème Sportif",
        description: "Décoration unique inspirée du judo avec éléments authentiques.",
    },
    {
        id: "riner-spa",
        icon: FaHotTub,
        title: "Spa Privé",
        description: "Hammam privé et baignoire en tadelakt pour une détente absolue.",
    },
];



export default function ComfortPage() {
    return (
        <>
            <RoomsHeroSection subtitle="La Riner & La Nashira - Deux univers d'exception"
                              title="Suites Spéciales"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9c2af6dedf-4e1d2db8acbf899200a2.png"}/>
            <OverviewSection
                id="suites-riner-overview-section"
                badge="2 SUITES"
                badgeToneClass="bg-brand-gold text-white"
                meta="SUITES SPÉCIALES"
                title="Espace et Raffinement Suprême"
                paragraphs={[
                    "Le Riad Nashira abrite deux suites d'exception, chacune racontant une histoire unique. Ces espaces privilégiés offrent le summum du luxe et de l'intimité, pensés pour les voyageurs les plus exigeants en quête d'une expérience authentique et raffinée.",
                    "La Suite Riner rend hommage à un champion, tandis que la Suite Nashira incarne l'excellence absolue de notre établissement. Découvrez ces univers uniques où chaque détail a été pensé pour créer une expérience inoubliable.",
                ]}
                facts={[
                    {icon: <FaUsers className="h-4 w-4"/>, label: "3-4 personnes"},
                    {icon: <FaExpand className="h-4 w-4"/>, label: "45-60m²"},
                    {icon: <FaLocationDot className="h-4 w-4"/>, label: "Salon privatif"},
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/954b102df9-45140dd4a93b11517a0b.png"
                imageAlt="Cozy Moroccan comfort room with traditional tadelakt bathroom, warm earth tones, handcrafted details, intimate lighting."
                imagePriority
                imageHeightClass="h-[500px]"
            />
            <RoomsGallerySection items={confortGalleryItems} rounded/>
            <RoomFeatures
                id="room-riner-features"
                title="La Riner"
                subtitle="SUITE SPÉCIALE"
                description="Un hommage vibrant à l'un des propriétaires, multiple champion de judo. Cette suite unique allie l'esprit sportif à l'élégance marocaine, créant un environnement où la force et la grâce se rencontrent dans une harmonie parfaite."
                features={rinerFeatures}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/6d1482e77c-7f210c8db8908548d1ad.png"
                imageAlt="Artisanat marocain"
                imagePriority
                imagePosition="left"
                bgClass="bg-white"
                textTone="dark"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <SuiteFeaturesSection
                id="riner-features"
                title="Caractéristiques de la Suite Riner"
                items={rinerSuiteFeatures}
                bgClass="bg-brand-beige"
                cardBgClass="bg-white"
                titleClass="text-brand-dark"
                bodyClass="text-brand-gray"
                iconClass="text-brand-gold text-4xl"
                columns={3}
                rounded
            />
            <RoomFeatures
                id="room-nashita-features"
                title="La Nashira"
                subtitle="SUITE SPÉCIALE"
                description="La plus grande suite du Riad, incarnation absolue du luxe et de l'excellence. Un espace d'exception où l'art de vivre marocain atteint sa plus belle expression, offrant une expérience présidentielle inoubliable."
                features={nashiraFeatures}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/acb4ebc0a0-3ed38b744976512362a4.png"
                imageAlt="Artisanat marocain"
                imagePriority
                imagePosition="right"
                bgClass="bg-brand-dark"
                textTone="light"
                accentClass="text-brand-gold"
                featuresColumns={2}
            />
            <SuiteFeaturesSection
                id="nashira-features"
                title="Caractéristiques de la Suite Nashira"
                items={rinerSuiteFeatures}
                bgClass="bg-white"
                cardBgClass="bg-brand-beige"
                titleClass="text-brand-dark"
                bodyClass="text-brand-gray"
                iconClass="text-brand-gold text-4xl"
                columns={3}
                rounded
            />
            <BookingCtaSection
                title="Réservez Votre Suite d'Exception"
                subtitle="Vivez une expérience unique dans nos suites spéciales. Chaque séjour devient un souvenir inoubliable dans ces univers d'exception pensés pour les voyageurs les plus exigeants."
                bullets={bullets}
                actions={actions}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/072d875d2b-972eb328df761ae0b2fe.png"
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