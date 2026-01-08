'use client';

import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import {images} from '@/lib/constants'
import Image from 'next/image'
import Link from "next/link";
import {useTranslations} from 'next-intl';

export default function AboutSection() {
    const t = useTranslations('AboutSection');

    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden">
                            <Image
                                src={images.aboutRiad}
                                alt={t('AltAboutRiad.translation.content')}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 px-8 lg:px-16">
                        <SectionHeader
                            label={t('LabelAboutUs.translation.content')}
                            title={t('TitleTraditionExcellence.translation.content')}
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            {t('DescriptionAboutUs.translation.content')}
                        </p>
                        <a href="https://riad-nashira-spa.hotelrunner.com/bv3/search" target="_blank">
                            <Button variant="outline"
                                    showArrow
                                    className="uppercase">
                                {t('ButtonReserve.translation.content')}
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:gap-0 mt-12 lg:mt-0 lg:grid-cols-2 items-center">
                    <div className="px-8 lg:px-16">
                        <SectionHeader
                            label={t('LabelExperience.translation.content')}
                            title={t('TitleLuxuryExperience.translation.content')}
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            {t('DescriptionExperience.translation.content')}
                        </p>
                        <Link href="/rooms">
                            <Button variant="outline" showArrow>
                                {t('ButtonChooseRoom.translation.content')}
                            </Button>
                        </Link>
                    </div>
                    <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden">
                        <Image
                            src={images.experienceSuite}
                            alt={t('AltLuxurySuite.translation.content')}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}