import type { CommandEvent } from "../_data/command-log-data";
import { CompactDetail } from "./compact-detail";
import { TagPill } from "./tag-pill";

type EventEntryProps = {
  event: CommandEvent;
};

const severityStyles: Record<CommandEvent["severity"], string> = {
  info: "border-l-sky-400",
  warning: "border-l-amber-400",
  error: "border-l-rose-500",
  success: "border-l-emerald-500",
};

const severityBadge: Record<CommandEvent["severity"], string> = {
  info: "bg-sky-100 text-sky-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-rose-100 text-rose-700",
  success: "bg-emerald-100 text-emerald-700",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}

export function EventEntry({ event }: EventEntryProps) {
  return (
    <article
      role="listitem"
      className={`rounded-xl border-l-4 bg-white/90 px-5 py-4 shadow-sm transition-shadow hover:shadow-md ${severityStyles[event.severity]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <time dateTime={event.timestamp} className="shrink-0 text-xs font-mono tabular-nums text-slate-500">
            {formatTimestamp(event.timestamp)}
          </time>
          <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${severityBadge[event.severity]}`}>
            {event.severity}
          </span>
          <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {event.tags.map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
        </div>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>

      <CompactDetail detail={event.detail} source={event.source} />
    </article>
  );
}
