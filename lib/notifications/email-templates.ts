export interface MeetingResponsePayload {
  applicantName: string;
  role: string;
  meetingDate: string;
  meetingTime: string;
  respondedAt: string;
  response: "accepted" | "unavailable";
}

export function meetingResponseSubject(payload: MeetingResponsePayload): string {
  return payload.response === "accepted"
    ? `Co-Founder Meeting Confirmed — ${payload.applicantName}`
    : `Co-Founder Meeting — ${payload.applicantName} Can't Attend`;
}

function responseLabel(response: MeetingResponsePayload["response"]): string {
  return response === "accepted" ? "Confirmed" : "Unavailable";
}

export function meetingResponseHtml(payload: MeetingResponsePayload): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;color:#5b6b8c;font-size:13px;letter-spacing:.04em;text-transform:uppercase;width:140px;">${label}</td>
      <td style="padding:10px 0;color:#0a1a3c;font-size:16px;font-weight:600;">${value}</td>
    </tr>`;

  const headline =
    payload.response === "accepted" ? "Co-Founder Meeting Confirmed" : "Co-Founder Meeting — Unavailable";

  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px;background:#f2f5fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e3e9f5;">
      <tr>
        <td style="background:#0a1a3c;padding:28px 32px;">
          <div style="color:#8fb8ff;font-size:12px;letter-spacing:.14em;text-transform:uppercase;">Explo-Gen Technologies</div>
          <div style="color:#ffffff;font-size:20px;font-weight:700;margin-top:6px;">${headline}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px 32px;">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            ${row("Applicant", payload.applicantName)}
            ${row("Role", payload.role)}
            ${row("Meeting", payload.meetingDate)}
            ${row("Time", payload.meetingTime)}
            ${row("Response", responseLabel(payload.response))}
            ${row("Timestamp", new Date(payload.respondedAt).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" }))}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function meetingResponseText(payload: MeetingResponsePayload): string {
  return [
    `Applicant: ${payload.applicantName}`,
    `Role: ${payload.role}`,
    `Meeting: ${payload.meetingDate}`,
    `Time: ${payload.meetingTime}`,
    `Response: ${responseLabel(payload.response)}`,
    `Timestamp: ${new Date(payload.respondedAt).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" })}`,
  ].join("\n");
}
