'use client'

import Button from "@/components/ui/button";
import {FaCalendar} from "react-icons/fa";
import {useTranslations} from 'next-intl';
import React from "react";

interface CTAButtonsProps {
    menuText?: string;
    menuLink?: string;
    reservationText?: string;
    reservationLink?: string;
    onMenuClick?: () => void;
    onReservationClick?: () => void;
    showCalendarIcon?: boolean;
    className?: string;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({
                                                          menuText,
                                                          reservationText,
                                                          onMenuClick,
                                                          onReservationClick,
                                                          showCalendarIcon = true,
                                                          className = "",
                                                          menuLink, reservationLink
                                                      }) => {
    const t = useTranslations('CTAButtons');

    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <Button
                variant="primary"
                showArrow={true}
                className="border-2 border-brand-gold-400 hover:bg-white uppercase hover:text-brand-gold-400"
                onClick={onMenuClick}
            >
                <a href={menuLink || "/menu"} target="_blank" rel="noopener noreferrer">
                    {menuText || t('DefaultMenuText.translation.content')}
                </a>
            </Button>
            <Button
                variant="outline"
                className="border-2 border-brand-gold-400 hover:bg-brand-gold-400 uppercase text-brand-gold-400"
                onClick={onReservationClick}
            >
                <a href={reservationLink || "/reservation"} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {showCalendarIcon && <FaCalendar className="mr-2"/>}
                    {reservationText || t('DefaultReservationText.translation.content')}
                </a>
            </Button>
        </div>
    );
};