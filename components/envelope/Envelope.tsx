/** The static back panel and pocket — the part of the envelope that never animates open. */
export function Envelope() {
  return (
    <>
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-b from-brand-navy-soft to-[#03081a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]" />
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#0c2050] to-[#071130]"
        style={{
          clipPath: "polygon(0% 100%, 50% 38%, 100% 100%)",
        }}
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 100 L50 38 L100 100"
          fill="none"
          stroke="rgba(143,184,255,0.35)"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}
