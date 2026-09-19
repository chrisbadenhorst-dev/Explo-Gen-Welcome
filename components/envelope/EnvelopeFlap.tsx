import { forwardRef } from "react";

interface EnvelopeFlapProps {
  glowRef: React.RefObject<HTMLDivElement | null>;
}

export const EnvelopeFlap = forwardRef<HTMLDivElement, EnvelopeFlapProps>(
  function EnvelopeFlap({ glowRef }, ref) {
    return (
      <div
        ref={ref}
        className="absolute inset-x-0 top-0 h-[42%] [backface-visibility:hidden]"
        style={{ transformOrigin: "50% 0%" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#123067] to-[#0a1c48] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
        />
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-0"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
            background:
              "radial-gradient(60% 60% at 50% 100%, rgba(143,184,255,0.55), rgba(143,184,255,0) 70%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute left-1/2 top-[30%] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-brand-light-blue/40 bg-brand-navy-soft/80 shadow-inner">
          <svg width="14" height="14" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <path d="M13 27 L21 12 L21 19 L27 19 L19 34 L19 27 Z" className="fill-brand-light-blue" />
          </svg>
        </div>
      </div>
    );
  },
);
