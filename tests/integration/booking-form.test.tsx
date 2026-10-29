import {fireEvent, screen, waitFor} from '@testing-library/react';
import toast from 'react-hot-toast';

import BookingForm from '@/components/features/rooms/booking-form';
import {sendBookingEmail} from '@/lib/actions/send-email';
import {renderWithProviders} from '@/tests/setup/render';

jest.mock('@/lib/actions/send-email', () => ({sendBookingEmail: jest.fn()}));
jest.mock('react-hot-toast', () => ({__esModule: true, default: {success: jest.fn(), error: jest.fn()}}));

beforeEach(() => jest.clearAllMocks());

it('preserves booking defaults received from the room page', () => {
    renderWithProviders(<BookingForm defaultCheckIn="2027-01-01" defaultCheckOut="2027-01-03" />);
    expect(document.querySelector('[name="check-in"]')).toHaveValue('2027-01-01');
    expect(document.querySelector('[name="check-out"]')).toHaveValue('2027-01-03');
    expect(screen.getByRole('button', {name: /réserv/i})).toBeInTheDocument();
});

it('keeps the booking fields and success message', async () => {
    jest.mocked(sendBookingEmail).mockResolvedValue(200);
    renderWithProviders(<BookingForm />);
    fireEvent.change(document.querySelector('[name="first-name"]')!, {target: {value: 'Test'}});
    fireEvent.change(document.querySelector('[name="email"]')!, {target: {value: 'test@example.com'}});
    fireEvent.submit(document.querySelector('form')!);
    await waitFor(() => expect(sendBookingEmail).toHaveBeenCalled());
    expect(sendBookingEmail).toHaveBeenCalledWith(
        expect.objectContaining({firstName: 'Test', email: 'test@example.com'}),
    );
    expect(toast.success).toHaveBeenCalledWith('Réservation envoyée.');
});

it('keeps the booking error message', async () => {
    jest.mocked(sendBookingEmail).mockRejectedValue(new Error('Mailjet unavailable'));
    renderWithProviders(<BookingForm />);
    fireEvent.submit(document.querySelector('form')!);
    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("La réservation n'a pas pu être envoyée."));
});

it('preserves entered values after an unsuccessful submission so the visitor can retry', async () => {
    jest.mocked(sendBookingEmail).mockRejectedValueOnce(new Error('Mailjet unavailable')).mockResolvedValueOnce(200);
    renderWithProviders(<BookingForm defaultCheckIn="2027-01-01" defaultCheckOut="2027-01-03" />);
    const firstName = document.querySelector('[name="first-name"]')!;
    const email = document.querySelector('[name="email"]')!;
    fireEvent.change(firstName, {target: {value: 'Alice'}});
    fireEvent.change(email, {target: {value: 'alice@example.com'}});
    fireEvent.submit(document.querySelector('form')!);
    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(firstName).toHaveValue('Alice');
    expect(email).toHaveValue('alice@example.com');
    expect(document.querySelector('[name="check-in"]')).toHaveValue('2027-01-01');
    fireEvent.submit(document.querySelector('form')!);
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(sendBookingEmail).toHaveBeenLastCalledWith(
        expect.objectContaining({
            firstName: 'Alice',
            email: 'alice@example.com',
            checkIn: '2027-01-01',
            checkOut: '2027-01-03',
        }),
    );
});
