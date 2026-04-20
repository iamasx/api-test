import type { QueueBoardColumn } from "../_data/queue-board-data";
import styles from "../queue-board.module.css";
import { QueueItemCard } from "./queue-item-card";

export function QueueColumn({ column }: { column: QueueBoardColumn }) {
  const headingId = `${column.id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`flex min-h-full flex-col rounded-[1.75rem] border border-slate-200 p-4 shadow-[0_22px_50px_rgba(15,23,42,0.06)] sm:p-5 ${styles.columnShell}`}
      data-column={column.id}
    >
      <div className="space-y-4 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Workflow stage
            </p>
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-slate-950">
              {column.title}
            </h2>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Items
            </p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
              {column.count}
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">{column.description}</p>

        <dl className="grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
          <div className="rounded-2xl bg-white px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              WIP limit
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{column.wipLimit}</dd>
          </div>
          <div className="rounded-2xl bg-white px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Escalated
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{column.escalatedCount}</dd>
          </div>
          <div className="rounded-2xl bg-white px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.14)]">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Blocked
            </dt>
            <dd className="mt-2 font-medium text-slate-950">{column.blockedCount}</dd>
          </div>
        </dl>
      </div>

      <ul aria-label={`${column.title} items`} className="mt-4 space-y-4">
        {column.items.map((item) => (
          <li key={item.id}>
            <QueueItemCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
