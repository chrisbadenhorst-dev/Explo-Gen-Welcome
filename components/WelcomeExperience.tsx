"use client";

import { useState } from "react";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { EnvelopeScene } from "@/components/envelope/EnvelopeScene";
import { AcceptanceLetter } from "@/components/letter/AcceptanceLetter";
import { MeetingSection } from "@/components/meeting/MeetingSection";
import { Footer } from "@/components/shared/Footer";
import type { InvitationView } from "@/types/invitation";

type Stage = "intro" | "envelope" | "letter";

interface WelcomeExperienceProps {
  invitation: InvitationView;
}

export function WelcomeExperience({ invitation }: WelcomeExperienceProps) {
  const [stage, setStage] = useState<Stage>("intro");

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 15%, rgba(30,79,216,0.18), transparent 60%), radial-gradient(70% 60% at 50% 100%, rgba(10,26,60,0.9), #050b1c 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {stage === "intro" && <IntroScreen onContinue={() => setStage("envelope")} />}

        {stage === "envelope" && (
          <EnvelopeScene applicantName={invitation.applicantName} onOpened={() => setStage("letter")} />
        )}

        {stage === "letter" && (
          <main className="flex min-h-screen w-full flex-col items-center justify-center gap-0 px-4 py-14 sm:px-6">
            <AcceptanceLetter
              applicantName={invitation.applicantName}
              role={invitation.role}
              personalMessage={invitation.personalMessage}
            />
            <MeetingSection
              token={invitation.token}
              meetingDate={invitation.meetingDate}
              meetingTime={invitation.meetingTime}
              initialStatus={invitation.status}
            />
            <Footer />
          </main>
        )}
      </div>
    </div>
  );
}
