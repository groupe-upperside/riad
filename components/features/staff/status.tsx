import type {ConfirmationStatus} from '@/types/confirmation.type';
const labels: Record<ConfirmationStatus, string> = {
    draft: 'Brouillon',
    sending: 'Envoi en cours',
    sent: 'Envoyé',
    failed: 'Refusé',
    uncertain: 'À vérifier',
    expired: 'Brouillon expiré',
};
const tones: Record<ConfirmationStatus, string> = {
    draft: 'bg-brand-beige-200 text-brand-dark-600',
    sending: 'bg-blue-50 text-blue-900',
    sent: 'bg-green-50 text-green-900',
    failed: 'bg-red-50 text-red-900',
    uncertain: 'bg-amber-50 text-amber-900',
    expired: 'bg-brand-gray-100 text-brand-dark-500',
};
export default function ConfirmationStatusBadge({status}: {status: ConfirmationStatus}) {
    return (
        <span className={`inline-flex whitespace-nowrap rounded px-2.5 py-1 text-xs font-semibold ${tones[status]}`}>
            {labels[status]}
        </span>
    );
}
