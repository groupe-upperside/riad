export interface Facility {
    id: string;
    category: string;
    name: string;
    description: string[];
    cuisine?: string;
    hours?: string;
    image: string;
    imageAlt: string;
    icon?: string;
    menuText?: string;
    menuLink?: string;
    reservationText?: string;
    reservationLink?: string;
    phone?: string;
}

export interface SecondaryFacility {
    id: string;
    name: string;
    description: string;
    image: string;
    imageAlt: string;
    ctaText?: string;
}
