import {asset} from '@/lib/utils/asset';

import {FaBed, FaCrown, FaGem, FaStar} from 'react-icons/fa';
import IntroductionSection, {StatItem} from '@/components/common/introduction-section';
import {useTranslations} from 'next-intl';

export default function RoomsIntroduction() {
    const t = useTranslations('RoomsIntroduction');

    const roomsData = {
        image: {
            src: asset('rooms/' + 'rooms_introduction.jpeg'),
            alt: t('ImageAlt.translation.content'),
            priority: true,
        },
        header: {
            label: t('HeaderLabel.translation.content'),
            title: t('HeaderTitle.translation.content'),
        },
        content: {
            paragraphs: [t('Paragraph1.translation.content'), t('Paragraph2.translation.content')],
        },
        stats: [
            {icon: FaBed, value: 3, label: t('StatComfort.translation.content')},
            {icon: FaStar, value: 9, label: t('StatDeluxe.translation.content')},
            {icon: FaGem, value: 3, label: t('StatSuites.translation.content')},
            {icon: FaCrown, value: 2, label: t('StatSpecialSuites.translation.content')},
        ] satisfies StatItem[],
    };

    return (
        <IntroductionSection
            id="rooms-hero-section"
            image={roomsData.image}
            header={roomsData.header}
            content={roomsData.content}
            stats={roomsData.stats}
            backgroundColor="bg-brand-beige-100"
        />
    );
}
