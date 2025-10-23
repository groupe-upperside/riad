import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import ServiceFeature, {ServiceFeatureProps} from "@/components/common/service-feature";

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

const laundryData: ServiceFeatureProps = {
    id: 'laundry-pressing-section',
    category: 'SERVICE PREMIUM',
    title: 'Blanchisserie et Pressing',
    description: [
        'Voyagez léger : notre service de blanchisserie et de pressing assure le soin de vos vêtements avec rapidité et discrétion. Parfait pour les longs séjours ou les voyageurs en quête de confort absolu.',
    ],
    features: ['Service Express', 'Produits Premium', 'Discrétion'],
    images: {
        primary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/e65b8d3228-90b37040ced8d51b4fce.png',
            alt: 'luxury laundry service, professional pressing, clean white shirts, premium dry cleaning, hotel service'
        },
        secondary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6f31a8d583-ea2ab7c9140a5be7d4b9.png',
            alt: 'professional ironing service, steam pressing, luxury garment care, hotel housekeeping, pristine clothing'
        }
    },
    cta: {
        text: 'DEMANDER UN DEVIS',
        onClick: () => console.log('Request quote clicked')
    },
    imagePosition: 'right',
    backgroundColor: 'bg-white'
};

const airportVipData: ServiceFeatureProps = {
    id: 'airport-vip-section',
    category: 'TRANSPORT EXCLUSIF',
    title: 'Transfert Aéroport et VIP',
    description: [
        "Nous organisons vos transferts privés depuis et vers l’aéroport à toute heure.",
        'Pour un voyage encore plus fluide, profitez de notre service fast track : accueil personnalisé, passage prioritaire aux formalités et accompagnement VIP dès votre arrivée à Marrakech.'
    ],
    features: ['Transport VIP', 'Fast Track', 'Service 24h/24'],
    images: {
        primary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c314e89d26-96527446a998f1e13397.png',
            alt: 'VIP airport transfer, luxury Mercedes vehicle, professional chauffeur, premium transportation service'
        },
        secondary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ec11470f00-73b3aef977a53ac9a400.png',
            alt: 'airport VIP lounge, exclusive waiting area, luxury travel experience, premium airport services'
        }
    },
    cta: {
        text: 'RÉSERVER TRANSFERT',
        onClick: () => console.log('Reserve transfer clicked')
    },
    imagePosition: 'left',
    backgroundColor: 'bg-brand-beige'
};

const boutiqueData: ServiceFeatureProps = {
    id: 'boutique-section',
    category: 'SHOPPING EXCLUSIF',
    title: 'Boutique',
    description: [
        "Emportez un peu de l’esprit Nashira avec vous. Notre boutique propose une sélection d’articles raffinés : un mélange d’artisanat marocain, de textiles, de produits bien-être naturels Natus, des bougies Côté Bougie… des souvenirs uniques à offrir ou à s’offrir …",
        'Vous trouverez aussi les essentiels de voyage, des articles de sport FightArt, Racer, des lunettes de soleil CEBE, des vêtements Verano.'
    ],
    features: ['Artisanat Authentique', 'Textiles', 'Beauté & Senteurs'],
    images: {
        primary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cf6f1e9c0a-1c4ff7ee941a8d7b2898.png',
            alt: 'luxury Moroccan boutique, traditional crafts display, elegant shopping interior, artisan products showcase'
        },
        secondary: {
            src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/91f648397c-0b60dc7f4ec1e7e16bbe.png',
            alt: 'Moroccan handcrafted items, traditional pottery, jewelry display, authentic souvenirs, luxury gifts'
        }
    },
    cta: {
        text: 'DÉCOUVRIR LA BOUTIQUE',
        onClick: () => console.log('Discover boutique clicked')
    },
    imagePosition: 'right',
    backgroundColor: 'bg-white'
};


export default function ActivitiesPage() {
    return (
        <>
            <RoomsHeroSection subtitle="Un cadre unique pour vos plus beaux moments.Des attentions exclusives pour un séjour sans souci."
                              title="Services Premium"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/94ba6122b1-a91c8380698d3b451c81.png"}/>
            <ServiceFeature {...laundryData} />
            <ServiceFeature {...airportVipData} />
            <ServiceFeature {...boutiqueData} />
            <RoomsGallerySection items={items} rounded />
        </>
    )
}