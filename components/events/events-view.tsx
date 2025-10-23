import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";

const eventSpacesDetailed: ViewItem[] = [
    {
        id: "1",
        title: "ÉVÉNEMENTS PROFESSIONNELS",
        subtitle: "Séminaires et Réunions Professionnelles",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/fb9b241cd0-ba7125f26fa70a4c33ca.png",
        imageAlt: "Séminaires et réunions professionnelles dans un cadre raffiné",
        description:
            "Nous organisons vos séminaires, ateliers et réunions avec tout le confort nécessaire : un espace dédié, restauration sur mesure, services personnalisés et possibilités d’activités bien-être ou culturelles pour vos équipes."
    },
    {
        id: "2",
        title: "ÉVÉNEMENTS PRIVÉS",
        subtitle: "Dîners Privés et Soirées Exclusives",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/61e7871271-6dd1d996f7a4cc2c0992.png",
        imageAlt: "Dîners privés et soirées exclusives",
        description:
            "Offrez à vos invités une expérience culinaire raffinée dans l’un de nos restaurants. Menus personnalisés, espace dédié, cocktail signature et service sur mesure viennent sublimer ces moments."
    },
    {
        id: "3",
        title: "MOMENTS PRÉCIEUX",
        subtitle: "Célébrations et Moments de Vie",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/f64c1a0ffb-976c7943c5562cb6b6a9.png",
        imageAlt: "Mariages intimes, anniversaires, fiancailles ou toute célébration privée … Le Riad Nashira devient votre maison le temps d’une soirée ou d’un séjour. Nos équipes vous accompagnent pour imaginer un évènement de A à Z à votre image, dans un décor élégant et authentique.",
        description:
            "Mariages, anniversaires, baptêmes... Chaque moment important mérite un cadre à la hauteur de vos émotions et de vos rêves. Notre équipe vous accompagne dans la création d'événements uniques, reflétant votre personnalité et vos souhaits les plus chers."
    },
    {
        id: "4",
        title: "EXCLUSIVITÉ TOTALE",
        subtitle: "Privatisation Totale du Riad",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/6d8ead5dc2-9b054213d63436e9568a.png",
        imageAlt: "Privatisation totale du riad",
        description:
            "Pour un mariage, une grande célébration, un évènement d’entreprise, le Riad peut être privatisé dans son intégralité. Vous bénéficierez alors de nos 17 chambres, nos restaurants, nos 3 piscines, nos bars …. Tout sera dédié à vos invités." +
            "Des privatisations partielles sont aussi envisageables"
    }
];

export function EventSpacesDetailed() {
    return (
        <ViewsGallery
            id={"events"}
            title="Nos Services Événementiels"
            views={eventSpacesDetailed}
            columns={2}
            imageHeight="h-[400px]"
            showDescriptionBelow={true}
            showOverlay={true}
            overlayPosition="bottom"
            backgroundColor={"bg-white"}
        />
    );
}