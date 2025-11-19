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
            image: process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_patio_1.jpeg'
        },
        {
            id: 'fontaine',
            title: t('ViewFontaine.Title.translation.content'),
            subtitle: t('ViewFontaine.Subtitle.translation.content'),
            image: process.env.NEXT_PUBLIC_CDN_URL + 'rooms/' + 'rooms_patio_2.jpeg'
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