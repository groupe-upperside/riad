'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {FaArrowRight, FaCoffee, FaInfoCircle, FaShower, FaSnowflake, FaWifi} from 'react-icons/fa'
import {cn} from "@/lib/utils/utils";
import {Room} from "@/lib/types";
import Link from "next/link";
import {useTranslations} from 'next-intl';

interface RoomCardProps {
    room: Room
    background?: string
}

export default function RoomCard({room, background}: RoomCardProps) {
    const t = useTranslations('RoomCard');
    const [showDetails, setShowDetails] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const commonAmenities = [
        {icon: FaShower, label: t('AmenityShower.translation.content')},
        {icon: FaWifi, label: t('AmenityWifiTV.translation.content')},
        {icon: FaCoffee, label: t('AmenityCoffeeMinibar.translation.content')},
        {icon: FaSnowflake, label: t('AmenityAirConditioning.translation.content')},
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const  roomLink = () => {
        switch (room.id) {
            case '1': return '/rooms/comfort'
            case '2': return '/rooms/deluxe'
            case '3': return '/rooms/suites'
            case '4': return '/rooms/special-suites'
            default: return '/rooms/comfort'
        }
    }

    return (
        <div
            className={`${background ? background : 'bg-brand-beige-100'} group relative overflow-hidden`}
            onMouseEnter={() => !isMobile && setShowDetails(true)}
            onMouseLeave={() => !isMobile && setShowDetails(false)}
        >
            <div className="p-6 pb-0 mb-4">
                <Link href={roomLink()} className="font-serif text-xl md:text-2xl text-brand-dark-800">
                    {room.title}
                </Link>
            </div>

            <div className="mx-6 relative h-64 md:h-72 xl:h-80 flex flex-col">
                <div className={cn(
                    "absolute inset-0 overflow-hidden transition-all duration-500",
                    showDetails && !isMobile ? "opacity-0 invisible" : "opacity-100 visible"
                )}>
                    <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                <div className={cn(
                    "absolute inset-0 bg-white border border-gray-300 transition-all duration-400 ease-out flex flex-col",
                    showDetails && !isMobile ? "translate-y-0 opacity-100 visible" : "translate-y-full opacity-0 invisible"
                )}>
                    <p className="px-4 py-3 text-sm leading-5 text-gray-700 border-b border-gray-300 flex-shrink-0">
                        {room.description}
                    </p>

                    <div className="flex-1 px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-6 content-center">
                        {commonAmenities.map((amenity, index) => {
                            const Icon = amenity.icon
                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div
                                        className="h-10 w-10 flex items-center justify-center bg-brand-beige-100 rounded-full mb-2">
                                        <Icon className="text-lg text-brand-gray"/>
                                    </div>
                                    <p className="text-[10px] font-medium uppercase text-brand-dark-700 leading-tight">
                                        {amenity.label}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {isMobile && showDetails && (
                <div
                    className="absolute inset-0 bg-white p-6 flex flex-col z-10 border border-gray-300 overflow-y-auto">
                    <div className="mb-4">
                        <h3 className="font-serif text-xl md:text-2xl text-brand-dark-800">
                            {room.title}
                        </h3>
                    </div>

                    <p className="text-sm leading-6 text-gray-700 border-b border-gray-300 pb-4 mb-4">
                        {room.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-4">
                        {commonAmenities.map((amenity, index) => {
                            const Icon = amenity.icon
                            return (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div
                                        className="h-8 w-8 flex items-center justify-center bg-brand-beige-100 rounded-full mb-2">
                                        <Icon className="text-lg text-brand-gray"/>
                                    </div>
                                    <p className="text-xs font-medium uppercase text-brand-dark-700 leading-tight">
                                        {amenity.label}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="text-sm text-brand-gray-500 mb-3"
                        >
                            {t('ButtonBack.translation.content')}
                        </button>
                        <Link href={"/booking"}
                              className="w-full bg-brand-dark-800 text-white py-3 font-semibold tracking-wider hover:bg-brand-gold-400 transition-colors duration-300 flex items-center justify-center gap-2">
                            {t('ButtonBookNow.translation.content')}
                            <FaArrowRight/>
                        </Link>
                    </div>
                </div>
            )}

            <div className="p-6 pt-4">
                {isMobile ? (
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="inline-flex items-center gap-2 text-brand-dark-800 font-semibold tracking-wider hover:text-brand-gold-400 transition-colors"
                    >
                        <FaInfoCircle/>
                        <span>{t('ButtonViewDetails.translation.content')}</span>
                    </button>
                ) : (
                    <Link href={"/booking"}
                          className="group/btn cursor-pointer inline-flex items-center font-semibold tracking-wider text-brand-dark-800 transition-all duration-700 ease-out hover:text-brand-gold-400">
                        <span
                            className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 translate-y-0.5 transition-[max-width,opacity,transform] duration-700 ease-out group-hover/btn:max-w-[180px] group-hover/btn:opacity-100 group-hover/btn:translate-y-0">
                            {t('ButtonBookNowHover.translation.content')}
                        </span>
                        <FaArrowRight
                            className="ml-0 transition-[margin,transform] duration-700 ease-out group-hover/btn:ml-2 group-hover/btn:translate-x-0.5"/>
                    </Link>
                )}
            </div>
        </div>
    )
}