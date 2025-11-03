'use client'

import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";
import {useTranslations} from 'next-intl';

export function PatioViews() {
    const t = useTranslations('PatioViews');

    const patioViewsData: ViewItem[] = [
        {
            id: 'piscine',
            title: t('ViewPiscine.Title.translation.content'),
            subtitle: t('ViewPiscine.Subtitle.translation.content'),
            image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4f43fb3cce-280346dc4f66128d6913.png'
        },
        {
            id: 'fontaine',
            title: t('ViewFontaine.Title.translation.content'),
            subtitle: t('ViewFontaine.Subtitle.translation.content'),
            image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ca81908e4c-3cecebeed056ac2b76aa.png'
        }
    ];

    return (
        <ViewsGallery
            title={t('Title.translation.content')}
            description={t('Description.translation.content')}
            views={patioViewsData}
            columns={2}
        />
    );
}