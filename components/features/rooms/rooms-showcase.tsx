'use client';

import type {ReactNode} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import Container from '@/components/ui/container';
import RoomCard from '@/components/features/rooms/room-card';
import {getRooms} from '@/lib/constants/home';
import {images} from '@/lib/constants/images';
import {useParallax} from '@/lib/hooks/use-parallax';

export default function RoomsShowcase({children, cardBackground}: {children: ReactNode; cardBackground?: string}) {
    const t = useTranslations();
    const parallax = useParallax({strength: 0.15, maxShift: 140, overscan: 0.3});
    return (
        <section className="relative overflow-hidden bg-brand-dark-800 py-16 md:py-24">
            <div className="absolute inset-0 pointer-events-none" ref={parallax.holderRef} aria-hidden="true">
                <div className="absolute inset-0 opacity-10" style={{...parallax.style, width: '100%', height: '100%'}}>
                    <Image src={images.patternOverlay} alt="" fill priority className="object-cover" sizes="100vw" />
                </div>
            </div>
            <Container className="relative z-10">
                {children}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {getRooms(t).map((room) => (
                        <RoomCard key={room.id} room={room} background={cardBackground} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
