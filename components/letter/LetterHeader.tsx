import { Logo } from "@/components/shared/Logo";

export function LetterHeader() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Logo size="sm" />
      <div className="h-px w-16 bg-gradient-to-r from-transparent via-brand-light-blue/50 to-transparent" />
      <p className="text-xs font-medium tracking-[0.3em] text-brand-light-blue/80">
        CO-FOUNDER WELCOME
      </p>
    </div>
  );
}
