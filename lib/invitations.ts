import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  DEMO_TOKENS,
  getDemoInvitation,
  markDemoOpened,
  respondToDemoInvitation,
} from "@/lib/data/demo";
import type { InvitationStatus, InvitationView, ResponseValue } from "@/types/invitation";

function isDemoToken(token: string): boolean {
  return (DEMO_TOKENS as readonly string[]).includes(token);
}

/**
 * Looks up an invitation by its unguessable token. Demo tokens always
 * resolve from the in-memory store; every other token requires Supabase to
 * be configured. Returns null when nothing matches — callers render a
 * not-found state rather than trusting anything from the URL.
 */
export async function getInvitationByToken(token: string): Promise<InvitationView | null> {
  if (isDemoToken(token)) {
    const demo = getDemoInvitation(token);
    if (!demo) return null;
    return {
      token: demo.token,
      applicantName: demo.applicantName,
      role: demo.role,
      personalMessage: demo.personalMessage,
      meetingDate: demo.meetingDate,
      meetingTime: demo.meetingTime,
      status: demo.status,
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("invitations")
    .select(
      "token, meeting_date, meeting_time, personal_message, status, applicants ( name, role )",
    )
    .eq("token", token)
    .maybeSingle();

  if (error || !data) return null;

  const applicant = Array.isArray(data.applicants) ? data.applicants[0] : data.applicants;
  if (!applicant) return null;

  return {
    token: data.token,
    applicantName: applicant.name,
    role: applicant.role,
    personalMessage: data.personal_message,
    meetingDate: data.meeting_date,
    meetingTime: data.meeting_time,
    status: data.status as InvitationStatus,
  };
}

/**
 * Fire-and-forget: records the first time an invitation is opened. Only
 * advances status pending -> opened, never overwrites a later response.
 */
export async function markOpened(token: string): Promise<void> {
  if (isDemoToken(token)) {
    markDemoOpened(token);
    return;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  await supabase
    .from("invitations")
    .update({ opened_at: new Date().toISOString(), status: "opened" })
    .eq("token", token)
    .eq("status", "pending");
}

interface SubmitResponseResult {
  status: InvitationStatus;
  respondedAt: string;
  applicantName: string;
  meetingDate: string;
  meetingTime: string;
}

/**
 * Idempotent: relies on responses.invitation_id being unique so a repeat
 * submission updates the same row instead of creating a duplicate.
 */
export async function submitResponse(
  token: string,
  response: ResponseValue,
): Promise<SubmitResponseResult | null> {
  if (isDemoToken(token)) {
    const record = respondToDemoInvitation(token, response);
    if (!record) return null;
    return {
      status: record.status,
      respondedAt: record.respondedAt ?? new Date().toISOString(),
      applicantName: record.applicantName,
      meetingDate: record.meetingDate,
      meetingTime: record.meetingTime,
    };
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) return null;

  const { data: invitation, error: lookupError } = await supabase
    .from("invitations")
    .select("id, status, meeting_date, meeting_time, applicants ( name )")
    .eq("token", token)
    .maybeSingle();

  if (lookupError || !invitation) return null;

  const applicant = Array.isArray(invitation.applicants)
    ? invitation.applicants[0]
    : invitation.applicants;

  // Already responded: return the existing state instead of overwriting it.
  if (invitation.status === "accepted" || invitation.status === "unavailable") {
    return {
      status: invitation.status as InvitationStatus,
      respondedAt: new Date().toISOString(),
      applicantName: applicant?.name ?? "",
      meetingDate: invitation.meeting_date,
      meetingTime: invitation.meeting_time,
    };
  }

  const respondedAt = new Date().toISOString();

  const { error: upsertError } = await supabase
    .from("responses")
    .upsert(
      { invitation_id: invitation.id, response, created_at: respondedAt },
      { onConflict: "invitation_id" },
    );

  if (upsertError) return null;

  await supabase
    .from("invitations")
    .update({ status: response, responded_at: respondedAt })
    .eq("id", invitation.id);

  return {
    status: response,
    respondedAt,
    applicantName: applicant?.name ?? "",
    meetingDate: invitation.meeting_date,
    meetingTime: invitation.meeting_time,
  };
}
