import 'server-only';

import {NextResponse} from 'next/server';
import {staffBaseUrl} from '@/lib/auth/config';
import {ConfirmationError} from '@/types/confirmation.type';

export function assertSameOrigin(request: Request) {
    if (request.headers.get('origin') !== staffBaseUrl())
        throw new ConfirmationError('Cette demande ne provient pas de l’espace équipe.', 403);
}

export async function readJson(request: Request): Promise<unknown> {
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
        throw new ConfirmationError('Format de demande invalide.', 415);
    const reader = request.body?.getReader();
    if (!reader) throw new ConfirmationError('Formulaire manquant.');
    let length = 0;
    const chunks: Uint8Array[] = [];
    try {
        while (true) {
            const {done, value} = await reader.read();
            if (done) break;
            length += value.byteLength;
            if (length > 16_384) {
                await reader.cancel();
                throw new ConfirmationError('Le formulaire est trop volumineux.', 413);
            }
            chunks.push(value);
        }
        return JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch (error) {
        if (error instanceof ConfirmationError) throw error;
        throw new ConfirmationError('Formulaire invalide.');
    }
}

export function jsonResponse(data: unknown, status = 200) {
    return NextResponse.json(data, {status, headers: {'Cache-Control': 'private, no-store'}});
}

export function errorResponse(error: unknown) {
    if (error instanceof ConfirmationError)
        return jsonResponse({error: error.message, existingId: error.existingId}, error.status);
    console.error('Staff confirmation request failed:', error instanceof Error ? error.name : 'Unknown error');
    return jsonResponse({error: 'L’opération est indisponible. Réessayez dans un instant.'}, 503);
}
