'use client'

import Image from 'next/image'
import Container from '@/components/ui/container'

interface RoomHeroSectionProps {
    title: string;
    subtitle: string;
    image: string;
}

export default function RoomsHeroSection({title, subtitle, image}: RoomHeroSectionProps) {

    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0" >
                <div className="absolute inset-0" >
                    <Image
                        src={image}
                        alt="Vue panoramique du Riad"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/40"/>
            </div>

            <Container className="relative z-10 text-center text-white">
                <h1 className="font-serif text-5xl md:text-6xl font-normal mb-6">
                    {title}
                </h1>
                <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                    {subtitle}
                </p>
            </Container>
        </section>
    )
}