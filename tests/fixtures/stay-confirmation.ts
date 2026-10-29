import type {StayConfirmationInput} from '@/types/confirmation.type';
export const confirmationInput: StayConfirmationInput = {
    reference: 'RN-TEST-001',
    recipient: 'alice@example.com',
    language: 'fr',
    title: 'ms',
    guestName: 'Alice Martin',
    checkIn: '2027-06-01',
    checkOut: '2027-06-04',
    confirmedOn: '2027-01-15',
    adults: 2,
    children: 1,
    childrenAges: '8 ans',
    room: 'Chambre Deluxe',
    totalAmount: '6000.00',
    paymentKind: 'deposit',
    paymentAmount: '3000.00',
};
