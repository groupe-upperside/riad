import {FaGlassMartini, FaSpa, FaSun, FaSwimmingPool, FaUtensils, FaWifi} from 'react-icons/fa'
import type {Activity, Amenity, Room, Testimonial} from '@/lib/types'

export const images = {
    hero: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/5c04d838a6-66122dae7190d989147c.png',
    aboutRiad: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4f19248be1-361b5188a53dc6e33bfc.png',
    experienceSuite: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0b98983862-ad0abfe6da44ee70e37b.png',
    patternOverlay: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/dc765237cd-ef220abc13ff04563495.png',
    goldLight: 'https://storage.googleapis.com/uxpilot-images-and-prompts/images/1706612450849-gold-light.png',

    // Room images
    rooms: {
        deluxe: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/a699041c02-80fbfd2bd61526107246.png',
        junior: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1a792e274a-ff4b71d1c3d7ad473292.png',
        patio: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ec1e6b951b-c088ea06b3dbe52828bd.png',
        nashira: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3fa88d1502-498ae2aa5eaf06ab6c35.png',
    },

    // Activity images
    activities: {
        steam: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/74b8d1f010-5b5c2eb5b0b113774c3a.png',
        jacuzzi: "https://storage.googleapis.com/uxpilot-auth.appspot.com/809e9157f2-212027b991bb8deb91c7.png",
        solarium: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/6aac2c21f2-e0defa327435247089ae.png',
        pool: "https://storage.googleapis.com/uxpilot-auth.appspot.com/49fe0daf3e-5cad758d303ada7b78a1.png",
        bar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/65e0ca8f5c-e2a217fb43fec67c14b4.png',
    },

    // Gallery images
    gallery: {
        courtyard: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fbd2ef6416-519eb0fe1a16159a24f9.png',
        cuisine: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02d7f1c424-700fae45d8e1b7bceb5f.png',
        rooftop: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/580707640f-ebdcf2aa6c8a51e8acd7.png',
        hammam: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02532e2b78-93b0259644fe3a57c82d.png',
        souk: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c27775db0f-be53cf174d6ec01e228b.png',
    },

    // Avatar images
    avatars: {
        avatar1: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        avatar2: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        avatar3: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
    }
}

export const amenities: Amenity[] = [
    { id: '1', icon: FaSpa, label: 'SPA & Jacuzzi' },
    { id: '2', icon: FaSwimmingPool, label: 'Piscine intérieure chauffée' },
    { id: '3', icon: FaSun, label: 'Solarium' },
    { id: '4', icon: FaUtensils, label: 'Restaurant' },
    { id: '5', icon: FaGlassMartini, label: 'Lounge Bar' },
    { id: '6', icon: FaWifi, label: 'WIFI Gratuit' },
]

export const rooms: Room[] = [
    {
        id: '1',
        title: 'Confort',
        price: 299,
        image: images.rooms.deluxe,
        slug: 'deluxe-room'
    },
    {
        id: '2',
        title: 'Supérieure',
        price: 399,
        image: images.rooms.junior,
        slug: 'junior-suite'
    },
    {
        id: '3',
        title: 'Suite',
        price: 599,
        image: images.rooms.patio,
        slug: 'patio-suite'
    },
    {
        id: '4',
        title: 'Suite de luxe',
        price: 799,
        image: images.rooms.nashira,
        slug: 'nashira-suite'
    },
]

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'John Wick',
        location: 'Moscou / Russie',
        rating: 5,
        review: "Le meilleur riad où j’aie jamais eu le privilège de séjourner. Le bâtiment est superbe, et il ne cesse d’émerveiller. Une expérience véritablement inoubliable.",
        avatar: images.avatars.avatar1
    },
    {
        id: '2',
        name: 'Nathalie Portman',
        location: 'Paris / France',
        rating: 5,
        review: 'C’est l’une des meilleures décisions que nous ayons jamais prises. Nous pensions réserver un riad, mais nous avons trouvé une famille qui nous soutient. Le personnel est incroyable.',
        avatar: images.avatars.avatar2
    },
    {
        id: '3',
        name: 'Will Smith',
        location: 'Madrid / Espagne',
        rating: 5,
        review: 'L’ambiance était fabuleuse. Le bar de la piscine est idéal pour se détendre. Le personnel est très aimable et chaleureux. Une escapade parfaite loin de l’agitation de la ville.',
        avatar: images.avatars.avatar3
    },
]

