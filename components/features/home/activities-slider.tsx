'use client';

import {useState} from 'react';
import {useMediaQuery} from '@/lib/hooks/use-media-query';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {useTranslations} from 'next-intl';
import {getActivities} from '@/lib/constants/home';

export default function ActivitiesSlider() {
    const t = useTranslations('ActivitiesSlider');
    const tConstants = useTranslations();
    const [currentIndex, setCurrentIndex] = useState(0);
    const mobile = useMediaQuery('(max-width: 767px)');
    const tablet = useMediaQuery('(max-width: 1023px)');
    const slidesToShow = mobile ? 1 : tablet ? 2 : 3;
    const activities = getActivities(tConstants);

    const maxIndex = Math.max(0, activities.length - slidesToShow);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <section className="py-16 md:py-24 bg-white">
            <Container>
                <SectionHeader
                    label={t('Label.translation.content')}
                    title={t('Title.translation.content')}
                    subtitle={t('Subtitle.translation.content')}
                    centered
                    className="mb-12"
                />

                <div className="relative overflow-hidden">
                    <div
                        style={{transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`}}
                        className="flex transition-transform duration-500 ease-in-out"
                    >
                        {activities.map((activity) => (
                            <div key={activity.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                                <div className="relative">
                                    <div className="h-64 md:h-96 overflow-hidden">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={activity.image}
                                            alt={activity.title}
                                        />
                                    </div>
                                    <div className="absolute top-4 left-4 bg-brand-gold text-brand-dark px-4 py-2 text-sm font-serif">
                                        {activity.title}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-8 space-x-3">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        aria-label={t('AriaLabelPrevious.translation.content')}
                        className="w-10 h-10 border cursor-pointer border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === maxIndex}
                        aria-label={t('AriaLabelNext.translation.content')}
                        className="w-10 h-10 border cursor-pointer border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-colors duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </Container>
        </section>
    );
}
