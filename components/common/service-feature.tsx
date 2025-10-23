import React from 'react';
import Image from 'next/image';
import Container from '@/components/ui/container';
import {IconType} from 'react-icons';
import {FaCheck} from 'react-icons/fa';

interface ServiceImage {
    src: string;
    alt: string;
}

interface ServiceFeatureItem {
    icon?: IconType;
    text: string;
}

interface ServiceFeatureProps {
    id?: string;
    category: string;
    title: string;
    description: string[];
    features: ServiceFeatureItem[] | string[];
    images: {
        primary: ServiceImage;
        secondary: ServiceImage;
    };
    cta?: {
        text: string;
        onClick?: () => void;
        href?: string;
    };
    imagePosition?: 'left' | 'right';
    backgroundColor?: string;
    className?: string;
}

interface OverlappingImagesProps {
    images: {
        primary: ServiceImage;
        secondary: ServiceImage;
    };
    position: 'left' | 'right';
}

// Overlapping Images Component
const OverlappingImages: React.FC<OverlappingImagesProps> = ({ images, position }) => {
    const primaryPositionClass = position === 'left'
        ? 'top-0 left-0'
        : 'top-0 right-0';

    const secondaryPositionClass = position === 'left'
        ? 'bottom-0 right-0'
        : 'bottom-0 left-0';

    return (
        <div className="relative h-[600px] flex items-center justify-center">
            <div className={`absolute ${primaryPositionClass} h-[450px] w-[70%]`}>
                <Image
                    className="h-full w-full object-cover rounded-md"
                    src={images.primary.src}
                    alt={images.primary.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
            <div className={`absolute ${secondaryPositionClass} h-[400px] w-[65%] z-10 shadow-2xl`}>
                <Image
                    className="h-full w-full object-cover rounded-md"
                    src={images.secondary.src}
                    alt={images.secondary.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>
        </div>
    );
};

// Features List Component
const FeaturesList: React.FC<{ features: ServiceFeatureItem[] | string[] }> = ({ features }) => {
    return (
        <div className="flex flex-wrap items-center gap-6 text-brand-gray mb-10">
            {features.map((feature, index) => {
                const isString = typeof feature === 'string';
                const Icon = isString ? FaCheck : (feature.icon || FaCheck);
                const text = isString ? feature : feature.text;

                return (
                    <div key={index} className="flex items-center space-x-2">
                        <Icon className="text-brand-gold w-4 h-4" />
                        <span>{text}</span>
                    </div>
                );
            })}
        </div>
    );
};

// Main Component
const ServiceFeature: React.FC<ServiceFeatureProps> = ({
                                                           id,
                                                           category,
                                                           title,
                                                           description,
                                                           features,
                                                           images,
                                                           cta,
                                                           imagePosition = 'right',
                                                           backgroundColor = 'bg-white',
                                                           className = ''
                                                       }) => {
    const sectionId = id || `${title.toLowerCase().replace(/\s+/g, '-')}-section`;

    const ContentSection = () => (
        <div>
            <p className="text-brand-gold tracking-widest font-medium text-sm mb-4">
                {category.toUpperCase()}
            </p>
            <h2 className="font-serif text-5xl text-brand-dark mb-6">{title}</h2>
            {description.map((paragraph, index) => (
                <p
                    key={index}
                    className={`text-brand-gray text-lg leading-relaxed ${
                        index === description.length - 1 ? 'mb-8' : 'mb-6'
                    }`}
                >
                    {paragraph}
                </p>
            ))}
            <FeaturesList features={features} />
        </div>
    );

    return (
        <section id={sectionId} className={`py-24 ${backgroundColor} ${className}`}>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {imagePosition === 'left' ? (
                        <>
                            <OverlappingImages images={images} position="left" />
                            <ContentSection />
                        </>
                    ) : (
                        <>
                            <ContentSection />
                            <OverlappingImages images={images} position="right" />
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
};

export default ServiceFeature;

// Export types for external use
export type { ServiceFeatureProps, ServiceFeatureItem, ServiceImage };