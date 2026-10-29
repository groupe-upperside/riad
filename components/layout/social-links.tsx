import Link from 'next/link';
import {FaFacebookF, FaXTwitter, FaYoutube} from 'react-icons/fa6';
import {FaInstagram, FaTripadvisor} from 'react-icons/fa';
import {SOCIAL_LINKS} from '@/lib/constants/site';

const platforms = [
    {key: 'instagram', label: 'Instagram', icon: FaInstagram},
    {key: 'facebook', label: 'Facebook', icon: FaFacebookF},
    {key: 'tripadvisor', label: 'Tripadvisor', icon: FaTripadvisor},
    {key: 'twitter', label: 'Twitter / X', icon: FaXTwitter},
    {key: 'youtube', label: 'YouTube', icon: FaYoutube},
] as const;

export default function SocialLinks({facebookHref = SOCIAL_LINKS.facebook}: {facebookHref?: string}) {
    return platforms.map(({key, label, icon: Icon}) => (
        <Link
            key={key}
            href={key === 'facebook' ? facebookHref : SOCIAL_LINKS[key]}
            className="w-10 h-10 rounded-full border border-brand-dark-200 flex items-center justify-center hover:bg-white transition-colors"
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Icon />
        </Link>
    ));
}
