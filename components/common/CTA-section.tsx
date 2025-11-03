import {IconType} from "react-icons";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";
import React from "react";

export interface CTAButton {
    text: string;
    variant: 'primary' | 'outline' | 'ghost';
    icon?: IconType;
    showArrow?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
}

export interface CTASectionProps {
    title: string;
    description: string;
    buttons: CTAButton[];
    backgroundColor?: string;
    textColor?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
                                                          title,
                                                          description,
                                                          buttons,
                                                          backgroundColor = 'bg-brand-gold',
                                                          textColor = 'text-white',
                                                          titleClassName = 'font-serif text-4xl md:text-5xl capitalize',
                                                          descriptionClassName = 'text-lg my-8 max-w-3xl mx-auto opacity-90'
                                                      }) => {
    return (
        <section className={`py-20 ${backgroundColor} ${textColor}`}>
            <Container>
                <div className="text-center">
                    <h2 className={`${titleClassName} ${textColor}`}>
                        {title}
                    </h2>
                    <p className={`${descriptionClassName}`}>
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {buttons.map((button, index) => {
                            const Icon = button.icon;

                            const btnEl = (
                                <Button
                                    variant={button.variant}
                                    showArrow={button.showArrow}
                                    className={button.className}
                                    onClick={button.onClick}
                                >
                                    {Icon && <Icon className="mr-2" />}
                                    {button.text}
                                </Button>
                            );

                            return button.href ? (
                                <Link key={index} href={button.href} className="inline-block">
                                    {btnEl}
                                </Link>
                            ) : (
                                <div key={index} className="inline-block">
                                    {btnEl}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
};