import {NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)']
};