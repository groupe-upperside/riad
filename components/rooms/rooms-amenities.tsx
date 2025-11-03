'use client'

import Container from '@/components/ui/container'
import {FaBed, FaLeaf, FaLock, FaShower, FaSnowflake, FaWifi, FaWind} from 'react-icons/fa'
import {FaMugSaucer} from "react-icons/fa6";
import {Amenity} from "@/lib/types";
import {useTranslations} from 'next-intl';

export default function RoomAmenities() {
    const t = useTranslations('RoomAmenities');

    const amenities: Amenity[] = [
        {
            id: "1",
            label: t('AmenityDoubleBed.Label.translation.content'),
            description: t('AmenityDoubleBed.Description.translation.content'),
            icon: FaBed,
        },
        {
            id: "2",
            label: t('AmenityBathroom.Label.translation.content'),
            description: t('AmenityBathroom.Description.translation.content'),
            icon: FaShower,
        },
        {
            id: "3",
            label: t('AmenityAirConditioning.Label.translation.content'),
            description: t('AmenityAirConditioning.Description.translation.content'),
            icon: FaSnowflake,
        },
        {
            id: "4",
            label: t('AmenityWifiTV.Label.translation.content'),
            description: t('AmenityWifiTV.Description.translation.content'),
            icon: FaWifi,
        },
        {
            id: "5",
            label: t('AmenitySafe.Label.translation.content'),
            description: t('AmenitySafe.Description.translation.content'),
            icon: FaLock,
        },
        {
            id: "6",
            label: t('AmenityCoffeeMinibar.Label.translation.content'),
            description: t('AmenityCoffeeMinibar.Description.translation.content'),
            icon: FaMugSaucer,
        },
        {
            id: "7",
            label: t('AmenityWelcomeProducts.Label.translation.content'),
            description: t('AmenityWelcomeProducts.Description.translation.content'),
            icon: FaLeaf,
        },
        {
            id: "8",
            label: t('AmenityHairdryer.Label.translation.content'),
            description: t('AmenityHairdryer.Description.translation.content'),
            icon: FaWind,
        },
    ];

    return (
        <section className="py-20 bg-white">
            <Container>
                <div className="text-center mb-16">
                    <h2 className='font-serif text-4xl md:text-5xl capitalize text-brand-dark'>
                        {t('Title.translation.content')}
                    </h2>
                    <p className="text-base text-brand-gray-500 max-w-3xl mx-auto mt-8">
                        {t('Description.translation.content')}
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2">
                    {amenities.map((amenity) => {
                        const Icon = amenity.icon
                        return (
                            <div key={amenity.label}
                                 className="text-center p-4">
                                <Icon className="text-2xl text-brand-gold-400 mb-2 mx-auto"/>
                                <p className="font-semibold text-base text-brand-dark-800">
                                    {amenity.label}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}