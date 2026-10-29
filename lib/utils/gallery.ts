import type {GalleryItem} from '@/types/gallery.type';

export function galleryItems(
    t: (key: string) => string,
    sources: readonly string[],
    prioritizeMiddle = false,
): GalleryItem[] {
    return sources.map((src, index) => ({
        src,
        alt: t(`GalleryItem${index + 1}Alt.translation.content`),
        colSpan: index === 1 ? 2 : 1,
        rowSpan: index === 1 ? 2 : 1,
        ...(index === 1 && prioritizeMiddle ? {priority: true} : {}),
    }));
}
