"use client";

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import ServiceFeature, {ServiceFeatureProps} from "@/components/common/service-feature";
import {useTranslations} from "next-intl";

export default function ActivitiesPage() {
    const t = useTranslations("ServicesPage");

    const items: GalleryItem[] = [
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_gallery_1.jpg',
            alt: t("GalleryItem1Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_gallery_2.jpeg',
            alt: t("GalleryItem2Alt.translation.content"),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_gallery_3.jpeg',
            alt: t("GalleryItem3Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
    ];

    const laundryData: ServiceFeatureProps = {
        id: "laundry-pressing-section",
        category: t("LaundryCategory.translation.content"),
        title: t("LaundryTitle.translation.content"),
        description: [t("LaundryDescription1.translation.content")],
        features: [
            t("LaundryFeatureServiceExpress.translation.content"),
            t("LaundryFeatureProductsPremium.translation.content"),
            t("LaundryFeatureDiscretion.translation.content"),
        ],
        images: {
            primary: {
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/e65b8d3228-90b37040ced8d51b4fce.png",
                alt: t("LaundryImagePrimaryAlt.translation.content"),
            },
            secondary: {
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6f31a8d583-ea2ab7c9140a5be7d4b9.png",
                alt: t("LaundryImageSecondaryAlt.translation.content"),
            },
        },
        cta: {
            text: t("LaundryCtaText.translation.content"),
            onClick: () => console.log("Request quote clicked"),
        },
        imagePosition: "right",
        backgroundColor: "bg-white",
    };

    const airportVipData: ServiceFeatureProps = {
        id: "airport-vip-section",
        category: t("AirportCategory.translation.content"),
        title: t("AirportTitle.translation.content"),
        description: [
            t("AirportDescription1.translation.content"),
            t("AirportDescription2.translation.content"),
        ],
        features: [
            t("AirportFeatureTransportVip.translation.content"),
            t("AirportFeatureFastTrack.translation.content"),
            t("AirportFeatureService24h.translation.content"),
        ],
        images: {
            primary: {
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c314e89d26-96527446a998f1e13397.png",
                alt: t("AirportImagePrimaryAlt.translation.content"),
            },
            secondary: {
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/ec11470f00-73b3aef977a53ac9a400.png",
                alt: t("AirportImageSecondaryAlt.translation.content"),
            },
        },
        cta: {
            text: t("AirportCtaText.translation.content"),
            onClick: () => console.log("Reserve transfer clicked"),
        },
        imagePosition: "left",
        backgroundColor: "bg-brand-beige",
    };

    const boutiqueData: ServiceFeatureProps = {
        id: "boutique-section",
        category: t("BoutiqueCategory.translation.content"),
        title: t("BoutiqueTitle.translation.content"),
        description: [
            t("BoutiqueDescription1.translation.content"),
            t("BoutiqueDescription2.translation.content"),
        ],
        features: [
            t("BoutiqueFeatureArtisanatAuthentique.translation.content"),
            t("BoutiqueFeatureTextiles.translation.content"),
            t("BoutiqueFeatureBeauteEtSenteurs.translation.content"),
        ],
        images: {
            primary: {
                src:  process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_shop_1.jpg',
                alt: t("BoutiqueImagePrimaryAlt.translation.content"),
            },
            secondary: {
                src:  process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_shop_2.jpg',
                alt: t("BoutiqueImageSecondaryAlt.translation.content"),
            },
        },
        cta: {
            text: t("BoutiqueCtaText.translation.content"),
            onClick: () => console.log("Discover boutique clicked"),
        },
        imagePosition: "right",
        backgroundColor: "bg-white",
    };

    return (
        <>
            <RoomsHeroSection
                subtitle={t("HeroSubtitle.translation.content")}
                title={t("HeroTitle.translation.content")}
                image={
                    process.env.NEXT_PUBLIC_CDN_URL + 'services/' + 'services_header.jpeg'
                }
            />
            <ServiceFeature {...laundryData} id={"pressing"}/>
            <ServiceFeature {...airportVipData}  id={"shuttle"} />
            <ServiceFeature {...boutiqueData}   id={"shop"}/>
            <RoomsGallerySection items={items} rounded />
        </>
    );
}
