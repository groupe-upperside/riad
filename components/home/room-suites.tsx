'use client'

import {images, rooms} from '@/lib/constants'
import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import Image from 'next/image'
import {useParallax} from "@/lib/hooks/use-parallax"
import RoomCard from "@/components/rooms/room-card";

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

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
                    <SectionHeader
                        label="CHAMBRES"
                        title="Chambres & Suites"
                        dark
                    />
                    <Button
                        variant="outline"
                        showArrow
                        className="text-white uppercase border-white hover:bg-white hover:text-brand-dark-800"
                    >
                        toutes les chambres
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </Container>
        </section>
    )
}