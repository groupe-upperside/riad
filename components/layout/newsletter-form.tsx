'use client';

import {useState, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';
import {HiArrowUpRight} from 'react-icons/hi2';

export default function NewsletterForm() {
    const t = useTranslations('Footer');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubscribed(true);
        setEmail('');
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex border border-brand-dark-300/60 h-12 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold-400"
            >
                <label className="sr-only" htmlFor="newsletter-email">
                    {t('LabelYourEmail.translation.content')}
                </label>
                <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder={t('PlaceholderYourEmail.translation.content')}
                    className="input px-4"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button
                    type="submit"
                    className="border-l border-brand-dark-300/60 px-4 whitespace-nowrap text-sm font-semibold hover:bg-brand-gray-50 transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                >
                    <span>{t('ButtonSubscribe.translation.content')}</span>
                    <HiArrowUpRight className="-rotate-45" aria-hidden />
                </button>
            </form>
            {subscribed && <p className="mt-3 text-sm text-green-700">{t('SuccessMessage.translation.content')}</p>}
        </>
    );
}
