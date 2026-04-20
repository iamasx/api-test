import type { Incident } from "../data";
import {
  cn,
  formatTimestamp,
  getIncidentDurationLabel,
  getSeverityBadgeClasses,
  getStatusBadgeClasses,
} from "../utils";
import { TimelineEntryItem } from "./timeline-entry-item";

type IncidentDetailPanelProps = {
  incident: Incident | null;
};

export function IncidentDetailPanel({
  incident,
}: IncidentDetailPanelProps) {
  if (!incident) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/70 p-8 text-slate-300">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Incident detail
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          No incident selected
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Select an incident from the list to inspect its impact summary and
          detailed response timeline.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 shadow-2xl shadow-black/20">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
          Incident detail
        </p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-white">
              {incident.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {incident.customerImpact}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                getSeverityBadgeClasses(incident.severity)
              )}
            >
              {incident.severity}
            </span>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                getStatusBadgeClasses(incident.status)
              )}
            >
              {incident.status}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Commander
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {incident.commander}
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Active window
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {getIncidentDurationLabel(incident)}
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
              Started
            </p>
            <p className="mt-3 text-lg font-semibold text-white">
              {formatTimestamp(incident.startedAt)}
            </p>
          </article>
        </div>
      </header>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">Impact summary</h3>
          <p className="text-xs text-slate-400">Mock metrics snapshot</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {incident.metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                {metric.label}
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {metric.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-white">Response timeline</h3>
          <p className="text-xs text-slate-400">
            {incident.timeline.length} checkpoints
          </p>
        </div>

        <ol
          aria-label={`${incident.title} response timeline`}
          className="mt-6 space-y-4"
        >
          {incident.timeline.map((entry, index) => (
            <TimelineEntryItem
              key={entry.id}
              entry={entry}
              isLast={index === incident.timeline.length - 1}
            />
          ))}
        </ol>
      </section>
    </section>
  );
}
