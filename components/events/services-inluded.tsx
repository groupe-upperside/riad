import {ReactNode} from "react";
import {FaVideo, FaWifi} from "react-icons/fa";
import {AiFillPrinter} from "react-icons/ai";
import {MdMeetingRoom} from "react-icons/md";

export type ServiceCardProps = {
    id?: string;
    title: string;
    icon?: ReactNode;
    className?: string;
    iconWrapperClassName?: string;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
};

function BaseCard({
                      id,
                      title,
                      icon,
                      className = "",
                      iconWrapperClassName = "",
                  }: ServiceCardProps) {
    return (
        <div id={id} className={`text-center ${className}`}>
            <div
                className={`size-14 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 ${iconWrapperClassName}`}>
                <span className="text-white text-2xl">{icon}</span>
            </div>
            <h4 className="font-semibold text-lg text-brand-dark mb-2">{title}</h4>
        </div>
    );
}

export const ServicesIncluded = () => {
    return (
        <section id="services-section" className="py-24 bg-brand-beige">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-brand-dark mb-4">Services Inclus</h2>
                    <p className="text-brand-gray text-base leading-relaxed mx-auto">Un accompagnement complet pour la
                        réussite
                        de votre événement.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <BaseCard
                        id={"planning-service"}
                        title={"Salle dédiée"}
                        icon={<MdMeetingRoom/>}
                    />

                    <BaseCard
                        id={"catering-service"}
                        title={"WIFI & Internet haut débit"}
                        icon={<FaWifi/>}
                    />

                    <BaseCard
                        id={"catering-service"}
                        title={"Rétroprojecteur"}
                        icon={<FaVideo/>}
                    />

                    <BaseCard
                        id={"catering-service"}
                        title={"Imprimantes"}
                        icon={<AiFillPrinter/>}
                    />
                </div>
            </div>
        </section>

    )
}