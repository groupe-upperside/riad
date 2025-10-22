import {CTASectionProps} from "@/components/common/CTA-section";
import {FaCalendar} from "react-icons/fa";

export const restaurantsCTA: CTASectionProps = {
    title: 'Réservez Votre Table',
    description: 'Vivez une expérience culinaire exceptionnelle dans nos restaurants. Saveurs authentiques et raffinement vous attendent pour un moment inoubliable.',
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: 'RÉSERVER UNE TABLE',
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
};

export const spaCTA: CTASectionProps = {
    title: 'Réservez Votre Massage',
    description: 'Offrez-vous un moment d\'exception dans notre sanctuaire de bien-être. Nos équipes sont à votre disposition pour créer l\'expérience parfaite selon vos besoins.',
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: 'RÉSERVER UN SOIN',
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
};
