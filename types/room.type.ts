import {IconType} from 'react-icons';

export interface Room {
    id: string;
    title: string;
    image: string;
    href: string;
    description: string;
}

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    review: string;
    avatar: string;
}

export interface Amenity {
    id: string;
    icon: IconType;
    label: string;
    description?: string;
}

export interface Activity {
    id: string;
    title: string;
    image: string;
}
