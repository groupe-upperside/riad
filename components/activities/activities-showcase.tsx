import React from 'react';
import {useTranslations} from 'next-intl';

export interface EventSpace {
    id: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
}

interface EventsShowcaseProps {
    title?: string;
    subtitle?: string;
    spaces: EventSpace[];
    className?: string;
}

interface SpaceCardProps {
    space: EventSpace;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
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

const ActivitiesShowcase: React.FC<EventsShowcaseProps> = ({
                                                               title,
                                                               subtitle,
                                                               spaces,
                                                               className = ""
                                                           }) => {
    const t = useTranslations('EventsShowcase');

    return (
        <section id="events-showcase" className={`py-24 bg-brand-beige ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">
                        {title || t('DefaultTitle.translation.content')}
                    </h2>
                    <p className="text-base leading-relaxed my-8 text-brand-gray-500">
                        {subtitle || t('DefaultSubtitle.translation.content')}
                    </p>
                </div>

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