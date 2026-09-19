"use client";

import { useRef, type PointerEvent, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fireBrandConfetti } from "@/lib/confetti";

export interface EnvelopeRefs {
  scene: RefObject<HTMLDivElement | null>;
  envelopeGroup: RefObject<HTMLDivElement | null>;
  flap: RefObject<HTMLDivElement | null>;
  glow: RefObject<HTMLDivElement | null>;
  letterPreview: RefObject<HTMLDivElement | null>;
  scrim: RefObject<HTMLDivElement | null>;
}

interface UseEnvelopeTimelineOptions {
  reducedMotion: boolean;
  onOpened: () => void;
}

/**
 * Owns the envelope's idle motion (float + pointer parallax) and the
 * click-to-open cinematic sequence. Idle motion is killed the moment the
 * open sequence starts. Under reduced motion, both collapse to instant
 * gsap.set() state changes — same DOM order, no animation.
 */
export function useEnvelopeTimeline(refs: EnvelopeRefs, { reducedMotion, onOpened }: UseEnvelopeTimelineOptions) {
  const openedRef = useRef(false);
  const { contextSafe } = useGSAP(
    () => {
      if (reducedMotion) return;
      if (!refs.scene.current || !refs.envelopeGroup.current) return;

      gsap.to(refs.scene.current, {
        y: -8,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: refs.scene, dependencies: [reducedMotion] },
  );

  const handlePointerMove = contextSafe((event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !refs.envelopeGroup.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relY = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(refs.envelopeGroup.current, {
      rotateY: relX * 10,
      rotateX: -relY * 10,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  const handlePointerLeave = contextSafe(() => {
    if (!refs.envelopeGroup.current) return;
    gsap.to(refs.envelopeGroup.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
  });

  // Imperative playback triggered only from onClick/onKeyDown in EnvelopeScene, never read during render.
  // eslint-disable-next-line react-hooks/refs
  const open = contextSafe(() => {
    if (openedRef.current) return;

    const { scene, envelopeGroup, flap, glow, letterPreview, scrim } = refs;
    if (!scene.current || !envelopeGroup.current || !flap.current || !letterPreview.current) return;

    openedRef.current = true;

    gsap.killTweensOf(scene.current);
    gsap.killTweensOf(envelopeGroup.current);

    if (reducedMotion) {
      gsap.set(scrim.current, { opacity: 0.22 });
      gsap.set(flap.current, { rotateX: -165 });
      gsap.set(glow.current, { opacity: 1 });
      gsap.set(letterPreview.current, { opacity: 0 });
      gsap.set(envelopeGroup.current, { opacity: 0 });
      fireBrandConfetti();
      onOpened();
      return;
    }

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(scrim.current, { opacity: 0.55, duration: 0.5, ease: "power2.out" }, 0)
      .to(envelopeGroup.current, { y: -14, scale: 1.03, duration: 0.5, ease: "power3.out" }, 0.05)
      .to(flap.current, { rotateX: -165, duration: 0.7, ease: "power3.inOut" }, 0.35)
      .to(glow.current, { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.55)
      .to(letterPreview.current, { y: "-48%", scale: 1.05, duration: 0.75, ease: "power3.out" }, 0.75)
      .to(
        envelopeGroup.current,
        { y: -40, scale: 0.85, opacity: 0, filter: "blur(6px)", duration: 0.7, ease: "power2.inOut" },
        1.05,
      )
      .to(letterPreview.current, { scale: 1.9, y: "-64%", duration: 0.85, ease: "expo.inOut" }, 1.15)
      .to(letterPreview.current, { opacity: 0, duration: 0.3, ease: "power1.in" }, 1.85)
      .to(scrim.current, { opacity: 0.22, duration: 0.6, ease: "power2.out" }, 1.9)
      .call(
        () => {
          fireBrandConfetti();
          onOpened();
        },
        [],
        1.85,
      );
  });

  return { handlePointerMove, handlePointerLeave, open };
}
