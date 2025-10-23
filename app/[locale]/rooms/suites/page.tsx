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
    {label: "RÉSERVER MAINTENANT", href: "/booking", icon: FaCalendar, variant: "primary"}
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
        href: "/rooms/deluxe",
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
        href: "/rooms/special-suites",
    },
];


export default function ComfortPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Luxe absolu et raffinement exceptionnel au cœur de la Médina"
                              title="Suites"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9c2af6dedf-4e1d2db8acbf899200a2.png"}/>
            <OverviewSection
                id="suites-overview-section"
                badge="3 SUITES"
                badgeToneClass="bg-brand-gold text-white"
                meta="45-60m²"
                title="Espace et Raffinement Suprême"
                paragraphs={[
                    "Le Riad Nashira propose 5 suites d'exception, alliant espace généreux et décoration raffinée. Avec des superficies de 45 à 60m², ces hébergements de prestige offrent un salon séparé et des équipements haut de gamme.",
                    "Certaines disposent de terrasses privées avec vue panoramique sur la Médina, créant un sanctuaire privé où luxe et authenticité marocaine se rencontrent harmonieusement.",
                ]}
                facts={[
                    {icon: <FaUsers className="h-4 w-4"/>, label: "1-2 personnes"},
                    {icon: <FaExpand className="h-4 w-4"/>, label: "45-60m²"},
                    {icon: <FaLocationDot className="h-4 w-4"/>, label: "Terrasse"},
                ]}
                imageSrc="https://storage.googleapis.com/uxpilot-auth.appspot.com/954b102df9-45140dd4a93b11517a0b.png"
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
                title="Réservez Votre Suite"
                subtitle="Offrez-vous l'expérience ultime du luxe marocain dans nos suites prestigieuses. Un séjour inoubliable dans un cadre d'exception vous attend."
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