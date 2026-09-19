import { TEAMS_MEETING_LINK } from "@/lib/constants";

interface MeetingDetailProps {
  meetingDate: string;
  meetingTime: string;
}

export function MeetingDetail({ meetingDate, meetingTime }: MeetingDetailProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <p className="text-[0.6rem] tracking-[0.25em] text-brand-light-blue/60">DATE</p>
          <p className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
            {meetingDate}
          </p>
        </div>
        <div className="h-10 w-px bg-white/15" />
        <div className="text-center">
          <p className="text-[0.6rem] tracking-[0.25em] text-brand-light-blue/60">TIME</p>
          <p className="font-display text-xl font-semibold text-brand-white sm:text-2xl">
            {meetingTime}
          </p>
        </div>
      </div>

      <a
        href={TEAMS_MEETING_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-brand-light-blue/30 bg-brand-light-blue/10 px-4 py-2 text-xs font-medium tracking-wide text-brand-light-blue transition-colors hover:border-brand-light-blue/50 hover:bg-brand-light-blue/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 10l5-3v10l-5-3M4 7h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Join via Microsoft Teams
      </a>
    </div>
  );
}
