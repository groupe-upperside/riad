import {validateConfirmation, stayNights} from '@/lib/confirmations/validation';
import {confirmationInput} from '@/tests/fixtures/stay-confirmation';

it('normalizes a single recipient and decimal amounts without changing the stay', () => {
    expect(
        validateConfirmation({...confirmationInput, recipient: '  ALICE@example.com ', totalAmount: '6000,00'}),
    ).toEqual(confirmationInput);
    expect(stayNights('2028-02-28', '2028-03-01')).toBe(2);
});
it.each([
    {recipient: 'alice@example.com,bob@example.com'},
    {recipient: 'alice@example.com\r\nBcc: victim@example.com'},
    {language: 'de'},
    {checkIn: '2027-02-29'},
    {checkOut: '2027-06-01'},
    {adults: 0},
    {children: 1.5},
    {childrenAges: ''},
    {paymentAmount: '6001'},
    {paymentKind: 'full'},
    {totalAmount: 'NaN'},
    {reference: '\n'},
])('rejects invalid or ambiguous data: %j', (overrides) => {
    expect(() => validateConfirmation({...confirmationInput, ...overrides})).toThrow();
});
it('accepts a fully paid stay and clears irrelevant child ages', () => {
    expect(
        validateConfirmation({...confirmationInput, children: 0, paymentKind: 'full', paymentAmount: '6000'}),
    ).toMatchObject({childrenAges: '', paymentAmount: '6000.00'});
});
