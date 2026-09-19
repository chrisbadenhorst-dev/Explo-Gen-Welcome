import { Logo } from "./Logo";

export function NotFoundState() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-navy px-6 text-center">
      <Logo size="md" />
      <div className="max-w-sm space-y-3">
        <h1 className="font-display text-xl font-semibold text-brand-white">
          This invitation could not be found.
        </h1>
        <p className="text-sm leading-relaxed text-brand-mist/70">
          The link may have expired or been typed incorrectly. If you believe this is a mistake,
          please reach out to the person who shared it with you.
        </p>
      </div>
    </main>
  );
}
