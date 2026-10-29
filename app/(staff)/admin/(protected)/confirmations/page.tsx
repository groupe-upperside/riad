import Link from 'next/link';
import {requireStaffPage} from '@/lib/auth/server';
import {listConfirmations} from '@/lib/confirmations/repository';
import ConfirmationHistory from '@/components/features/staff/confirmation-history';
export default async function ConfirmationHistoryPage({
    searchParams,
}: {
    searchParams: Promise<{q?: string; page?: string}>;
}) {
    await requireStaffPage();
    const params = await searchParams,
        query = typeof params.q === 'string' ? params.q.slice(0, 150) : '';
    const history = listConfirmations({query, page: Number(params.page || 1)});
    const pageUrl = (page: number) => `/admin/confirmations?${new URLSearchParams({q: query, page: String(page)})}`;
    return (
        <>
            <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
                <div>
                    <h1 className="text-3xl font-semibold">Confirmations de séjour</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-dark-500">
                        Consultez les messages préparés et envoyés par l’équipe avant de contacter un client.
                    </p>
                </div>
                <Link href="/admin/confirmations/new" className="staff-button">
                    Nouvelle confirmation
                </Link>
            </div>
            <form className="mb-6 flex flex-wrap items-end gap-3" action="/admin/confirmations" method="get">
                <div className="w-full max-w-lg">
                    <label htmlFor="history-search" className="mb-2 block text-sm font-medium">
                        Rechercher un client ou une réservation
                    </label>
                    <input
                        id="history-search"
                        name="q"
                        className="staff-input"
                        defaultValue={query}
                        maxLength={150}
                        placeholder="Nom, email ou référence de réservation"
                    />
                </div>
                <button className="staff-button staff-button-secondary" type="submit">
                    Rechercher
                </button>
                {query && (
                    <Link href="/admin/confirmations" className="staff-button staff-button-secondary">
                        Effacer
                    </Link>
                )}
            </form>
            {history.items.length ? (
                <>
                    <p className="mb-4 text-sm text-brand-dark-500">
                        {history.total} confirmation{history.total > 1 ? 's' : ''}
                        {query ? ' correspondante' + (history.total > 1 ? 's' : '') : ''}
                    </p>
                    <ConfirmationHistory items={history.items} />
                    <nav
                        aria-label="Pagination de l’historique"
                        className="mt-6 flex items-center justify-between gap-4"
                    >
                        <span className="text-sm text-brand-dark-500">
                            Page {history.page} sur {history.pages}
                        </span>
                        <div className="flex gap-3">
                            {history.page > 1 && (
                                <Link className="staff-button staff-button-secondary" href={pageUrl(history.page - 1)}>
                                    Précédente
                                </Link>
                            )}
                            {history.page < history.pages && (
                                <Link className="staff-button staff-button-secondary" href={pageUrl(history.page + 1)}>
                                    Suivante
                                </Link>
                            )}
                        </div>
                    </nav>
                </>
            ) : (
                <div className="staff-panel py-12 text-center">
                    <h2 className="text-xl font-semibold">
                        {query ? 'Aucune confirmation trouvée' : 'Aucune confirmation pour le moment'}
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-dark-500">
                        {query
                            ? 'Essayez le nom du client, son email ou une autre référence de réservation.'
                            : 'Préparez votre premier message. Les confirmations seront conservées ici pour toute l’équipe.'}
                    </p>
                </div>
            )}
        </>
    );
}
