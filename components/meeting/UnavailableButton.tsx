interface UnavailableButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function UnavailableButton({ onClick, disabled }: UnavailableButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-13 min-h-13 w-full rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-brand-mist/80 transition-colors hover:border-white/30 hover:text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy disabled:opacity-50 sm:w-auto sm:min-w-[200px]"
    >
      I Can&rsquo;t Attend
    </button>
  );
}
