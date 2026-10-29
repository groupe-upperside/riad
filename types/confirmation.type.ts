export type ConfirmationLanguage = 'fr' | 'en';
export type ConfirmationStatus = 'draft' | 'sending' | 'sent' | 'failed' | 'uncertain' | 'expired';

export interface StayConfirmationInput {
    reference: string;
    recipient: string;
    language: ConfirmationLanguage;
    title: 'mr' | 'ms';
    guestName: string;
    checkIn: string;
    checkOut: string;
    confirmedOn: string;
    adults: number;
    children: number;
    childrenAges: string;
    room: string;
    totalAmount: string;
    paymentKind: 'full' | 'deposit';
    paymentAmount: string;
}

export interface ConfirmationRecord {
    id: string;
    reference: string;
    recipient: string;
    guestName: string;
    language: ConfirmationLanguage;
    checkIn: string;
    checkOut: string;
    subject: string;
    status: ConfirmationStatus;
    createdBy: string;
    createdByName: string;
    createdAt: number;
    updatedAt: number;
    sentAt: number | null;
    providerMessageId: string | null;
    error: string | null;
}

export interface ConfirmationDetail extends ConfirmationRecord {
    input: StayConfirmationInput;
    html: string;
    previewTokenHash: string;
    expiresAt: number;
}

export interface StaffIdentity {
    id: string;
    name: string;
    email: string;
}

export class ConfirmationError extends Error {
    constructor(
        message: string,
        public readonly status = 400,
        public readonly existingId?: string,
    ) {
        super(message);
        this.name = 'ConfirmationError';
    }
}
