'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
export default function LogoutButton() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    async function logout() {
        setPending(true);
        setError('');
        try {
            const response = await fetch('/api/staff/auth/sign-out', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: '{}',
            });
            if (!response.ok) throw new Error();
            router.replace('/admin/login');
            router.refresh();
        } catch {
            setError('Déconnexion impossible. Réessayez.');
            setPending(false);
        }
    }
    return (
        <div>
            <button type="button" onClick={logout} disabled={pending} className="staff-button staff-button-secondary">
                {pending ? 'Déconnexion…' : 'Se déconnecter'}
            </button>
            {error && (
                <p role="alert" className="mt-2 text-sm text-red-800">
                    {error}
                </p>
            )}
        </div>
    );
}
