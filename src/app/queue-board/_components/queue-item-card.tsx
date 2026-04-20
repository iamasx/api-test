import type { QueueBoardColumn } from "../_data/queue-board-data";

type QueueBoardCardItem = QueueBoardColumn["items"][number];

export function QueueItemCard({ item }: { item: QueueBoardCardItem }) {
  return (
    <article
      aria-labelledby={`${item.id}-title`}
      className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_16px_30px_rgba(15,23,42,0.05)]"
      data-blocked={item.blocked}
      data-escalation={item.escalation}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              {item.id}
            </span>
            <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {item.workflow}
            </span>
          </div>
          <div className="space-y-1">
            <h3
              id={`${item.id}-title`}
              className="text-lg font-semibold tracking-tight text-slate-950"
            >
              {item.title}
            </h3>
            <p className="text-sm text-slate-600">{item.account}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Age
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {item.ageHours}h
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Owner
          </dt>
          <dd className="mt-2">
            <span className="font-medium text-slate-950">{item.owner.name}</span>
            <span className="block text-slate-500">{item.owner.team}</span>
          </dd>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            SLA window
          </dt>
          <dd className="mt-2 font-medium text-slate-900">{item.slaWindow}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3 rounded-[1.15rem] border border-dashed border-slate-200 px-3 py-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Next checkpoint
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.checkpoint}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Escalation context
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {item.escalationReason}
          </p>
        </div>
        {item.blocker ? (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Blocker
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{item.blocker}</p>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{item.notes}</p>

      <ul aria-label={`${item.id} tags`} className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
