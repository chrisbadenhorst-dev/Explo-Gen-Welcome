import confetti from "canvas-confetti";

const BRAND_CONFETTI_COLORS = ["#0A1A3C", "#1E4FD8", "#8FB8FF", "#FFFFFF"];

/** Two restrained bursts in brand colors. No-ops under reduced motion. */
export function fireBrandConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const shared: confetti.Options = {
    colors: BRAND_CONFETTI_COLORS,
    disableForReducedMotion: true,
    scalar: 0.85,
    gravity: 0.9,
    ticks: 200,
  };

  confetti({
    ...shared,
    particleCount: 70,
    spread: 68,
    startVelocity: 38,
    origin: { x: 0.3, y: 0.55 },
  });

  confetti({
    ...shared,
    particleCount: 70,
    spread: 68,
    startVelocity: 38,
    origin: { x: 0.7, y: 0.55 },
  });
}
