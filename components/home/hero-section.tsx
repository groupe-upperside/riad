'use client'

import {useState} from 'react'
import {FaCalendarAlt} from 'react-icons/fa'
import Button from '@/components/ui/button'
import {images} from '@/lib/constants'
import Image from 'next/image'

export default function HeroSection() {
    const [checkIn, setCheckIn] = useState<string>('10/10/2025')
    const [checkOut, setCheckOut] = useState<string>('10/10/2025')
    const [guests, setGuests] = useState<string>('2')

    return (
        <section className="relative flex flex-col lg:flex-row min-h-screen overflow-hidden">
            <div className="w-full lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-brand-beige-100 flex flex-col justify-center p-8 md:p-12 pt-24 lg:pt-12">
                <div>
                    <div className="mt-12 md:mt-24">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark-800 leading-tight">
                            Riad Nashira & SPA
                        </h1>
                        <h2 className="text-xl md:text-2xl lg:text-3xl text-brand-gray-500 mb-12">Luxe et sérénité au cœur de Marrakech</h2>
                        <p className="text-brand-gray-500 leading-relaxed max-w-lg">
                            {`Au cœur de la Médina, une maison d’exception où chaque instant devient une expérience de luxe et de sérénité. C’est l’élégance d’un riad authentique, sublimée par le bien–être, la gastronomie et l’hospitalité marocaine.`}
                        </p>
                    </div>
                </div>
                <div className="relative mt-12 z-10">
                    <div className="bg-white p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full lg:w-[175%] ">
                        <div className="flex-1 w-full">
                            <label className="text-xs text-brand-gray-500 tracking-widest uppercase">Check in</label>
                            <div className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full text-sm font-semibold border-none p-0 focus:outline-none"
                                />
                                <FaCalendarAlt className="text-brand-gray-500" />
                            </div>
                        </div>

                        <div className="hidden md:block border-l border-gray-200 self-stretch"></div>

                        <div className="flex-1 w-full">
                            <label className="text-xs text-brand-gray-500 tracking-widest uppercase">Check out</label>
                            <div className="flex items-center mt-2">
                                <input
                                    type="text"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full text-sm font-semibold border-none p-0 focus:outline-none"
                                />
                                <FaCalendarAlt className="text-brand-gray-500" />
                            </div>
                        </div>

                        <div className="hidden md:block border-l border-gray-200 self-stretch"></div>

                        <div className="flex-1 w-full">
                            <label className="text-xs text-brand-gray-500 tracking-widest uppercase">Nombre de personnes</label>
                            <input
                                type="text"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className="w-full text-sm font-semibold border-none p-0 mt-2 focus:outline-none"
                            />
                        </div>

                        <Button variant="primary" size="lg" showArrow className="w-full uppercase md:w-auto whitespace-nowrap">
                           réserver
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-3/5 2xl:w-2/3 relative h-[400px] lg:h-auto">
                <div className="absolute inset-0 h-full w-full">
                    <Image
                        src={images.hero}
                        alt="Luxurious hotel room"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}