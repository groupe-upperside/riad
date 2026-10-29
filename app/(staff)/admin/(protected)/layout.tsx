import type {ReactNode} from 'react';
import Link from 'next/link';
import {requireStaffPage} from '@/lib/auth/server';
import LogoutButton from '@/components/features/staff/logout-button';
export const dynamic = 'force-dynamic';
export default async function ProtectedLayout({children}: {children: ReactNode}) {
    const staff = await requireStaffPage();
    return (
        <>
            <header className="border-b border-brand-beige-400 bg-white">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 md:px-10">
                    <Link href="/admin/confirmations" className="font-serif text-2xl">
                        Riad Nashira
                    </Link>
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="text-sm text-brand-dark-500">{staff.name}</span>
                        <LogoutButton />
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-12">{children}</main>
        </>
    );
}
