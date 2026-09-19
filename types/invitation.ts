export type ResponseValue = "accepted" | "unavailable";

export type InvitationStatus = "pending" | "opened" | "accepted" | "unavailable";

/**
 * Sanitized shape sent from the server to the client experience.
 * Never includes internal ids, tokens beyond the one already in the URL, or raw DB rows.
 */
export interface InvitationView {
  token: string;
  applicantName: string;
  role: string;
  personalMessage: string | null;
  meetingDate: string;
  meetingTime: string;
  status: InvitationStatus;
}

export interface RespondRequestBody {
  response: ResponseValue;
}

export interface RespondResult {
  status: InvitationStatus;
  respondedAt: string;
}
