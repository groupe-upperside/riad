import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import {images} from '@/lib/constants'
import Image from 'next/image'

export default function ExperienceSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div>
                        <SectionHeader
                            label="EXPERIENCE"
                            title="Experience Luxury At Our Riad & Spa"
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            Each corner of Riad Nashira tells a story of craftsmanship and elegance.
                            Indulge in our world-class spa, savor authentic Moroccan cuisine, and
                            relax in rooms that are a testament to refined comfort. Your journey
                            into serenity begins here.
                        </p>
                        <Button variant="outline" showArrow>
                            CHOOSE ROOM
                        </Button>
                    </div>
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={images.experienceSuite}
                            alt="Luxurious hotel suite"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}