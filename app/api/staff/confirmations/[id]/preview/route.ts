import {requireStaffRequest} from '@/lib/auth/server';
import {getConfirmation} from '@/lib/confirmations/repository';
import {previewHtml} from '@/lib/confirmations/template';
import {errorResponse} from '@/lib/confirmations/http';
import {ConfirmationError} from '@/types/confirmation.type';
import {MAIL_CDN} from '@/lib/constants/confirmation';

export async function GET(_request: Request, {params}: {params: Promise<{id: string}>}) {
    try {
        await requireStaffRequest();
        const {id} = await params;
        const confirmation = getConfirmation(id);
        if (!confirmation) throw new ConfirmationError('Confirmation introuvable.', 404);
        return new Response(previewHtml(confirmation.html), {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'private, no-store',
                'Content-Security-Policy': `default-src 'none'; img-src data: ${MAIL_CDN}; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'`,
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'SAMEORIGIN',
                'Referrer-Policy': 'no-referrer',
            },
        });
    } catch (error) {
        return errorResponse(error);
    }
}
