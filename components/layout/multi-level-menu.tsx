'use client'

import {useState} from 'react'
import Link from 'next/link'
import {FaChevronDown, FaChevronRight} from 'react-icons/fa'
import {MenuItem, navigationMenu} from '@/lib/navigation'
import {cn} from '@/lib/utils/utils'

interface MenuItemComponentProps {
    item: MenuItem
    level?: number
    onClose?: () => void
}

function MenuItemComponent({ item, level = 0, onClose }: MenuItemComponentProps) {
    const [isOpen, setIsOpen] = useState(false)
    const hasChildren = item.children && item.children.length > 0

    const handleToggle = () => {
        if (hasChildren) {
            setIsOpen(!isOpen)
        }
    }

    const handleLinkClick = () => {
        if (onClose && !hasChildren) {
            onClose()
        }
    }

    return (
        <li className="relative">
            <div
                className={cn(
                    "flex items-center justify-between py-3 cursor-pointer transition-colors",
                    "text-sm tracking-wide hover:text-brand-gold-500",
                    level === 0 && "border-b border-brand-gray-200/80"
                )}
            >
                {hasChildren ? (
                    <button
                        onClick={handleToggle}
                        className="flex items-center justify-between w-full text-left"
                        aria-expanded={isOpen}
                    >
            <span
                className={cn(
                    level === 0 && "uppercase font-medium",
                    level === 1 && "ml-4",
                    level === 2 && "ml-8",
                    level === 3 && "ml-12"
                )}
            >
              {item.label}
            </span>
                        <span className="ml-2 transition-transform duration-200">
              {isOpen ? (
                  <FaChevronDown className="text-brand-gray-400" />
              ) : (
                  <FaChevronRight className="text-brand-gray-400" />
              )}
            </span>
                    </button>
                ) : (
                    <Link
                        href={item.href || '#'}
                        onClick={handleLinkClick}
                        className="flex items-center justify-between w-full"
                    >
            <span
                className={cn(
                    level === 0 && "uppercase font-medium",
                    level === 1 && "ml-4",
                    level === 2 && "ml-8",
                    level === 3 && "ml-12"
                )}
            >
              {item.label}
            </span>
                        {level === 0 && (
                            <FaChevronRight className="text-brand-gray-400" />
                        )}
                    </Link>
                )}
            </div>

            {/* Submenu */}
            {hasChildren && (
                <ul
                    className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    {item.children?.map((child) => (
                        <MenuItemComponent
                            key={child.id}
                            item={child}
                            level={level + 1}
                            onClose={onClose}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default function MultiLevelMenu({ onClose }: { onClose?: () => void }) {
    return (
        <nav className="mt-8">
            <ul>
                {navigationMenu.map((item) => (
                    <MenuItemComponent
                        key={item.id}
                        item={item}
                        onClose={onClose}
                    />
                ))}
            </ul>
        </nav>
    )
}