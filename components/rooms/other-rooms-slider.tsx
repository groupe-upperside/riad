'use client'

import Image from "next/image";
import Container from "@/components/ui/container";
import {useRef} from "react";
import clsx from "clsx";
import Link from "next/link";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import {HiArrowUpRight} from "react-icons/hi2";

export type RiadCard = {
    id?: string;
    imageSrc: string;
    imageAlt: string;
    meta: string;
    title: string;
    description: string;
    ctaLabel?: string;
    href?: string;
};

type OtherRiadsSliderProps = {
    id?: string;
    title?: string;
    items: RiadCard[];
    bgClass?: string;
    textTitleClass?: string;
    textBodyClass?: string;
    className?: string;
};

export default function OtherRiadsSlider({
                                             id = "other-riads-section",
                                             title = "Autres hébergements à découvrir",
                                             items,
                                             bgClass = "bg-white",
                                             textTitleClass = "text-brand-dark",
                                             textBodyClass = "text-brand-gray",
                                             className,
                                         }: OtherRiadsSliderProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const scrollByAmount = (dir: "prev" | "next") => {
        const track = trackRef.current;
        if (!track) return;
        const containerWidth = track.clientWidth;
        track.scrollBy({
            left: dir === "next" ? containerWidth : -containerWidth,
            behavior: "smooth",
        });
    };

    return (
        <section id={id} className={clsx("py-24", bgClass, className)}>
            <Container>
                <div className="flex justify-between items-center mb-12">
                    <h2 className={clsx("font-serif text-4xl md:text-5xl capitalize text-brand-dark", textTitleClass)}>{title}</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => scrollByAmount("prev")}
                            aria-label="Précédent"
                            className={clsx(
                                "h-10 w-10 border text-sm transition-colors cursor-pointer",
                                "border-gray-300 text-brand-gray hover:bg-gray-100 hover:border-brand-dark"
                            )}
                        >
                            <FaArrowLeft className="mx-auto"/>
                        </button>
                        <button
                            onClick={() => scrollByAmount("next")}
                            aria-label="Suivant"
                            className={clsx(
                                "h-10 w-10 border text-sm transition-colors cursor-pointer",
                                "border-gray-300 text-brand-gray hover:bg-gray-100 hover:border-brand-dark"
                            )}
                        >
                            <FaArrowRight className="mx-auto"/>
                        </button>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    className={clsx(
                        "flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory",
                        "[-ms-overflow-style:none] [scrollbar-width:none]",
                        "[&::-webkit-scrollbar]:hidden"
                    )}
                >
                    {items.map((card) => (
                        <article
                            key={card.id ?? card.title}
                            id={card.id}
                            className={clsx(
                                "snap-start shrink-0 w-[85%] sm:w-[70%] md:w-[48%]",
                                "transition-transform duration-200"
                            )}
                        >
                            <div className="relative h-[400px] mb-6">
                                <Image
                                    src={card.imageSrc}
                                    alt={card.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 48vw"
                                    priority={false}
                                />
                            </div>

                            <p className={clsx("text-xs tracking-widest mb-2 uppercase ", textBodyClass)}>{card.meta}</p>
                            <h3 className={clsx("font-serif text-3xl mb-4", textTitleClass)}>{card.title}</h3>
                            <p className={clsx("text-sm leading-relaxed mb-6", textBodyClass)}>{card.description}</p>
                            {card.ctaLabel && (
                                card.href ? (
                                    <Link
                                        href={card.href}
                                        aria-label={card.ctaLabel}
                                        className="group mt-6 inline-flex items-center gap-3 self-start cursor-pointer"
                                    >
                    <span className="relative uppercase pb-1 text-base font-medium text-brand-dark-800">
                      {card.ctaLabel}
                        <span
                            className="absolute bottom-0 left-0 h-[2px] w-3/4 bg-brand-gold transition-all group-hover:w-full group-hover:scale-x-110"/>
                    </span>
                                        <HiArrowUpRight className="transition-transform group-hover:translate-x-1"/>
                                    </Link>
                                ) : null
                            )}
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}