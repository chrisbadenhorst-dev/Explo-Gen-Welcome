"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/shared/Logo";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface IntroScreenProps {
  onContinue: () => void;
}

const AUTO_ADVANCE_MS = 4200;

export function IntroScreen({ onContinue }: IntroScreenProps) {
  const rootRef = useRef<HTMLButtonElement>(null);
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
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.18, delay: 0.2 },
      );
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  useEffect(() => {
    const timer = window.setTimeout(onContinue, AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [onContinue]);

  return (
    <button
      ref={rootRef}
      type="button"
      onClick={onContinue}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-brand-navy px-6 text-center outline-none"
      aria-label="Continue to your invitation"
    >
      <div data-reveal>
        <Logo size="lg" />
      </div>

      <div data-reveal className="space-y-2">
        <p className="text-xs font-medium tracking-[0.35em] text-brand-light-blue/70">
          AN INVITATION FROM
        </p>
        <h1 className="font-display text-2xl font-semibold text-brand-white sm:text-3xl">
          Explo-Gen Technologies
        </h1>
      </div>

      <p data-reveal className="text-sm tracking-wide text-brand-mist/60">
        Something awaits you.
      </p>

      <p data-reveal className="mt-4 text-[0.65rem] tracking-[0.2em] text-brand-mist/35">
        TAP ANYWHERE TO CONTINUE
      </p>
    </button>
  );
}
