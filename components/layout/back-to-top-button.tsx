'use client';

import {HiArrowUp} from 'react-icons/hi2';
import {useTranslations} from 'next-intl';

export default function BackToTopButton() {
    const t = useTranslations('Footer');
    return (
        <button
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="md:absolute md:-top-6 md:right-0 w-12 aspect-square rounded-full bg-brand-dark-800 text-white inline-flex items-center justify-center hover:bg-brand-dark-900 transition-colors"
            aria-label={t('AriaLabelBackToTop.translation.content')}
            title={t('TitleBackToTop.translation.content')}
            type="button"
        >
            <HiArrowUp />
        </button>
    );
}
