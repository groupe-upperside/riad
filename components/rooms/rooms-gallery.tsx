import Image from "next/image";
import Container from "@/components/ui/container";
import clsx from "clsx";

export type GalleryItem = {
    src: string;
    alt: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    priority?: boolean;
};

type RoomsGallerySectionProps = {
    id?: string;
    className?: string;
    heightClass?: string;
    gapClass?: string;
    rounded?: boolean;
    items: GalleryItem[];
};

export default function RoomsGallerySection({
                                                id = "gallery-section",
                                                className,
                                                heightClass = "md:h-[700px]",
                                                gapClass = "gap-4",
                                                rounded = false,
                                                items,
                                            }: RoomsGallerySectionProps) {
    return (
        <section id={id} className={clsx("py-24", className)}>
            <Container>
                <div
                    className={clsx(
                        "grid grid-cols-1 md:grid-cols-3 md:grid-rows-2",
                        gapClass,
                        heightClass
                    )}
                >
                    {items.map((item, i) => {
                        const col = item.colSpan ?? 1;
                        const row = item.rowSpan ?? 1;

                        return (
                            <div
                                key={i}
                                className={clsx(
                                    "relative w-full",
                                    "h-64 md:h-auto",
                                    rounded && "overflow-hidden rounded-sm shadow",
                                    col === 1 && "md:col-span-1",
                                    col === 2 && "md:col-span-2",
                                    col === 3 && "md:col-span-3",
                                    row === 1 && "md:row-span-1",
                                    row === 2 && "md:row-span-2"
                                )}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover"
                                    priority={item.priority}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}