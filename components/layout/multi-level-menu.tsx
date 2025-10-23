'use client'

import Link from 'next/link'
import {MenuItem, navigationMenu} from '@/lib/navigation'
import {cn} from '@/lib/utils/utils'
import {useEffect, useState} from 'react'
import {FiMinus, FiPlus} from "react-icons/fi";

interface MenuItemComponentProps {
    item: MenuItem
    level?: number
    openItems: Set<string>
    toggleItem: (id: string) => void
    onClose?: () => void
}

function MenuItemComponent({item, level = 0, onClose, openItems, toggleItem}: MenuItemComponentProps) {
    const hasChildren = item.children && item.children.length > 0
    const isSubMenuOpen = openItems.has(item.id)

    const handleToggle = () => {
        if (hasChildren) {
            toggleItem(item.id)
        }
    }

    const handleLinkClick = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <li className="relative">
            <div
                className={cn(
                    "flex items-center justify-between py-3 cursor-pointer transition-colors",
                    "text-sm tracking-wide hover:text-brand-gold-500"
                )}
            >
                {hasChildren ? (
                    <div
                        className="flex items-center justify-between w-full text-left"
                        aria-expanded={isSubMenuOpen}
                    >
                        <Link
                            href={item.href || '#'}
                            onClick={handleLinkClick}
                            className={cn(
                                level === 0 && "uppercase font-medium",
                                level === 1 && "ml-4",
                                level === 2 && "ml-8",
                                level === 3 && "ml-12"
                            )}
                        >
                            {item.label}
                        </Link>
                        <button onClick={handleToggle}
                                className="ml-2 transition-transform duration-200 cursor-pointer">
                            {isSubMenuOpen ? (
                                <FiMinus className="text-brand-gray-500"/>
                            ) : (
                                <FiPlus className="text-brand-gray-500"/>
                            )}
                        </button>
                    </div>
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
                        {(level === 0 && hasChildren) && (
                            <FiPlus className="text-brand-gray-500"/>
                        )}
                    </Link>
                )}
            </div>

            {hasChildren && (
                <ul
                    className={cn(
                        "overflow-hidden transition-all duration-300",
                        isSubMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    {item.children?.map((child) => (
                        <MenuItemComponent
                            key={child.id}
                            item={child}
                            level={level + 1}
                            onClose={onClose}
                            openItems={openItems}
                            toggleItem={toggleItem}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

interface MultiLevelMenuProps {
    onClose?: () => void
    isOpen?: boolean
}

export default function MultiLevelMenu({onClose, isOpen}: MultiLevelMenuProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (!isOpen) {
            setOpenItems(new Set())
        }
    }, [isOpen])

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev)

            if (newSet.has(id)) {
                newSet.delete(id)
            } else {
                const findItemLevel = (items: MenuItem[], targetId: string, currentLevel: number = 0): number => {
                    for (const item of items) {
                        if (item.id === targetId) return currentLevel
                        if (item.children) {
                            const foundLevel = findItemLevel(item.children, targetId, currentLevel + 1)
                            if (foundLevel !== -1) return foundLevel
                        }
                    }
                    return -1
                }

                const clickedLevel = findItemLevel(navigationMenu, id)

                const findItemsAtLevel = (items: MenuItem[], targetLevel: number, currentLevel: number = 0): string[] => {
                    if (currentLevel === targetLevel) {
                        return items.map(item => item.id)
                    }
                    return items.flatMap(item =>
                        item.children ? findItemsAtLevel(item.children, targetLevel, currentLevel + 1) : []
                    )
                }

                const itemsAtSameLevel = findItemsAtLevel(navigationMenu, clickedLevel)
                itemsAtSameLevel.forEach(itemId => newSet.delete(itemId))

                newSet.add(id)
            }

            return newSet
        })
    }

    const handleClose = () => {
        setOpenItems(new Set())
        if (onClose) {
            onClose()
        }
    }

    return (
        <nav className="mt-8">
            <ul>
                {navigationMenu.map((item) => (
                    <MenuItemComponent
                        key={item.id}
                        item={item}
                        onClose={handleClose}
                        openItems={openItems}
                        toggleItem={toggleItem}
                    />
                ))}
            </ul>
        </nav>
    )
}