'use client';

import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {
    HiArrowUpRight,
    HiBars3CenterLeft,
    HiOutlineDevicePhoneMobile,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone
} from 'react-icons/hi2';
import {cn} from '@/lib/utils/utils';
import Image from "next/image";
import {LiaTimesSolid} from "react-icons/lia";
import {FaFacebookF, FaXTwitter, FaYoutube} from "react-icons/fa6";
import ClientPortal from "../client-portal";
import {FaChevronRight, FaInstagram, FaTripadvisor} from "react-icons/fa";
import {Contact, Social} from "@/components/layout/footer";

export default function Header(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [headerH, setHeaderH] = useState<number>(0);

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


    const social: Social = {
        instagram: 'https://www.instagram.com/riadnashira',
        tripadvisor:
            'https://www.tripadvisor.fr/Hotel_Review-g293734-d3139952-Reviews-Riad_Nashira_Spa-Marrakech_Marrakech_Tensift_El_Haouz_Region.html',
        facebook: 'https://www.facebook.com/riadnashira.spa?fref=ts',
        twitter: 'https://twitter.com/RiadNashira',
        youtube: 'https://www.youtube.com/riadnashira',
    };

    const contact: Contact = {
        reception: '+212 (0) 524.39.06.03',
        office: '+212 (0) 6.66.84.08.28',
        email: 'info@riadnashira.com',
        address: 'Diour Saboune, Derb Sidi Makhlouf n°16 Marrakech',
        cta: { label: 'réservez maintenant', href: '#' },
    };

    return (
        <>
            <header
                ref={ref}
                role="banner"
                className={cn(
                    scrolled ? 'fixed top-0 left-0 w-full z-50' : 'absolute top-0 left-0 w-full z-50',
                    'transition-colors duration-300',
                    scrolled
                        ? 'bg-white/95 border-b border-brand-gray-200 backdrop-blur-sm'
                        : 'bg-transparent'
                )}
            >
                <div
                    className="grid xl:grid-cols-5 2xl:grid-cols-3 md:grid-cols-4 items-start px-4 md:px-6 py-4 md:py-6 lg:px-12">
                    <div
                        className="md:col-span-2 xl:col-span-2 2xl:col-span-1 flex items-center justify-between pr-4 lg:pr-12">
                        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                            <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}logo.png`} alt="logo" width={50}
                                   height={50}/>
                            <span
                                className="font-serif text-2xl md:text-3xl font-medium text-brand-dark-800 tracking-wider">
                RIAD NASHIRA
              </span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((s) => !s)}
                            className="text-brand-dark-800 text-2xl md:text-3xl hover:text-brand-gold-400 cursor-pointer transition-colors"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                            aria-controls="site-drawer"
                        >
                            {isMenuOpen ? <LiaTimesSolid/> : <HiBars3CenterLeft/>}
                        </button>
                    </div>

                    <div className="md:col-span-2 xl:col-span-3 2xl:col-span-2 md:flex justify-end hidden">
                        <Link
                            href="/book"
                            className={cn(
                                'inline-flex items-center gap-2 px-5 py-3 font-semibold tracking-wider group duration-300 transition-all',
                                scrolled
                                    ? 'bg-brand-gold-400 text-white hover:bg-black'
                                    : 'bg-white text-brand-dark-800 hover:bg-brand-gold-500 hover:text-white'
                            )}
                            aria-label="Book now"
                        >
                            <span className="uppercase">réserver maintenant</span>
                            <HiArrowUpRight aria-hidden
                                            className="group-hover:translate-x-1 transition-transform duration-300"/>
                        </Link>
                    </div>
                </div>
                <ClientPortal>
                    <button
                        aria-hidden={!isMenuOpen}
                        tabIndex={-1}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                            'fixed inset-0 bg-black/40 transition-opacity focus:outline-none outline-none ring-0',
                            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        )}
                    />

                    <aside
                        id="site-drawer"
                        className={cn(
                            'fixed inset-y-0 right-0 z-50',
                            'w-full sm:max-w-md md:max-w-sm',                 // similar width as the mock
                            'bg-white text-brand-dark-800 md:rounded-l-lg',  // light panel + rounded left on md+
                            'shadow-2xl ring-1 ring-brand-gray-200/70',
                            'transform transition-transform duration-300',
                            'overflow-y-auto',                                // scroll content
                            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        )}
                        aria-label="Main navigation"
                    >
                        <div className="relative flex h-full flex-col p-6 md:p-7">
                            {/* Top row: logo + close */}
                            <div className="flex items-start justify-between">
                                <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
                                    <Image src={`${process.env.NEXT_PUBLIC_CDN_URL}logo.png`} alt="logo" width={50}
                                           height={50}/>
                                    <span
                                        className="font-serif text-2xl md:text-3xl font-medium text-brand-dark-800 tracking-wider">
                RIAD NASHIRA
              </span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-brand-dark-800/70 cursor-pointer hover:text-brand-dark-800 transition-colors text-2xl"
                                    aria-label="Fermer le menu"
                                >
                                    <LiaTimesSolid/>
                                </button>
                            </div>
                            <nav className="mt-6">
                                <ul className="divide-y divide-brand-gray-200/80">
                                    {['Accueil', 'Chambres', 'Services', 'Galerie', 'Contact'].map((item) => (
                                        <li key={item}>
                                            <a
                                                href={`#${item.toLowerCase()}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex items-center justify-between py-3 text-sm tracking-wide uppercase hover:text-brand-gold-500 transition-colors"
                                            >
                                                <span>{item}</span>
                                                <FaChevronRight className="text-brand-gray-400" aria-hidden/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* About */}
                            <div className="mt-8">
                                <h4 className="font-serif text-base text-brand-dark-800">À propos du Riad Nashira</h4>
                                <p className="mt-3 text-sm leading-relaxed text-brand-gray-600">
                                    {`  Riad Nashira & Spa apporte une nouvelle dimension à l'hospitalité à Marrakech, en
                                    introduisant un concept qui va au-delà de toute autre expérience.`}
                                </p>
                            </div>

                            {/* Contact info */}
                            <div className="mt-8">
                                <h4 className="font-serif text-base text-brand-dark-800">Contact</h4>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gray-300">
            <HiOutlineMapPin aria-hidden/>
          </span>
                                        <span> {contact.address}</span>
                                    </li>
                                    {contact.reception && (
                                        <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gray-300">
            <HiOutlinePhone aria-hidden/>
          </span>
                                            <a
                                                href={`tel:${contact.reception.replace(/\s/g, '')}`}
                                                className="text-sm md:text-base"
                                            >
                                                Réception: {contact.reception}
                                            </a>
                                        </li>
                                    )}

                                    {contact.office && (
                                        <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gray-300">
            <HiOutlineDevicePhoneMobile aria-hidden/>
          </span>
                                            <a
                                                href={`tel:${contact.office.replace(/\s/g, '')}`}
                                                className="text-sm md:text-base"
                                            >
                                                Mobile: {contact.office}
                                            </a>
                                        </li>
                                    )}

                                    <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gray-300">
            <HiOutlineEnvelope aria-hidden/>
          </span>
                                        <a
                                            className="text-sm md:text-base hover:text-brand-gold-500 transition-colors"
                                            href={`mailto:${contact.email}`}
                                        >
                                            {contact.email}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Socials */}
                            <div className="mt-8 border-t border-brand-gray-200/80 pt-6">
                                <div className="flex items-center gap-3">
                                    <a
                                        href={social.instagram}
                                        className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="Instagram"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram />
                                    </a>
                                    <a
                                        href={social.facebook}
                                        className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="Facebook"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a
                                        href={social.tripadvisor}
                                        className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="Tripadvisor"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTripadvisor />
                                    </a>
                                    <a
                                        href={social.twitter}
                                        className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="Twitter / X"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaXTwitter />
                                    </a>
                                    <a
                                        href={social.youtube}
                                        className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                        aria-label="YouTube"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaYoutube />
                                    </a>
                                </div>
                            </div>

                            {/* CTA stays at bottom */}
                            <div className="mt-auto pt-8">
                                <Link
                                    href="/book"
                                    className={cn(
                                        'inline-flex items-center gap-2 px-5 py-3 font-semibold tracking-wider group duration-300 transition-all',
                                        scrolled
                                            ? 'bg-brand-gold-400 text-white hover:bg-black'
                                            : 'bg-white text-brand-dark-800 hover:bg-brand-gold-500 hover:text-white'
                                    )}
                                    aria-label="Book now"
                                >
                                    <span className="uppercase">réserver maintenant</span>
                                    <HiArrowUpRight aria-hidden
                                                    className="group-hover:translate-x-1 transition-transform duration-300"/>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </ClientPortal>

            </header>

            {scrolled ? <div style={{height: headerH}}/> : null}
        </>
    );
}
