import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";
import {useTranslations} from 'next-intl';

const getEventSpacesDetailed = (t: (key: string) => string): ViewItem[] => [
    {
        id: "1",
        title: t('EventSpacesDetailed.ProfessionalEvents.Title.translation.content'),
        subtitle: t('EventSpacesDetailed.ProfessionalEvents.Subtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png",
        imageAlt: t('EventSpacesDetailed.ProfessionalEvents.ImageAlt.translation.content'),
        description: t('EventSpacesDetailed.ProfessionalEvents.Description.translation.content')
    },
    {
        id: "2",
        title: t('EventSpacesDetailed.PrivateEvents.Title.translation.content'),
        subtitle: t('EventSpacesDetailed.PrivateEvents.Subtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/61e7871271-6dd1d996f7a4cc2c0992.png",
        imageAlt: t('EventSpacesDetailed.PrivateEvents.ImageAlt.translation.content'),
        description: t('EventSpacesDetailed.PrivateEvents.Description.translation.content')
    },
    {
        id: "3",
        title: t('EventSpacesDetailed.PreciousMoments.Title.translation.content'),
        subtitle: t('EventSpacesDetailed.PreciousMoments.Subtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f64c1a0ffb-976c7943c5562cb6b6a9.png",
        imageAlt: t('EventSpacesDetailed.PreciousMoments.ImageAlt.translation.content'),
        description: t('EventSpacesDetailed.PreciousMoments.Description.translation.content')
    },
    {
        id: "4",
        title: t('EventSpacesDetailed.TotalExclusivity.Title.translation.content'),
        subtitle: t('EventSpacesDetailed.TotalExclusivity.Subtitle.translation.content'),
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8ead5dc2-9b054213d63436e9568a.png",
        imageAlt: t('EventSpacesDetailed.TotalExclusivity.ImageAlt.translation.content'),
        description: t('EventSpacesDetailed.TotalExclusivity.Description.translation.content')
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