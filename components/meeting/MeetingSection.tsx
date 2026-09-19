"use client";

import { useState } from "react";
import { MeetingDetail } from "./MeetingDetail";
import { AcceptButton } from "./AcceptButton";
import { UnavailableButton } from "./UnavailableButton";
import { ConfirmationState } from "./ConfirmationState";
import type { InvitationStatus, ResponseValue } from "@/types/invitation";

interface MeetingSectionProps {
  token: string;
  meetingDate: string;
  meetingTime: string;
  initialStatus: InvitationStatus;
}

type ButtonStatus = "idle" | "loading" | "success";

export function MeetingSection({ token, meetingDate, meetingTime, initialStatus }: MeetingSectionProps) {
  const [response, setResponse] = useState<ResponseValue | null>(
    initialStatus === "accepted" || initialStatus === "unavailable" ? initialStatus : null,
  );
  const [acceptStatus, setAcceptStatus] = useState<ButtonStatus>("idle");
  const [declining, setDeclining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function respond(value: ResponseValue) {
    setError(null);
    const res = await fetch(`/api/invitations/${token}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: value }),
    });

    if (!res.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
  }

  async function handleAccept() {
    setAcceptStatus("loading");
    try {
      await respond("accepted");
      setAcceptStatus("success");
      window.setTimeout(() => setResponse("accepted"), 900);
    } catch {
      setAcceptStatus("idle");
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleUnavailable() {
    setDeclining(true);
    setError(null);
    try {
      await respond("unavailable");
      setResponse("unavailable");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setDeclining(false);
    }
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1c44]/90 to-[#050e28]/95 p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10">
      <div className="text-center">
        <h2 className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
          Let&rsquo;s Talk About What&rsquo;s Next
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-mist/70">
          You&rsquo;ll meet the full Explo-Gen team for a business meeting where we&rsquo;ll walk
          you through what&rsquo;s coming next and what we have in store. It matters to us &mdash;
          we hope you can be there.
        </p>
      </div>

      <div className="mt-6">
        <MeetingDetail meetingDate={meetingDate} meetingTime={meetingTime} />
      </div>

      <div className="mt-7 border-t border-white/10 pt-7">
        {response ? (
          <ConfirmationState response={response} />
        ) : (
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <AcceptButton status={acceptStatus} onClick={handleAccept} disabled={declining} />
            <UnavailableButton onClick={handleUnavailable} disabled={declining || acceptStatus !== "idle"} />
          </div>
        )}
        {error && <p className="mt-4 text-center text-xs text-red-300">{error}</p>}
      </div>
    </div>
  );
}
