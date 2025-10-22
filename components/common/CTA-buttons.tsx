'use client'

import Button from "@/components/ui/button";
import {FaCalendar} from "react-icons/fa";

interface CTAButtonsProps {
    menuText?: string;
    reservationText?: string;
    onMenuClick?: () => void;
    onReservationClick?: () => void;
    showCalendarIcon?: boolean;
    className?: string;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({
                                                          menuText = "VOIR LE MENU",
                                                          reservationText = "Réserver une table",
                                                          onMenuClick,
                                                          onReservationClick,
                                                          showCalendarIcon = true,
                                                          className = ""
                                                      }) => {
    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <Button
                variant="primary"
                showArrow={true}
                className="border-2 border-brand-gold-400 hover:bg-white uppercase hover:text-brand-gold-400"
                onClick={onMenuClick}
            >
                {menuText}
            </Button>
            <Button
                variant="outline"
                className="border-2 border-brand-gold-400 hover:bg-brand-gold-400 uppercase text-brand-gold-400"
                onClick={onReservationClick}
            >
                {showCalendarIcon && <FaCalendar className="mr-2" />}
                {reservationText}
            </Button>
        </div>
    );
};