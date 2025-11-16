import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";
import {useTranslations} from 'next-intl';

export const getEventSpacesDetailed = (t: (key: string) => string): ViewItem[] => [
    {
        id: "1",
        title: t('ProfessionalEventsTitle.translation.content'),
        subtitle: t('ProfessionalEventsSubtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png",
        imageAlt: t('ProfessionalEventsImageAlt.translation.content'),
        description: t('ProfessionalEventsDescription.translation.content')
    },
    {
        id: "2",
        title: t('PrivateEventsTitle.translation.content'),
        subtitle: t('PrivateEventsSubtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/61e7871271-6dd1d996f7a4cc2c0992.png",
        imageAlt: t('PrivateEventsImageAlt.translation.content'),
        description: t('PrivateEventsDescription.translation.content')
    },
    {
        id: "3",
        title: t('PreciousMomentsTitle.translation.content'),
        subtitle: t('PreciousMomentsSubtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f64c1a0ffb-976c7943c5562cb6b6a9.png",
        imageAlt: t('PreciousMomentsImageAlt.translation.content'),
        description: t('PreciousMomentsDescription.translation.content')
    },
    {
        id: "4",
        title: t('TotalExclusivityTitle.translation.content'),
        subtitle: t('TotalExclusivitySubtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8ead5dc2-9b054213d63436e9568a.png",
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