'use client'

import React from 'react';
import {FaBed, FaCrown, FaGem, FaGlassCheers, FaHeart, FaHome, FaStar, FaUsers} from 'react-icons/fa';
import IntroductionSection, {StatItem} from "@/components/common/introduction-section";
import {useTranslations} from 'next-intl';

export default function RoomsIntroduction() {
    const t = useTranslations('RoomsIntroduction');

    const roomsData = {
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f6d411a20e-a478a39d4494c6f8a3aa.png",
            alt: t('ImageAlt.translation.content'),
            priority: true
        },
        header: {
            label: t('HeaderLabel.translation.content'),
            title: t('HeaderTitle.translation.content')
        },
        content: {
            paragraphs: [
                t('Paragraph1.translation.content'),
                t('Paragraph2.translation.content')
            ]
        },
        stats: [
            {icon: FaBed, value: 3, label: t('StatComfort.translation.content')},
            {icon: FaStar, value: 9, label: t('StatDeluxe.translation.content')},
            {icon: FaGem, value: 3, label: t('StatSuites.translation.content')},
            {icon: FaCrown, value: 2, label: t('StatSpecialSuites.translation.content')}
        ] as StatItem[]
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

export function RestaurantIntroduction() {
    const t = useTranslations('RestaurantIntroduction');

    const restaurantData = {
        image: {
            src: "https://example.com/restaurant-image.jpg",
            alt: t('ImageAlt.translation.content'),
            priority: false
        },
        header: {
            label: t('HeaderLabel.translation.content'),
            title: t('HeaderTitle.translation.content')
        },
        content: {
            paragraphs: [
                t('Paragraph1.translation.content'),
                t('Paragraph2.translation.content')
            ]
        }
    };

    return (
        <IntroductionSection
            id="restaurant-intro"
            image={restaurantData.image}
            header={restaurantData.header}
            content={restaurantData.content}
            backgroundColor="bg-white"
        />
    );
}

export function SpaIntroduction() {
    const t = useTranslations('SpaIntroduction');

    const spaData = {
        image: {
            src: "https://example.com/spa-image.jpg",
            alt: t('ImageAlt.translation.content'),
            priority: false
        },
        header: {
            label: t('HeaderLabel.translation.content'),
            title: t('HeaderTitle.translation.content')
        },
        content: {
            paragraphs: [
                t('Paragraph1.translation.content'),
                t('Paragraph2.translation.content')
            ]
        }
    };

    return (
        <IntroductionSection
            id="spa-intro"
            image={spaData.image}
            header={spaData.header}
            content={spaData.content}
            backgroundColor="bg-brand-beige-50"
            className="border-t border-brand-gold/20"
        />
    );
}

export function EventsIntroduction() {
    const t = useTranslations('EventsIntroduction');

    const eventsData = {
        image: {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png",
            alt: t('ImageAlt.translation.content'),
            priority: true
        },
        header: {
            label: t('HeaderLabel.translation.content'),
            title: t('HeaderTitle.translation.content')
        },
        content: {
            paragraphs: [
                t('Paragraph1.translation.content'),
                t('Paragraph2.translation.content')
            ]
        }
    };

    const eventTypesStats: StatItem[] = [
        { icon: FaUsers, value: t('StatSeminarsValue.translation.content'), label: t('StatSeminarsLabel.translation.content') },
        { icon: FaGlassCheers, value: t('StatDinnersValue.translation.content'), label: t('StatDinnersLabel.translation.content') },
        { icon: FaHeart, value: t('StatWeddingsValue.translation.content'), label: t('StatWeddingsLabel.translation.content') },
        { icon: FaHome, value: t('StatPrivatizationValue.translation.content'), label: t('StatPrivatizationLabel.translation.content') }
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