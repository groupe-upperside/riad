import {NextRequest, NextResponse} from 'next/server';
import {getStaffAuth} from '@/lib/auth/server';

async function handle(request: NextRequest) {
    try {
        const auth = await getStaffAuth();
        const response = await auth.handler(request);
        response.headers.set('Cache-Control', 'no-store');
        return response;
    } catch {
        return NextResponse.json(
            {message: 'Connexion indisponible. Contactez l’administrateur.'},
            {status: 503, headers: {'Cache-Control': 'no-store'}},
        );
    }
}
export {handle as GET, handle as POST};
