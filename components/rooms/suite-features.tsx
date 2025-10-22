import Container from "@/components/ui/container";
import clsx from "clsx";
import {ComponentType} from "react";

export type SuiteFeatureItem = {
    icon: ComponentType<{ className?: string }>;
    title: string;
    description: string;
    id?: string;
};

type SuiteFeaturesSectionProps = {
    id?: string;
    title: string;
    items: SuiteFeatureItem[];
    bgClass?: string;
    cardBgClass?: string;
    titleClass?: string;
    bodyClass?: string;
    iconClass?: string;
    rounded?: boolean;
    columns?: 1 | 2 | 3;
    className?: string;
};

export default function SuiteFeaturesSection({
                                                 id = "suite-features",
                                                 title,
                                                 items,
                                                 bgClass = "bg-white",
                                                 cardBgClass = "bg-brand-beige",
                                                 titleClass = "text-brand-dark",
                                                 bodyClass = "text-brand-gray",
                                                 iconClass = "text-brand-gold text-4xl",
                                                 rounded = true,
                                                 columns = 3,
                                                 className,
                                             }: SuiteFeaturesSectionProps) {
    const gridCols =
        columns === 1 ? "md:grid-cols-1" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";

    return (
        <section id={id} className={clsx("py-20", bgClass, className)}>
            <Container>
                <div className="text-center mb-16">
                    <h3 className={clsx("font-serif text-3xl mb-6", titleClass)}>{title}</h3>
                </div>

                <div className={clsx("grid grid-cols-1 gap-8", gridCols)}>
                    {items.map(({id, icon: Icon, title, description}) => (
                        <div
                            key={id ?? title}
                            id={id}
                            className={clsx(
                                "text-center p-8",
                                cardBgClass,
                                rounded && "rounded-lg"
                            )}
                        >
                            <Icon className={clsx(iconClass, "mb-6 mx-auto")}/>
                            <h4 className={clsx("font-serif text-xl mb-4", titleClass)}>{title}</h4>
                            <p className={clsx(bodyClass)}>{description}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}