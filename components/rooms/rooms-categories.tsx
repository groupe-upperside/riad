'use client'

import Container from '@/components/ui/container'
import {images, rooms} from "@/lib/constants";
import RoomCard from "@/components/rooms/room-card";
import Image from "next/image";
import {useParallax} from "@/lib/hooks/use-parallax";
import {useTranslations} from 'next-intl';

export default function RoomCategoriesGrid() {
    const t = useTranslations('RoomCategoriesGrid');
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
                <div className="text-center mb-16">
                    <h2 className='font-serif text-4xl md:text-5xl capitalize text-white'>
                        {t('Title.translation.content')}
                    </h2>
                    <p className="text-base text-white max-w-3xl mx-auto mt-8">
                        {t('Description.translation.content')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} background="bg-white"/>
                    ))}
                </div>
            </Container>
        </section>
    )
}