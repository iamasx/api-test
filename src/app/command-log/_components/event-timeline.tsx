import type { CommandLogEvent } from "../_lib/command-log-data";

const severityDotColors: Record<string, string> = {
  Critical: "bg-rose-500",
  High: "bg-amber-500",
  Moderate: "bg-sky-500",
  Low: "bg-slate-400",
};

const statusLabels: Record<string, { color: string; label: string }> = {
  Completed: { color: "text-emerald-600", label: "Done" },
  Watching: { color: "text-amber-600", label: "Watch" },
  "Needs follow-up": { color: "text-rose-600", label: "Follow-up" },
  Blocked: { color: "text-red-700", label: "Blocked" },
};

type EventTimelineProps = {
  events: CommandLogEvent[];
  selectedEventId: string;
};

export function EventTimeline({ events, selectedEventId }: EventTimelineProps) {
  return (
    <div className="relative" aria-label="Event timeline">
      {/* Vertical connector line */}
      <div className="absolute left-[11px] top-3 bottom-3 w-px bg-slate-200" aria-hidden="true" />

      <ol className="relative space-y-0">
        {events.map((event, index) => {
          const isSelected = event.id === selectedEventId;
          const dotColor = severityDotColors[event.severity] ?? "bg-slate-400";
          const statusInfo = statusLabels[event.status] ?? { color: "text-slate-500", label: event.status };
          const isFirst = index === 0;
          const isLast = index === events.length - 1;

          return (
            <li key={event.id} className="relative pl-8">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-4 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-slate-900 bg-white" : "border-white bg-white"
                }`}
              >
                <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
              </div>

              <a
                href={`?event=${event.id}`}
                className={`block rounded-xl border px-4 py-3 transition ${
                  isFirst ? "mt-0" : "mt-1"
                } ${isLast ? "mb-0" : "mb-1"} ${
                  isSelected
                    ? "border-slate-900 bg-slate-50 shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-white/60"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm font-medium ${
                        isSelected ? "text-slate-950" : "text-slate-700"
                      }`}
                    >
                      {event.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{event.occurredLabel}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {event.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                  {event.tags.length > 3 && (
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                      +{event.tags.length - 3}
                    </span>
                  )}
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
