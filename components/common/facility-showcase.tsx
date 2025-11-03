import {Facility, FacilityCard} from "@/components/common/facility-card";
import React from "react";

interface RestaurantShowcaseProps {
    title: string;
    subtitle: string;
    facilities: Facility[];
    id?: string;
}

export const FacilityShowcase: React.FC<RestaurantShowcaseProps> = ({
                                                                        title,
                                                                        subtitle,
                                                                        facilities,
    id
                                                                    }) => {
    return (
        <section className="py-24 bg-brand-beige-100" id={id} >
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">{title}</h2>
                    <p className="text-base leading-relaxed my-8 text-brand-gray-500">{subtitle}</p>
                </div>

                {facilities.map((facility, index) => (
                    <FacilityCard
                        key={facility.id}
                        facility={facility}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};