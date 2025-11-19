'use client'

import Container from '@/components/ui/container'
import {FaBed, FaLeaf, FaLock, FaShower, FaSnowflake, FaWifi, FaWind} from 'react-icons/fa'
import {FaMugSaucer} from "react-icons/fa6";
import {Amenity} from "@/lib/types";
import {useTranslations} from 'next-intl';

export default function RoomAmenities() {
    const t = useTranslations('RoomAmenities');
    const tSuite = useTranslations("SuitesPage")

    const amenities: Amenity[] = [
        {
            id: "1",
            label: tSuite('AmenityDoubleBedLabel.translation.content'),
            description: tSuite('AmenityDoubleBedDescription.translation.content'),
            icon: FaBed,
        },
        {
            id: "2",
            label: tSuite('AmenityBathroomLabel.translation.content'),
            description: tSuite('AmenityBathroomDescription.translation.content'),
            icon: FaShower,
        },
        {
            id: "3",
            label: tSuite('AmenityAirConditioningLabel.translation.content'),
            description: tSuite('AmenityAirConditioningDescription.translation.content'),
            icon: FaSnowflake,
        },
        {
            id: "4",
            label: "WIFI",
            description: tSuite('AmenityWifiTVDescription.translation.content'),
            icon: FaWifi,
        },
        {
            id: "5",
            label: tSuite('AmenitySafeLabel.translation.content'),
            description: tSuite('AmenitySafeDescription.translation.content'),
            icon: FaLock,
        },
        {
            id: "6",
            label: tSuite('AmenityCoffeeMinibarLabel.translation.content'),
            description: tSuite('AmenityCoffeeMinibarDescription.translation.content'),
            icon: FaMugSaucer,
        },
        {
            id: "7",
            label: tSuite('AmenityWelcomeProductsLabel.translation.content'),
            description: tSuite('AmenityWelcomeProductsDescription.translation.content'),
            icon: FaLeaf,
        },
        {
            id: "8",
            label: tSuite('AmenityHairdryerLabel.translation.content'),
            description: tSuite('AmenityHairdryerDescription.translation.content'),
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
                            <div key={amenity.id}
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