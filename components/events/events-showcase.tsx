import React from 'react';

export interface EventSpace {
    id: string;
    title: string;
    description: string;
    capacity: number;
    capacityUnit?: string;
    locationType: 'Intérieur' | 'Extérieur' | 'Intérieur/Extérieur';
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
        <div id={`${space.id}-card`} className="bg-white rounded-lg overflow-hidden group">
            <div className="h-64 overflow-hidden">
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={space.image.src}
                    alt={space.image.alt}
                />
            </div>
            <div className="p-6">
                <h3 className="font-serif text-2xl text-brand-dark mb-3">{space.title}</h3>
                <p className="text-brand-gray mb-4">{space.description}</p>
                <div className="flex justify-between items-center text-sm text-brand-gray">
                    <span>Capacité: {space.capacity} {space.capacityUnit || 'personnes'}</span>
                    <span className="text-brand-gold">{space.locationType}</span>
                </div>
            </div>
        </div>
    );
};

const EventsShowcase: React.FC<EventsShowcaseProps> = ({
                                                           title = "Nos Espaces Événementiels",
                                                           subtitle = "Des lieux d'exception adaptés à tous vos besoins, de l'intime au grandiose.",
                                                           spaces,
                                                           className = ""
                                                       }) => {
    return (
        <section id="events-showcase" className={`py-24 bg-brand-beige ${className}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-brand-dark mb-4">{title}</h2>
                    <p className="text-lg text-brand-gray max-w-3xl mx-auto">{subtitle}</p>
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

export default EventsShowcase;
