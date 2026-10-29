import NewsletterForm from '@/components/layout/newsletter-form';
import BackToTopButton from '@/components/layout/back-to-top-button';
import {asset} from '@/lib/utils/asset';
import ContactItem from '@/components/layout/contact-item';
import SocialLinks from '@/components/layout/social-links';
import {SITE_CONTACT, BOOKING_URL} from '@/lib/constants/site';

import {JSX} from 'react';
import Link from 'next/link';
import {HiArrowUpRight, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone, HiPaperAirplane} from 'react-icons/hi2';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

type NavLink = {label: string; href: string};

export default function Footer(): JSX.Element {
    const t = useTranslations('Footer');

    const usefulLeft: NavLink[] = [
        {label: t('NavHome.translation.content'), href: '/'},
        {label: t('NavAccommodations.translation.content'), href: '/rooms'},
        {label: t('NavBarsRestaurants.translation.content'), href: '/bars-restaurants'},
        {label: t('NavSpaWellness.translation.content'), href: '/spa'},
    ];
    const usefulRight: NavLink[] = [
        {label: t('NavEvents.translation.content'), href: '/events'},
        {label: t('NavActivities.translation.content'), href: '/activities'},
        {label: t('NavServices.translation.content'), href: '/services'},
        {label: t('NavContact.translation.content'), href: '/contact'},
    ];

    const contact = {...SITE_CONTACT, cta: {label: t('CtaBookNow.translation.content'), href: BOOKING_URL}};

    const copyright = t('Copyright.translation.content');

    const tcs = t('TCs.translation.content');

    return (
        <footer className="bg-brand-beige-100 text-brand-dark-800 pt-16 md:pt-24 pb-6">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 pb-12 md:pb-16">
                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            {t('TitleUsefulLinks.translation.content')}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:gap-16 gap-3">
                            <ul className="space-y-3">
                                {usefulLeft.map((l) => (
                                    <li key={l.label}>
                                        <Link className="hover:text-brand-gold-500 transition-colors" href={l.href}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3">
                                {usefulRight.map((l) => (
                                    <li key={l.label}>
                                        <Link className="hover:text-brand-gold-500 transition-colors" href={l.href}>
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            {t('TitleContactUs.translation.content')}
                        </h3>
                        <div className="space-y-4">
                            {contact.reception && (
                                <ContactItem variant="footer" icon={HiPaperAirplane}>
                                    <a
                                        href={`tel:${contact.reception.replace(/\s/g, '')}`}
                                        className="text-sm md:text-base"
                                    >
                                        {t('LabelReception.translation.content')}: {contact.reception}
                                    </a>
                                </ContactItem>
                            )}
                            {contact.office && (
                                <ContactItem variant="footer" icon={HiOutlinePhone}>
                                    <a
                                        href={`tel:${contact.office.replace(/\s/g, '')}`}
                                        className="text-sm md:text-base"
                                    >
                                        {t('LabelMobile.translation.content')}: {contact.office}
                                    </a>
                                </ContactItem>
                            )}
                            {contact.email && (
                                <ContactItem variant="footer" icon={HiOutlineEnvelope}>
                                    <a
                                        className="text-sm md:text-base hover:text-brand-gold-500 transition-colors"
                                        href={`mailto:${contact.email}`}
                                    >
                                        {contact.email}
                                    </a>
                                </ContactItem>
                            )}
                            {contact.address && (
                                <ContactItem variant="footer" icon={HiOutlineMapPin}>
                                    <span className="text-sm md:text-base">{contact.address}</span>
                                </ContactItem>
                            )}
                        </div>

                        {contact.cta && (
                            <a
                                href={contact.cta.href}
                                target="_blank"
                                className="mt-8 inline-flex items-center uppercase gap-2 btn-primary"
                                aria-label={contact.cta.label}
                            >
                                <span>{contact.cta.label}</span>
                                <HiArrowUpRight className="-rotate-45" aria-hidden />
                            </a>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            {t('TitleNewsletter.translation.content')}
                        </h3>

                        <NewsletterForm />

                        <Image
                            src={asset('payzone.png')}
                            alt="Payzone - paiement sécurisé"
                            width={1162}
                            height={120}
                            className="mt-8 w-full h-auto"
                        />
                    </div>
                </div>

                <div className="border-t border-brand-dark-200 pt-6 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center relative">
                    <p className="text-sm text-brand-gray-600 text-center md:text-left">
                        {copyright} -{' '}
                        <a href={asset('cgv.pdf')} target="_blank">
                            {tcs}
                        </a>
                    </p>

                    <div className="flex items-center gap-2">
                        <SocialLinks />
                    </div>

                    <BackToTopButton />
                </div>
            </div>
        </footer>
    );
}
