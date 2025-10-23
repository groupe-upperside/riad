import React from 'react';
import {cn} from '@/lib/utils/utils';

export interface FeatureItem {
    id: string;
    title: string;
    description: string;
}

export interface FeatureShowcaseImage {
    src: string;
    alt: string;
    span?: 'single' | 'double';
}

interface FeatureShowcaseProps {
    id?: string;
    label: string;
    title: string;
    description: string;
    features: FeatureItem[];
    images: FeatureShowcaseImage[];
    reverseLayout?: boolean;
    backgroundColor?: string;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
                                                                    id,
                                                                    label,
                                                                    title,
                                                                    description,
                                                                    features,
                                                                    images,
                                                                    reverseLayout = false,
                                                                    backgroundColor = 'bg-brand-beige'
                                                                }) => {
    return (
        <section id={id} className={cn("py-24", backgroundColor)}>
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={cn("grid grid-cols-2 gap-4", reverseLayout && "lg:order-1")}>
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "h-80 overflow-hidden rounded-sm",
                                    image.span === 'double' && "col-span-2"
                                )}
                            >
                                <img
                                    className="w-full h-full object-cover"
                                    src={image.src}
                                    alt={image.alt}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={cn("pr-8", reverseLayout && "lg:order-2")}>
                        <p className='text-xs font-semibold tracking-widest uppercase mb-2 text-brand-gold-400'>
                            {label}
                        </p>
                        <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">
                            {title}
                        </h2>
                        <p className="text-base leading-relaxed my-8 text-brand-gray-500">
                            {description}
                        </p>

                        <div className="mt-8 space-y-6">
                            {features.map((feature) => (
                                <div key={feature.id} id={feature.id}>
                                    <h4 className="font-serif text-xl text-brand-dark">
                                        {feature.title}
                                    </h4>
                                    <p className="text-base leading-relaxed  text-brand-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};