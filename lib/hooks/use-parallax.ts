'use client'

import {useCallback, useEffect, useRef, useState} from 'react'

interface UseParallaxOptions {
    strength?: number
    maxShift?: number
    overscan?: number
    disabled?: boolean
}

export function useParallax({
                                strength = 0.18,
                                maxShift = 120,
                                overscan = 0.12,
                                disabled = false,
                            }: UseParallaxOptions = {}) {
    const holderRef = useRef<HTMLDivElement | null>(null)
    const [translateY, setTranslateY] = useState(0)
    const rafRef = useRef<number>(0)

    const calculateParallax = useCallback(() => {
        if (!holderRef.current || disabled) return

        const rect = holderRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = viewportHeight / 2

        const progress = (elementCenter - viewportCenter) / viewportCenter

        const parallaxOffset = Math.max(
            -maxShift,
            Math.min(maxShift, progress * viewportHeight * strength)
        )

        setTranslateY(parallaxOffset)
    }, [strength, maxShift, disabled])

    const handleScroll = useCallback(() => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = requestAnimationFrame(calculateParallax)
    }, [calculateParallax])

    useEffect(() => {
        if (typeof window === 'undefined' || disabled) return

        calculateParallax()

        window.addEventListener('scroll', handleScroll, {passive: true})
        window.addEventListener('resize', handleScroll)

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [handleScroll, calculateParallax, disabled])

    return {
        holderRef,
        style: {
            transform: `translate3d(0, ${translateY}px, 0) scale(${1 + overscan})`,
            willChange: 'transform',
            backfaceVisibility: 'hidden' as const,
            perspective: 1000,
        },
    }
}