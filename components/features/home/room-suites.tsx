import RoomsShowcase from '@/components/features/rooms/rooms-showcase';

import SectionHeader from '@/components/ui/section-header';
import ButtonLink from '@/components/ui/button-link';

import {useTranslations} from 'next-intl';

export default function RoomsSuites() {
    const t = useTranslations('RoomsSuites');
    return (
        <RoomsShowcase>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
                <SectionHeader label={t('Label.translation.content')} title={t('Title.translation.content')} dark />
                <ButtonLink
                    href="/rooms"
                    variant="outline"
                    showArrow
                    className="text-white uppercase border-white hover:bg-white hover:text-brand-dark-800"
                >
                    {t('ButtonAllRooms.translation.content')}
                </ButtonLink>
            </div>
        </RoomsShowcase>
    );
}
