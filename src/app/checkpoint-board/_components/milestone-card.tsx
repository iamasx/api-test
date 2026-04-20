import type { CheckpointMilestone } from "../_data/checkpoint-board-data";

type MilestoneCardProps = {
  milestone: CheckpointMilestone;
};

const toneBadgeClasses = {
  steady: "border-emerald-200 bg-emerald-50 text-emerald-800",
  watch: "border-amber-200 bg-amber-50 text-amber-800",
  risk: "border-rose-200 bg-rose-50 text-rose-800",
};

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  return (
    <article
      className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
      role="listitem"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {milestone.title}
          </h3>
          <p className="text-sm leading-6 text-slate-600">{milestone.summary}</p>
        </div>

        <span
          className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneBadgeClasses[milestone.tone]}`}
        >
          {milestone.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Owner
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.owner}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Review window
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.window}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Readiness
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">{milestone.readiness}% ready</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Deliverables
          </p>
          <ul
            aria-label={`${milestone.title} deliverables`}
            className="mt-3 grid gap-3 text-sm leading-6 text-slate-600"
          >
            {milestone.deliverables.map((deliverable) => (
              <li key={deliverable} className="rounded-2xl border border-slate-200 px-4 py-3">
                {deliverable}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Blockers
          </p>
          <ul
            aria-label={`${milestone.title} blockers`}
            className="mt-3 grid gap-3 text-sm leading-6 text-slate-600"
          >
            {milestone.blockers.map((blocker) => (
              <li key={blocker} className="rounded-2xl border border-slate-200 px-4 py-3">
                {blocker}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Next review
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{milestone.nextReview}</p>
      </div>
    </article>
  );
}
