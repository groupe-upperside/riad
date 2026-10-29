import 'server-only';

import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {getMigrations} from 'better-auth/db/migration';
import {getDatabase} from '@/lib/db/database';
import {createStaffAuth, staffAuthOptions} from '@/lib/auth/config';
import {ConfirmationError, type StaffIdentity} from '@/types/confirmation.type';

type StaffAuth = ReturnType<typeof createStaffAuth>;
let initialization: Promise<StaffAuth> | undefined;

export function getStaffAuth(): Promise<StaffAuth> {
    if (!initialization) {
        initialization = (async () => {
            const migrations = await getMigrations(staffAuthOptions(getDatabase()));
            await migrations.runMigrations();
            return createStaffAuth(getDatabase());
        })().catch((error) => {
            initialization = undefined;
            throw error;
        });
    }
    return initialization;
}

export async function currentStaff(): Promise<StaffIdentity | null> {
    const auth = await getStaffAuth();
    const session = await auth.api.getSession({headers: await headers()});
    if (!session || !session.user.enabled) return null;
    return {id: session.user.id, name: session.user.name, email: session.user.email};
}

export async function requireStaffPage(): Promise<StaffIdentity> {
    const staff = await currentStaff();
    if (!staff) redirect('/admin/login');
    return staff;
}

export async function requireStaffRequest(): Promise<StaffIdentity> {
    const staff = await currentStaff();
    if (!staff) throw new ConfirmationError('Votre session a expiré. Reconnectez-vous pour continuer.', 401);
    return staff;
}
