import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import {GalleryItem} from "@/components/rooms/rooms-gallery";
import BookingForm from "@/components/rooms/booking-form";

const items: GalleryItem[] = [
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/925b1db0bb-8ae59c63c6dcd46c5865.png",
        alt: "Interior of a luxurious Moroccan restaurant with intricate tilework, hanging lanterns, plush seating, and a warm, inviting ambiance, authentic decor",
        colSpan: 1,
        rowSpan: 1,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b70eac3837-41486d2a6f64cbfb3242.png",
        alt: "Elegant Moroccan bedroom with a four-poster bed, dark wood paneling, and sophisticated decor, warm and intimate",
        colSpan: 2,
        rowSpan: 2,
        priority: true,
    },
    {
        src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f49c5a3e37-bec3436e20f016a5e417.png",
        alt: "Comfortable seating area in a Moroccan riad with colorful patterned cushions against a backdrop of intricate zellige tiles, vibrant and detailed",
        colSpan: 1,
        rowSpan: 1,
    },
];

type SearchParams = {
    room?: string;
    price?: string;
    checkIn?: string;     // ISO yyyy-mm-dd
    checkOut?: string;    // ISO yyyy-mm-dd
    adults?: string;      // e.g. "2 Adults"
    children?: string;    // e.g. "1 Child"
    rooms?: string;       // e.g. "2 ROOMS"
    roomType?: string;    // e.g. "Deluxe"
};

export default async function ReservationsPage({searchParams,
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
            <RoomsHeroSection subtitle="Réservez votre séjour dans l'univers unique du Riad Nashira. Chaque chambre vous attend pour une expérience authentique et raffinée."
                              title="Réservations"
                              image={"https://storage.googleapis.com/uxpilot-auth.appspot.com/9ffe227a17-c390c05fd6b3b180c57c.png"}/>
                <BookingForm
                    defaultCheckIn={checkIn ?? null}
                    defaultCheckOut={checkOut ?? null}
                    defaultAdults={adults ?? null}
                    defaultChildren={children ?? null}
                    defaultRooms={rooms ?? null}
                    defaultRoomTypeSelect={roomType ?? null}
                />
        </>
    )}