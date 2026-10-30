import 'server-only';

import Mailjet from 'node-mailjet';

type IAttachment = {
    ContentType: string;
    Filename: string;
    Base64Content: string;
};

type IMessageBase = {
    From: {
        Email?: string;
        Name?: string;
    };
    To: Array<{Email: string; Name?: string}>;
    Subject: string;
    Attachments?: IAttachment[];
};

type IMessageTemplate = IMessageBase & {
    TemplateID: number;
    TemplateLanguage: boolean;
    Variables: Record<string, unknown>;
};

type IMessageRaw = IMessageBase & {
    HTMLPart?: string;
    TextPart?: string;
};

export type IEmailData = {
    receiver?: string;
    templateId?: string;
    subject?: string;
    variables?: Record<string, unknown>;
    html?: string;
    text?: string;
    attachments?: IAttachment[];
};

const DEFAULT_SENDER = {
    Email: 'noreply@riadnashira.com',
    Name: 'Riad Nashira',
};

const DEFAULT_RECEIVER = 'info@riadnashira.com';

export const sendEmail = async (emailData: IEmailData) => {
    try {
        const {
            receiver = DEFAULT_RECEIVER,
            templateId,
            subject = 'Réservation',
            variables,
            html,
            text,
            attachments,
        } = emailData;

        let message: Array<IMessageTemplate | IMessageRaw> = [];

        if (templateId && !html) {
            const msg: IMessageTemplate = {
                From: DEFAULT_SENDER,
                To: [{Email: receiver}],
                TemplateID: parseInt(templateId, 10),
                TemplateLanguage: true,
                Subject: subject,
                Variables: variables || {},
                Attachments: attachments,
            };
            message = [msg];
        } else {
            const msg: IMessageRaw = {
                From: DEFAULT_SENDER,
                To: [{Email: receiver}],
                Subject: subject,
                HTMLPart: html,
                TextPart: text,
                Attachments: attachments,
            };
            message = [msg];
        }

        const mailjet = Mailjet.apiConnect(process.env.APP_MAILJET_KEY || '', process.env.APP_MAILJET_SECRET || '');
        const res = await mailjet.post('send', {version: 'v3.1'}).request({
            Messages: message,
        });
        if (res.response.status !== 200) {
            throw new Error('error mailjet');
        }

        return res.response.status;
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error while sending email via Mailjet';
        console.error('Error sending email', message);
        throw new Error(message);
    }
};

export class ConfirmationDeliveryError extends Error {
    constructor(public readonly definiteFailure: boolean) {
        super('Confirmation email could not be confirmed by Mailjet');
    }
}

export async function deliverConfirmation({
    id,
    recipient,
    subject,
    html,
    inlinedAttachments,
}: {
    id: string;
    recipient: string;
    subject: string;
    html: string;
    inlinedAttachments: Array<IAttachment & {ContentID: string}>;
}): Promise<{messageId: string | null}> {
    if (!process.env.APP_MAILJET_KEY || !process.env.APP_MAILJET_SECRET) throw new ConfirmationDeliveryError(true);
    try {
        const client = Mailjet.apiConnect(process.env.APP_MAILJET_KEY, process.env.APP_MAILJET_SECRET, {
            options: {timeout: 15_000},
        });
        const response = await client.post('send', {version: 'v3.1'}).request({
            Messages: [
                {
                    From: DEFAULT_SENDER,
                    To: [{Email: recipient}],
                    ReplyTo: {Email: DEFAULT_RECEIVER, Name: 'Riad Nashira'},
                    Subject: subject,
                    HTMLPart: html,
                    ...(inlinedAttachments.length ? {InlinedAttachments: inlinedAttachments} : {}),
                    CustomID: id,
                    CustomCampaign: `stay-confirmation-${id}`,
                    DeduplicateCampaign: true,
                },
            ],
        });
        const body = response.body as {
            Messages?: Array<{
                Status?: string;
                To?: Array<{Email?: string; MessageID?: number | string; MessageUUID?: string}>;
            }>;
        };
        const message = body.Messages?.[0];
        if (response.response.status === 200 && message?.Status === 'error') throw new ConfirmationDeliveryError(true);
        if (response.response.status !== 200 || message?.Status !== 'success')
            throw new ConfirmationDeliveryError(false);
        const recipientResult = message.To?.[0];
        if (
            recipientResult?.Email?.toLowerCase() !== recipient.toLowerCase() ||
            (!recipientResult.MessageID && !recipientResult.MessageUUID)
        )
            throw new ConfirmationDeliveryError(false);
        return {
            messageId:
                recipientResult?.MessageUUID || (recipientResult?.MessageID ? String(recipientResult.MessageID) : null),
        };
    } catch (error) {
        if (error instanceof ConfirmationDeliveryError) throw error;
        const status =
            typeof error === 'object' && error !== null && 'statusCode' in error ? Number(error.statusCode) : 0;
        throw new ConfirmationDeliveryError(status >= 400 && status < 500 && status !== 408);
    }
}
