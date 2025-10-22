import Image from "next/image";
import clsx from "clsx";
import type {ReactNode} from "react";

export type OverviewFact = {
    icon: ReactNode;
    label: string;
};

type OverviewSectionProps = {
    id?: string;
    badge?: string;
    badgeToneClass?: string;
    meta?: string;
    title: string;
    paragraphs: string[];
    facts?: OverviewFact[];
    imageSrc: string;
    imageAlt: string;
    imagePriority?: boolean;
    imageHeightClass?: string;
    reverse?: boolean;
    className?: string;
};

export default function OverviewSection({
                                            id,
                                            badge,
                                            badgeToneClass = "bg-brand-gold text-white",
                                            meta,
                                            title,
                                            paragraphs,
                                            facts = [],
                                            imageSrc,
                                            imageAlt,
                                            imagePriority,
                                            imageHeightClass = "h-[500px]",
                                            reverse = false,
                                            className,
                                        }: OverviewSectionProps) {
    return (
        <section id={id} className={clsx("py-20 bg-white", className)}>
            <div className="container mx-auto px-4">
                <div
                    className={clsx(
                        "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
                        reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
                    )}
                >
                    <div>
                        {(badge || meta) && (
                            <div className="flex items-center space-x-4 mb-6">
                                {badge && (
                                    <div
                                        className={clsx(
                                            "px-3 py-1 text-sm font-semibold tracking-wider rounded",
                                            badgeToneClass
                                        )}
                                    >
                                        {badge}
                                    </div>
                                )}
                                {meta && <span className="text-brand-gray text-sm">{meta}</span>}
                            </div>
                        )}

                        <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark mb-6">{title}</h2>

                        {paragraphs.map((p, idx) => (
                            <p key={idx} className="text-brand-gray-500 leading-relaxed mb-8">
                                {p}
                            </p>
                        ))}

                        {facts.length > 0 && (
                            <div className="flex flex-wrap items-center gap-6 text-brand-dark">
                                {facts.map((f, i) => (
                                    <div key={i} className="flex items-center space-x-2">
                                        <span className="text-brand-gold">{f.icon}</span>
                                        <span className="text-sm font-medium">{f.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={clsx("relative w-full rounded-sm shadow-xl overflow-hidden", imageHeightClass)}>
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            priority={imagePriority}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}