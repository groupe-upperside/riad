import type {AnchorHTMLAttributes, ReactNode} from 'react';
import Link from 'next/link';
import {HiArrowUpRight} from 'react-icons/hi2';
import {cn} from '@/lib/utils/cn';

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
    href: string;
    children: ReactNode;
    variant?: 'primary' | 'outline';
    showArrow?: boolean;
    className?: string;
    linkClassName?: string;
};

const variants = {
    primary: 'bg-brand-gold-400 text-white hover:bg-black',
    outline: 'border border-brand-gold-400 text-brand-dark-800 hover:bg-brand-gold-400 hover:text-white',
};

export default function ButtonLink({
    href,
    children,
    variant = 'primary',
    showArrow,
    className,
    linkClassName,
    ...props
}: ButtonLinkProps) {
    return (
        <Link href={href} className={linkClassName} {...props}>
            <span
                className={cn(
                    'font-semibold cursor-pointer tracking-wider flex items-center group transition-all duration-300',
                    variants[variant],
                    'px-6 py-3 text-sm',
                    className,
                )}
            >
                {children}
                {showArrow && (
                    <HiArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                )}
            </span>
        </Link>
    );
}
