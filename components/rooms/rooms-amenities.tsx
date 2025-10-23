import Container from '@/components/ui/container'
import {FaBed, FaLeaf, FaLock, FaShower, FaSnowflake, FaWifi, FaWind} from 'react-icons/fa'
import {FaMugSaucer} from "react-icons/fa6";
import {Amenity} from "@/lib/types";

const amenities: Amenity[] = [
    {
        id: "1",
        label: "Lit double ou twin",
        description: "Selon la chambre",
        icon: FaBed,
    },
    {
        id: "2",
        label: "Salle de bain en tadelakt",
        description: "Avec douche à l’italienne",
        icon: FaShower,
    },
    {
        id: "3",
        label: "Climatisation réversible",
        description: "Chaud & froid",
        icon: FaSnowflake,
    },
    {
        id: "4",
        label: "Wifi & Télévision",
        description: "Connexion haut débit",
        icon: FaWifi,
    },
    {
        id: "5",
        label: "Coffre-fort",
        description: "Sécurité pour vos objets de valeur",
        icon: FaLock,
    },
    {
        id: "6",
        label: "Machine à café & mini bar",
        description: "Boissons chaudes et fraîches",
        icon: FaMugSaucer,
    },
    {
        id: "7",
        label: "Produits d’accueil",
        description: "Naturels",
        icon: FaLeaf,
    },
    {
        id: "8",
        label: "Sèche-cheveux",
        description: "Professionnel",
        icon: FaWind,
    },
];

export default function RoomAmenities() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className='font-serif text-4xl md:text-5xl capitalize text-brand-dark'>
                        Équipements & Services
                    </h2>
                    <p className="text-base text-brand-gray-500 max-w-3xl mx-auto mt-8">
                        Chaque chambre est équipée avec le plus grand soin pour assurer votre confort
                        et votre bien-être durant votre séjour.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2">
                    {amenities.map((amenity) => {
                        const Icon = amenity.icon
                        return (
                            <div key={amenity.label}
                                 className="text-center p-4">
                                <Icon className="text-2xl text-brand-gold-400 mb-2 mx-auto"/>
                                <p className="font-semibold text-base text-brand-dark-800">
                                    {amenity.label}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}