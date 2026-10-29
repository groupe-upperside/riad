import Link from 'next/link';
import type {ConfirmationRecord} from '@/types/confirmation.type';
import ConfirmationStatusBadge from '@/components/features/staff/status';
import {staffDate, stayDate} from '@/lib/confirmations/format';

function Client({item}: {item: ConfirmationRecord}) {
    return (
        <>
            <Link href={`/admin/confirmations/${item.id}`} className="font-semibold underline-offset-4 hover:underline">
                {item.guestName}
            </Link>
            <p className="mt-1 break-all text-xs text-brand-dark-500">{item.recipient}</p>
            <p className="mt-2 text-xs">{item.reference}</p>
        </>
    );
}
export default function ConfirmationHistory({items}: {items: ConfirmationRecord[]}) {
    return (
        <>
            <div className="relative hidden overflow-x-auto rounded-xl border border-brand-beige-400 bg-white md:block">
                <table className="staff-table">
                    <caption className="sr-only">Historique partagé des confirmations de séjour</caption>
                    <thead>
                        <tr>
                            <th scope="col">Client et référence</th>
                            <th scope="col">Séjour</th>
                            <th scope="col">Langue</th>
                            <th scope="col">État</th>
                            <th scope="col">Date et auteur</th>
                            <th scope="col">
                                <span className="sr-only">Consulter</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Client item={item} />
                                </td>
                                <td className="whitespace-nowrap text-xs leading-relaxed">
                                    {stayDate(item.checkIn)}
                                    <br />
                                    {stayDate(item.checkOut)}
                                </td>
                                <td>{item.language.toUpperCase()}</td>
                                <td>
                                    <ConfirmationStatusBadge status={item.status} />
                                </td>
                                <td className="text-xs leading-relaxed">
                                    <span className="tabular-nums">{staffDate(item.sentAt ?? item.createdAt)}</span>
                                    <br />
                                    <span className="text-brand-dark-500">{item.createdByName}</span>
                                </td>
                                <td>
                                    <Link
                                        href={`/admin/confirmations/${item.id}`}
                                        className="whitespace-nowrap font-medium underline underline-offset-4"
                                        aria-label={`Voir la confirmation ${item.reference}`}
                                    >
                                        Voir l’email
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul
                className="divide-y divide-brand-beige-400 rounded-xl border border-brand-beige-400 bg-white md:hidden"
                aria-label="Historique partagé des confirmations de séjour"
            >
                {items.map((item) => (
                    <li key={item.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 text-sm">
                                <Client item={item} />
                            </div>
                            <ConfirmationStatusBadge status={item.status} />
                        </div>
                        <dl className="mt-5 space-y-3 text-xs leading-relaxed">
                            <div>
                                <dt className="text-brand-dark-500">Séjour · {item.language.toUpperCase()}</dt>
                                <dd className="mt-1">
                                    Du {stayDate(item.checkIn)} au {stayDate(item.checkOut)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-brand-dark-500">
                                    {item.sentAt ? 'Envoyé' : 'Préparé'} par {item.createdByName}
                                </dt>
                                <dd className="mt-1 tabular-nums">{staffDate(item.sentAt ?? item.createdAt)}</dd>
                            </div>
                        </dl>
                        <Link
                            href={`/admin/confirmations/${item.id}`}
                            className="staff-button staff-button-secondary mt-5 w-full"
                            aria-label={`Voir la confirmation ${item.reference}`}
                        >
                            Voir l’email
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
