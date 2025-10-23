'use client';

import React, {useState} from 'react';
import {FaArrowRight, FaChevronDown} from 'react-icons/fa6';
import Container from '@/components/ui/container';

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialReq, setSpecialReq] = useState('');

    const [adults, setAdults] = useState(defaultAdults ?? 'ADULTES');
    const [children, setChildren] = useState(defaultChildren ?? 'ENFANTS');
    const [rooms, setRooms] = useState(defaultRooms ?? '1 CHAMBRE');
    const [roomTypeSelect, setRoomTypeSelect] = useState(defaultRoomTypeSelect ?? 'Type de chambre');

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
                                placeholder="Prénom"
                                className={inputBase}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                aria-label="Prénom"
                                required
                            />
                        </div>

                        <div id="last-name-field">
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                placeholder="Nom"
                                className={inputBase}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-label="Nom"
                                required
                            />
                        </div>

                        <div id="email-field">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Adresse e-mail"
                                className={inputBase}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Adresse e-mail"
                                required
                            />
                        </div>

                        <div id="phone-field">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Numéro de téléphone"
                                className={inputBase}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                aria-label="Numéro de téléphone"
                            />
                        </div>

                        <div id="adults-field" className={selectWrap}>
                            <select
                                id="adults"
                                name="adults"
                                className={selectBase}
                                value={adults}
                                onChange={(e) => setAdults(e.target.value)}
                                aria-label="Adultes"
                            >
                                <option>ADULTES</option>
                                <option>1 Adulte</option>
                                <option>2 Adultes</option>
                                <option>3 Adultes</option>
                                <option>4 Adultes</option>
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
                                aria-label="Enfants"
                            >
                                <option>ENFANTS</option>
                                <option>0 Enfant</option>
                                <option>1 Enfant</option>
                                <option>2 Enfants</option>
                                <option>3 Enfants</option>
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
                                aria-label="Chambres"
                            >
                                <option>1 CHAMBRE</option>
                                <option>2 CHAMBRES</option>
                                <option>3 CHAMBRES</option>
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
                                aria-label="Type de chambre"
                            >
                                <option>Type de chambre</option>
                                <option>Confort</option>
                                <option>Deluxe</option>
                                <option>Suite</option>
                                <option>Suite Nashira</option>
                                <option>Suite Riner</option>
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
                                aria-label="Arrivée"
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
                                aria-label="Départ"
                            />
                        </div>

                        <div id="special-requirements-field" className="md:col-span-2">
            <textarea
                id="special-requirements"
                name="special-requirements"
                rows={5}
                placeholder="Demandes particulières"
                className="w-full rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
                value={specialReq}
                onChange={(e) => setSpecialReq(e.target.value)}
                aria-label="Demandes particulières"
            />
                        </div>
                    </div>

                    <div id="form-actions" className="mt-8">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center border border-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                        >
                            RÉSERVER
                            <FaArrowRight className="ml-3"/>
                        </button>
                    </div>
                </form>
            </Container>
        </section>
    );
}
