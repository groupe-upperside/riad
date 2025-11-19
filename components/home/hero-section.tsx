'use client';

import {images} from '@/lib/constants';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from "react";

export default function HeroSection() {
    const t = useTranslations('HeroSection');

    const heroImages = [
        images.hero1,
        images.hero2,
        images.hero3,
        images.hero4,
        images.hero5,
        images.hero6,
        images.hero7,
        images.hero8,
        images.hero9,
        images.hero10,
        images.hero11,
        images.hero12,
        images.hero13,
        images.hero14,
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (heroImages.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % heroImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <section className="relative h-screen overflow-hidden">
            <div className="relative min-w-screen min-h-screen">
                <div className="absolute inset-0">
                    {heroImages.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={t('AltHeroImage.translation.content')}
                            fill
                            className={`object-cover transition-opacity duration-1000 ease-in-out ${
                                index === currentIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                            priority={index === 0}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-black/40 z-10"/>

                <div className="absolute inset-0 z-20 flex flex-col justify-end items-center pb-38 px-4">
                    <h2 className="text-2xl lg:text-5xl text-white mb-8 text-center">
                        {t('Subtitle.translation.content')}
                    </h2>
                    <p className="text-white text-xl leading-relaxed max-w-lg text-center">
                        {t('Description.translation.content')}
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-3/5 2xl:w-2/3 relative h-[400px] lg:h-auto">
            </div>
        </section>
    );
}