type GalleryItem = {
    id: string | number;
    src: string;
    alt: string;
    width: number;
    height: number;
};

export const activities: Activity[] = [
    { id: '1', title: 'Hammam', image: images.activities.steam },
    { id: '2', title: 'Jacuzzi', image: images.activities.jacuzzi },
    { id: '3', title: 'Solarium', image: images.activities.solarium },
    { id: '4', title: 'Piscines', image: images.activities.pool },
    { id: '5', title: 'Bar & Lounge', image: images.activities.bar },
]

export const galleryImages: GalleryItem[] = [
    {
        id: '1',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/fbd2ef6416-519eb0fe1a16159a24f9.png',
        alt: 'A serene Moroccan courtyard garden with a central fountain',
        width: 1200,
        height: 1400,
    },
    {
        id: '2',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02d7f1c424-700fae45d8e1b7bceb5f.png',
        alt: 'Traditional Moroccan tagine dish',
        width: 1200,
        height: 800,
    },
    {
        id: '3',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/580707640f-ebdcf2aa6c8a51e8acd7.png',
        alt: 'Rooftop terrace at sunset with Atlas Mountains view',
        width: 1200,
        height: 1400,
    },
    {
        id: '4',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/02532e2b78-93b0259644fe3a57c82d.png',
        alt: 'Traditional Moroccan Hammam and spa',
        width: 1200,
        height: 1000,
    },
    {
        id: '5',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c27775db0f-be53cf174d6ec01e228b.png',
        alt: 'Bustling Marrakech souk with colorful displays',
        width: 1200,
        height: 1000,
    },
    {
        id: '6',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/05f166391a-3aba4f8574f7917e1958.png',
        alt: 'Moroccan hotel bedroom with traditional carved wooden bed',
        width: 1200,
        height: 1400,
    },
    {
        id: '7',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/24912c6018-ee69d26990ac0d0c7bfb.png',
        alt: 'Traditional Moroccan mint tea ceremony',
        width: 1200,
        height: 800,
    },
    {
        id: '8',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cf1456705d-c7a03e291a07282251ae.png',
        alt: 'Luxurious hotel spa treatment room',
        width: 1200,
        height: 1000,
    },
    {
        id: '9',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/f0e537146e-8218d985fd0779604e26.png',
        alt: 'Moroccan riad courtyard at night',
        width: 1200,
        height: 1400,
    },
    {
        id: '10',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/3c8af76559-86c0b3869d7e58372e0d.png',
        alt: 'Hotel restaurant dining area',
        width: 1200,
        height: 1000,
    },
    {
        id: '11',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/c44b1f9fea-a3e92de5b0b57a7a15ee.png',
        alt: 'Intricate Moroccan mosaic tilework',
        width: 1200,
        height: 800,
    },
    {
        id: '12',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/7799a529ce-38018d13e9db661afced.png',
        alt: 'Hotel concierge desk',
        width: 1200,
        height: 1000,
    },
    {
        id: '13',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/0830ecfa41-f8aaabc1e3a16b1ac79a.png',
        alt: 'Moroccan hotel balcony overlooking medina',
        width: 1200,
        height: 1400,
    },
    {
        id: '14',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/23f932cf8b-21687faecdd12b6e150e.png',
        alt: 'Traditional Moroccan carpet weaving',
        width: 1200,
        height: 1000,
    },
    {
        id: '15',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/1ccb1ab89c-c4cfa3ca134f0b3c7440.png',
        alt: 'Hotel fitness center',
        width: 1200,
        height: 800,
    },
    {
        id: '16',
        src: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/812360b1d9-338ec2b582ebf1ecfeea.png',
        alt: 'Moroccan hotel library',
        width: 1200,
        height: 1000,
    },
];
