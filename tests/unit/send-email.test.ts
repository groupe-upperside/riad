/** @jest-environment node */
import Mailjet from 'node-mailjet';

import {sendBookingEmail} from '@/lib/actions/send-email';
import {sendEmail, deliverConfirmation} from '@/lib/email/mailjet';

jest.mock('node-mailjet', () => ({__esModule: true, default: {apiConnect: jest.fn()}}));
const request = jest.fn();
const post = jest.fn(() => ({request}));

beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(Mailjet.apiConnect).mockReturnValue({post} as unknown as ReturnType<typeof Mailjet.apiConnect>);
    request.mockResolvedValue({response: {status: 200}});
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => jest.restoreAllMocks());

it('connects with server credentials and sends a booking to the existing recipient', async () => {
    const previousKey = process.env.APP_MAILJET_KEY;
    const previousSecret = process.env.APP_MAILJET_SECRET;
    process.env.APP_MAILJET_KEY = 'test-key';
    process.env.APP_MAILJET_SECRET = 'test-secret';
    try {
        await expect(
            sendBookingEmail({firstName: 'Alice', lastName: 'Martin', email: 'alice@example.com'}),
        ).resolves.toBe(200);
        expect(Mailjet.apiConnect).toHaveBeenCalledWith('test-key', 'test-secret');
        expect(post).toHaveBeenCalledWith('send', {version: 'v3.1'});
        expect(request).toHaveBeenCalledTimes(1);
        expect(request).toHaveBeenCalledWith({
            Messages: [
                expect.objectContaining({
                    From: {Email: 'noreply@riadnashira.com', Name: 'Riad Nashira'},
                    To: [{Email: 'info@riadnashira.com'}],
                    Subject: 'Réservation',
                    HTMLPart: expect.stringContaining('Alice'),
                }),
            ],
        });
    } finally {
        if (previousKey === undefined) delete process.env.APP_MAILJET_KEY;
        else process.env.APP_MAILJET_KEY = previousKey;
        if (previousSecret === undefined) delete process.env.APP_MAILJET_SECRET;
        else process.env.APP_MAILJET_SECRET = previousSecret;
    }
});

it('preserves the French booking labels and every submitted value', async () => {
    await sendBookingEmail({
        firstName: 'Alice',
        checkIn: '2027-06-01',
        checkOut: '2027-06-03',
        adults: '2',
        rooms: '1',
        specialRequirements: 'Lit bébé',
    });
    const {HTMLPart: html} = request.mock.calls[0][0].Messages[0];
    for (const value of [
        'Prénom',
        'Arrivée',
        'Départ',
        'Adultes',
        'Chambres',
        'Alice',
        '2027-06-01',
        '2027-06-03',
        'Lit bébé',
    ])
        expect(html).toContain(value);
});

it('escapes HTML in user supplied values and field names', async () => {
    await sendBookingEmail({'<script>': '<img src=x onerror=alert(1)>', firstName: '<b>Alice</b>'});
    const {HTMLPart: html} = request.mock.calls[0][0].Messages[0];
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).toContain('&lt;b&gt;Alice&lt;/b&gt;');
});

it('formats optional values, booleans, arrays, dates and objects', async () => {
    await sendBookingEmail({
        empty: null,
        missing: undefined,
        yes: true,
        no: false,
        list: ['A', 'B'],
        date: new Date('2027-01-01T00:00:00Z'),
        details: {floor: 2},
    });
    const {HTMLPart: html} = request.mock.calls[0][0].Messages[0];
    for (const value of ['Oui', 'Non', 'A, B', '2027-01-01T00:00:00.000Z', '{"floor":2}'])
        expect(html).toContain(value);
    expect(html).not.toContain('undefined');
    expect(html).not.toContain('>null<');
});

it('supports the existing template, variables and attachment contract', async () => {
    const attachments = [{ContentType: 'text/plain', Filename: 'booking.txt', Base64Content: 'YWJj'}];
    await sendEmail({
        receiver: 'test@example.com',
        templateId: '123',
        subject: 'Confirmation',
        variables: {name: 'Alice'},
        attachments,
    });
    expect(request).toHaveBeenCalledWith({
        Messages: [
            {
                From: {Email: 'noreply@riadnashira.com', Name: 'Riad Nashira'},
                To: [{Email: 'test@example.com'}],
                Subject: 'Confirmation',
                TemplateID: 123,
                TemplateLanguage: true,
                Variables: {name: 'Alice'},
                Attachments: attachments,
            },
        ],
    });
});

it('keeps raw HTML and text ahead of a template when both are supplied', async () => {
    await sendEmail({templateId: '123', html: '<p>Bonjour</p>', text: 'Bonjour'});
    const message = request.mock.calls[0][0].Messages[0];
    expect(message).toMatchObject({HTMLPart: '<p>Bonjour</p>', TextPart: 'Bonjour'});
    expect(message).not.toHaveProperty('TemplateID');
});

