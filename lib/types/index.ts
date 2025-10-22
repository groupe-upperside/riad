import {IconType} from "react-icons";
import {ComponentType} from "react";

export interface RoomAmenity {
    icon: ComponentType<{ className?: string }>
    label: string
}

export interface Room {
    id: string
    title: string
    price: number
    image: string
    slug: string
    description: string
    amenities: RoomAmenity[]
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
    description?: string
}

export interface Activity {
    id: string
    title: string
    image: string
}