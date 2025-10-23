import React from 'react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/section-header';
import {IconType} from 'react-icons';
import {clsx} from "clsx";

interface StatItem {
    icon: IconType;
    value: string | number;
    label: string;
}

interface IntroductionSectionProps {
    id?: string;
    image: {
        src: string;
        alt: string;
        priority?: boolean;
    };
    header: {
        label: string;
        title: string;
    };
    content: {
        paragraphs: string[];
    };
    stats?: StatItem[];
    className?: string;
    backgroundColor?: string;
}

interface StatsDisplayProps {
    stats: StatItem[];
    featuresColumns?: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, featuresColumns = 2 }) => {
    return (
        <div
            className={clsx(
                "grid gap-6 mb-2",
                featuresColumns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
            )}
        >
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="flex items-center space-x-3">
                        <Icon className="text-xl text-brand-gold" aria-hidden />
                        <p className="font-semibold text-brand-gray-500">
                            {stat.value} {stat.label}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
                                                                     id = "hero-section",
                                                                     image,
                                                                     header,
                                                                     content,
                                                                     stats,
                                                                     className = "",
                                                                     backgroundColor = "bg-brand-beige-100"
                                                                 }) => {
    return (
        <section id={id} className={`py-24 ${backgroundColor} ${className}`}>
            <div className="container mx-auto px-8">
                <div className="relative h-[600px] mb-16">
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={image.priority}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4">
                        <SectionHeader
                            label={header.label}
                            title={header.title}
                        />
                    </div>

                    <div className="md:col-span-8">
                        {content.paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className={`text-brand-gray text-base leading-relaxed ${
                                    index === 0 ? 'pt-4' :
                                        index === content.paragraphs.length - 1 ? 'mb-8 pt-4' :
                                            'pt-4'
                                }`}
                            >
                                {paragraph}
                            </p>
                        ))}

                        {stats && <StatsDisplay stats={stats} />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntroductionSection;

export type { IntroductionSectionProps, StatItem };