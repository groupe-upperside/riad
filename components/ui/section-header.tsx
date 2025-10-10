import {cn} from '@/lib/utils/utils'

interface SectionHeaderProps {
    label?: string
    title: string
    subtitle?: string
    centered?: boolean
    className?: string
    dark?: boolean
}

export default function SectionHeader({
                                          label,
                                          title,
                                          subtitle,
                                          centered = false,
                                          className,
                                          dark = false
                                      }: SectionHeaderProps) {
    return (
        <div className={cn(centered && 'text-center', className)}>
            {label && (
                <p className={cn(
                    'text-sm tracking-widest uppercase mb-2',
                    dark ? 'text-brand-gray' : 'text-brand-gray'
                )}>
                    {label}
                </p>
            )}
            <h2 className={cn(
                'font-serif text-4xl md:text-5xl capitalize',
                dark ? 'text-white' : 'text-brand-dark'
            )}>
                {title}
            </h2>
            {subtitle && (
                <h3 className={cn(
                    'font-serif text-3xl md:text-4xl mt-2',
                    dark ? 'text-white' : 'text-brand-dark'
                )}>
                    {subtitle}
                </h3>
            )}
        </div>
    )
}