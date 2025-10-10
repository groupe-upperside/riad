import {testimonials} from '@/lib/constants'
import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import {FaQuoteLeft, FaStar} from 'react-icons/fa'

export default function Testimonials() {
    return (
        <section className="py-16 md:py-24 bg-brand-dark text-white relative">
            <div className="absolute inset-0 opacity-5 bg-cover bg-center"
                 style={{ backgroundImage: "url('/images/gold-pattern.png')" }}
            />

            <Container className="relative z-10">
                <SectionHeader
                    label="Avis clients"
                    title="Ce que nos invités disent de nous"
                    centered
                    dark
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border border-gray-700 p-8 text-center">
                            <FaQuoteLeft className="text-3xl md:text-4xl text-brand-gold mb-4 mx-auto" />
                            <p className="text-gray-300 mb-6 italic">
                                {testimonial.review}
                            </p>
                            <div className="flex justify-center text-brand-gold mb-4 space-x-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}