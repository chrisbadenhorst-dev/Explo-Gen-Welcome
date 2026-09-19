interface AcceptButtonProps {
  status: "idle" | "loading" | "success";
  onClick: () => void;
  disabled?: boolean;
}

export function AcceptButton({ status, onClick, disabled }: AcceptButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || status !== "idle"}
      className="group relative flex h-13 min-h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-blue-bright to-brand-blue px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(30,79,216,0.65)] transition-transform duration-200 hover:scale-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy disabled:hover:scale-100 sm:w-auto sm:min-w-[280px]"
    >
      {status === "idle" && <span>Accept &amp; Confirm Meeting</span>}

      {status === "loading" && (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span>Confirming&hellip;</span>
        </>
      )}

      {status === "success" && (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12.5 9.5 18 20 6"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={0}
              className="animate-[draw_0.5s_ease-out]"
            />
          </svg>
          <span>You&rsquo;re confirmed.</span>
        </>
      )}
    </button>
  );
}
