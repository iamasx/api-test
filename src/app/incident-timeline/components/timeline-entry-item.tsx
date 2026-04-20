import type { TimelineEntry } from "../data";
import { cn, formatTimestamp, getTimelineStageClasses } from "../utils";

type TimelineEntryItemProps = {
  entry: TimelineEntry;
  isLast: boolean;
};

export function TimelineEntryItem({
  entry,
  isLast,
}: TimelineEntryItemProps) {
  return (
    <li className="relative pl-8">
      {!isLast ? (
        <span className="absolute left-[0.72rem] top-6 h-[calc(100%-0.25rem)] w-px bg-linear-to-b from-white/20 to-white/5" />
      ) : null}

      <span
        className={cn(
          "absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-slate-950",
          getTimelineStageClasses(entry.stage)
        )}
      />

      <article className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-white/[0.05] via-white/[0.03] to-slate-950/80 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                getTimelineStageClasses(entry.stage)
              )}
            >
              {entry.stage}
            </span>
            <span className="text-xs text-slate-400">
              {formatTimestamp(entry.timestamp)}
            </span>
          </div>
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            {entry.actor}
          </span>
        </div>

        <h4 className="mt-4 text-lg font-semibold text-white">{entry.title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-300">{entry.detail}</p>
      </article>
    </li>
  );
}
