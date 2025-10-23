'use client'

import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import {MenuItem, navigationMenu} from '@/lib/navigation'
import {FaChevronDown} from 'react-icons/fa'
import {cn} from "@/lib/utils/utils";

function DesktopMenuItem({ item }: { item: MenuItem }) {
    const [isOpen, setIsOpen] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const hasChildren = item.children && item.children.length > 0

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={item.href || '#'}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wider hover:text-brand-gold-500 transition-colors"
            >
                {item.label}
                {hasChildren && (
                    <FaChevronDown className={cn(
                        "text-xs transition-transform",
                        isOpen && "rotate-180"
                    )} />
                )}
            </Link>

            {hasChildren && (
                <div
                    className={cn(
                        "absolute top-full left-0 mt-1 min-w-[200px] bg-white shadow-lg border border-brand-gray-200 rounded-lg",
                        "transition-all duration-300 transform origin-top",
                        isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    )}
                >
                    <ul className="py-2">
                        {item.children?.map((child) => (
                            <DesktopSubMenuItem key={child.id} item={child}  />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}

function DesktopSubMenuItem({ item }: { item: MenuItem; }) {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0

    return (
        <li
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                href={item.href || '#'}
                className="flex items-center justify-between px-4 py-2 text-sm hover:bg-brand-gray-50 hover:text-brand-gold-500 transition-colors"
            >
                {item.label}
                {hasChildren && <FaChevronDown className="text-xs -rotate-90" />}
            </Link>
            
            {hasChildren && (
                <div
                    className={cn(
                        "absolute left-full top-0 ml-1 min-w-[200px] bg-white shadow-lg border border-brand-gray-200 rounded-lg",
                        "transition-all duration-300",
                        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ul className="py-2">
                        {item.children?.map((child) => (
                            <li key={child.id}>
                                <Link
                                    href={child.href || '#'}
                                    className="block px-4 py-2 text-sm hover:bg-brand-gray-50 hover:text-brand-gold-500 transition-colors"
                                >
                                    {child.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
}

export default function DesktopMenu() {
    return (
        <nav className="hidden lg:block">
            <ul className="flex items-center">
                {navigationMenu.map((item) => (
                    <DesktopMenuItem key={item.id} item={item} />
                ))}
            </ul>
        </nav>
    )
}