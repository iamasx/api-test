import type { DispatchAssignmentView } from "../_lib/dispatch-data";
import { priorityStyles } from "../_lib/dispatch-data";

export function DispatchDetailPanel({
  assignment,
}: {
  assignment: DispatchAssignmentView;
}) {
  return (
    <aside
      aria-label="Assignment detail"
      className="rounded-[2rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_100px_rgba(15,23,42,0.18)]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
        Selected assignment
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        {assignment.title}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-white/60">
          {assignment.reference}
        </span>
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priorityStyles[assignment.priority]}`}
        >
          {assignment.priority}
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-white/74">
        {assignment.summary}
      </p>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Owner</dt>
          <dd>{assignment.owner.name} — {assignment.owner.role}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Lane</dt>
          <dd>{assignment.lane}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Equipment</dt>
          <dd>{assignment.equipment}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Service window</dt>
          <dd>{assignment.serviceWindow}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Handoff</dt>
          <dd>{assignment.handoffLabel}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold text-white/55">Risk</dt>
          <dd className="text-rose-300">{assignment.riskLabel}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
          Blockers
        </p>
        <ul className="mt-2 space-y-1.5" aria-label="Blockers">
          {assignment.blockers.map((blocker) => (
            <li
              key={blocker}
              className="rounded-xl border border-white/10 bg-white/6 px-3 py-2 text-xs leading-5 text-white/78"
            >
              {blocker}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
          Next actions
        </p>
        <ul className="mt-2 space-y-1.5" aria-label="Next actions">
          {assignment.nextActions.map((action) => (
            <li
              key={action}
              className="rounded-xl border border-cyan-300/14 bg-cyan-300/8 px-3 py-2 text-xs leading-5 text-white/82"
            >
              {action}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-[11px] text-white/40">
        {assignment.lastUpdated}
      </p>
    </aside>
  );
}
