import {requireStaffRequest} from '@/lib/auth/server';
import {createDraft, listConfirmations} from '@/lib/confirmations/repository';
import {validateConfirmation} from '@/lib/confirmations/validation';
import {renderConfirmation} from '@/lib/confirmations/template';
import {assertSameOrigin, readJson, jsonResponse, errorResponse} from '@/lib/confirmations/http';

export async function GET(request: Request) {
    try {
        await requireStaffRequest();
        const url = new URL(request.url);
        return jsonResponse(
            listConfirmations({
                query: url.searchParams.get('q') ?? '',
                page: Number(url.searchParams.get('page') || 1),
            }),
        );
    } catch (error) {
        return errorResponse(error);
    }
}

export async function POST(request: Request) {
    try {
        const staff = await requireStaffRequest();
        assertSameOrigin(request);
        const body = (await readJson(request)) as {input?: unknown; draftId?: unknown};
        const input = validateConfirmation(body?.input);
        const rendered = renderConfirmation(input);
        const draft = createDraft(input, rendered, staff, typeof body.draftId === 'string' ? body.draftId : undefined);
        return jsonResponse(draft, 201);
    } catch (error) {
        return errorResponse(error);
    }
}
