'use server';

import Mailjet from 'node-mailjet';

const key = process.env.APP_MAILJET_KEY || '';
const secret = process.env.APP_MAILJET_SECRET || '';

const mailjet = Mailjet.apiConnect(key, secret);

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
  To: Array<{ Email: string; Name?: string }>;
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

const DEFAULT_RECEIVER = 'aurore.louche@orange.fr';

function objectToHtml(title: string, data: Record<string, unknown>): string {
  const rows = Object.entries(data || {})
    .map(([key, value]) => {
      const safeKey = String(key).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeVal = String(value ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:600">${safeKey}</td><td style="padding:8px;border:1px solid #ddd">${safeVal}</td></tr>`;
    })
    .join('');
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;">
<h2>${title}</h2>
<table style="border-collapse:collapse;min-width:360px">${rows}</table>
</body></html>`;
}

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
        To: [{ Email: receiver }],
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
        To: [{ Email: receiver }],
        Subject: subject,
        HTMLPart: html,
        TextPart: text,
        Attachments: attachments,
      };
      message = [msg];
    }

    const res = await mailjet.post('send', { version: 'v3.1' }).request({
      Messages: message,
    });
    if (res.response.status !== 200) {
      throw new Error('error mailjet');
    }
  
    return res.response.status;
  } catch (err) {
    console.error('Error sending email', err);
    const message = err instanceof Error ? err.message : 'Unknown error while sending email via Mailjet';
    throw new Error(message);
  }
};

export async function sendBookingEmail(data: Record<string, unknown>) {
  const subject = 'Réservation';
  const html = objectToHtml(subject, data);
  return sendEmail({ subject, html });
}
