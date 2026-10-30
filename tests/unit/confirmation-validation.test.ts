import {validateConfirmation, stayNights} from '@/lib/confirmations/validation';
import {confirmationInput} from '@/tests/fixtures/stay-confirmation';
import {addCalendarDays, todayAtRiad} from '@/lib/confirmations/dates';

beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2027-06-01T12:00:00Z'));
});
afterEach(() => jest.useRealTimers());

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

it('accepts arrival today and a departure tomorrow or later', () => {
    expect(validateConfirmation({...confirmationInput, checkOut: '2027-06-02'})).toMatchObject({
        checkIn: '2027-06-01',
        checkOut: '2027-06-02',
    });
    expect(validateConfirmation({...confirmationInput, checkIn: '2027-06-03'})).toMatchObject({
        checkIn: '2027-06-03',
        checkOut: '2027-06-04',
    });
});

it('rejects a past arrival even when the departure is in the future', () => {
    expect(() => validateConfirmation({...confirmationInput, checkIn: '2027-05-31'})).toThrow('date d’arrivée');
});

it('rejects a departure in the past or on or before the arrival date', () => {
    expect(() => validateConfirmation({...confirmationInput, checkOut: '2027-05-31'})).toThrow('date de départ');
    expect(() => validateConfirmation({...confirmationInput, checkOut: '2027-06-01'})).toThrow('départ doit suivre');
    expect(() => validateConfirmation({...confirmationInput, checkIn: '2027-06-03', checkOut: '2027-06-02'})).toThrow(
        'départ doit suivre',
    );
});

it('uses the current day in Marrakech even before the UTC day changes', () => {
    expect(todayAtRiad(new Date('2027-01-01T22:30:00Z'))).toBe('2027-01-01');
    expect(todayAtRiad(new Date('2027-01-01T23:30:00Z'))).toBe('2027-01-02');
});

it('moves between calendar dates across leap days and year boundaries', () => {
    expect(addCalendarDays('2028-02-28', 1)).toBe('2028-02-29');
    expect(addCalendarDays('2028-02-29', 1)).toBe('2028-03-01');
    expect(addCalendarDays('2027-12-31', 1)).toBe('2028-01-01');
});
