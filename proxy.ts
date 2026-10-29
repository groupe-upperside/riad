import {NextResponse, type NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {routing} from '@/lib/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/'))
        return NextResponse.next();
    return handleI18nRouting(request);
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
};
