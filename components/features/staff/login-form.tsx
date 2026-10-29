'use client';
import {useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import StaffField from '@/components/features/staff/field';
export default function StaffLoginForm() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    async function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setPending(true);
        setError('');
        try {
            const response = await fetch('/api/staff/auth/sign-in/email', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: data.get('email'), password: data.get('password')}),
            });
            if (!response.ok) {
                setError(
                    response.status === 429
                        ? 'Trop de tentatives. Patientez une minute avant de réessayer.'
                        : 'Connexion refusée. Vérifiez votre email et votre mot de passe.',
                );
                setPending(false);
                return;
            }
            router.replace('/admin/confirmations');
            router.refresh();
        } catch {
            setError('Connexion indisponible. Réessayez dans un instant.');
            setPending(false);
        }
    }
    return (
        <form onSubmit={login} className="space-y-6">
            <StaffField id="staff-email" label="Email professionnel">
                <input
                    className="staff-input"
                    id="staff-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="username"
                    maxLength={254}
                />
            </StaffField>
            <StaffField id="staff-password" label="Mot de passe">
                <input
                    className="staff-input"
                    id="staff-password"
                    type="password"
                    name="password"
                    required
                    autoComplete="current-password"
                    maxLength={128}
                />
            </StaffField>
            {error && (
                <p role="alert" className="staff-error">
                    {error}
                </p>
            )}
            <button type="submit" className="staff-button w-full" disabled={pending}>
                {pending ? 'Connexion…' : 'Se connecter'}
            </button>
        </form>
    );
}
