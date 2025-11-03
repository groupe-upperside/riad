import Container from '@/components/ui/container'
import SectionHeader from '@/components/ui/section-header'
import Button from '@/components/ui/button'
import {images} from '@/lib/constants'
import Image from 'next/image'
import {useTranslations} from 'next-intl'

export default function ExperienceSection() {
    const t = useTranslations('ExperienceSection')

    return (
        <section className="py-16 md:py-24 bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div>
                        <SectionHeader
                            label={t('Label.translation.content')}
                            title={t('Title.translation.content')}
                            className="mb-6"
                        />
                        <p className="text-brand-gray-500 mb-8 leading-relaxed">
                            {t('Description.translation.content')}
                        </p>
                        <Button variant="outline" showArrow>
                            {t('ButtonChooseRoom.translation.content')}
                        </Button>
                    </div>
                    <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={images.experienceSuite}
                            alt={t('AltLuxurySuite.translation.content')}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
}