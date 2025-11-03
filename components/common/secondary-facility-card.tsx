import {HiArrowUpRight} from "react-icons/hi2";
import React from "react";
import {useTranslations} from 'next-intl';

export interface SecondaryFacility {
    id: string;
    name: string;
    description: string;
    image: string;
    imageAlt: string;
    ctaText?: string;
}

export const SecondaryFacilityCard: React.FC<{ secondaryFacility: SecondaryFacility, bgWhite:boolean }> = ({ secondaryFacility, bgWhite=true }) => {
    const t = useTranslations('SecondaryFacilityCard');

    return (
        <div className={`${bgWhite ? "bg-brand-beige-100" : "bg-white"} rounded-sm overflow-hidden group`}>
            <div className="h-72 overflow-hidden">
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={secondaryFacility.image}
                    alt={secondaryFacility.imageAlt}
                />
            </div>
            <div className="p-8">
                <h3 className="font-serif text-2xl md:text-3xl capitalize mb-4 text-brand-dark">{secondaryFacility.name}</h3>
                <p className="text-base leading-relaxed mb-6 text-brand-gray-500">{secondaryFacility.description}</p>
                {secondaryFacility.ctaText && (
                    <button className="group mt-10 inline-flex items-center gap-3 self-start cursor-pointer"
                            aria-label={t('AriaLabelReadMore.translation.content')}>
                            <span className="relative pb-1 text-base font-medium uppercase text-brand-dark-800">
                                   {secondaryFacility.ctaText || t('DefaultCtaText.translation.content')}
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-3/4 bg-brand-gold transition-transform group-hover:scale-x-120 group-hover:w-full"/>
                            </span>
                        <HiArrowUpRight className="transition-transform group-hover:translate-x-1"/>
                    </button>
                )}
            </div>
        </div>
    );
};