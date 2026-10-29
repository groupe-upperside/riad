import Link from 'next/link';
import {notFound} from 'next/navigation';
import {requireStaffPage} from '@/lib/auth/server';
import {getConfirmation} from '@/lib/confirmations/repository';
import ConfirmationForm from '@/components/features/staff/confirmation-form';
export default async function NewConfirmationPage({searchParams}: {searchParams: Promise<{draft?: string}>}) {
    const staff = await requireStaffPage();
    const {draft} = await searchParams;
    const previous = draft ? getConfirmation(draft) : null;
    if (
        draft &&
        (!previous || previous.createdBy !== staff.id || !['draft', 'failed', 'expired'].includes(previous.status))
    )
        notFound();
    const today = new Intl.DateTimeFormat('sv-SE', {timeZone: 'Africa/Casablanca'}).format(new Date());
    return (
        <>
            <Link href="/admin/confirmations" className="text-sm text-brand-dark-500 underline underline-offset-4">
                Historique des confirmations
            </Link>
            <h1 className="mt-6 text-3xl font-semibold">
                {previous ? 'Reprendre une confirmation' : 'Nouvelle confirmation'}
            </h1>
            <p className="mb-8 mt-3 max-w-3xl text-sm leading-relaxed text-brand-dark-500">
                Renseignez les informations du séjour, puis vérifiez le message complet en français ou en anglais avant
                de confirmer son envoi.
            </p>
            <ConfirmationForm today={today} initial={previous?.input} previousId={previous?.id} />
        </>
    );
}
