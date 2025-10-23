'use client';

import {FormEvent, JSX, useCallback, useState} from 'react';
import Link from 'next/link';
import {
    HiArrowUp,
    HiArrowUpRight,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiPaperAirplane,
} from 'react-icons/hi2';
import {FaFacebookF, FaXTwitter, FaYoutube} from 'react-icons/fa6';
import {FaInstagram, FaTripadvisor} from 'react-icons/fa';

type NavLink = { label: string; href: string };
type CTA = { label: string; href: string };
export type Contact = {
    reception?: string;
    office?: string;
    email?: string;
    address?: string;
    cta?: CTA;
};
export type Social = {
    instagram?: string;
    tripadvisor?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
};

export default function Footer(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [pending, setPending] = useState<boolean>(false);
    const [ok, setOk] = useState<string | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const usefulLeft: NavLink[] = [
        { label: 'Accueil', href: '/' },
        { label: 'Hébergements', href: '/rooms' },
        { label: 'Bars & Restaurants', href: '/bars-restaurants' },
        { label: 'Spa & Bien-Être', href: '/spa' },
    ];
    const usefulRight: NavLink[] = [
        { label: 'Evènements', href: '/events' },
        { label: 'Activités', href: '/activities' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },

    ];

    const contact: Contact = {
        reception: '+212 (0) 524.39.06.03',
        office: '+212 (0) 6.66.84.08.28',
        email: 'info@riadnashira.com',
        address: 'Diour Saboune, Derb Sidi Makhlouf n°16 Marrakech',
        cta: { label: 'réservez maintenant', href: '/booking' },
    };

    const social: Social = {
        instagram: 'https://www.instagram.com/riadnashira',
        tripadvisor:
            'https://www.tripadvisor.fr/Hotel_Review-g293734-d3139952-Reviews-Riad_Nashira_Spa-Marrakech_Marrakech_Tensift_El_Haouz_Region.html',
        facebook: 'https://www.facebook.com/riadnashira.spa?fref=ts',
        twitter: 'https://twitter.com/RiadNashira',
        youtube: 'https://www.youtube.com/riadnashira',
    };

    const copyright =
        'Copyright & Design ©Riad Nashira - 2025. Tous droits réservés.';

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErr(null);
        setOk(null);
        try {
            setPending(true);
            setOk('Inscription prise en compte. Vérifiez votre boîte mail.');
            setEmail('');
        } catch {
            setErr("L'inscription a échoué. Veuillez réessayer.");
        } finally {
            setPending(false);
        }
    }

    const scrollToTop = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, []);

    return (
        <footer className="bg-brand-beige-100 text-brand-dark-800 pt-16 md:pt-24 pb-6">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 pb-12 md:pb-16">
                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            Liens utiles
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:gap-16 gap-3">
                            <ul className="space-y-3">
                                {usefulLeft.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            className="hover:text-brand-gold-500 transition-colors"
                                            href={l.href}
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className="space-y-3">
                                {usefulRight.map((l) => (
                                    <li key={l.label}>
                                        <Link
                                            className="hover:text-brand-gold-500 transition-colors"
                                            href={l.href}
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            Nous contacter
                        </h3>
                        <div className="space-y-4">
                            {contact.reception && (
                                <div className="flex items-start gap-3">
                                    <HiPaperAirplane className="mt-1 shrink-0" aria-hidden />
                                    <a
                                        href={`tel:${contact.reception.replace(/\s/g, '')}`}
                                        className="text-sm md:text-base"
                                    >
                                        Réception: {contact.reception}
                                    </a>
                                </div>
                            )}
                            {contact.office && (
                                <div className="flex items-start gap-3">
                                    <HiOutlinePhone className="mt-1 shrink-0" aria-hidden />
                                    <a
                                        href={`tel:${contact.office.replace(/\s/g, '')}`}
                                        className="text-sm md:text-base"
                                    >
                                        Mobile: {contact.office}
                                    </a>
                                </div>
                            )}
                            {contact.email && (
                                <div className="flex items-start gap-3">
                                    <HiOutlineEnvelope className="mt-1 shrink-0" aria-hidden />
                                    <a
                                        className="text-sm md:text-base hover:text-brand-gold-500 transition-colors"
                                        href={`mailto:${contact.email}`}
                                    >
                                        {contact.email}
                                    </a>
                                </div>
                            )}
                            {contact.address && (
                                <div className="flex items-start gap-3">
                                    <HiOutlineMapPin className="mt-1 shrink-0" aria-hidden />
                                    <span className="text-sm md:text-base">
                    {contact.address}
                  </span>
                                </div>
                            )}
                        </div>

                        {contact.cta && (
                            <Link
                                href={contact.cta.href}
                                className="mt-8 inline-flex items-center uppercase gap-2 btn-primary"
                                aria-label={contact.cta.label}
                            >
                                <span>{contact.cta.label}</span>
                                <HiArrowUpRight className="-rotate-45" aria-hidden />
                            </Link>
                        )}
                    </div>

                    <div className="lg:col-span-4">
                        <h3 className="font-serif text-xl tracking-widest uppercase text-brand-gold-600 mb-6">
                            {`S'inscrire à la newsletter`}
                        </h3>

                        <form
                            onSubmit={handleSubmit}
                            className="flex border border-brand-dark-300/60 h-12 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold-400"
                        >
                            <label className="sr-only" htmlFor="newsletter-email">
                                Votre Email
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                placeholder="Votre Email"
                                className="input px-4"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={pending}
                                className="border-l border-brand-dark-300/60 px-4 whitespace-nowrap text-sm font-semibold hover:bg-brand-gray-50 transition-colors inline-flex items-center gap-2 disabled:opacity-60"
                            >
                                <span>{pending ? 'Inscription ...' : "S'inscrire"}</span>
                                <HiArrowUpRight className="-rotate-45" aria-hidden />
                            </button>
                        </form>

                        {ok && <p className="mt-3 text-sm text-green-700">{ok}</p>}
                        {err && <p className="mt-3 text-sm text-red-700">{err}</p>}
                    </div>
                </div>

                <div className="border-t border-brand-dark-200 pt-6 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center relative">
                    <p className="text-sm text-brand-gray-600 text-center md:text-left">
                        {copyright}
                    </p>

                    <div className="flex items-center gap-2">
                        {social.instagram && (
                            <Link
                                href={social.instagram}
                                className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagram />
                            </Link>
                        )}
                        {social.facebook && (
                            <Link
                                href={social.facebook}
                                className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookF />
                            </Link>
                        )}
                        {social.tripadvisor && (
                            <Link
                                href={social.tripadvisor}
                                className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                aria-label="Tripadvisor"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaTripadvisor />
                            </Link>
                        )}
                        {social.twitter && (
                            <Link
                                href={social.twitter}
                                className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                aria-label="Twitter / X"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaXTwitter />
                            </Link>
                        )}
                        {social.youtube && (
                            <Link
                                href={social.youtube}
                                className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
                                aria-label="YouTube"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaYoutube />
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="md:absolute md:-top-6 md:right-0 w-12 aspect-square rounded-full bg-brand-dark-800 text-white inline-flex items-center justify-center hover:bg-brand-dark-900 transition-colors"
                        aria-label="Remonter en haut"
                        title="Back to top"
                        type="button"
                    >
                        <HiArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}
