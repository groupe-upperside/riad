import {ReactNode} from "react";
import {FaVideo, FaWifi} from "react-icons/fa";
import {AiFillPrinter} from "react-icons/ai";
import {MdMeetingRoom} from "react-icons/md";
import {useTranslations} from 'next-intl';

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
    const t = useTranslations('ServicesIncluded');

    return (
        <section id="services-section" className="py-24 bg-brand-beige">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-brand-dark mb-4">
                        {t('MainTitle.translation.content')}
                    </h2>
                    <p className="text-brand-gray text-base leading-relaxed mx-auto">
                        {t('MainDescription.translation.content')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <BaseCard
                        id={"planning-service"}
                        title={t('ServiceDedicatedRoom.translation.content')}
                        icon={<MdMeetingRoom/>}
                    />

                    <BaseCard
                        id={"catering-service"}
                        title={t('ServiceWifiInternet.translation.content')}
                        icon={<FaWifi/>}
                    />

                    <BaseCard
                        id={"video-service"}
                        title={t('ServiceProjector.translation.content')}
                        icon={<FaVideo/>}
                    />

                    <BaseCard
                        id={"printer-service"}
                        title={t('ServicePrinters.translation.content')}
                        icon={<AiFillPrinter/>}
                    />
                </div>
            </div>
        </section>

    )
}