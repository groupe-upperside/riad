import {requireStaffRequest} from '@/lib/auth/server';
import {assertSameOrigin, readJson, jsonResponse, errorResponse} from '@/lib/confirmations/http';
import {sendConfirmation} from '@/lib/confirmations/send';
import {ConfirmationError} from '@/types/confirmation.type';

export async function POST(request: Request, {params}: {params: Promise<{id: string}>}) {
    try {
        const staff = await requireStaffRequest();
        assertSameOrigin(request);
        const {id} = await params;
        const body = (await readJson(request)) as {previewToken?: unknown};
        if (typeof body?.previewToken !== 'string')
            throw new ConfirmationError('Prévisualisez le message avant de confirmer l’envoi.');
        await sendConfirmation(id, body.previewToken, staff.id);
        return jsonResponse({ok: true, id});
    } catch (error) {
        return errorResponse(error);
    }
}
