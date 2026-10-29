import Link from 'next/link';
import {redirect} from 'next/navigation';
import StaffLoginForm from '@/components/features/staff/login-form';
import {currentStaff} from '@/lib/auth/server';
export const dynamic = 'force-dynamic';
export default async function LoginPage() {
    let configured = true;
    try {
        if (await currentStaff()) redirect('/admin/confirmations');
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error;
        configured = false;
    }
    return (
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-12">
            <Link href="/fr" className="mb-10 self-start font-serif text-3xl">
                Riad Nashira
            </Link>
            <div className="staff-panel">
                <h1 className="mb-3 text-2xl font-semibold">Connexion à l’espace équipe</h1>
                <p className="mb-8 text-sm leading-relaxed text-brand-dark-500">
                    Préparez les confirmations de séjour et consultez les emails envoyés par l’équipe.
                </p>
                {configured ? (
                    <StaffLoginForm />
                ) : (
                    <p role="alert" className="staff-error">
                        L’espace équipe n’est pas encore disponible. Contactez l’administrateur pour activer l’accès.
                    </p>
                )}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-brand-dark-500">
                Accès réservé à l’équipe du riad. Les comptes sont créés par un administrateur.
            </p>
        </main>
    );
}
