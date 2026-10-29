import 'dotenv/config';
import {readFileSync} from 'node:fs';
import {getMigrations} from 'better-auth/db/migration';
import {createStaffAuth, staffAuthOptions} from '../lib/auth/config.ts';
import {getDatabase} from '../lib/db/database.ts';

const [command, emailArgument, ...nameParts] = process.argv.slice(2);
const email = emailArgument?.trim().toLowerCase();
if (!['create', 'disable'].includes(command) || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error(
        'Usage: staff:user create email@exemple.com Nom (mot de passe sur stdin) | staff:user disable email@exemple.com',
    );
    process.exitCode = 1;
} else {
    const db = getDatabase();
    try {
        await (await getMigrations(staffAuthOptions(db))).runMigrations();
        const auth = createStaffAuth(db, true);
        if (command === 'create') {
            if (process.stdin.isTTY)
                throw new Error(
                    'Fournissez le mot de passe sur l’entrée standard, pas dans les arguments. Voir docs/staff-confirmations.md.',
                );
            const password = readFileSync(0, 'utf8').replace(/\r?\n$/, '');
            if (password.length < 12 || password.length > 128)
                throw new Error('Le mot de passe doit contenir de 12 à 128 caractères.');
            await auth.api.signUpEmail({body: {email, password, name: nameParts.join(' ').trim() || email}});
            console.log('Compte équipe créé :', email);
        } else {
            const user = db.prepare('SELECT id FROM user WHERE email=?').get(email);
            if (!user) throw new Error('Compte introuvable.');
            db.exec('BEGIN IMMEDIATE');
            try {
                db.prepare('UPDATE user SET enabled=0 WHERE id=?').run(user.id);
                db.prepare('DELETE FROM session WHERE userId=?').run(user.id);
                db.exec('COMMIT');
            } catch (error) {
                db.exec('ROLLBACK');
                throw error;
            }
            console.log('Compte désactivé et sessions révoquées :', email);
        }
    } catch (error) {
        console.error(error instanceof Error ? error.message : 'Gestion du compte impossible.');
        process.exitCode = 1;
    } finally {
        db.close();
    }
}
