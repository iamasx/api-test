import type { DispatchBucketView } from "../_lib/dispatch-data";
import { bucketToneStyles } from "../_lib/dispatch-data";
import { DispatchAssignmentCard } from "./dispatch-assignment-card";

export function DispatchBucketSection({
  bucket,
}: {
  bucket: DispatchBucketView;
}) {
  const tone = bucketToneStyles[bucket.tone];

  return (
    <section aria-label={bucket.title} className="space-y-4">
      <div
        className={`rounded-2xl border ${tone.border} ${tone.bg} px-5 py-4`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h3
              className={`text-lg font-semibold tracking-tight ${tone.text}`}
            >
              {bucket.title}
            </h3>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              {bucket.description}
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${tone.badge}`}
          >
            {bucket.pendingCount}{" "}
            {bucket.pendingCount === 1 ? "assignment" : "assignments"}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
          <span>{bucket.emphasis}</span>
          <span className="font-medium">{bucket.serviceGoal}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2" role="list" aria-label={`${bucket.title} assignments`}>
        {bucket.assignments.map((assignment) => (
          <div key={assignment.id} role="listitem">
            <DispatchAssignmentCard assignment={assignment} />
          </div>
        ))}
      </div>
    </section>
  );
}
