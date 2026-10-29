import 'dotenv/config';
import {pathToFileURL} from 'node:url';
import {getMigrations} from 'better-auth/db/migration';
import {createStaffAuth, staffAuthOptions} from '../lib/auth/config.ts';
import {getDatabase} from '../lib/db/database.ts';

export const BOOKING_ACCOUNT_EMAIL = 'booking@riadnashira.com';

export async function seedBookingAccount(database, password = process.env.STAFF_BOOTSTRAP_PASSWORD) {
    await (await getMigrations(staffAuthOptions(database))).runMigrations();
    const existing = database.prepare('SELECT id FROM user WHERE email=?').get(BOOKING_ACCOUNT_EMAIL);
    if (existing) return false;
    if (typeof password !== 'string' || password.length < 12 || password.length > 128 || !password.trim()) {
        throw new Error('STAFF_BOOTSTRAP_PASSWORD doit contenir de 12 à 128 caractères pour créer le premier compte.');
    }
    const auth = createStaffAuth(database, true);
    await auth.api.signUpEmail({body: {email: BOOKING_ACCOUNT_EMAIL, password, name: 'Réservations Riad Nashira'}});
    if (!database.prepare('SELECT id FROM user WHERE email=?').get(BOOKING_ACCOUNT_EMAIL)) {
        throw new Error('Le compte de réservation n’a pas pu être initialisé.');
    }
    return true;
}

async function main() {
    const database = getDatabase();
    try {
        const created = await seedBookingAccount(database);
        console.log(
            created
                ? `Compte de réservation initialisé : ${BOOKING_ACCOUNT_EMAIL}`
                : `Compte de réservation déjà présent : ${BOOKING_ACCOUNT_EMAIL} (inchangé)`,
        );
    } finally {
        database.close();
    }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main().catch((error) => {
        const missingPassword = error instanceof Error && error.message.startsWith('STAFF_BOOTSTRAP_PASSWORD ');
        console.error(
            missingPassword
                ? error.message
                : 'Initialisation du compte de réservation impossible. Vérifiez la configuration et l’accès à la base de données.',
        );
        process.exitCode = 1;
    });
}
