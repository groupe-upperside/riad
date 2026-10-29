import {betterAuth, type BetterAuthOptions} from 'better-auth';
import type {DatabaseSync} from 'node:sqlite';

export function staffBaseUrl(): string {
    const raw = process.env.STAFF_BASE_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001');
    const url = new URL(raw);
    if (
        url.pathname !== '/' ||
        url.search ||
        url.hash ||
        url.username ||
        url.password ||
        (url.protocol !== 'https:' &&
            !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))
    )
        throw new Error('STAFF_BASE_URL must be the HTTPS origin of this site.');
    return url.origin;
}

export function staffAuthOptions(database: DatabaseSync, allowRegistration = false) {
    const baseURL = staffBaseUrl();
    const secret = process.env.STAFF_AUTH_SECRET;
    if (!secret || secret.length < 32) throw new Error('STAFF_AUTH_SECRET must contain at least 32 characters.');
    return {
        appName: 'Riad Nashira — Équipe',
        baseURL,
        basePath: '/api/staff/auth',
        secret,
        database,
        trustedOrigins: [baseURL],
        emailAndPassword: {
            enabled: true,
            disableSignUp: !allowRegistration,
            autoSignIn: !allowRegistration,
            minPasswordLength: 12,
            maxPasswordLength: 128,
        },
        user: {additionalFields: {enabled: {type: 'boolean', defaultValue: true, input: false}}},
        databaseHooks: {
            session: {
                create: {
                    before: async (session) => {
                        const user = database.prepare('SELECT enabled FROM user WHERE id=?').get(session.userId);
                        if (!user || !user.enabled) return false;
                        return {data: session};
                    },
                },
            },
        },
        session: {expiresIn: 8 * 60 * 60, updateAge: 60 * 60, cookieCache: {enabled: false}},
        advanced: {
            cookiePrefix: 'riad_staff',
            useSecureCookies: baseURL.startsWith('https://'),
            defaultCookieAttributes: {httpOnly: true, sameSite: 'lax', path: '/'},
            ipAddress: {ipAddressHeaders: ['x-real-ip']},
        },
        rateLimit: {
            enabled: true,
            storage: 'database',
            window: 60,
            max: 100,
            customRules: {'/sign-in/email': {window: 60, max: 5}},
        },
    } satisfies BetterAuthOptions;
}

export function createStaffAuth(database: DatabaseSync, allowRegistration = false) {
    return betterAuth(staffAuthOptions(database, allowRegistration));
}
