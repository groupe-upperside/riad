import {FaCalendar} from 'react-icons/fa'
import {CTASectionProps} from "@/components/common/CTA-section";

type TranslationFunction = (key: string) => string;

export const getRoomsCTA = (t: TranslationFunction): CTASectionProps => ({
    title: t('RoomsCTA.Title.translation.content'),
    description: t('RoomsCTA.Description.translation.content'),
    backgroundColor: 'bg-brand-gold',
    textColor: 'text-white',
    buttons: [
        {
            href: "https://riad-nashira-spa.hotelrunner.com/bv3/search",
            text: t('RoomsCTA.ButtonBookNow.translation.content'),
            variant: 'outline',
            icon: FaCalendar,
            className: 'border-2 border-white text-white hover:bg-white hover:text-brand-gold-400'
        }
    ]
});