"use client";

import SectionHeader from "@/components/ui/section-header";
import {FaClock, FaFish, FaUtensils} from "react-icons/fa";
import {CTAButtons} from "@/components/common/CTA-buttons";
import {IconType} from "react-icons";
import React from "react";

export interface Facility {
    id: string;
    category: string;
    name: string;
    description: string[];
    cuisine?: string;
    hours?: string;
    image: string;
    imageAlt: string;
    icon?: string;
    menuText?: string;
    reservationText?: string;
}

const iconMap: Record<string, IconType> = {
    'FaUtensils': FaUtensils,
    'FaFish': FaFish
};

export const FacilityCard: React.FC<{ facility: Facility; index: number }> = ({ facility, index }) => {
    const isEven = index % 2 === 0;
    const Icon = facility.icon ? iconMap[facility.icon] : undefined;

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index > 0 ? 'mt-20' : ''}`}>
            <div className={`h-[550px] rounded-sm overflow-hidden ${isEven ? '' : 'lg:order-2'}`}>
                <img
                    className="h-full w-full object-cover"
                    src={facility.image}
                    alt={facility.imageAlt}
                />
            </div>
            <div className={isEven ? '' : 'lg:order-1'}>
                <SectionHeader title={facility.name} label={facility.category} />
                <div className="my-8 space-y-4">
                    {facility.description.map((item, index) => (
                        <p key={index} className="text-base leading-relaxed text-brand-gray-500">
                            {item}
                        </p>
                    ))}
                </div>
                {(facility.cuisine || facility.hours) && (
                    <div className="flex items-center space-x-8 mb-8 text-brand-dark-900">
                        {facility.cuisine && (
                            <div className="flex items-center space-x-3">
                                {Icon && <Icon className="mr-2 text-brand-gold-400" />}
                                <div>
                                    <p className="font-semibold">Cuisine</p>
                                    <p className="text-sm text-brand-gray-500">{facility.cuisine}</p>
                                </div>
                            </div>
                        )}
                        {facility.hours && (
                            <div className="flex items-center space-x-3">
                            <FaClock className="mr-2 text-brand-gold-400"/>
                            <div>
                                <p className="font-semibold">Horaires</p>
                                <p className="text-sm text-gray-600">{facility.hours}</p>
                            </div>
                        </div>
                        )}
                    </div>
                )}
                {(facility.menuText || facility.reservationText) && (
                    <CTAButtons
                        menuText={facility.menuText}
                        reservationText={facility.reservationText}
                        onMenuClick={() => console.log('Menu clicked for:', facility.name)}
                        onReservationClick={() => console.log('Reservation clicked for:', facility.name)}
                    />
                )}
            </div>
        </div>
    );
};