import Link from 'next/link';
import {notFound} from 'next/navigation';
import {requireStaffPage} from '@/lib/auth/server';
import {getConfirmation} from '@/lib/confirmations/repository';
import {staffDate, stayDate} from '@/lib/confirmations/format';
import EmailPreview from '@/components/features/staff/email-preview';
import ConfirmationStatusBadge from '@/components/features/staff/status';
export default async function ConfirmationDetailPage({params}: {params: Promise<{id: string}>}) {
    const staff = await requireStaffPage();
    const {id} = await params;
    const item = getConfirmation(id);
    if (!item) notFound();
    const editable = item.createdBy === staff.id && ['draft', 'failed', 'expired'].includes(item.status);
    return (
        <>
            <Link href="/admin/confirmations" className="text-sm underline underline-offset-4">
                Retour à l’historique
            </Link>
            <div className="mb-8 mt-6 flex flex-wrap items-start justify-between gap-5">
                <div className="min-w-0 max-w-full">
                    <h1 className="text-3xl font-semibold">Confirmation {item.reference}</h1>
                    <p className="mt-3 break-all text-sm text-brand-dark-500">
                        {item.guestName} · {item.recipient}
                    </p>
                </div>
                <ConfirmationStatusBadge status={item.status} />
            </div>
            {item.status === 'sent' && (
                <p
                    role="status"
                    className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900"
                >
                    Envoi accepté par Mailjet le {staffDate(item.sentAt!)}. Cette confirmation ne peut plus être envoyée
                    à nouveau.
                </p>
            )}
            {item.status === 'sending' && (
                <p
                    role="status"
                    className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900"
                >
                    Envoi en cours. Actualisez cette page pour vérifier son résultat ; ne créez pas de nouvel envoi.
                </p>
            )}
            {item.error && (
                <p role="alert" className="staff-error mb-6">
                    {item.error}
                </p>
            )}
            <section className="staff-panel mb-8">
                <h2 className="text-lg font-semibold">Détails du message</h2>
                <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
                    <div>
                        <dt className="text-brand-dark-500">Objet</dt>
                        <dd className="mt-1">{item.subject}</dd>
                    </div>
                    <div>
                        <dt className="text-brand-dark-500">Langue</dt>
                        <dd className="mt-1">{item.language === 'fr' ? 'Français' : 'Anglais'}</dd>
                    </div>
                    <div>
                        <dt className="text-brand-dark-500">Séjour</dt>
                        <dd className="mt-1">
                            Du {stayDate(item.checkIn)} au {stayDate(item.checkOut)}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-brand-dark-500">Préparé par</dt>
                        <dd className="mt-1">
                            {item.createdByName}, le {staffDate(item.createdAt)}
                        </dd>
                    </div>
                </dl>
                {editable && (
                    <Link className="staff-button mt-6" href={`/admin/confirmations/new?draft=${item.id}`}>
                        Reprendre et prévisualiser
                    </Link>
                )}
                {item.status === 'uncertain' && (
                    <p className="mt-5 text-sm text-brand-dark-500">
                        Identifiant de suivi à rechercher dans Mailjet :{' '}
                        <span className="break-all font-medium">{item.id}</span>
                    </p>
                )}
            </section>
            <h2 className="mb-4 text-xl font-semibold">
                {item.status === 'sent' ? 'Email envoyé' : 'Message préparé'}
            </h2>
            <EmailPreview id={item.id} />
        </>
    );
}
