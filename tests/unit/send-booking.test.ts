/** @jest-environment node */
import {POST} from '@/app/api/send-booking/route';
import {sendBookingEmail} from '@/lib/actions/send-email';

jest.mock('@/lib/actions/send-email', () => ({sendBookingEmail: jest.fn()}));
const send = jest.mocked(sendBookingEmail);

beforeEach(() => jest.clearAllMocks());

it('forwards the existing booking payload without sending a real email', async () => {
    send.mockResolvedValue(200);
    const payload = {firstName: 'Test', email: 'test@example.com', checkIn: '2027-01-01', rooms: '2'};
    const response = await POST(
        new Request('http://localhost/api/send-booking', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'},
        }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ok: true});
    expect(send).toHaveBeenCalledWith(payload);
});

it('preserves the existing error response when the email service fails', async () => {
    send.mockRejectedValueOnce(new Error('Mailjet unavailable'));
    const response = await POST(new Request('http://localhost/api/send-booking', {method: 'POST', body: '{}'}));
    expect(response.status).toBe(500);
    expect(await response.text()).toBe('Mailjet unavailable');
});
