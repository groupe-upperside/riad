'use client';

import {useState, type ChangeEvent} from 'react';
import {BookingInput, BookingSelect} from '@/components/features/rooms/booking-field';
import {FaArrowRight} from 'react-icons/fa6';
import Container from '@/components/ui/container';
import {useTranslations} from 'next-intl';
import {sendBookingEmail} from '@/lib/actions/send-email';
import toast from 'react-hot-toast';

export type BookingFormProps = {
    defaultRoomBadge?: string;
    defaultCheckIn?: string | null;
    defaultCheckOut?: string | null;
    defaultAdults?: string | null;
    defaultChildren?: string | null;
    defaultRooms?: string | null;
    defaultRoomTypeSelect?: string | null;
};

export default function BookingForm({
    defaultRoomBadge = 'chambre',
    defaultCheckIn = null,
    defaultCheckOut = null,
    defaultAdults = null,
    defaultChildren = null,
    defaultRooms = null,
    defaultRoomTypeSelect = null,
}: BookingFormProps) {
    const t = useTranslations('BookingForm');
    const [values, setValues] = useState({
        'first-name': '',
        'last-name': '',
        email: '',
        phone: '',
        adults: defaultAdults ?? '',
        children: defaultChildren ?? '',
        rooms: defaultRooms ?? '',
        'room-type-select': defaultRoomTypeSelect ?? '',
        'check-in': defaultCheckIn ?? '',
        'check-out': defaultCheckOut ?? '',
        'special-requirements': '',
    });
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setValues((previous) => ({...previous, [name]: value}));
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().slice(0, 10);

    async function submitBooking(formData: FormData) {
        const payload = {
            firstName: formData.get('first-name'),
            lastName: formData.get('last-name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            adults: formData.get('adults'),
            children: formData.get('children'),
            rooms: formData.get('rooms'),
            roomTypeSelect: formData.get('room-type-select'),
            checkIn: formData.get('check-in'),
            checkOut: formData.get('check-out'),
            specialRequirements: formData.get('special-requirements'),
        } as Record<string, unknown>;

        try {
            await sendBookingEmail(payload);
            toast.success('Réservation envoyée.');
        } catch {
            toast.error("La réservation n'a pas pu être envoyée.");
        }
    }

    return (
        <section id="booking-form-container" className="bg-white py-24">
            <Container>
                <form id="booking-form" action={submitBooking}>
                    <input type="hidden" name="roomBadge" value={defaultRoomBadge} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <BookingInput
                            type="text"
                            id="first-name"
                            placeholder={t('PlaceholderFirstName.translation.content')}
                            aria-label={t('AriaLabelFirstName.translation.content')}
                            required
                            value={values['first-name']}
                            onChange={handleChange}
                        />

                        <BookingInput
                            type="text"
                            id="last-name"
                            placeholder={t('PlaceholderLastName.translation.content')}
                            aria-label={t('AriaLabelLastName.translation.content')}
                            required
                            value={values['last-name']}
                            onChange={handleChange}
                        />

                        <BookingInput
                            type="email"
                            id="email"
                            placeholder={t('PlaceholderEmail.translation.content')}
                            aria-label={t('AriaLabelEmail.translation.content')}
                            required
                            value={values['email']}
                            onChange={handleChange}
                        />

                        <BookingInput
                            type="tel"
                            id="phone"
                            placeholder={t('PlaceholderPhone.translation.content')}
                            aria-label={t('AriaLabelPhone.translation.content')}
                            required
                            value={values['phone']}
                            onChange={handleChange}
                        />

                        <BookingSelect
                            id="adults"
                            aria-label={t('AriaLabelAdults.translation.content')}
                            required
                            value={values['adults']}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                {t('OptionAdults.translation.content')}
                            </option>
                            <option>{t('Option1Adult.translation.content')}</option>
                            <option>{t('Option2Adults.translation.content')}</option>
                            <option>{t('Option3Adults.translation.content')}</option>
                            <option>{t('Option4Adults.translation.content')}</option>
                        </BookingSelect>

                        <BookingSelect
                            id="children"
                            aria-label={t('AriaLabelChildren.translation.content')}
                            required
                            value={values['children']}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                {t('OptionChildren.translation.content')}
                            </option>
                            <option>{t('Option0Child.translation.content')}</option>
                            <option>{t('Option1Child.translation.content')}</option>
                            <option>{t('Option2Children.translation.content')}</option>
                            <option>{t('Option3Children.translation.content')}</option>
                        </BookingSelect>

                        <BookingSelect
                            id="rooms"
                            aria-label={t('AriaLabelRooms.translation.content')}
                            required
                            value={values['rooms']}
                            onChange={handleChange}
                        >
                            <option>{t('Option1Room.translation.content')}</option>
                            <option>{t('Option2Rooms.translation.content')}</option>
                            <option>{t('Option3Rooms.translation.content')}</option>
                        </BookingSelect>

                        <BookingSelect
                            id="room-type-select"
                            aria-label={t('AriaLabelRoomType.translation.content')}
                            required
                            value={values['room-type-select']}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                {t('OptionRoomType.translation.content')}
                            </option>
                            <option>{t('OptionComfort.translation.content')}</option>
                            <option>{t('OptionDeluxe.translation.content')}</option>
                            <option>{t('OptionSuite.translation.content')}</option>
                            <option>{t('OptionSuiteNashira.translation.content')}</option>
                            <option>{t('OptionSuiteRiner.translation.content')}</option>
                        </BookingSelect>

                        <BookingInput
                            id="check-in"
                            type="date"
                            aria-label={t('AriaLabelCheckIn.translation.content')}
                            min={tomorrowISO}
                            required
                            value={values['check-in']}
                            onChange={handleChange}
                        />

                        <BookingInput
                            id="check-out"
                            type="date"
                            aria-label={t('AriaLabelCheckOut.translation.content')}
                            min={tomorrowISO}
                            required
                            value={values['check-out']}
                            onChange={handleChange}
                        />

                        <div id="special-requirements-field" className="md:col-span-2">
                            <textarea
                                id="special-requirements"
                                name="special-requirements"
                                rows={5}
                                placeholder={t('PlaceholderSpecialRequirements.translation.content')}
                                className="w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                                value={values['special-requirements']}
                                onChange={handleChange}
                                aria-label={t('AriaLabelSpecialRequirements.translation.content')}
                            />
                        </div>
                    </div>

                    <div id="form-actions" className="mt-8">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center border border-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            {t('ButtonBook.translation.content')}
                            <FaArrowRight className="ml-3" />
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
}
