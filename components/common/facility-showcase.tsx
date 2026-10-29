import ShowcaseHeader from '@/components/common/showcase-header';
import type {Facility} from '@/types/facility.type';
import {FacilityCard} from '@/components/common/facility-card';
import React from 'react';

interface RestaurantShowcaseProps {
    title: string;
    subtitle: string;
    facilities: Facility[];
    id?: string;
}

export const FacilityShowcase: React.FC<RestaurantShowcaseProps> = ({title, subtitle, facilities, id}) => {
    return (
        <section className="py-24 bg-brand-beige-100" id={id}>
            <div className="container mx-auto px-4">
                <ShowcaseHeader title={title} subtitle={subtitle} />

                {facilities.map((facility, index) => (
                    <FacilityCard key={facility.id} facility={facility} index={index} />
                ))}
            </div>
        </section>
    );
};
