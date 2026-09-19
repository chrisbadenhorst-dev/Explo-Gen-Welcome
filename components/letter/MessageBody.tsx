interface MessageBodyProps {
  personalMessage: string | null;
}

const DEFAULT_MESSAGE =
  "Throughout our conversations, we were impressed by what you bring to the table. Your skills, perspective, and ambition stood out to us, and we believe you can play a meaningful role in what we're building.";

export function MessageBody({ personalMessage }: MessageBodyProps) {
  return (
    <div className="space-y-4 text-[0.95rem] leading-relaxed text-brand-mist/85">
      <p>{personalMessage ?? DEFAULT_MESSAGE}</p>
      <p className="font-medium text-brand-white/95">
        We&rsquo;re excited about what lies ahead, and even more excited about the possibility of
        building it together.
      </p>
    </div>
  );
}
