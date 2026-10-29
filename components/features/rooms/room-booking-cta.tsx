import {getTranslations} from 'next-intl/server';
import {FaCalendar, FaCheckCircle} from 'react-icons/fa';
import BookingCtaSection from '@/components/features/rooms/booking-cta';
import {BOOKING_URL} from '@/lib/constants/site';
import type {RoomBookingAction} from '@/types/room-detail.type';

export default async function RoomBookingCta({
    namespace,
    image,
    actions,
}: {
    namespace: string;
    image: string;
    actions?: RoomBookingAction[];
}) {
    const t = await getTranslations(namespace);
    return (
        <BookingCtaSection
            title={t('BookingCtaTitle.translation.content')}
            subtitle={t('BookingCtaSubtitle.translation.content')}
            bullets={['BulletImmediate', 'BulletCancellation', 'BulletBestPrice'].map((key) => ({
                icon: FaCheckCircle,
                label: t(`${key}.translation.content`),
            }))}
            actions={
                actions ?? [
                    {
                        label: t('ActionBookNow.translation.content'),
                        href: BOOKING_URL,
                        icon: FaCalendar,
                        variant: 'primary',
                    },
                ]
            }
            imageSrc={image}
            imageAlt={t('BookingCtaImageAlt.translation.content')}
            imagePriority
            imageHeightClass="h-[400px]"
            imagePosition="right"
            bgClass="bg-brand-gold"
            textTone="light"
            accentClass="text-brand-gold"
        />
    );
}
