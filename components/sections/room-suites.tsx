"use client"

import {images, rooms} from '@/lib/constants'
import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import {FaArrowRight} from 'react-icons/fa'
import Image from 'next/image'
import {useParallax} from "@/lib/hooks/use-parallax";

export default function RoomsSuites() {
    const parallax = useParallax({
        strength: 0.15,
        maxShift: 140,
        overscan: 0.3
    })

    return (
        <section className="relative overflow-hidden bg-brand-dark-800 py-16 md:py-24">
            <div
                className="absolute inset-0 pointer-events-none"
                ref={parallax.holderRef}
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        ...parallax.style,
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Image
                        src={images.patternOverlay}
                        alt=""
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>
            </div>

            <Container className="relative z-10 ">
                <div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
                    <SectionHeader
                        label="CHAMBRES"
                        title="Chambres & Suites"
                        dark
                    />
                    <Button variant="outline" showArrow
                            className="text-white uppercase border-white hover:bg-white hover:text-brand-dark-800">
                        toutes les chambres
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {rooms.map((room) => (
                        <div key={room.id} className="bg-brand-beige-100 p-6 group">
                            <h3 className="font-serif text-xl md:text-2xl text-brand-dark-800">
                                {room.title}
                            </h3>
                            <p className="text-brand-gold-400 font-semibold mb-4">
                                {room.price}€
                                <span className="text-brand-gray-500 font-normal text-sm"> / NUIT</span>
                            </p>
                            <div className="relative h-48 md:h-62 xl:h-80 2xl:h-96 overflow-hidden mb-6">
                                <Image
                                    src={room.image}
                                    alt={room.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <button
                                className="group cursor-pointer inline-flex items-center font-semibold tracking-wider text-brand-dark-800
             transition-all duration-700 ease-out hover:text-brand-gold-400"
                                aria-label="Réserver maintenant"
                            >
                                <span
                                    className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 translate-y-0.5
               transition-[max-width,opacity,transform] duration-700 ease-out
               group-hover:max-w-[180px] group-hover:opacity-100 group-hover:translate-y-0"
                                >
    Réserver maintenant
  </span>
                                <FaArrowRight className="ml-0 transition-[margin,transform] duration-700 ease-out group-hover:ml-2 group-hover:translate-x-0.5" />
                            </button>


                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}