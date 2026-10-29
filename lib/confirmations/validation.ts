import {ConfirmationError, type StayConfirmationInput} from '@/types/confirmation.type';

const text = (value: unknown, label: string, max: number, optional = false): string => {
    if (typeof value !== 'string') throw new ConfirmationError(`${label} : valeur invalide.`);
    const clean = value.trim().normalize('NFC');
    if ((!optional && !clean) || clean.length > max || /[\u0000-\u001f\u007f]/u.test(clean))
        throw new ConfirmationError(`${label} : renseignez une valeur valide (maximum ${max} caractères).`);
    return clean;
};

export function validDate(value: unknown, label: string): string {
    const date = text(value, label, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new ConfirmationError(`${label} : date invalide.`);
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date)
        throw new ConfirmationError(`${label} : date invalide.`);
    return date;
}

export function moneyCents(value: unknown, label: string): number {
    if (typeof value !== 'string' || !/^\d{1,8}(?:[.,]\d{1,2})?$/.test(value.trim()))
        throw new ConfirmationError(`${label} : indiquez un montant positif avec deux décimales au maximum.`);
    const [whole, fraction = ''] = value.trim().replace(',', '.').split('.');
    const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
    if (cents <= 0) throw new ConfirmationError(`${label} : le montant doit être supérieur à zéro.`);
    return cents;
}

function integer(value: unknown, label: string, min: number, max: number): number {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max)
        throw new ConfirmationError(`${label} : indiquez un nombre entier de ${min} à ${max}.`);
    return value;
}

export function stayNights(checkIn: string, checkOut: string): number {
    return (Date.parse(`${checkOut}T00:00:00Z`) - Date.parse(`${checkIn}T00:00:00Z`)) / 86_400_000;
}

export function validateConfirmation(value: unknown): StayConfirmationInput {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new ConfirmationError('Formulaire invalide.');
    const input = value as Record<string, unknown>;
    const reference = text(input.reference, 'Référence de réservation', 100);
    const recipient = text(input.recipient, 'Email du client', 254).toLowerCase();
    if (!/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(recipient))
        throw new ConfirmationError('Email du client : indiquez une seule adresse email valide.');
    if (input.language !== 'fr' && input.language !== 'en')
        throw new ConfirmationError('Choisissez le français ou l’anglais.');
    if (input.title !== 'mr' && input.title !== 'ms') throw new ConfirmationError('Choisissez la civilité du client.');
    if (input.paymentKind !== 'full' && input.paymentKind !== 'deposit')
        throw new ConfirmationError('Choisissez le type de règlement.');
    const checkIn = validDate(input.checkIn, 'Arrivée');
    const checkOut = validDate(input.checkOut, 'Départ');
    const nights = stayNights(checkIn, checkOut);
    if (nights < 1 || nights > 365)
        throw new ConfirmationError('Le départ doit suivre l’arrivée, pour un séjour de 365 nuits au maximum.');
    const total = moneyCents(input.totalAmount, 'Montant total');
    const payment = moneyCents(input.paymentAmount, 'Montant reçu');
    if (payment > total) throw new ConfirmationError('Le montant reçu ne peut pas dépasser le montant total.');
    if (input.paymentKind === 'full' && payment !== total)
        throw new ConfirmationError('Pour un règlement complet, le montant reçu doit correspondre au montant total.');
    const children = integer(input.children, 'Enfants', 0, 30);
    const childrenAges = text(input.childrenAges ?? '', 'Âges des enfants', 150, true);
    if (children > 0 && !childrenAges) throw new ConfirmationError('Précisez les âges des enfants.');
    return {
        reference,
        recipient,
        language: input.language,
        title: input.title,
        guestName: text(input.guestName, 'Nom du client', 150),
        checkIn,
        checkOut,
        confirmedOn: validDate(input.confirmedOn, 'Date de confirmation'),
        adults: integer(input.adults, 'Adultes', 1, 30),
        children,
        childrenAges: children ? childrenAges : '',
        room: text(input.room, 'Chambre', 200),
        totalAmount: (total / 100).toFixed(2),
        paymentKind: input.paymentKind,
        paymentAmount: (payment / 100).toFixed(2),
    };
}
