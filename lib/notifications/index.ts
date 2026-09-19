import "server-only";
import { Resend } from "resend";
import {
  meetingResponseHtml,
  meetingResponseSubject,
  meetingResponseText,
  type MeetingResponsePayload,
} from "./email-templates";

/**
 * NotificationService is the single place notification channels live.
 * sendEmail() is implemented via Resend today; sendWhatsApp() is a real
 * stub (throws) so a future provider (Meta WhatsApp Business API, Twilio)
 * can be dropped in without touching any caller.
 */
export const NotificationService = {
  async sendEmail(payload: MeetingResponsePayload): Promise<void> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.NOTIFICATION_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL ?? "Explo-Gen Technologies <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.warn(
        "[NotificationService] RESEND_API_KEY or NOTIFICATION_EMAIL not configured — skipping email send.",
      );
      return;
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      subject: meetingResponseSubject(payload),
      html: meetingResponseHtml(payload),
      text: meetingResponseText(payload),
    });

    if (error) {
      throw new Error(`Resend send failed: ${error.message}`);
    }
  },

  async sendWhatsApp(_payload: MeetingResponsePayload): Promise<void> {
    throw new Error(
      "NotificationService.sendWhatsApp is not implemented yet. Wire up a provider (Meta WhatsApp Business API or Twilio) here.",
    );
  },
};
