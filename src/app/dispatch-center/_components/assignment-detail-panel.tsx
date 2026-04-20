import type { DispatchAssignmentView } from "../_lib/dispatch-center";

type AssignmentDetailPanelProps = {
  assignment: DispatchAssignmentView;
};

export function AssignmentDetailPanel({
  assignment,
}: AssignmentDetailPanelProps) {
  return (
    <aside
      aria-label="Selected assignment detail"
      className="rounded-[2rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.22)]"
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
            Selected assignment
          </p>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {assignment.reference}
            </h2>
            <p className="mt-3 text-lg leading-8 text-white/78">
              {assignment.title}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Queue
            </p>
            <p className="mt-2 text-base font-semibold">{assignment.queue.name}</p>
            <p className="mt-1 text-sm text-white/68">{assignment.queue.releaseWindow}</p>
          </div>
          <div className="rounded-2xl bg-white/8 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Ownership
            </p>
            <p className="mt-2 text-base font-semibold">{assignment.owner.name}</p>
            <p className="mt-1 text-sm text-white/68">{assignment.owner.shift}</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Status
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.statusLabel}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Risk
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.riskLabel}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Equipment
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.equipment}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Handoff
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.handoffLabel}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Origin
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.origin}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Destination
              </p>
              <p className="mt-2 text-sm font-medium text-white">
                {assignment.destination}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            Coordination notes
          </p>
          <p className="text-sm leading-7 text-white/78">{assignment.summary}</p>
          <p className="text-sm text-white/64">{assignment.lastUpdated}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-[1.5rem] bg-white/8 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Blockers
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              {assignment.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[1.5rem] bg-white/8 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Next actions
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/80">
              {assignment.nextActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            Queue summary
          </p>
          <p className="mt-3 text-sm leading-7 text-white/80">
            {assignment.queue.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {assignment.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs font-medium text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/68">{assignment.owner.workload}</p>
        </div>
      </div>
    </aside>
  );
}
