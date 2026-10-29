import type {ReactNode} from 'react';
import type {IconType} from 'react-icons';

export default function ContactItem({
    icon: Icon,
    variant,
    children,
}: {
    icon: IconType;
    variant: 'drawer' | 'footer';
    children: ReactNode;
}) {
    const Tag = variant === 'drawer' ? 'li' : 'div';
    return (
        <Tag className={variant === 'drawer' ? 'flex items-center gap-3' : 'flex items-start gap-3'}>
            {variant === 'drawer' ? (
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gray-300">
                    <Icon aria-hidden />
                </span>
            ) : (
                <Icon className="mt-1 shrink-0" aria-hidden />
            )}
            {children}
        </Tag>
    );
}
