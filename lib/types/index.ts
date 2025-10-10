import {IconType} from "react-icons";

export interface Room {
    id: string
    title: string
    price: number
    image: string
    slug: string
}

export interface Testimonial {
    id: string
    name: string
    location: string
    rating: number
    review: string
    avatar: string
}

export interface Amenity {
    id: string
    icon: IconType
    label: string
}

export interface Activity {
    id: string
    title: string
    image: string
}