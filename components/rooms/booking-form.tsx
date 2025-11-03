'use client';

import React, {useState} from 'react';
import {FaArrowRight, FaChevronDown} from 'react-icons/fa6';
import Container from '@/components/ui/container';
import {useTranslations} from 'next-intl';

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialReq, setSpecialReq] = useState('');

    const [adults, setAdults] = useState(defaultAdults ?? t('DefaultAdults.translation.content'));
    const [children, setChildren] = useState(defaultChildren ?? t('DefaultChildren.translation.content'));
    const [rooms, setRooms] = useState(defaultRooms ?? t('DefaultRooms.translation.content'));
    const [roomTypeSelect, setRoomTypeSelect] = useState(defaultRoomTypeSelect ?? t('DefaultRoomType.translation.content'));

    const [checkInISO, setCheckInISO] = useState<string>(defaultCheckIn ?? '');
    const [checkOutISO, setCheckOutISO] = useState<string>(defaultCheckOut ?? '');

    const inputBase =
        'w-full h-12 rounded-md border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300';
    const selectWrap = 'relative';
    const selectBase =
        'appearance-none w-full h-12 rounded-md border border-gray-200 bg-gray-50 pl-4 pr-10 text-left text-sm text-gray-700 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300';
    const dateWrap = 'relative';
    const dateInput =
        'w-full h-12 rounded-md border border-gray-200 bg-gray-50 pr-10 pl-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            roomBadge: defaultRoomBadge,
            firstName,
            lastName,
            email,
            phone,
            adults,
            children,
            rooms,
            roomTypeSelect,
            checkIn: checkInISO,
            checkOut: checkOutISO,
            specialRequirements: specialReq,
        };
        console.log('Booking payload:', payload);
    };

    return (
        <section id="booking-form-container" className="bg-white py-24">
            <Container>
                <form id="booking-form" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div id="first-name-field">
                            <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                placeholder={t('PlaceholderFirstName.translation.content')}
                                className={inputBase}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                aria-label={t('AriaLabelFirstName.translation.content')}
                                required
                            />
                        </div>

                        <div id="last-name-field">
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                placeholder={t('PlaceholderLastName.translation.content')}
                                className={inputBase}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-label={t('AriaLabelLastName.translation.content')}
                                required
                            />
                        </div>

                        <div id="email-field">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t('PlaceholderEmail.translation.content')}
                                className={inputBase}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label={t('AriaLabelEmail.translation.content')}
                                required
                            />
                        </div>

                        <div id="phone-field">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder={t('PlaceholderPhone.translation.content')}
                                className={inputBase}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                aria-label={t('AriaLabelPhone.translation.content')}
                            />
                        </div>

                        <div id="adults-field" className={selectWrap}>
                            <select
                                id="adults"
                                name="adults"
                                className={selectBase}
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                                aria-label={t('AriaLabelAdults.translation.content')}
                            >
                                <option>{t('OptionAdults.translation.content')}</option>
                                <option>{t('Option1Adult.translation.content')}</option>
                                <option>{t('Option2Adults.translation.content')}</option>
                                <option>{t('Option3Adults.translation.content')}</option>
                                <option>{t('Option4Adults.translation.content')}</option>
                            </select>
                            <FaChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>

                        <div id="children-field" className={selectWrap}>
                            <select
                                id="children"
                                name="children"
                                className={selectBase}
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                                aria-label={t('AriaLabelChildren.translation.content')}
                            >
                                <option>{t('OptionChildren.translation.content')}</option>
                                <option>{t('Option0Child.translation.content')}</option>
                                <option>{t('Option1Child.translation.content')}</option>
                                <option>{t('Option2Children.translation.content')}</option>
                                <option>{t('Option3Children.translation.content')}</option>
                            </select>
                            <FaChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>

                        <div id="rooms-field" className={selectWrap}>
                            <select
                                id="rooms"
                                name="rooms"
                                className={selectBase}
                                value={rooms}
                                onChange={(e) => setRooms(e.target.value)}
                                aria-label={t('AriaLabelRooms.translation.content')}
                            >
                                <option>{t('Option1Room.translation.content')}</option>
                                <option>{t('Option2Rooms.translation.content')}</option>
                                <option>{t('Option3Rooms.translation.content')}</option>
                            </select>
                            <FaChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>

                        <div id="room-type-select-field" className={selectWrap}>
                            <select
                                id="room-type-select"
                                name="room-type-select"
                                className={selectBase}
                                value={roomTypeSelect}
                                onChange={(e) => setRoomTypeSelect(e.target.value)}
                                aria-label={t('AriaLabelRoomType.translation.content')}
                            >
                                <option>{t('OptionRoomType.translation.content')}</option>
                                <option>{t('OptionComfort.translation.content')}</option>
                                <option>{t('OptionDeluxe.translation.content')}</option>
                                <option>{t('OptionSuite.translation.content')}</option>
                                <option>{t('OptionSuiteNashira.translation.content')}</option>
                                <option>{t('OptionSuiteRiner.translation.content')}</option>
                            </select>
                            <FaChevronDown
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>

                        <div id="check-in-date-field" className={dateWrap}>
                            <input
                                id="check-in"
                                name="check-in"
                                type="date"
                                className={dateInput}
                                value={checkInISO}
                                onChange={(e) => setCheckInISO(e.target.value)}
                                aria-label={t('AriaLabelCheckIn.translation.content')}
                            />
                        </div>

                        <div id="check-out-date-field" className={dateWrap}>
                            <input
                                id="check-out"
                                name="check-out"
                                type="date"
                                className={dateInput}
                                value={checkOutISO}
                                onChange={(e) => setCheckOutISO(e.target.value)}
                                aria-label={t('AriaLabelCheckOut.translation.content')}
                            />
                        </div>

                        <div id="special-requirements-field" className="md:col-span-2">
            <textarea
                id="special-requirements"
                name="special-requirements"
                rows={5}
                placeholder={t('PlaceholderSpecialRequirements.translation.content')}
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                value={specialReq}
                onChange={(e) => setSpecialReq(e.target.value)}
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
                            <FaArrowRight className="ml-3"/>
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
}