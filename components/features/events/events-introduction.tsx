import {asset} from '@/lib/utils/asset';

import {FaGlassCheers, FaHeart, FaHome, FaUsers} from 'react-icons/fa';
import IntroductionSection, {StatItem} from '@/components/common/introduction-section';
import {useTranslations} from 'next-intl';

export default function EventsIntroduction() {
    const t = useTranslations('EventsIntroduction');

    const eventsData = {
        image: {
            src: asset('events/' + 'events_introduction.jpeg'),
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
    };

    const eventTypesStats: StatItem[] = [
        {
            icon: FaUsers,
            value: t('StatSeminarsValue.translation.content'),
            label: t('StatSeminarsLabel.translation.content'),
        },
        {
            icon: FaGlassCheers,
            value: t('StatDinnersValue.translation.content'),
            label: t('StatDinnersLabel.translation.content'),
        },
        {
            icon: FaHeart,
            value: t('StatWeddingsValue.translation.content'),
            label: t('StatWeddingsLabel.translation.content'),
        },
        {
            icon: FaHome,
            value: t('StatPrivatizationValue.translation.content'),
            label: t('StatPrivatizationLabel.translation.content'),
        },
    ];

    return (
        <IntroductionSection
            id="events-hero-section"
            image={eventsData.image}
            header={eventsData.header}
            content={eventsData.content}
            stats={eventTypesStats}
            backgroundColor="bg-brand-beige-100"
        />
    );
}
