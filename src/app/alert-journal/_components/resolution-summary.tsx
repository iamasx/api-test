import type { AlertJournalEntry } from "../_lib/alert-journal-data";

type ResolutionSummaryProps = {
  alert: AlertJournalEntry;
  requestedAlertId?: string;
  selectionFound?: boolean;
};

const resolutionToneClassNames = {
  Resolved: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Monitoring: "border-sky-200 bg-sky-50 text-sky-800",
  "Mitigation active": "border-amber-200 bg-amber-50 text-amber-800",
  "Follow-up queued": "border-slate-200 bg-slate-100 text-slate-700",
} satisfies Record<AlertJournalEntry["resolution"]["status"], string>;

export function ResolutionSummary({
  alert,
  requestedAlertId,
  selectionFound = true,
}: ResolutionSummaryProps) {
  return (
    <aside
      aria-label="Resolution detail"
      className="rounded-[1.9rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.2)] sm:p-7"
    >
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200/76">
            Resolution detail
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {alert.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/72">{alert.summary}</p>
        </div>

        {!selectionFound && requestedAlertId ? (
          <p className="rounded-[1.25rem] border border-amber-300/30 bg-amber-300/12 px-4 py-4 text-sm leading-6 text-amber-100">
            Requested alert id "{requestedAlertId}" was not found. Showing the
            most recent alert instead.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${resolutionToneClassNames[alert.resolution.status]}`}
          >
            {alert.resolution.status}
          </span>
          <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
            {alert.severity}
          </span>
          <span className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72">
            {alert.service}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/54">
              Owner
            </p>
            <p className="mt-2 text-lg font-semibold">{alert.resolution.owner}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {alert.resolution.updatedLabel}
            </p>
          </div>
          <div className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/54">
              Environment
            </p>
            <p className="mt-2 text-lg font-semibold">{alert.environment}</p>
            <p className="mt-2 text-sm leading-6 text-white/60">
              {alert.durationLabel}
            </p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/12 bg-white/6 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/54">
            Resolution summary
          </p>
          <p className="mt-3 text-base leading-7 text-white/82">
            {alert.resolution.summary}
          </p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            {alert.resolution.detail}
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-white/12 bg-white/6 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/54">
            Actions taken
          </p>
          <ul className="mt-4 grid gap-3">
            {alert.resolution.actions.map((action) => (
              <li
                key={action}
                className="rounded-[1.1rem] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/78"
              >
                {action}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.5rem] border border-amber-300/22 bg-amber-300/10 px-5 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-100/76">
            Next step
          </p>
          <p className="mt-3 text-sm leading-7 text-amber-50">
            {alert.resolution.nextStep}
          </p>
        </div>
      </div>
    </aside>
  );
}
