import {getTranslations} from 'next-intl/server';
import {FaCalendar} from 'react-icons/fa';
import Container from '@/components/ui/container';
import ButtonLink from '@/components/ui/button-link';

export default async function BookingBanner({
    namespace,
    buttonKey,
    href,
}: {
    namespace: 'RoomsCTA' | 'RestaurantsCTA' | 'SpaPage';
    buttonKey: 'ButtonBookNow' | 'ButtonReserveTable' | 'ButtonReserveTreatment';
    href: string;
}) {
    const t = await getTranslations(namespace);
    return (
        <section className="py-20 bg-brand-gold text-white">
            <Container>
                <div className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl capitalize text-white">
                        {t('Title.translation.content')}
                    </h2>
                    <p className="text-lg my-8 max-w-3xl mx-auto opacity-90">{t('Description.translation.content')}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ButtonLink
                            href={href}
                            variant="outline"
                            linkClassName="inline-block"
                            className="border-2 border-white text-white hover:bg-white hover:text-brand-gold-400"
                        >
                            <FaCalendar className="mr-2" />
                            {t(`${buttonKey}.translation.content`)}
                        </ButtonLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
