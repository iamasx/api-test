import type { DispatchAssignmentView } from "../_lib/dispatch-data";
import { priorityStyles } from "../_lib/dispatch-data";

export function DispatchAssignmentCard({
  assignment,
}: {
  assignment: DispatchAssignmentView;
}) {
  return (
    <article
      aria-label={assignment.title}
      className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500">
            {assignment.reference}
          </p>
          <h4 className="text-sm font-semibold leading-6 text-slate-950">
            {assignment.title}
          </h4>
        </div>
        <span
          className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priorityStyles[assignment.priority]}`}
        >
          {assignment.priority}
        </span>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {assignment.summary}
      </p>

      <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-xs sm:grid-cols-2">
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Owner</dt>
          <dd className="text-slate-700">{assignment.owner.name}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Customer</dt>
          <dd className="text-slate-700">{assignment.customer}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Lane</dt>
          <dd className="text-slate-700">{assignment.lane}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Equipment</dt>
          <dd className="text-slate-700">{assignment.equipment}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Status</dt>
          <dd className="text-slate-700">{assignment.statusLabel}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt className="font-semibold text-slate-500">Window</dt>
          <dd className="text-slate-700">{assignment.serviceWindow}</dd>
        </div>
      </dl>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {assignment.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-400">
        {assignment.lastUpdated}
      </p>
    </article>
  );
}
