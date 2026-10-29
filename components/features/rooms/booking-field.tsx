import type {InputHTMLAttributes, SelectHTMLAttributes} from 'react';
import {FaChevronDown} from 'react-icons/fa6';

type NamedField = {id: string};

export function BookingInput({id, type, ...props}: InputHTMLAttributes<HTMLInputElement> & NamedField) {
    const date = type === 'date';
    return (
        <div id={date ? `${id}-date-field` : `${id}-field`} className={date ? 'relative' : undefined}>
            <input
                {...props}
                id={id}
                name={id}
                type={type}
                className={
                    date
                        ? 'w-full h-12 rounded-md border border-gray-200 bg-gray-50 pr-10 pl-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300'
                        : 'w-full h-12 rounded-md border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300'
                }
            />
        </div>
    );
}

export function BookingSelect({id, children, ...props}: SelectHTMLAttributes<HTMLSelectElement> & NamedField) {
    return (
        <div id={`${id}-field`} className="relative">
            <select
                {...props}
                id={id}
                name={id}
                className="appearance-none w-full h-12 rounded-md border border-gray-200 bg-gray-50 pl-4 pr-10 text-left text-sm text-gray-700 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300"
            >
                {children}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
    );
}
