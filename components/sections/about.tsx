import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import {images} from '@/lib/constants'
import Image from 'next/image'

export default function AboutSection() {
    return (
        <section className="py-16 md:py-24">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden">
                        <Image
                                src={images.aboutRiad}
                                alt="Elegant Moroccan Riad interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 px-8 lg:px-16">
                        <SectionHeader
                            label="à propos de nous"
                            title="La tradition de l’excellence marocaine"
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            Niché au cœur de Marrakech, le Riad Nashira & Spa offre une oasis de tranquillité et de
                            luxe. Nous allions l’architecture marocaine traditionnelle au confort moderne afin d’offrir
                            à nos hôtes un séjour mémorable, célébrant la riche culture et la chaleureuse hospitalité de
                            notre ville.
                        </p>
                        <Button variant="outline" showArrow>
                            A PROPOS DE NOUS
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:gap-0 mt-12 lg:mt-0 lg:grid-cols-2 items-center">
                    <div className="px-8 lg:px-16">
                        <SectionHeader
                            label="expérience"
                            title="Goûtez au luxe dans notre Riad & Spa"
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            Au Riad Nashira & Spa, 16 chambres intimistes, une terrasse-solarium, deux piscines
                            (intérieure et extérieure) et un restaurant soigné composent un véritable écrin de quiétude.
                            Au spa, profitez du hammam traditionnel, massages sur mesure et du jacuzzi, tandis qu’à
                            table, notre chef célèbre les produits locaux de saison, parfois servis sous les étoiles
                            pour un souvenir inoubliable.
                        </p>
                        <Button variant="outline" showArrow>
                            CHOISIR UNE CHAMBRE
                        </Button>
                    </div>
                    <div className="relative aspect-[4/3] md:aspect-square w-full overflow-hidden">

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