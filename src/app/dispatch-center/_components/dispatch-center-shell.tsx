import { AssignmentDetailPanel } from "./assignment-detail-panel";
import { BucketSection } from "./bucket-section";
import type { DispatchCenterView } from "../_lib/dispatch-center";

type DispatchCenterShellProps = {
  view: DispatchCenterView;
};

export function DispatchCenterShell({ view }: DispatchCenterShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
      <section className="overflow-hidden rounded-[2.5rem] border border-slate-950 bg-slate-950 text-white shadow-[0_40px_130px_rgba(15,23,42,0.18)]">
        <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.8fr)] xl:px-12 xl:py-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/72">
                Dispatch Center
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Balance assignment buckets, queue pressure, and owner follow-through from one route.
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-200/82 sm:text-lg">
                This route is powered entirely by mock assignment, queue, and owner data so it can ship as an independent operational surface with a visible selected-assignment panel.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {view.summaryMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Shift posture
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Pressure is concentrated in two queues, but every bucket has a named owner and visible next step.
            </p>
            <div className="mt-6 space-y-4 text-sm leading-7 text-white/76">
              <p>
                The queue cards highlight pending work and next release windows,
                while the bucket sections keep the oldest and most critical
                assignments visible.
              </p>
              <p>
                Selecting a card updates the detail panel so dispatch can work a
                single assignment without losing the rest of the board context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {view.missingAssignmentId ? (
        <p
          role="status"
          className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800"
        >
          Assignment &quot;{view.missingAssignmentId}&quot; was not found. Showing the
          current highest-priority assignment instead.
        </p>
      ) : null}

      <section aria-labelledby="dispatch-queue-summary" className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Pending work summary
            </p>
            <h2
              id="dispatch-queue-summary"
              className="text-3xl font-semibold tracking-tight text-slate-950"
            >
              Queue pressure by release lane
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Each queue card calls out pending work, near-term release pressure,
            and the oldest open item so the bucket board can be triaged with
            actual context.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {view.queues.map((queue) => (
            <article
              key={queue.id}
              className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Queue
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    {queue.name}
                  </h3>
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {queue.oldestAge}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">{queue.summary}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-100/90 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Pending
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {queue.pendingCount}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/90 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Due soon
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {queue.dueSoon}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-100/90 px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Release
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">
                    {queue.releaseWindow}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.85fr)]">
        <section aria-labelledby="dispatch-buckets" className="space-y-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Assignment board
              </p>
              <h2
                id="dispatch-buckets"
                className="text-3xl font-semibold tracking-tight text-slate-950"
              >
                Bucketed assignments with visible ownership
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Cards surface customer, lane, status, owner, and service-window
              data so dispatchers can compare open work without leaving the
              board.
            </p>
          </div>

          <div className="space-y-5">
            {view.buckets.map((bucketView) => (
              <BucketSection
                key={bucketView.bucket.id}
                view={bucketView}
                selectedAssignmentId={view.selectedAssignment.id}
              />
            ))}
          </div>
        </section>

        <div className="xl:sticky xl:top-6 xl:self-start">
          <AssignmentDetailPanel assignment={view.selectedAssignment} />
        </div>
      </div>
    </main>
  );
}
