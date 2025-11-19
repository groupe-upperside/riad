import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";
import {useTranslations} from 'next-intl';

export const getEventSpacesDetailed = (t: (key: string) => string): ViewItem[] => [
    {
        id: "1",
        title: t('ProfessionalEventsTitle.translation.content'),
        subtitle: t('ProfessionalEventsSubtitle.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_header.jpeg',
        imageAlt: t('ProfessionalEventsImageAlt.translation.content'),
        description: t('ProfessionalEventsDescription.translation.content')
    },
    {
        id: "2",
        title: t('PrivateEventsTitle.translation.content'),
        subtitle: t('PrivateEventsSubtitle.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_private.jpeg',
        imageAlt: t('PrivateEventsImageAlt.translation.content'),
        description: t('PrivateEventsDescription.translation.content')
    },
    {
        id: "3",
        title: t('PreciousMomentsTitle.translation.content'),
        subtitle: t('PreciousMomentsSubtitle.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_precious.jpeg',
        imageAlt: t('PreciousMomentsImageAlt.translation.content'),
        description: t('PreciousMomentsDescription.translation.content')
    },
    {
        id: "4",
        title: t('TotalExclusivityTitle.translation.content'),
        subtitle: t('TotalExclusivitySubtitle.translation.content'),
        image: process.env.NEXT_PUBLIC_CDN_URL + 'events/' + 'events_exclusive.jpeg',
        imageAlt: t('TotalExclusivityImageAlt.translation.content'),
        description: t('TotalExclusivityDescription.translation.content')
    }
];

export function EventSpacesDetailed() {
    const t = useTranslations('EventSpacesDetailed');

    return (
        <ViewsGallery
            id={"events"}
            title={t('MainTitle.translation.content')}
            views={getEventSpacesDetailed(t)}
            columns={2}
            imageHeight="h-[400px]"
            showDescriptionBelow={true}
            showOverlay={true}
            overlayPosition="bottom"
            backgroundColor={"bg-white"}
        />
    );
}