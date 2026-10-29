import type {ActivitySpace} from '@/types/activity.type';
import ShowcaseHeader from '@/components/common/showcase-header';
import React from 'react';
import {useTranslations} from 'next-intl';

interface ActivitiesShowcaseProps {
    title?: string;
    subtitle?: string;
    spaces: ActivitySpace[];
    className?: string;
}

interface SpaceCardProps {
    space: ActivitySpace;
}

const SpaceCard: React.FC<SpaceCardProps> = ({space}) => {
    return (
        <div id={`${space.id}-card`} className="bg-white rounded-sm overflow-hidden group">
            <div className="h-64 overflow-hidden">
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={space.image.src}
                    alt={space.image.alt}
                />
            </div>
            <div className="p-6">
                <h3 className="font-serif text-xl text-brand-dark mb-3">{space.title}</h3>
                <p className="text-base leading-relaxed text-brand-gray-500 mb-4">{space.description}</p>
            </div>
        </div>
    );
};

const ActivitiesShowcase: React.FC<ActivitiesShowcaseProps> = ({title, subtitle, spaces, className = ''}) => {
    const t = useTranslations('EventsShowcase');

    return (
        <section id="events-showcase" className={`py-24 bg-brand-beige ${className}`}>
            <div className="container mx-auto px-4">
                <ShowcaseHeader
                    title={title || t('DefaultTitle.translation.content')}
                    subtitle={subtitle || t('DefaultSubtitle.translation.content')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {spaces.map((space) => (
                        <SpaceCard key={space.id} space={space} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitiesShowcase;
