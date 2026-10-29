import {FaCalendar} from 'react-icons/fa';
import {useTranslations} from 'next-intl';
import ButtonLink from '@/components/ui/button-link';

interface CTAButtonsProps {
    menuText?: string;
    menuLink?: string;
    reservationText?: string;
    reservationLink?: string;
}

export function CTAButtons({menuText, menuLink, reservationText, reservationLink}: CTAButtonsProps) {
    const t = useTranslations('CTAButtons');
    return (
        <div className="flex items-center space-x-3 ">
            <ButtonLink
                href={menuLink || '/menu'}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                showArrow
                className="border-2 border-brand-gold-400 hover:bg-white uppercase hover:text-brand-gold-400"
            >
                {menuText || t('DefaultMenuText.translation.content')}
            </ButtonLink>
            <ButtonLink
                href={reservationLink || '/reservation'}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="border-2 border-brand-gold-400 hover:bg-brand-gold-400 uppercase text-brand-gold-400"
            >
                <span className="flex items-center">
                    <FaCalendar className="mr-2" />
                    {reservationText || t('DefaultReservationText.translation.content')}
                </span>
            </ButtonLink>
        </div>
    );
}
