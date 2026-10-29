import ShowcaseHeader from '@/components/common/showcase-header';
import type {SecondaryFacility} from '@/types/facility.type';
import {SecondaryFacilityCard} from '@/components/common/secondary-facility-card';
import React from 'react';

interface SecondaryFacilityShowcaseProps {
    title: string;
    subtitle: string;
    secondaryFacilities: SecondaryFacility[];
    id?: string;
    bgWhite?: boolean;
}

export const SecondaryFacilityShowcase: React.FC<SecondaryFacilityShowcaseProps> = ({
    title,
    subtitle,
    secondaryFacilities,
    bgWhite = true,
    id,
}) => {
    return (
        <section className={`py-24 ${bgWhite ? 'bg-white' : 'bg-brand-beige'}`} id={id}>
            <div className="container mx-auto px-4">
                <ShowcaseHeader title={title} subtitle={subtitle} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {secondaryFacilities.map((secondaryFacility) => (
                        <SecondaryFacilityCard
                            key={secondaryFacility.id}
                            secondaryFacility={secondaryFacility}
                            bgWhite={bgWhite}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
