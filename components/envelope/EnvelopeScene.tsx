"use client";

import { useRef } from "react";
import { Envelope } from "./Envelope";
import { EnvelopeFlap } from "./EnvelopeFlap";
import { LetterPreview } from "./LetterPreview";
import { useEnvelopeTimeline } from "@/lib/gsap/useEnvelopeTimeline";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface EnvelopeSceneProps {
  applicantName: string;
  onOpened: () => void;
}

export function EnvelopeScene({ applicantName, onOpened }: EnvelopeSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const envelopeGroupRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const letterPreviewRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  const { handlePointerMove, handlePointerLeave, open } = useEnvelopeTimeline(
    { scene: sceneRef, envelopeGroup: envelopeGroupRef, flap: flapRef, glow: glowRef, letterPreview: letterPreviewRef, scrim: scrimRef },
    { reducedMotion, onOpened },
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-16">
      <div ref={scrimRef} className="pointer-events-none fixed inset-0 z-0 bg-black opacity-0" />

      <div
        ref={sceneRef}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[380px]"
        style={{ perspective: "1600px" }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div
          ref={envelopeGroupRef}
          role="button"
          tabIndex={0}
          aria-label={`Open your invitation from Explo-Gen Technologies, ${applicantName.split(" ")[0]}`}
          onClick={open}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open();
            }
          }}
          className="relative aspect-[3/2] w-full cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Envelope />
          <LetterPreview ref={letterPreviewRef} applicantName={applicantName} />
          <EnvelopeFlap ref={flapRef} glowRef={glowRef} />
        </div>
      </div>

      <p className="relative z-10 mt-10 animate-pulse text-xs tracking-[0.22em] text-brand-mist/60">
        TAP TO OPEN YOUR INVITATION
      </p>
    </div>
  );
}
