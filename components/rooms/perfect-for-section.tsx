import Container from "@/components/ui/container";
import clsx from "clsx";
import {ComponentType} from "react";

export type PerfectForItem = {
    id?: string;
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
};

type PerfectForSectionProps = {
    id?: string;
    title: string;
    intro?: string;
    items: PerfectForItem[];
    bgClass?: string;
    cardBgClass?: string;
    accentClass?: string;
    textTitleClass?: string;
    textBodyClass?: string;
    columns?: 1 | 2 | 3;
    iconSizeClass?: string;
    className?: string;
};

export default function PerfectForSection({
                                              id = "perfect-for-section",
                                              title,
                                              intro,
                                              items,
                                              bgClass = "bg-brand-beige",
                                              cardBgClass = "bg-white",
                                              accentClass = "bg-brand-gold text-white",
                                              textTitleClass = "text-brand-dark",
                                              textBodyClass = "text-brand-gray",
                                              columns = 3,
                                              iconSizeClass = "text-2xl",
                                              className,
                                          }: PerfectForSectionProps) {
    const gridCols =
        columns === 1 ? "md:grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

    return (
        <section id={id} className={clsx("py-20", bgClass, className)}>
            <Container>
                <div className="text-center mb-16">
                    <h2 className={clsx("font-serif text-4xl md:text-5xl capitalize text-brand-dark mb-6", textTitleClass)}>{title}</h2>
                    {intro && (
                        <p className={clsx("text-base text-brand-gray-500 max-w-3xl mx-auto mt-8", textBodyClass)}>{intro}</p>
                    )}
                </div>

                <div className={clsx("grid grid-cols-1 gap-8", gridCols)}>
                    {items.map(({id, icon: Icon, title, description}) => (
                        <div
                            key={id ?? title}
                            id={id}
                            className={clsx(
                                "text-center p-8 rounded-lg shadow-lg transition-transform duration-200",
                                cardBgClass,
                                "hover:-translate-y-0.5"
                            )}
                        >
                            <div
                                className={clsx(
                                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6",
                                    accentClass
                                )}
                            >
                                <Icon className={iconSizeClass}/>
                            </div>

                            <h3 className={clsx("font-serif text-2xl mb-4", textTitleClass)}>{title}</h3>
                            <p className={clsx(textBodyClass)}>{description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}