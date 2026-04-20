import { AssignmentCard } from "./assignment-card";
import type { DispatchBucketView } from "../_lib/dispatch-center";

const toneClasses: Record<DispatchBucketView["bucket"]["tone"], string> = {
  critical: "border-rose-200/80 bg-rose-50/70",
  priority: "border-amber-200/80 bg-amber-50/70",
  steady: "border-emerald-200/80 bg-emerald-50/70",
  monitor: "border-sky-200/80 bg-sky-50/70",
};

type BucketSectionProps = {
  view: DispatchBucketView;
  selectedAssignmentId: string;
};

export function BucketSection({
  view,
  selectedAssignmentId,
}: BucketSectionProps) {
  return (
    <section
      aria-labelledby={`dispatch-bucket-${view.bucket.id}`}
      className={`rounded-[2rem] border p-5 sm:p-6 ${toneClasses[view.bucket.tone]}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
            Assignment bucket
          </p>
          <h2
            id={`dispatch-bucket-${view.bucket.id}`}
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-950"
          >
            {view.bucket.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {view.bucket.description}
          </p>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {view.bucket.emphasis}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[18rem] lg:grid-cols-1 xl:grid-cols-3">
          <div className="rounded-2xl border border-white/70 bg-white/88 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Assignments
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {view.metrics.total}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/88 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Critical
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-950">
              {view.metrics.critical}
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/88 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Service goal
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-950">
              {view.bucket.serviceGoal}
            </p>
            <p className="mt-1 text-xs text-slate-500">{view.metrics.oldestAge}</p>
          </div>
        </div>
      </div>

      <ul
        role="list"
        aria-label={`${view.bucket.title} assignments`}
        className="mt-6 grid gap-4"
      >
        {view.assignments.map((assignment) => (
          <li key={assignment.id}>
            <AssignmentCard
              assignment={assignment}
              selected={assignment.id === selectedAssignmentId}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
