import ViewsGallery, {ViewItem} from "@/components/common/views-gallery";

const patioViewsData: ViewItem[] = [
    {
        id: 'piscine',
        title: 'Vue Patio Piscine',
        subtitle: 'Sérénité et rafraîchissement',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/4f43fb3cce-280346dc4f66128d6913.png'
    },
    {
        id: 'fontaine',
        title: 'Vue Patio Fontaine',
        subtitle: 'Tranquillité et authenticité',
        image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/ca81908e4c-3cecebeed056ac2b76aa.png'
    }
];

export function PatioViews() {
    return (
        <ViewsGallery
            title="Emplacements & Vues"
            description="Nos chambres sont réparties entre le rez-de-chaussée et l'étage, offrant différentes perspectives sur nos patios enchanteurs."
            views={patioViewsData}
            columns={2}
        />
    );
}