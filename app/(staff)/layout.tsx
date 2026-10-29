import '@/styles/globals.css';
import '@/styles/staff.css';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {bodyFace, displayFace} from '@/lib/fonts';

export const metadata: Metadata = {title: 'Équipe — Riad Nashira', robots: {index: false, follow: false}};
export default function StaffRootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="fr" className={`${displayFace.variable} ${bodyFace.variable}`}>
            <body className="staff-space">{children}</body>
        </html>
    );
}
