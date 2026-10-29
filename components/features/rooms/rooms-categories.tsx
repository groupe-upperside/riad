import RoomsShowcase from '@/components/features/rooms/rooms-showcase';

import {useTranslations} from 'next-intl';

export default function RoomCategoriesGrid() {
    const t = useTranslations('RoomCategoriesGrid');
    return (
        <RoomsShowcase cardBackground="bg-white">
            <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl capitalize text-white">
                    {t('Title.translation.content')}
                </h2>
                <p className="text-base text-white max-w-3xl mx-auto mt-8">{t('Description.translation.content')}</p>
            </div>
        </RoomsShowcase>
    );
}
