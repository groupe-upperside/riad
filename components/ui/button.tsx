'use client'

import {cn} from '@/lib/utils/utils'
import {ButtonHTMLAttributes, forwardRef, ReactNode} from 'react'
import {HiArrowUpRight} from "react-icons/hi2";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    showArrow?: boolean
    children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', showArrow = false, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-brand-gold-400 text-white hover:bg-black',
            outline: 'border border-brand-gold-400 text-brand-dark-800 hover:bg-brand-gold-400 hover:text-white',
            ghost: 'bg-white/90 backdrop-blur-sm text-brand-dark-800 shadow-lg hover:bg-white',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-sm',
            lg: 'px-6 py-5 text-sm',
        }

        return (
            <button
                ref={ref}
                className={cn(
                    'font-semibold cursor-pointer tracking-wider flex items-center group transition-all duration-300',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
                {showArrow && (
                    <HiArrowUpRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                )}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button