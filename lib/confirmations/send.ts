import 'server-only';

import {claimDraft, getConfirmation, markSent, markUnsuccessful} from '@/lib/confirmations/repository';
import {inlineAttachments} from '@/lib/confirmations/template';
import {ConfirmationDeliveryError, deliverConfirmation} from '@/lib/email/mailjet';
import {ConfirmationError} from '@/types/confirmation.type';
import {validateConfirmation} from '@/lib/confirmations/validation';

export async function sendConfirmation(id: string, token: string, actorId: string) {
    const saved = getConfirmation(id);
    if (!saved || saved.createdBy !== actorId)
        throw new ConfirmationError('Cette prévisualisation ne peut pas être utilisée.', 409);
    validateConfirmation(saved.input);
    let inlinedAttachments: ReturnType<typeof inlineAttachments>;
    try {
        inlinedAttachments = inlineAttachments(saved.html);
    } catch {
        throw new ConfirmationError(
            'Les images du modèle sont indisponibles. Contactez l’administrateur avant l’envoi.',
            503,
        );
    }
    const draft = claimDraft(id, token, actorId);
    try {
        const receipt = await deliverConfirmation({
            id: draft.id,
            recipient: draft.recipient,
            subject: draft.subject,
            html: draft.html,
            inlinedAttachments,
        });
        markSent(id, receipt.messageId);
    } catch (error) {
        const definiteFailure = error instanceof ConfirmationDeliveryError && error.definiteFailure;
        markUnsuccessful(id, definiteFailure);
        throw new ConfirmationError(
            definiteFailure
                ? 'Mailjet a refusé cet envoi. Consultez l’historique pour préparer une nouvelle tentative.'
                : 'Le résultat de l’envoi est incertain. Vérifiez-le dans Mailjet ; aucun nouvel envoi automatique ne sera effectué.',
            502,
            id,
        );
    }
}
