import Image from "next/image";
import SectionHeader from "@/components/ui/section-header";
import {FaBed, FaCrown, FaGem, FaStar} from "react-icons/fa";

export default function RoomsIntroduction() {
    return (
        <section id="hero-section" className="py-24 bg-brand-beige-100">
            <div className="container mx-auto px-8">
                <div className="relative h-[600px] mb-16">
                    <Image
                        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f6d411a20e-a478a39d4494c6f8a3aa.png"
                        alt="Luxurious Moroccan Riad interior with intricate zellige tilework, plush velvet seating, and warm ambient lighting, elegant style"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-4">
                        <SectionHeader
                            label="Chaque chambre"
                            title="Une Atmosphère Singulière"
                        />
                    </div>

                    <div className="md:col-span-8">
                        <p className="text-brand-gray text-base leading-relaxed pt-4">
                            Le Riad Nashira compte 17 chambres et suites toutes différentes les unes des autres. Pensées
                            comme des univers uniques, elles se distinguent par leurs harmonies de couleurs, leurs jeux
                            de lumière et le dialogue subtile entre design contemporain et artisanat marocain.
                        </p>
                        <p className="text-brand-gray text-base leading-relaxed mb-8 pt-4">
                            Que vous choisissez une chambre confort, une deluxe, une suite ou les suites exclusives, vous
                            serez immergé dans une ambiance raffinée, bercée par le calme du riad et l'élégance de ses
                            détails.
                        </p>

                        <div className="flex space-x-10 text-brand-gray">
                            <div className="flex flex-col items-center text-center">
                                <FaBed className="size-6 mb-2 text-brand-gold" aria-hidden />
                                <p className="font-semibold uppercase">3 confort</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <FaStar className="size-6 mb-2 text-brand-gold" aria-hidden />
                                <p className="font-semibold uppercase">9 deluxe</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <FaGem className="size-6 mb-2 text-brand-gold" aria-hidden />
                                <p className="font-semibold uppercase">3 suites</p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <FaCrown className="size-6 mb-2 text-brand-gold" aria-hidden />
                                <p className="font-semibold uppercase">2 suites spéciales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}