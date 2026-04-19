import type { TimelineEntry } from "@/types/profile";

interface JourneyTimelineProps {
  readonly entries: readonly TimelineEntry[];
}

export function JourneyTimeline({ entries }: JourneyTimelineProps) {
  return (
    <div className="relative pl-6 sm:pl-10">
      <div className="absolute bottom-0 left-2 top-1 w-px bg-[var(--line)] sm:left-4" aria-hidden />

      <div className="space-y-6">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="timeline-card relative rounded-[1.75rem] border border-black/8 bg-white/75 p-6 shadow-[0_18px_45px_rgba(31,26,23,0.05)] backdrop-blur"
          >
            <span
              aria-hidden
              className="absolute left-[-1.65rem] top-8 h-3 w-3 rounded-full border-4 border-[#fffaf3] bg-[var(--accent)] shadow-[0_0_0_6px_rgba(15,118,110,0.12)] sm:left-[-2.15rem]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                {entry.kind}
              </p>
              <p className="text-sm font-medium text-[var(--muted)]">{entry.period}</p>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              {entry.title}
            </h3>
            <p className="mt-2 text-base font-medium text-[var(--muted)]">{entry.organization}</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{entry.description}</p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-2xl bg-[var(--surface-strong)] px-4 py-3 text-sm leading-6 text-[var(--foreground)]"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
