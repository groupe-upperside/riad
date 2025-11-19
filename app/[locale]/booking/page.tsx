import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import BookingForm from "@/components/rooms/booking-form";

type SearchParams = {
    room?: string;
    price?: string;
    checkIn?: string;
    checkOut?: string;
    adults?: string;
    children?: string;
    rooms?: string;
    roomType?: string;
};

export default async function ReservationsPage({
                                                   searchParams,
                                               }: {
    searchParams: Promise<SearchParams>;
}) {
    const {
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
        roomType,
    } = await searchParams;

    return (
        <>
            <RoomsHeroSection
                subtitle="Réservez votre séjour dans l'univers unique du Riad Nashira. Chaque chambre vous attend pour une expérience authentique et raffinée."
                title="Réservations"
                image={ process.env.NEXT_PUBLIC_CDN_URL + 'booking/' + 'booking_header.jpeg'}/>
            <BookingForm
                defaultCheckIn={checkIn ?? null}
                defaultCheckOut={checkOut ?? null}
                defaultAdults={adults ?? null}
                defaultChildren={children ?? null}
                defaultRooms={rooms ?? null}
                defaultRoomTypeSelect={roomType ?? null}
            />
        </>
    )
}