import type { QueueMonitorColumnDefinition } from "../_data/queue-monitor-data";
import { QueueCard, type QueueMonitorCardView } from "./queue-card";

export function QueueColumn({
  column,
  items,
}: {
  column: QueueMonitorColumnDefinition;
  items: QueueMonitorCardView[];
}) {
  const headingId = `${column.id}-heading`;
  const escalatedCount = items.filter((view) => view.escalation.id !== "steady").length;
  const blockedCount = items.filter((view) => view.item.blocked).length;

  return (
    <section
      aria-labelledby={headingId}
      className="flex min-h-full flex-col rounded-[1.75rem] border border-slate-200 bg-white/78 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.06)]"
      data-column={column.id}
    >
      <div className="space-y-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Backlog column
            </p>
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-slate-950">
              {column.title}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Items
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
              {items.length}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">{column.description}</p>
        <p className="rounded-2xl bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-600">
          {column.backlogExpectation}
        </p>

        <dl className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              WIP limit
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{column.wipLimit}</dd>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Escalated
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{escalatedCount}</dd>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Blocked
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{blockedCount}</dd>
          </div>
        </dl>
      </div>

      <ul aria-label={`${column.title} items`} className="mt-4 space-y-4">
        {items.map((view) => (
          <li key={view.item.id}>
            <QueueCard view={view} />
          </li>
        ))}
      </ul>
    </section>
  );
}