it('rejects an unexpected Mailjet status', async () => {
    request.mockResolvedValueOnce({response: {status: 201}});
    await expect(sendBookingEmail({firstName: 'Alice'})).rejects.toThrow('error mailjet');
});

it('propagates a Mailjet transport error', async () => {
    request.mockRejectedValueOnce(new Error('Connection refused'));
    await expect(sendBookingEmail({firstName: 'Alice'})).rejects.toThrow('Connection refused');
});

it('does not log credentials or request configuration from a Mailjet error', async () => {
    const error = Object.assign(new Error('Mailjet unavailable'), {
        config: {auth: {username: 'private-key', password: 'private-secret'}},
    });
    request.mockRejectedValueOnce(error);
    await expect(sendBookingEmail({firstName: 'Alice'})).rejects.toThrow('Mailjet unavailable');
    expect(console.error).toHaveBeenCalledWith('Error sending email', 'Mailjet unavailable');
    expect(JSON.stringify(jest.mocked(console.error).mock.calls)).not.toContain('private-secret');
});

it('normalizes a rejection that is not an Error', async () => {
    request.mockRejectedValueOnce('unavailable');
    await expect(sendBookingEmail({firstName: 'Alice'})).rejects.toThrow(
        'Unknown error while sending email via Mailjet',
    );
});

describe('private confirmation delivery', () => {
    const previousKey = process.env.APP_MAILJET_KEY,
        previousSecret = process.env.APP_MAILJET_SECRET;
    const message = {
        id: 'test-id',
        recipient: 'guest@example.com',
        subject: 'Confirmation',
        html: '<p>Bonjour</p>',
        inlinedAttachments: [
            {ContentType: 'image/jpeg', Filename: 'logo.jpg', ContentID: 'logo@riad', Base64Content: 'YWJj'},
        ],
    };
    beforeEach(() => {
        process.env.APP_MAILJET_KEY = 'isolated-key';
        process.env.APP_MAILJET_SECRET = 'isolated-secret';
        request.mockResolvedValue({
            response: {status: 200},
            body: {Messages: [{Status: 'success', To: [{Email: message.recipient, MessageUUID: 'mailjet-id'}]}]},
        });
    });
    afterAll(() => {
        if (previousKey === undefined) delete process.env.APP_MAILJET_KEY;
        else process.env.APP_MAILJET_KEY = previousKey;
        if (previousSecret === undefined) delete process.env.APP_MAILJET_SECRET;
        else process.env.APP_MAILJET_SECRET = previousSecret;
    });
    it('requires a matching provider receipt and supplies inline images, reply address and provider deduplication', async () => {
        await expect(deliverConfirmation(message)).resolves.toEqual({messageId: 'mailjet-id'});
        expect(request).toHaveBeenCalledWith({
            Messages: [
                expect.objectContaining({
                    To: [{Email: message.recipient}],
                    ReplyTo: {Email: 'info@riadnashira.com', Name: 'Riad Nashira'},
                    InlinedAttachments: message.inlinedAttachments,
                    CustomID: message.id,
                    DeduplicateCampaign: true,
                }),
            ],
        });
    });
    it('sends CDN image URLs without adding inline attachments', async () => {
        const html = '<img src="https://1-files-biotech-dental-clt-cdn.secure4all.xyz/data/Riad/mail/logo.jpg">';
        await expect(deliverConfirmation({...message, html, inlinedAttachments: []})).resolves.toEqual({
            messageId: 'mailjet-id',
        });
        const sent = request.mock.calls[0][0].Messages[0];
        expect(sent.HTMLPart).toBe(html);
        expect(sent).not.toHaveProperty('InlinedAttachments');
    });
    it.each([
        [{Status: 'error'}, true],
        [{Status: 'success'}, false],
        [{Status: 'success', To: [{Email: 'other@example.com', MessageUUID: 'id'}]}, false],
        [{Status: 'success', To: [{Email: message.recipient}]}, false],
    ])('does not claim success for an ambiguous or rejected response: %j', async (result, definiteFailure) => {
        request.mockResolvedValueOnce({response: {status: 200}, body: {Messages: [result]}});
        await expect(deliverConfirmation(message)).rejects.toMatchObject({definiteFailure});
    });
    it.each([
        [400, true],
        [429, true],
        [503, false],
        [408, false],
    ])('classifies HTTP %i without silently retrying', async (statusCode, definiteFailure) => {
        request.mockRejectedValueOnce(Object.assign(new Error('Provider request failed'), {statusCode}));
        await expect(deliverConfirmation(message)).rejects.toMatchObject({definiteFailure});
        expect(request).toHaveBeenCalledTimes(1);
    });
});
