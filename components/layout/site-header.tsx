'use client';
import ContactItem from '@/components/layout/contact-item';
import SocialLinks from '@/components/layout/social-links';
import {SITE_CONTACT, BOOKING_URL} from '@/lib/constants/site';

import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {
    HiArrowUpRight,
    HiOutlineDevicePhoneMobile,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
} from 'react-icons/hi2';
import {cn} from '@/lib/utils/cn';
import Image from 'next/image';
import {LiaTimesSolid} from 'react-icons/lia';

import ClientPortal from '../common/client-portal';

import MultiLevelMenu from '@/components/layout/multi-level-menu';
import {usePathname} from '@/lib/i18n/routing';
import {RxHamburgerMenu} from 'react-icons/rx';
import {useTranslations} from 'next-intl';
import LocaleSwitcher from '@/components/layout/locale-switcher';

export default function Header(): JSX.Element {
    const t = useTranslations('Header');

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [headerH, setHeaderH] = useState<number>(0);

    const path = usePathname();

    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const measure = () => {
            if (ref.current) setHeaderH(ref.current.getBoundingClientRect().height);
        };
        measure();

        const ro = new ResizeObserver(measure);
        if (ref.current) ro.observe(ref.current);

        window.addEventListener('resize', measure);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    useEffect(() => {
        if (!isMenuOpen || typeof document === 'undefined') return;
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = original;
        };
    }, [isMenuOpen]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        if (!isMenuOpen || typeof window === 'undefined') return;
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMenuOpen, onKeyDown]);

    const contact = {...SITE_CONTACT, cta: {label: t('CtaBookNow.translation.content'), href: '/booking'}};

    return (
        <>
            <header
                ref={ref}
                role="banner"
                className={cn(
                    'py-2',
                    scrolled
                        ? 'fixed top-0 left-0 w-full z-50'
                        : path !== '/'
                          ? 'block'
                          : 'absolute top-0 left-0 w-full z-50',
                    'transition-colors duration-300',
                    scrolled || path !== '/'
                        ? 'bg-white/95 border-b border-brand-gray-200 backdrop-blur-sm'
                        : 'bg-transparent',
                )}
            >
                <div className="w-full px-4 md:px-6 py-4 md:py-4 lg:px-12">
                    <div className="flex items-center justify-between relative">
                        <div className="flex-1 flex items-center gap-4 md:gap-6">
                            <a
                                href="https://www.elegance-epicurean-group.com"
                                className="flex items-center"
                                target="_blank"
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${scrolled || path !== '/' ? 'epicurean_noir.png' : 'epicurean.png'}`}
                                    alt={t('AltLogo.translation.content')}
                                    className="max-w-[140px] md:max-w-[180px] hidden md:block"
                                    width={2746}
                                    height={615}
                                />
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${scrolled || path !== '/' ? 'ee.png' : 'ee_blanc.png'}`}
                                    alt={t('AltLogo.translation.content')}
                                    className="max-w-[40px] block md:hidden"
                                    width={90}
                                    height={82}
                                />
                            </a>
                        </div>

                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Link href="/" className="flex items-center" aria-label="Go to homepage">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${scrolled || path !== '/' ? 'logo_noir.png' : 'logo_blanc.png'}`}
                                    alt={t('AltLogo.translation.content')}
                                    className="max-w-[140px] md:max-w-[220px]"
                                    width={1650}
                                    height={545}
                                />
                            </Link>
                        </div>

                        <div className="flex-1 flex items-center justify-end space-x-4 md:space-x-6">
                            <div className="relative hidden md:block">
                                <LocaleSwitcher
                                    textColor={scrolled || path !== '/' ? 'text-brand-dark-800' : 'text-white'}
                                />
                            </div>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                className={cn(
                                    'hidden md:inline-flex items-center gap-2 px-4 md:px-5 py-3 font-semibold tracking-wider group duration-300 transition-all text-xs md:text-sm',
                                    scrolled || path !== '/'
                                        ? 'bg-brand-gold-400 text-white hover:bg-black'
                                        : 'bg-transparent text-white border-1 hover:text-brand-gold-400',
                                )}
                                aria-label={t('AriaLabelBookNow.translation.content')}
                            >
                                <span className="uppercase">{t('ButtonBook.translation.content')}</span>
                                <HiArrowUpRight
                                    aria-hidden
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </a>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsMenuOpen((s) => !s);
                                }}
                                className={cn(
                                    'text-2xl md:text-3xl hover:text-brand-gold-400 cursor-pointer transition-colors',
                                    scrolled || path !== '/' ? 'text-brand-dark-800' : 'text-white',
                                )}
                                aria-label={
                                    isMenuOpen
                                        ? t('AriaLabelCloseMenu.translation.content')
                                        : t('AriaLabelOpenMenu.translation.content')
                                }
                                aria-expanded={isMenuOpen}
                                aria-controls="site-drawer"
                            >
                                {isMenuOpen ? <LiaTimesSolid /> : <RxHamburgerMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                <ClientPortal>
                    <button
                        aria-hidden={!isMenuOpen}
                        tabIndex={-1}
                        className={cn(
                            'fixed inset-0 bg-black/40 backdrop-blur-sm cursor-pointer z-40 transition-opacity',
                            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                        )}
                        onClick={() => setIsMenuOpen(false)}
                        aria-label={t('AriaLabelCloseMenuOverlay.translation.content')}
                    />
                    <aside
                        id="site-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label={t('AriaLabelMainNavigation.translation.content')}
                        className={cn(
                            'fixed left-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3 bg-white flex flex-col overflow-y-auto z-100 transition-transform duration-300',
                            isMenuOpen ? 'translate-x-0' : '-translate-x-full',
                        )}
                    >
                        <div className="flex-1 p-6 md:p-8 lg:p-12 flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <Link
                                    href="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label={t('AriaLabelCloseMenuGoHome.translation.content')}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_CDN_URL}logo.png`}
                                        alt="logo"
                                        className="max-w-[180px]"
                                        width={1938}
                                        height={932}
                                    />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-brand-dark-800/70 cursor-pointer hover:text-brand-dark-800 transition-colors text-2xl"
                                    aria-label={t('AriaLabelCloseMenuOverlay.translation.content')}
                                >
                                    <LiaTimesSolid />
                                </button>
                            </div>
                            <MultiLevelMenu key={isMenuOpen ? 'open' : 'closed'} onClose={() => setIsMenuOpen(false)} />
                            <div className="mt-8">
                                <h4 className="font-serif text-base text-brand-dark-800">
                                    {t('TitleAboutRiad.translation.content')}
                                </h4>
                                <p className="mt-3 text-sm leading-relaxed text-brand-gray-600">
                                    {t('DescriptionAboutRiad.translation.content')}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-serif text-base text-brand-dark-800">
                                    {t('TitleContact.translation.content')}
                                </h4>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <ContactItem variant="drawer" icon={HiOutlineMapPin}>
                                        <span> {contact.address}</span>
                                    </ContactItem>
                                    {contact.reception && (
                                        <ContactItem variant="drawer" icon={HiOutlinePhone}>
                                            <a
                                                href={`tel:${contact.reception.replace(/\s/g, '')}`}
                                                className="text-sm md:text-base"
                                            >
                                                {t('LabelReception.translation.content')}: {contact.reception}
                                            </a>
                                        </ContactItem>
                                    )}

                                    {contact.office && (
                                        <ContactItem variant="drawer" icon={HiOutlineDevicePhoneMobile}>
                                            <a
                                                href={`tel:${contact.office.replace(/\s/g, '')}`}
                                                className="text-sm md:text-base"
                                            >
                                                {t('LabelMobile.translation.content')}: {contact.office}
                                            </a>
                                        </ContactItem>
                                    )}

                                    <ContactItem variant="drawer" icon={HiOutlineEnvelope}>
                                        <a
                                            className="text-sm md:text-base hover:text-brand-gold-500 transition-colors"
                                            href={`mailto:${contact.email}`}
                                        >
                                            {contact.email}
                                        </a>
                                    </ContactItem>
                                </ul>
                            </div>

                            <div className="mt-8 border-t border-brand-gray-200/80 pt-6">
                                <div className="flex items-center gap-3">
                                    <SocialLinks facebookHref="https://www.facebook.com/riadnashira.spa?fref=ts" />
                                </div>
                            </div>

                            <div className="mt-auto py-8">
                                <a
                                    href={BOOKING_URL}
                                    target="_blank"
                                    className={cn(
                                        'inline-flex items-center gap-2 px-5 py-3 font-semibold tracking-wider group duration-300 transition-all',
                                        scrolled || path !== '/'
                                            ? 'bg-brand-gold-400 text-white hover:bg-black'
                                            : 'bg-white text-brand-dark-800 hover:bg-brand-gold-500 hover:text-white',
                                    )}
                                    aria-label={t('AriaLabelBookNow.translation.content')}
                                >
                                    <span className="uppercase">{t('ButtonBook.translation.content')}</span>
                                    <HiArrowUpRight
                                        aria-hidden
                                        className="group-hover:translate-x-1 transition-transform duration-300"
                                    />
                                </a>
                            </div>
                        </div>
                    </aside>
                </ClientPortal>
            </header>

            {scrolled ? <div style={{height: headerH}} /> : null}
        </>
    );
}
