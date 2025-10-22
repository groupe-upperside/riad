import Image from 'next/image'
import Container from '@/components/ui/container'

const patioViews = [
    {
        id: 'piscine',
        title: 'Vue Patio Piscine',
        subtitle: 'Sérénité et rafraîchissement',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4f43fb3cce-280346dc4f66128d6913.png'
    },
    {
        id: 'fontaine',
        title: 'Vue Patio Fontaine',
        subtitle: 'Tranquillité et authenticité',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ca81908e4c-3cecebeed056ac2b76aa.png'
    }
]

export default function PatioViews() {
    return (
        <section className="py-20 bg-brand-beige-100">
            <Container>
                <div className="text-center mb-16">
                    <h2 className='font-serif text-4xl md:text-5xl capitalize text-brand-dark'>
                        Emplacements & Vues
                    </h2>
                    <p className="text-base text-brand-gray-500 max-w-3xl mx-auto mt-8">
                        Nos chambres sont réparties entre le rez-de-chaussée et l'étage,
                        offrant différentes perspectives sur nos patios enchanteurs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {patioViews.map((view) => (
                        <div key={view.id} className="relative group">
                            <div className="h-[350px] overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    src={view.image}
                                    alt={view.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="font-serif text-2xl mb-2">{view.title}</h3>
                                <p className="text-sm opacity-90">{view.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}