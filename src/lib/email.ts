import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "admin@petral.bg";
const FROM_EMAIL = "Petralgroup <noreply@petralgroup.bg>";

interface ContactData {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}

export async function sendContactNotification(contact: ContactData) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set, skipping email notification");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `Ново съобщение от ${contact.name}`,
    html: `
      <h2>Ново съобщение от контактната форма</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Име</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(contact.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Телефон</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${contact.phone ? escapeHtml(contact.phone) : "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Съобщение</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(contact.message)}</td>
        </tr>
      </table>
    `,
  });
}

export async function sendInquiryNotification(
  inquiry: ContactData,
  productName: string
) {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY not set, skipping email notification");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFICATION_EMAIL,
    subject: `Ново запитване за ${productName}`,
    html: `
      <h2>Ново запитване за продукт</h2>
      <p style="font-size: 16px; color: #333;">Продукт: <strong>${escapeHtml(productName)}</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Име</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(inquiry.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(inquiry.email)}">${escapeHtml(inquiry.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Телефон</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${inquiry.phone ? escapeHtml(inquiry.phone) : "—"}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Съобщение</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(inquiry.message)}</td>
        </tr>
      </table>
    `,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
