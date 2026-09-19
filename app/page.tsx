import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-brand-navy px-6 text-center">
      <Logo size="md" />
      <div className="max-w-sm space-y-3">
        <h1 className="font-display text-lg font-semibold text-brand-white">
          This is an invite-only experience.
        </h1>
        <p className="text-sm leading-relaxed text-brand-mist/70">
          Explo-Gen Technologies invitations are sent as personal links. If you have one, open it
          directly to begin.
        </p>
      </div>
      <Link
        href="/welcome/demo-john"
        className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium tracking-wide text-brand-mist/80 transition-colors hover:border-white/30 hover:text-brand-white"
      >
        View the demo invitation
      </Link>
    </main>
  );
}
