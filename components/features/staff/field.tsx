import type {ReactNode} from 'react';
export default function StaffField({
    id,
    label,
    hint,
    children,
}: {
    id: string;
    label: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div className="min-w-0">
            <label htmlFor={id} className="mb-2 block text-sm font-medium">
                {label}
            </label>
            {children}
            {hint && <p className="mt-2 text-xs leading-relaxed text-brand-dark-500">{hint}</p>}
        </div>
    );
}
