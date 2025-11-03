'use client';

import {images} from '@/lib/constants';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

export default function HeroSection() {
    const t = useTranslations('HeroSection');

    return (
        <section className="relative flex flex-col lg:flex-row min-h-screen overflow-hidden">
            <div className="relative min-w-screen min-h-screen">
                <Image
                    src={images.hero}
                    alt={t('AltHeroImage.translation.content')}
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-black/40 z-10"/>

                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center py-12 px-4">
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight text-center">
                        {t('Title.translation.content')}
                    </h1>
                    <h2 className="text-xl md:text-2xl lg:text-3xl text-white mb-12 text-center">
                        {t('Subtitle.translation.content')}
                    </h2>
                    <p className="text-white text-lg leading-relaxed max-w-lg text-center">
                        {t('Description.translation.content')}
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-3/5 2xl:w-2/3 relative h-[400px] lg:h-auto">
            </div>
        </section>
    );
}