import type {ReactNode} from 'react';

import Footer from '@/components/layout/site-footer';
import Header from '@/components/layout/site-header';

export default function SiteLayout({children}: {children: ReactNode}) {
    return (
        <div className="h-screen w-screen bg-[#F9FAFB]">
            <Header />
            <main> {children}</main>
            <Footer />
        </div>
    );
}
