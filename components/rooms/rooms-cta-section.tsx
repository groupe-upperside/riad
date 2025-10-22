import {FaCalendar} from 'react-icons/fa'
import {CTASectionProps} from "@/components/common/CTA-section";

export const roomsCTA: CTASectionProps = {
    title: 'Réservez Votre Séjour',
    description: 'Découvrez nos hébergements et réservez votre séjour dans l\'univers unique du Riad Nashira. Chaque chambre vous attend pour une expérience authentique et raffinée.',
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: 'DÉCOUVRIR LES HÉBERGEMENTS',
            variant: 'ghost',
            showArrow: true,
            className: 'bg-white text-brand-gold-400 hover:bg-gray-100'
        },
        {
            text: 'RÉSERVER MAINTENANT',
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
};
