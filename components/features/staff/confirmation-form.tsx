'use client';

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState, type ChangeEvent, type FormEvent} from 'react';
import StaffField from '@/components/features/staff/field';
import EmailPreview from '@/components/features/staff/email-preview';
import type {StayConfirmationInput} from '@/types/confirmation.type';
import {addCalendarDays} from '@/lib/confirmations/dates';

type DraftPreview = {id: string; previewToken: string; subject: string};
type RequestError = {error?: string; existingId?: string};

export default function ConfirmationForm({
    today,
    initial,
    previousId,
}: {
    today: string;
    initial?: StayConfirmationInput;
    previousId?: string;
}) {
    const router = useRouter();
    const [values, setValues] = useState<StayConfirmationInput>(
        initial ?? {
            reference: '',
            recipient: '',
            language: 'fr',
            title: 'mr',
            guestName: '',
            checkIn: '',
            checkOut: '',
            confirmedOn: today,
            adults: 2,
            children: 0,
            childrenAges: '',
            room: '',
            totalAmount: '',
            paymentKind: 'deposit',
            paymentAmount: '',
        },
    );
    const [draftId, setDraftId] = useState(previousId);
    const [preview, setPreview] = useState<DraftPreview | null>(null);
    const [pending, setPending] = useState<'preview' | 'send' | null>(null);
    const [error, setError] = useState<RequestError | null>(null);
    const [needsLogin, setNeedsLogin] = useState(false);
    const minimumCheckOut = addCalendarDays(
        values.checkIn.length === 10 && values.checkIn > today ? values.checkIn : today,
        1,
    );

    function change(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;
        setValues((previous) => {
            const next = {...previous, [name]: ['adults', 'children'].includes(name) ? Number(value) : value};
            if (name === 'checkIn' && value && previous.checkOut && previous.checkOut <= value) next.checkOut = '';
            return next;
        });
    }
    async function request(url: string, body: unknown) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        const result = await response.json();
        if (!response.ok) {
            setNeedsLogin(response.status === 401);
            setError(result);
            return null;
        }
        return result;
    }
    async function prepare(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setPending('preview');
        setError(null);
        setNeedsLogin(false);
        try {
            const result = await request('/api/staff/confirmations', {input: values, draftId});
            if (result) {
                setDraftId(result.id);
                setPreview(result);
                window.scrollTo({top: 0, behavior: 'instant'});
            }
        } catch {
            setError({error: 'La prévisualisation est indisponible. Vos informations sont conservées ; réessayez.'});
        } finally {
            setPending(null);
        }
    }
    async function send() {
        if (!preview || pending) return;
        setPending('send');
        setError(null);
        setNeedsLogin(false);
        try {
            const result = await request(`/api/staff/confirmations/${preview.id}/send`, {
                previewToken: preview.previewToken,
            });
            if (result) {
                router.replace(`/admin/confirmations/${preview.id}?sent=1`);
                router.refresh();
            }
        } catch {
            setError({
                error: 'La connexion a été interrompue. Consultez l’historique avant toute nouvelle tentative.',
                existingId: preview.id,
            });
        } finally {
            setPending(null);
        }
    }
    const control = (id: keyof StayConfirmationInput, type = 'text', extra: Record<string, unknown> = {}) => (
        <input
            id={id}
            name={id}
            type={type}
            value={String(values[id])}
            onChange={change}
            className="staff-input"
            required
            disabled={!!pending}
            {...extra}
        />
    );
    const errorBlock = error && (
        <div role="alert" className="staff-error">
            <p>{error.error || 'L’opération a échoué. Réessayez.'}</p>
            {error.existingId && (
                <Link
                    className="mt-3 inline-block font-semibold underline underline-offset-4"
                    href={`/admin/confirmations/${encodeURIComponent(error.existingId)}`}
                >
                    Consulter la confirmation dans l’historique
                </Link>
            )}
            {needsLogin && (
                <a
                    className="mt-3 inline-block font-semibold underline"
                    href="/admin/login"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Se reconnecter dans un nouvel onglet
                </a>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            <ol
                aria-label="Étapes de la confirmation"
                className="flex flex-wrap gap-6 border-b border-brand-beige-400 pb-5 text-sm"
            >
                <li
                    aria-current={!preview ? 'step' : undefined}
                    className={!preview ? 'font-semibold' : 'text-brand-dark-500'}
                >
                    1. Renseigner le séjour
                </li>
                <li
                    aria-current={preview ? 'step' : undefined}
                    className={preview ? 'font-semibold' : 'text-brand-dark-500'}
                >
                    2. Vérifier et envoyer
                </li>
            </ol>
            {preview ? (
                <>
                    <section className="staff-panel space-y-6" aria-label="Confirmer l’envoi">
                        <div className="flex flex-wrap items-start justify-between gap-6">
                            <div>
                                <h2 className="text-xl font-semibold">Vérifiez le message avant l’envoi</h2>
                                <dl className="mt-4 grid gap-2 text-sm">
                                    <div>
                                        <dt className="inline text-brand-dark-500">Destinataire : </dt>
                                        <dd className="inline break-all font-medium">{values.recipient}</dd>
                                    </div>
                                    <div>
                                        <dt className="inline text-brand-dark-500">Objet : </dt>
                                        <dd className="inline">{preview.subject}</dd>
                                    </div>
                                    <div>
                                        <dt className="inline text-brand-dark-500">Langue : </dt>
                                        <dd className="inline">{values.language === 'fr' ? 'Français' : 'Anglais'}</dd>
                                    </div>
                                </dl>
                            </div>
                            <button
                                type="button"
                                className="staff-button staff-button-secondary"
                                disabled={!!pending}
                                onClick={() => {
                                    setPreview(null);
                                    setError(null);
                                }}
                            >
                                Modifier les informations
                            </button>
                        </div>
                        {errorBlock}
                        <EmailPreview key={preview.previewToken} id={preview.id} />
                        <div className="flex flex-wrap items-center justify-between gap-5">
                            <p className="max-w-xl text-sm leading-relaxed text-brand-dark-500">
                                Le message affiché sera envoyé à {values.recipient}. L’envoi sera enregistré dans
                                l’historique partagé.
                            </p>
                            <button type="button" className="staff-button" disabled={!!pending} onClick={send}>
                                {pending === 'send' ? 'Envoi en cours…' : 'Confirmer l’envoi'}
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <form onSubmit={prepare} className="mx-auto max-w-4xl space-y-8">
                    <fieldset className="staff-panel">
                        <legend className="px-2 text-lg font-semibold">Client et réservation</legend>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <StaffField id="reference" label="Référence de réservation">
                                {control('reference', 'text', {
                                    maxLength: 100,
                                    autoComplete: 'off',
                                    placeholder: 'Ex. RN-2027-0123',
                                })}
                            </StaffField>
                            <StaffField id="language" label="Langue de l’email">
                                <select
                                    className="staff-input"
                                    id="language"
                                    name="language"
                                    value={values.language}
                                    onChange={change}
                                    disabled={!!pending}
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">Anglais</option>
                                </select>
                            </StaffField>
                            <StaffField id="title" label="Civilité">
                                <select
                                    className="staff-input"
                                    id="title"
                                    name="title"
                                    value={values.title}
                                    onChange={change}
                                    disabled={!!pending}
                                >
                                    <option value="mr">Monsieur / Mr</option>
                                    <option value="ms">Madame / Ms</option>
                                </select>
                            </StaffField>
                            <StaffField id="guestName" label="Prénom et nom du client">
                                {control('guestName', 'text', {maxLength: 150, autoComplete: 'name'})}
                            </StaffField>
                            <div className="sm:col-span-2">
                                <StaffField
                                    id="recipient"
                                    label="Email du client"
                                    hint="Vérifiez cette adresse : elle recevra la confirmation de séjour."
                                >
                                    {control('recipient', 'email', {maxLength: 254, autoComplete: 'email'})}
                                </StaffField>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="staff-panel">
                        <legend className="px-2 text-lg font-semibold">Détails du séjour</legend>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <StaffField id="checkIn" label="Date d’arrivée" hint="À partir d’aujourd’hui.">
                                {control('checkIn', 'date', {min: today})}
                            </StaffField>
                            <StaffField
                                id="checkOut"
                                label="Date de départ"
                                hint="Au plus tôt le lendemain de l’arrivée."
                            >
                                {control('checkOut', 'date', {min: minimumCheckOut})}
                            </StaffField>
                            <StaffField id="adults" label="Nombre d’adultes">
                                {control('adults', 'number', {min: 1, max: 30, step: 1})}
                            </StaffField>
                            <StaffField id="children" label="Nombre d’enfants">
                                {control('children', 'number', {min: 0, max: 30, step: 1})}
                            </StaffField>
                            {values.children > 0 && (
                                <div className="sm:col-span-2">
                                    <StaffField id="childrenAges" label="Âges des enfants">
                                        {control('childrenAges', 'text', {
                                            maxLength: 150,
                                            placeholder: 'Ex. 4 et 8 ans / 4 and 8 years old',
                                        })}
                                    </StaffField>
                                </div>
                            )}
                            <div className="sm:col-span-2">
                                <StaffField
                                    id="room"
                                    label="Chambre ou configuration"
                                    hint="Renseignez le libellé dans la langue de l’email, par exemple « Chambre Deluxe » ou « Deluxe room »."
                                >
                                    {control('room', 'text', {maxLength: 200})}
                                </StaffField>
                            </div>
                            <StaffField id="confirmedOn" label="Date de confirmation">
                                {control('confirmedOn', 'date')}
                            </StaffField>
                        </div>
                    </fieldset>
                    <fieldset className="staff-panel">
                        <legend className="px-2 text-lg font-semibold">Règlement reçu</legend>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <StaffField id="totalAmount" label="Montant total de l’hébergement (MAD)">
                                {control('totalAmount', 'number', {min: '0.01', max: '99999999.99', step: '0.01'})}
                            </StaffField>
                            <StaffField id="paymentKind" label="Type de règlement">
                                <select
                                    className="staff-input"
                                    id="paymentKind"
                                    name="paymentKind"
                                    value={values.paymentKind}
                                    onChange={change}
                                    disabled={!!pending}
                                >
                                    <option value="deposit">Acompte</option>
                                    <option value="full">Règlement complet</option>
                                </select>
                            </StaffField>
                            <StaffField id="paymentAmount" label="Montant reçu (MAD)">
                                {control('paymentAmount', 'number', {
                                    min: '0.01',
                                    max: values.totalAmount || '99999999.99',
                                    step: '0.01',
                                })}
                            </StaffField>
                        </div>
                    </fieldset>
                    {errorBlock}
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <Link href="/admin/confirmations" className="text-sm underline underline-offset-4">
                            Retour à l’historique
                        </Link>
                        <button type="submit" className="staff-button" disabled={!!pending}>
                            {pending === 'preview' ? 'Préparation…' : 'Prévisualiser l’email'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
