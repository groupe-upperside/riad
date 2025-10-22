import Image from "next/image";
import Container from "@/components/ui/container";
import clsx from "clsx";
import Link from "next/link";
import type {ComponentType, ReactNode} from "react";

export type Bullet = {
    icon?: ComponentType<{ className?: string }>;
    label: string;
};

export type CtaAction = {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ComponentType<{ className?: string }>;
    variant?: "primary" | "outline";
};

type BookingCtaSectionProps = {
    id?: string;
    title: string;
    subtitle?: string;
    bullets?: Bullet[];
    actions?: CtaAction[];

    imageSrc: string;
    imageAlt: string;
    imagePriority?: boolean;
    imageHeightClass?: string;
    imagePosition?: "left" | "right";

    bgClass?: string;
    textTone?: "light" | "dark";
    accentClass?: string;
    cardShadow?: boolean;

    className?: string;
};

export default function BookingCtaSection({
                                              id = "booking-section",
                                              title,
                                              subtitle,
                                              bullets = [],
                                              actions = [],
                                              imageSrc,
                                              imageAlt,
                                              imagePriority,
                                              imageHeightClass = "h-[400px]",
                                              imagePosition = "right",
                                              bgClass = "bg-brand-gold",
                                              textTone = "light",
                                              accentClass = "text-brand-gold",
                                              cardShadow = true,
                                              className,
                                          }: BookingCtaSectionProps) {
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
                    <div className={clsx(imagePosition === "left" ? "order-2 lg:order-2" : "order-1 lg:order-1")}>
                        <h2 className="font-serif text-4xl md:text-5xl capitalize mb-6">{title}</h2>

                        {subtitle && (
                            <p className={clsx("text-base mb-8", isLight ? "opacity-90" : "text-brand-gray-600")}>
                                {subtitle}
                            </p>
                        )}

                        {bullets.length > 0 && (
                            <div className="space-y-4 mb-8">
                                {bullets.map((b, i) => {
                                    const Icon = b.icon;
                                    return (
                                        <div key={i} className="flex items-center space-x-3">
                                            {Icon ? (
                                                <Icon
                                                    className={clsx("text-xl", isLight ? "text-white" : accentClass)}/>
                                            ) : (
                                                <span
                                                    className={clsx("inline-block w-2 h-2 rounded-full", isLight ? "bg-white" : "bg-current")}/>
                                            )}
                                            <span
                                                className={clsx(isLight ? "text-white" : "text-brand-dark")}>{b.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {actions.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                {actions.map((a, idx) => {
                                    const Icon = a.icon;
                                    const base =
                                        "px-8 py-4 font-semibold tracking-wider transition-colors duration-300 group inline-flex items-center justify-center";
                                    const filled = clsx(
                                        isLight ? "bg-white text-brand-gold hover:bg-gray-100" : "bg-brand-dark text-white hover:opacity-90"
                                    );
                                    const outline = clsx(
                                        isLight
                                            ? "border-2 border-white text-white hover:bg-white hover:text-brand-gold"
                                            : "border-2 border-current text-current hover:bg-current hover:text-white"
                                    );
                                    const classes = clsx(base, a.variant === "outline" ? outline : filled);

                                    const content: ReactNode = (
                                        <>
                                            {a.label}
                                            {Icon && <Icon
                                                className="ml-2 transition-transform duration-300 group-hover:scale-110"/>}
                                        </>
                                    );

                                    if (a.href) {
                                        return (
                                            <Link key={idx} href={a.href} className={classes}>
                                                {content}
                                            </Link>
                                        );
                                    }
                                    return (
                                        <button key={idx} type="button" onClick={a.onClick} className={classes}>
                                            {content}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div
                        className={clsx(
                            "relative w-full overflow-hidden rounded-sm",
                            imageHeightClass,
                            imagePosition === "left" ? "order-1 lg:order-1" : "order-2 lg:order-2",
                            cardShadow && "shadow-xl"
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
                </div>
            </Container>
        </section>
    );
}