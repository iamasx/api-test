import type {
  OwnershipCell,
  OwnershipSnapshot,
} from "../_data/incident-deck-data";

type OwnershipSummaryPanelProps = {
  cells: OwnershipCell[];
  snapshot: OwnershipSnapshot;
  incidentServiceById: Record<string, string>;
};

const toneClassNames = {
  critical: "border-rose-300/70 bg-rose-50/80",
  watch: "border-amber-300/70 bg-amber-50/80",
  steady: "border-emerald-300/70 bg-emerald-50/80",
};

export function OwnershipSummaryPanel({
  cells,
  snapshot,
  incidentServiceById,
}: OwnershipSummaryPanelProps) {
  return (
    <aside className="space-y-6">
      <div className="rounded-[1.8rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.2)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
          Ownership posture
        </p>
        <h2
          id="incident-ownership-summary"
          className="mt-3 text-3xl font-semibold tracking-tight"
        >
          Ownership summary
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The ownership rail tracks who currently holds mitigation, customer
          updates, and the next handoff across the response cells.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Teams engaged
            </p>
            <p className="mt-2 text-3xl font-semibold">{snapshot.teamsEngaged}</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Responders engaged
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {snapshot.respondersEngaged}
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Hot teams
            </p>
            <p className="mt-2 text-3xl font-semibold">{snapshot.hotTeams}</p>
          </div>
          <div className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Stretched teams
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {snapshot.stretchedTeams}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4" role="list" aria-label="Ownership summary">
        {cells.map((cell) => {
          const linkedServices = cell.activeIncidentIds
            .map((incidentId) => incidentServiceById[incidentId])
            .filter(Boolean);

          return (
            <article
              key={cell.id}
              className={`rounded-[1.5rem] border p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] ${toneClassNames[cell.tone]}`}
              role="listitem"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {cell.role}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                    {cell.team}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    {cell.lead} · {cell.shift}
                  </p>
                </div>

                <span className="inline-flex rounded-full border border-slate-300 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                  {cell.health}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Queue
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{cell.queue}</p>
                </div>
                <div className="rounded-[1.1rem] border border-slate-200 bg-white/80 px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Responders
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {cell.responders} active responders
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Current focus
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {cell.focus}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Active incidents
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {linkedServices.map((service) => (
                      <span
                        key={`${cell.id}-${service}`}
                        className="inline-flex rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.1rem] border border-slate-200 bg-slate-950 px-4 py-4 text-slate-50">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Next handoff
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    {cell.nextHandoff}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
