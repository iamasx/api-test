import type { IncidentRecord } from "../_data/incident-deck-data";

type IncidentCardProps = {
  incident: IncidentRecord;
};

const toneClassNames = {
  critical: "border-rose-300/70 bg-rose-50/80",
  watch: "border-amber-300/70 bg-amber-50/75",
  steady: "border-emerald-300/70 bg-emerald-50/75",
};

const severityClassNames = {
  "SEV-1": "border-rose-300/70 bg-rose-100 text-rose-800",
  "SEV-2": "border-amber-300/70 bg-amber-100 text-amber-800",
  "SEV-3": "border-sky-300/70 bg-sky-100 text-sky-800",
};

const statusClassNames = {
  Investigating: "border-slate-300 bg-white text-slate-700",
  Mitigating: "border-rose-300/70 bg-white text-rose-700",
  Monitoring: "border-emerald-300/70 bg-white text-emerald-700",
};

export function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <article
      className={`rounded-[1.75rem] border p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] ${toneClassNames[incident.tone]}`}
      role="listitem"
    >
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {incident.service}
            </p>
            <h3 className="max-w-3xl text-2xl font-semibold tracking-tight text-slate-950">
              {incident.title}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${severityClassNames[incident.severity]}`}
            >
              {incident.severity}
            </span>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClassNames[incident.status]}`}
            >
              {incident.status}
            </span>
          </div>
        </div>

        <p className="max-w-4xl text-sm leading-7 text-slate-700">
          {incident.summary}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Commander
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {incident.incidentCommander}
          </p>
        </div>
        <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Channel
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{incident.channel}</p>
        </div>
        <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Region
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{incident.region}</p>
        </div>
        <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Next update
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            {incident.nextUpdateAt}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Blast radius
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.blastRadius}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Customer impact
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.customerImpact}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Mitigation
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {incident.mitigation}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active workstreams
            </p>
            <ul
              className="mt-3 grid gap-3"
              aria-label={`${incident.service} workstreams`}
            >
              {incident.workstreams.map((workstream) => (
                <li
                  key={workstream}
                  className="rounded-[1.1rem] border border-slate-200 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {workstream}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.2rem] border border-slate-200 bg-white/80 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Ownership lanes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {incident.owners.map((owner) => (
                <span
                  key={owner}
                  className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700"
                >
                  {owner}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-slate-200 bg-slate-950 px-4 py-4 text-slate-50">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Latest note
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              {incident.updateNote}
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
              Open for {incident.ageMinutes} minutes since {incident.detectedAt}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
