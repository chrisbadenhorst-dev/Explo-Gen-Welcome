interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 text-center">
      <span className="text-[0.65rem] font-medium tracking-[0.3em] text-brand-light-blue/70">
        SELECTED ROLE
      </span>
      <span className="relative font-display text-2xl font-bold uppercase tracking-wide text-brand-white sm:text-3xl">
        {role}
        <span className="absolute -bottom-2 left-1/2 h-[3px] w-14 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-blue-bright to-brand-light-blue" />
      </span>
    </div>
  );
}
