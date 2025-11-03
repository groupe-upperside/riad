import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/container';

interface ViewItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    imageAlt?: string;
    description?: string;
}

interface ViewsGalleryProps {
    title: string;
    description?: string;
    views: ViewItem[];
    columns?: 1 | 2 | 3 | 4;
    imageHeight?: string;
    backgroundColor?: string;
    className?: string;
    showOverlay?: boolean;
    overlayPosition?: 'bottom' | 'top' | 'center';
    showDescriptionBelow?: boolean;
    id?: string;
}

interface ViewCardProps {
    view: ViewItem;
    imageHeight: string;
    showOverlay: boolean;
    overlayPosition: 'bottom' | 'top' | 'center';
    showDescriptionBelow: boolean;
}

const ViewCard: React.FC<ViewCardProps> = ({
                                               view,
                                               imageHeight,
                                               showOverlay,
                                               overlayPosition,
                                               showDescriptionBelow
                                           }) => {
    const getOverlayPositionClasses = () => {
        switch (overlayPosition) {
            case 'top':
                return 'top-6 left-6';
            case 'center':
                return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
            case 'bottom':
            default:
                return 'bottom-6 left-6';
        }
    };

    return (
        <div className="group">
            <div className="relative">
                <div className={`${imageHeight} overflow-hidden rounded-lg shadow-lg`}>
                    <Image
                        src={view.image}
                        alt={view.imageAlt || view.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {showOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                    )}
                </div>
                <div className={`absolute ${getOverlayPositionClasses()} text-white`}>
                    <h3 className="font-serif text-2xl mb-2">{view.title}</h3>
                    <p className="text-sm opacity-90">{view.subtitle}</p>
                </div>
            </div>

            {showDescriptionBelow && view.description && (
                <div className="mt-4 px-2">
                    <p className="text-brand-gray text-sm leading-relaxed">
                        {view.description}
                    </p>
                </div>
            )}
        </div>
    );
};

const ViewsGallery: React.FC<ViewsGalleryProps> = ({
                                                       title,
                                                       description,
                                                       views,
                                                       columns = 2,
                                                       imageHeight = 'h-[350px]',
                                                       backgroundColor = 'bg-brand-beige-100',
                                                       className = '',
                                                       showOverlay = true,
                                                       overlayPosition = 'bottom',
                                                       showDescriptionBelow = false,
                                                       id
                                                   }) => {
    const getGridColumns = () => {
        switch (columns) {
            case 1:
                return 'grid-cols-1';
            case 3:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case 4:
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
            case 2:
            default:
                return 'grid-cols-1 md:grid-cols-2';
        }
    };

    return (
        <section className={`py-20 ${backgroundColor} ${className}`} id={id}>
            <Container>
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-base text-brand-gray-500 max-w-3xl mx-auto mt-8">
                            {description}
                        </p>
                    )}
                </div>

                <div className={`grid ${getGridColumns()} gap-12`}>
                    {views.map((view) => (
                        <ViewCard
                            key={view.id}
                            view={view}
                            imageHeight={imageHeight}
                            showOverlay={showOverlay}
                            overlayPosition={overlayPosition}
                            showDescriptionBelow={showDescriptionBelow}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ViewsGallery;

export type {ViewsGalleryProps, ViewItem};