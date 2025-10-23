import React from 'react';
import {FaBed, FaCrown, FaGem, FaGlassCheers, FaHeart, FaHome, FaStar, FaUsers} from 'react-icons/fa';
import IntroductionSection, {StatItem} from "@/components/common/introduction-section";

const roomsData = {
    image: {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f6d411a20e-a478a39d4494c6f8a3aa.png",
        alt: "Luxurious Moroccan Riad interior with intricate zellige tilework, plush velvet seating, and warm ambient lighting, elegant style",
        priority: true
    },
    header: {
        label: "Chaque chambre",
        title: "Une Atmosphère Singulière"
    },
    content: {
        paragraphs: [
            "Le Riad Nashira compte 17 chambres et suites toutes différentes les unes des autres. Pensées comme des univers uniques, elles se distinguent par leurs harmonies de couleurs, leurs jeux de lumière et le dialogue subtile entre design contemporain et artisanat marocain.",
            "Que vous choisissez une chambre confort, une deluxe, une suite ou les suites exclusives, vous serez immergé dans une ambiance raffinée, bercée par le calme du riad et l'élégance de ses détails."
        ]
    },
    stats: [
        {icon: FaBed, value: 3, label: "confort"},
        {icon: FaStar, value: 9, label: "deluxe"},
        {icon: FaGem, value: 3, label: "suites"},
        {icon: FaCrown, value: 2, label: "suites spéciales"}
    ] as StatItem[]
};

export default function RoomsIntroduction() {
    return (
        <IntroductionSection
            id="rooms-hero-section"
            image={roomsData.image}
            header={roomsData.header}
            content={roomsData.content}
            stats={roomsData.stats}
            backgroundColor="bg-brand-beige-100"
        />
    );
}

export function RestaurantIntroduction() {
    const restaurantData = {
        image: {
            src: "https://example.com/restaurant-image.jpg",
            alt: "Elegant restaurant setting with traditional Moroccan cuisine",
            priority: false
        },
        header: {
            label: "Gastronomie",
            title: "Une Cuisine D'Excellence"
        },
        content: {
            paragraphs: [
                "Notre restaurant vous invite à un voyage culinaire où la tradition marocaine rencontre la créativité contemporaine.",
                "Chaque plat est une célébration des saveurs authentiques, préparés avec des ingrédients locaux soigneusement sélectionnés."
            ]
        }
    };

    return (
        <IntroductionSection
            id="restaurant-intro"
            image={restaurantData.image}
            header={restaurantData.header}
            content={restaurantData.content}
            backgroundColor="bg-white"
        />
    );
}

export function SpaIntroduction() {
    const spaData = {
        image: {
            src: "https://example.com/spa-image.jpg",
            alt: "Relaxing spa environment with traditional hammam",
            priority: false
        },
        header: {
            label: "Bien-être",
            title: "Un Havre de Paix"
        },
        content: {
            paragraphs: [
                "Découvrez notre spa, un sanctuaire de bien-être où les rituels ancestraux du hammam se mêlent aux techniques de relaxation modernes.",
                "Laissez-vous transporter par nos soins signature et retrouvez l'harmonie du corps et de l'esprit."
            ]
        }
    };

    return (
        <IntroductionSection
            id="spa-intro"
            image={spaData.image}
            header={spaData.header}
            content={spaData.content}
            backgroundColor="bg-brand-beige-50"
            className="border-t border-brand-gold/20"
        />
    );
}

const eventsData = {
    image: {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png",
        alt: "Modern conference room in luxury Moroccan hotel with elegant seating, audiovisual equipment, natural lighting, professional business setting",
        priority: true
    },
    header: {
        label: "Événements",
        title: "Des Moments D'Exception"
    },
    content: {
        paragraphs: [
            "Au cœur de la Médina, le riad Nashira est bien plus qu'un lieu de séjour où l'on peut imaginer organiser et vivre des événements inoubliables.",
            "Grâce à ses espaces raffinés – patios, rooftops panoramiques, restaurants, bars, salons – notre riad se prête à toutes les occasions, dans une atmosphère intime et élégante."
        ]
    }
};

export function EventsIntroduction() {
    const eventTypesStats: StatItem[] = [
        { icon: FaUsers, value: "Séminaires", label: "professionnels" },
        { icon: FaGlassCheers, value: "Dîners", label: "privés" },
        { icon: FaHeart, value: "Mariages", label: "& célébrations" },
        { icon: FaHome, value: "Privatisation", label: "complète" }
    ];

    return (
        <IntroductionSection
            id="events-hero-section"
            image={eventsData.image}
            header={eventsData.header}
            content={eventsData.content}
            stats={eventTypesStats}
            backgroundColor="bg-brand-beige-100"
        />
    );
}