import {CTASectionProps} from "@/components/common/CTA-section";
import {FaCalendar} from "react-icons/fa";

type TranslationFunction = (key: string) => string;

export const getRestaurantsCTA = (t: TranslationFunction): CTASectionProps => ({
    title: t('RestaurantsCTA.Title.translation.content'),
    description: t('RestaurantsCTA.Description.translation.content'),
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: t('RestaurantsCTA.ButtonReserveTable.translation.content'),
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
});

export const getSpaCTA = (t: TranslationFunction): CTASectionProps => ({
    title: t('SpaCTA.Title.translation.content'),
    description: t('SpaCTA.Description.translation.content'),
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            text: t('SpaCTA.ButtonReserveTreatment.translation.content'),
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
});