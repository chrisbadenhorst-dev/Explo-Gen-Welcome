interface ConfirmationStateProps {
  response: "accepted" | "unavailable";
}

export function ConfirmationState({ response }: ConfirmationStateProps) {
  if (response === "accepted") {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue-bright/15">
          <svg className="h-5 w-5 text-brand-light-blue" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12.5 9.5 18 20 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-base font-semibold text-brand-white">You&rsquo;re confirmed.</p>
        <p className="text-sm text-brand-mist/70">We&rsquo;ll see you then &mdash; looking forward to it.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
        <svg className="h-5 w-5 text-brand-mist/70" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <p className="font-display text-base font-semibold text-brand-white">Thanks for letting us know.</p>
      <p className="text-sm text-brand-mist/70">We&rsquo;ll be in touch to find a time that works.</p>
    </div>
  );
}
