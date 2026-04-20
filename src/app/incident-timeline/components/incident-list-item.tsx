import type { Incident } from "../data";
import {
  cn,
  formatTimestamp,
  getIncidentDurationLabel,
  getSeverityBadgeClasses,
  getStatusBadgeClasses,
} from "../utils";

type IncidentListItemProps = {
  incident: Incident;
  selected: boolean;
  onSelect: (incidentId: string) => void;
};

export function IncidentListItem({
  incident,
  selected,
  onSelect,
}: IncidentListItemProps) {
  return (
    <button
      aria-pressed={selected}
      className={cn(
        "w-full rounded-[1.75rem] border p-5 text-left transition",
        selected
          ? "border-cyan-300/45 bg-linear-to-br from-cyan-400/12 via-slate-900 to-slate-950 shadow-lg shadow-cyan-950/20"
          : "border-white/10 bg-slate-950/70 hover:-translate-y-0.5 hover:border-white/20 hover:bg-slate-900/80"
      )}
      onClick={() => onSelect(incident.id)}
      type="button"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            {incident.id}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {incident.title}
          </h3>
        </div>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            getSeverityBadgeClasses(incident.severity)
          )}
        >
          {incident.severity}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-300">{incident.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
          {incident.service}
        </span>
        <span
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium",
            getStatusBadgeClasses(incident.status)
          )}
        >
          {incident.status}
        </span>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {getIncidentDurationLabel(incident)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {incident.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-[0.7rem] uppercase tracking-[0.18em] text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-400">
        <span>{incident.region}</span>
        <span>{formatTimestamp(incident.startedAt)}</span>
      </div>
    </button>
  );
}
