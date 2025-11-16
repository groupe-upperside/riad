"use client";

import RoomsHeroSection from "@/components/rooms/rooms-hero-section";
import RoomsGallerySection, {GalleryItem} from "@/components/rooms/rooms-gallery";
import ServiceFeature, {ServiceFeatureProps} from "@/components/common/service-feature";
import {useTranslations} from "next-intl";

export default function ActivitiesPage() {
    const t = useTranslations("ServicesPage");

    const items: GalleryItem[] = [
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/c089dca217-3a27a0cc05bcbe64b5b9.png",
            alt: t("GalleryItem1Alt.translation.content"),
            colSpan: 1,
            rowSpan: 1,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fa6a98b30e-098ad1353861b1d43e3d.png",
            alt: t("GalleryItem2Alt.translation.content"),
            colSpan: 2,
            rowSpan: 2,
            priority: true,
        },
        {
            src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6a2ae5f694-e509340f023df548f5e4.png",
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
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/cf6f1e9c0a-1c4ff7ee941a8d7b2898.png",
                alt: t("BoutiqueImagePrimaryAlt.translation.content"),
            },
            secondary: {
                src: "https://storage.googleapis.com/uxpilot-auth.appspot.com/91f648397c-0b60dc7f4ec1e7e16bbe.png",
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
                    "https://storage.googleapis.com/uxpilot-auth.appspot.com/94ba6122b1-a91c8380698d3b451c81.png"
                }
            />
            <ServiceFeature {...laundryData} />
            <ServiceFeature {...airportVipData} />
            <ServiceFeature {...boutiqueData} />
            <RoomsGallerySection items={items} rounded />
        </>
    );
}
