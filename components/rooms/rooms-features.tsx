import Image from "next/image";
import Container from "@/components/ui/container";
import clsx from "clsx";
import {ComponentType} from "react";

export type Feature = {
    icon: ComponentType<{ className?: string }>;
    label: string;
    description?: string;
};

type RoomFeaturesProps = {
    id?: string;
    title: string;
    subtitle?: string;
    description: string;
    features: Feature[];
    imageSrc: string;
    imageAlt: string;
    imagePriority?: boolean;
    imageHeightClass?: string;
    imagePosition?: "left" | "right";
    bgClass?: string;
    textTone?: "dark" | "light";
    accentClass?: string;
    featuresColumns?: 1 | 2;
    className?: string;
};

export default function RoomFeatures({
                                         id,
                                         title,
                                         subtitle,
                                         description,
                                         features,
                                         imageSrc,
                                         imageAlt,
                                         imagePriority,
                                         imageHeightClass = "h-[500px]",
                                         imagePosition = "right",
                                         bgClass = "bg-white",
                                         textTone = "dark",
                                         accentClass = "text-brand-gold",
                                         featuresColumns = 2,
                                         className,
                                     }: RoomFeaturesProps) {
    const isLight = textTone === "light";

    return (
        <section
            id={id}
            className={clsx("py-20", bgClass, className, {
                "text-white": isLight,
                "text-brand-dark": !isLight,
            })}
        >
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div
                        className={clsx(
                            "relative w-full overflow-hidden rounded-sm shadow-lg",
                            imageHeightClass,
                            imagePosition === "left" ? "order-1" : "order-2",
                            imagePosition === "left" ? "lg:order-1" : "lg:order-2"
                        )}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority={imagePriority}
                            className="object-cover"
                            sizes="(max-width:1024px) 100vw, 50vw"
                        />
                    </div>

                    <div
                        className={clsx(
                            imagePosition === "left" ? "order-2 lg:order-2" : "order-1 lg:order-1"
                        )}
                    >
                        {subtitle && (
                            <p
                                className={clsx(
                                    "tracking-widest mb-3 text-sm",
                                    isLight ? "text-white" : "text-brand-gray"
                                )}
                            >
                                {subtitle}
                            </p>
                        )}

                        <h2
                            className={clsx(
                                "font-serif text-4xl md:text-5xl capitalize",
                                isLight ? "text-white" : "text-brand-dark"
                            )}
                        >
                            {title}
                        </h2>

                        <p
                            className={clsx(
                                "text-base leading-relaxed my-8",
                                isLight ? "text-white" : "text-brand-gray-500"
                            )}
                        >
                            {description}
                        </p>

                        <div
                            className={clsx(
                                "grid gap-6 mb-2",
                                featuresColumns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                            )}
                        >
                            {features.map((f) => {
                                const Icon = f.icon;
                                return (
                                    <div key={f.label} className="flex items-center space-x-3">
                                        <Icon className={clsx(accentClass, "text-xl")}/>
                                        <div className={clsx(isLight ? "text-white" : "text-brand-gray-500")}>
                                            <p className="font-semibold">{f.label}</p>
                                            <p className="text-brand-gray-400">{f.description}</p>

                    </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}