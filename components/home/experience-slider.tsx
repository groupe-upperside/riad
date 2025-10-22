'use client'

import {KeyboardEvent, PointerEvent, useEffect, useLayoutEffect, useRef, useState} from 'react'
import Image from 'next/image'
import {IoMdCheckmarkCircleOutline} from "react-icons/io";
import {HiArrowUpRight} from "react-icons/hi2";
import SectionHeader from "@/components/ui/section-header";
import {Slide} from "@/lib/constants";

interface ExperienceSliderProps {
    sliderContent: Slide[]
}

export default function ExperiencesSlider({sliderContent}: ExperienceSliderProps) {
    const [current, setCurrent] = useState<number>(0)
    const [dragX, setDragX] = useState<number>(0)
    const [dir, setDir] = useState<1 | -1>(1)
    const [dragging, setDragging] = useState<boolean>(false)
    const [animating, setAnimating] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const startXRef = useRef<number | null>(null)
    const widthRef = useRef<number>(0)
    const len = sliderContent.length
    const TAP_SLOP_PX = 8
    const isPressingRef = useRef<boolean>(false)

    useLayoutEffect(() => {
        const el = containerRef.current
        if (!el) return
        const setW = () => (widthRef.current = el.clientWidth)
        setW()
        const ro = new ResizeObserver(setW)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const neighbor = (base: number, d: 1 | -1) => (base + d + len) % len

    const slideTo = (targetIndex: number) => {
        if (animating || dragging) return
        const nextIdx = (targetIndex + len) % len
        if (nextIdx === current) return
        const forward = (nextIdx - current + len) % len
        const d: 1 | -1 = forward === 1 ? 1 : (forward === 0 ? 1 : (forward > len / 2 ? -1 : 1))
        setDir(d)
        setAnimating(true)
        setPaused(true)
        setDragX(0)
        requestAnimationFrame(() => {
            setDragX(-d * widthRef.current)
            setTimeout(() => {
                setCurrent(nextIdx)
                setAnimating(false)
                setPaused(false)
                setDragX(0)
            }, 350)
        })
    }

    useEffect(() => {
        if (paused || animating || dragging) return
        const t = setInterval(() => slideTo(current + 1), 6000)
        return () => clearInterval(t)
    }, [current, paused, animating, dragging])

    const onPointerDown = (e: PointerEvent) => {
        if (animating) return
        if (e.pointerType === 'mouse' && e.button !== 0) return
        startXRef.current = e.clientX
        isPressingRef.current = true
    }

    const onPointerMove = (e: PointerEvent) => {
        const startX = startXRef.current
        if (startX == null) return

        const dx = e.clientX - startX
        const w = widthRef.current || 1

        if (!dragging) {
            if (!isPressingRef.current) return
            if (Math.abs(dx) < TAP_SLOP_PX) return

            setDragging(true)
            setPaused(true)
            e.currentTarget.setPointerCapture?.(e.pointerId)
        }

        const clamped = Math.max(-w, Math.min(w, dx))
        setDragX(clamped)
        setDir(clamped <= 0 ? 1 : -1)
        e.preventDefault()
    }

    const onPointerUp = () => {
        const w = widthRef.current || 1

        isPressingRef.current = false

        if (!dragging) {
            startXRef.current = null
            return
        }

        const shouldAdvance = Math.abs(dragX) > w * 0.2
        setDragging(false)
        setAnimating(true)

        if (shouldAdvance) {
            setDragX(-dir * w)
            setTimeout(() => {
                setCurrent(neighbor(current, dir))
                setAnimating(false)
                setDragX(0)
                setPaused(false)
            }, 300)
        } else {
            setDragX(0)
            setTimeout(() => {
                setAnimating(false)
                setPaused(false)
            }, 200)
        }

        startXRef.current = null
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            slideTo(current - 1)
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            slideTo(current + 1)
        }
    }

    const showingNeighbor = dragging || animating

    const w = widthRef.current || 1
    const leavingTransform = `translateX(${dragX}px)`
    const enteringTransform = `translateX(${dragX + dir * w}px)`

    const maybeTransition = animating ? 'transition-transform duration-300 ease-out' : 'transition-none'

    const SlidePane = ({index}: { index: number }) => {
        const slide = sliderContent[index]
        return (
            <div
                className="mx-auto container grid grid-cols-1 gap-10 px-4 py-16 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-24 lg:pb-40 items-stretch">
                <div className="relative">
                    <div className="lg:hidden relative h-[400px] sm:h-[480px] md:h-[560px]">
                        <div className="relative w-full h-full overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src={slide.images.main}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="hidden lg:block relative h-[600px] xl:h-[640px]">
                        <div
                            className="absolute top-0 right-0 overflow-hidden rounded-sm shadow-xl
                            w-3/4 h-[480px]
                            xl:h-[540px]"
                        >
                            <Image
                                src={slide.images.secondary}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                priority
                                draggable={false}
                            />
                        </div>

                        <div
                            className="absolute z-10 overflow-hidden rounded-sm shadow-2xl
                            w-3/4 h-[480px] right-1/4 bottom-[-40px]
                            xl:h-[540px] xl:bottom-[-50px]"
                        >
                            <Image
                                src={slide.images.main}
                                alt={slide.title}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                priority
                                draggable={false}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative flex h-full min-h-full self-stretch flex-col lg:pl-6 justify-between">
                    <div className="text-sm text-gray-500 text-end">
                        <span className="text-brand-gold font-semibold px-1">{index + 1}</span>
                        <span>/</span>
                        <span className="px-1">{sliderContent.length}</span>
                    </div>
                    <div>
                        <SectionHeader
                            label={slide.category}
                            title={slide.title}
                            className="mb-6"
                        />
                        {slide.description.map((p, i) => (
                            <p key={i} className="mb-3 leading-7 text-brand-gray-500">{p}</p>
                        ))}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {slide.features.map((f, i) => (
                                <span key={i} className="inline-flex items-center gap-2 text-sm text-brand-gray-500">
                                    <IoMdCheckmarkCircleOutline className="h-4 w-4 text-brand-gold"/>
                                    {f}
                                </span>
                            ))}
                        </div>
                        <button className="group mt-10 inline-flex items-center gap-3 self-start cursor-pointer"
                                aria-label="Read more">
                            <span className="relative pb-1 text-base font-medium uppercase text-brand-dark-800">
                                Découvrir
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] w-3/4 bg-brand-gold transition-transform group-hover:scale-x-120 group-hover:w-full"/>
                            </span>
                            <HiArrowUpRight className="transition-transform group-hover:translate-x-1"/>
                        </button>
                    </div>
                    <div className="mt-8 flex gap-2">
                        {sliderContent.map((_, i) => (
                            <button key={i} onClick={() => slideTo(i)} aria-label={`Aller à la diapositive ${i + 1}`}
                                    className={`h-2 cursor-pointer rounded-full transition-all ${i === index ? 'w-8 bg-brand-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section
            aria-roledescription="carousel"
            aria-label="Expériences"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className={`relative bg-white select-none touch-pan-y ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onDragStart={(e) => e.preventDefault()}
        >
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                <div aria-hidden className="invisible">
                    <SlidePane index={current}/>
                </div>
                <div
                    className={`absolute inset-0 ${maybeTransition}`}
                    style={{
                        transform: leavingTransform,
                        pointerEvents: animating ? 'none' : 'auto',
                        willChange: 'transform'
                    }}
                >
                    <SlidePane index={current}/>
                </div>
                {showingNeighbor && (
                    <div className={`absolute inset-0 ${maybeTransition} pointer-events-none`}
                         style={{transform: enteringTransform}}>
                        <SlidePane index={neighbor(current, dir)}/>
                    </div>
                )}
            </div>
        </section>
    )
}