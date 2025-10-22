import {SecondaryFacility, SecondaryFacilityCard} from "@/components/common/secondary-facility-card";

interface SecondaryFacilityShowcaseProps {
    title: string;
    subtitle: string;
    secondaryFacilities: SecondaryFacility[];
}

export const SecondaryFacilityShowcase: React.FC<SecondaryFacilityShowcaseProps> = ({
                                                              title,
                                                              subtitle,
                                                                                        secondaryFacilities
                                                          }) => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">{title}</h2>
                    <p className="text-base leading-relaxed my-8 text-brand-gray-500">{subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {secondaryFacilities.map((secondaryFacility) => (
                        <SecondaryFacilityCard key={secondaryFacility.id} secondaryFacility={secondaryFacility} />
                    ))}
                </div>
            </div>
        </section>
    );
};