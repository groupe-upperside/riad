/** @jest-environment node */
import {sendConfirmation} from '@/lib/confirmations/send';
import {claimDraft, getConfirmation, markSent, markUnsuccessful} from '@/lib/confirmations/repository';
import {deliverConfirmation} from '@/lib/email/mailjet';
import {confirmationInput} from '@/tests/fixtures/stay-confirmation';
import type {ConfirmationDetail} from '@/types/confirmation.type';

jest.mock('@/lib/confirmations/repository', () => ({
    claimDraft: jest.fn(),
    getConfirmation: jest.fn(),
    markSent: jest.fn(),
    markUnsuccessful: jest.fn(),
}));
jest.mock('@/lib/confirmations/template', () => ({inlineAttachments: jest.fn(() => [])}));
jest.mock('@/lib/email/mailjet', () => ({
    ...jest.requireActual('@/lib/email/mailjet'),
    deliverConfirmation: jest.fn(),
}));

const draft = {
    id: 'draft-1',
    createdBy: 'staff-1',
    recipient: confirmationInput.recipient,
    subject: 'Confirmation de séjour',
    html: '<p>Confirmation</p>',
    input: {
        ...confirmationInput,
        checkIn: '2024-01-01',
        checkOut: '2024-01-04',
        confirmedOn: '2023-12-15',
    },
} as ConfirmationDetail;

beforeEach(() => {
    jest.clearAllMocks();
    // Use a historical UTC+1 date so both instants straddle midnight in Marrakech.
    jest.useFakeTimers().setSystemTime(new Date('2024-01-01T22:30:00Z'));
    jest.mocked(getConfirmation).mockReturnValue(draft);
    jest.mocked(claimDraft).mockReturnValue(draft);
    jest.mocked(deliverConfirmation).mockResolvedValue({messageId: 'provider-1'});
});
afterEach(() => jest.useRealTimers());

it('sends a preview while its arrival is still today in Marrakech', async () => {
    await sendConfirmation(draft.id, 'preview-token', draft.createdBy);
    expect(deliverConfirmation).toHaveBeenCalledTimes(1);
    expect(markSent).toHaveBeenCalledWith(draft.id, 'provider-1');
});

it('blocks a preview after midnight without consuming its token or contacting Mailjet', async () => {
    jest.setSystemTime(new Date('2024-01-01T23:30:00Z'));
    await expect(sendConfirmation(draft.id, 'preview-token', draft.createdBy)).rejects.toThrow('date d’arrivée');
    expect(claimDraft).not.toHaveBeenCalled();
    expect(deliverConfirmation).not.toHaveBeenCalled();
    expect(markSent).not.toHaveBeenCalled();
    expect(markUnsuccessful).not.toHaveBeenCalled();
});
