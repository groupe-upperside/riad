'use client';

import Image from 'next/image';
import {galleryImages} from '@/lib/constants';
import SectionHeader from "@/components/ui/section-header";
import {JSX} from "react";
import Container from "@/components/ui/container";

type GalleryItem = {
    id: string | number;
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

export default function GalleryColumns(): JSX.Element {
    const items = galleryImages as GalleryItem[];
    const columnsCount = 4;

    const cols: GalleryItem[][] = Array.from({length: columnsCount}, () => []);
    const heights = new Array(columnsCount).fill(0);

    for (const img of items) {
        let idx = 0;
        if (img.width && img.height) {
            const weight = img.height / img.width;
            idx = heights.indexOf(Math.min(...heights));
            heights[idx] += weight;
        } else {
            idx = items.indexOf(img) % columnsCount;
        }
        cols[idx].push(img);
    }

    return (
        <section className="py-16 md:py-24 bg-white">
            <Container>
                <SectionHeader
                    label="Galerie"
                    title="Notre galerie"
                    centered
                    className="mb-12"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cols.map((col, cIdx) => (
                        <div key={cIdx} className="grid gap-4">
                            {col.map((img) => (
                                <div key={img.id} className="overflow-hidden rounded-lg">
                                    {img.width && img.height ? (
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="h-auto max-w-full rounded-lg object-cover"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    ) : (
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            loading="lazy"
                                            className="h-auto max-w-full rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}