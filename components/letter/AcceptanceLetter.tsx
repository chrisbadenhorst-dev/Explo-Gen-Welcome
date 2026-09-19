"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LetterHeader } from "./LetterHeader";
import { Greeting } from "./Greeting";
import { MessageBody } from "./MessageBody";
import { RoleBadge } from "./RoleBadge";
import { Signature } from "./Signature";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface AcceptanceLetterProps {
  applicantName: string;
  role: string;
  personalMessage: string | null;
}

export function AcceptanceLetter({ applicantName, role, personalMessage }: AcceptanceLetterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!rootRef.current) return;
      const targets = rootRef.current.querySelectorAll("[data-reveal]");

      if (reducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <div
      ref={rootRef}
      className="mx-auto w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1c44]/90 to-[#050e28]/95 p-6 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10"
    >
      <div data-reveal>
        <LetterHeader />
      </div>
      <div data-reveal className="mt-8">
        <Greeting applicantName={applicantName} />
      </div>
      <div data-reveal className="mt-5">
        <MessageBody personalMessage={personalMessage} />
      </div>
      <div data-reveal className="mt-7 border-t border-white/10 pt-6">
        <RoleBadge role={role} />
      </div>
      <div data-reveal className="mt-7 border-t border-white/10 pt-6">
        <Signature />
      </div>
    </div>
  );
}
