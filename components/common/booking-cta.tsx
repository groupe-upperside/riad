import {CTASectionProps} from "@/components/common/CTA-section";
import {FaCalendar} from "react-icons/fa";

type TranslationFunction = (key: string) => string;

export const getRestaurantsCTA = (t: TranslationFunction): CTASectionProps => ({
    title: t('Title.translation.content'),
    description: t('Description.translation.content'),
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: t('ButtonReserveTable.translation.content'),
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400',
            href:  "mailto:restauration@riadnashira.com"
        }
    ]
});

export const getSpaCTA = (t: TranslationFunction): CTASectionProps => ({
    title: t('Title.translation.content'),
    description: t('Description.translation.content'),
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: t('ButtonReserveTreatment.translation.content'),
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400',
            href: "mailto:spa@riadnashira.com"
        }
    ]
});

