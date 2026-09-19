import { forwardRef } from "react";

interface LetterPreviewProps {
  applicantName: string;
}

export const LetterPreview = forwardRef<HTMLDivElement, LetterPreviewProps>(
  function LetterPreview({ applicantName }, ref) {
    const firstName = applicantName.split(" ")[0];

    return (
      <div
        ref={ref}
        className="absolute left-1/2 top-[38%] w-[78%] -translate-x-1/2 rounded-lg border border-white/10 bg-gradient-to-b from-white to-[#eef3ff] px-5 py-4 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]"
        style={{ transformOrigin: "50% 85%" }}
        aria-hidden="true"
      >
        <p className="font-display text-[0.7rem] font-semibold tracking-wide text-brand-navy-soft/70">
          Dear {firstName},
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-1 w-full rounded-full bg-brand-navy-soft/10" />
          <div className="h-1 w-4/5 rounded-full bg-brand-navy-soft/10" />
          <div className="h-1 w-5/6 rounded-full bg-brand-navy-soft/10" />
        </div>
      </div>
    );
  },
);
