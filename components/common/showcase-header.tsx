export default function ShowcaseHeader({title, subtitle}: {title: string; subtitle: string}) {
    return (
        <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl capitalize text-brand-dark">{title}</h2>
            <p className="text-base leading-relaxed my-8 text-brand-gray-500">{subtitle}</p>
        </div>
    );
}
