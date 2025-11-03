'use client';

import {getAmenities} from '@/lib/constants'
import Container from '@/components/ui/container'
import {useTranslations} from "next-intl";

export default function AmenitiesBar() {
    const t = useTranslations('Constants');
    const amenities = getAmenities(t);
    return (
        <section className="bg-brand-dark py-12 md:py-18">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-white">
                    {amenities.map((amenity) => {
                        const Icon = amenity.icon
                        return (
                            <div key={amenity.id} className="flex flex-col items-center">
                                <Icon className="text-3xl md:text-4xl mb-3 text-brand-gold" />
                                <span className="font-light tracking-wider text-base md:text-lg">
                  {amenity.label}
                </span>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}