import type {
  QueueMonitorColumnDefinition,
  QueueMonitorEscalationMarker,
  QueueMonitorItem,
  QueueMonitorOwner,
  QueueMonitorQueue,
} from "../_data/queue-monitor-data";

export type QueueMonitorCardView = {
  item: QueueMonitorItem;
  queue: QueueMonitorQueue;
  owner: QueueMonitorOwner;
  escalation: QueueMonitorEscalationMarker;
  column: QueueMonitorColumnDefinition;
};

function getEscalationClasses(level: QueueMonitorEscalationMarker["id"]) {
  if (level === "sla-risk") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (level === "priority") {
    return "border-orange-200 bg-orange-50 text-orange-700";
  }

  if (level === "watch") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-600";
}

export function QueueCard({ view }: { view: QueueMonitorCardView }) {
  const { item, queue, owner, escalation } = view;

  return (
    <article
      aria-labelledby={`${item.id}-title`}
      className={`rounded-[1.5rem] border p-4 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ${
        item.blocked
          ? "border-amber-300 bg-amber-50/60"
          : escalation.id === "sla-risk"
            ? "border-rose-200 bg-rose-50/55"
            : "border-slate-200 bg-white/92"
      }`}
      data-blocked={item.blocked}
      data-escalation={escalation.id}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              {item.id}
            </span>
            <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {queue.name}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {item.statusLabel}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${getEscalationClasses(
                escalation.id,
              )}`}
            >
              {escalation.label}
            </span>
            {item.blocked ? (
              <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">
                Blocked
              </span>
            ) : null}
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

        <div className="rounded-2xl border border-slate-200 bg-white/90 px-3 py-3 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Age
          </p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {item.ageHours}h
          </p>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Owner
          </dt>
          <dd className="mt-2">
            <span className="font-medium text-slate-950">{owner.name}</span>
            <span className="block text-slate-500">
              {owner.role}, {owner.team}
            </span>
          </dd>
        </div>

        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Due window
          </dt>
          <dd className="mt-2 font-medium text-slate-900">{item.dueWindow}</dd>
        </div>

        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Backlog position
          </dt>
          <dd className="mt-2 font-medium text-slate-900">{item.backlogPosition}</dd>
        </div>

        <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.16)]">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Queue focus
          </dt>
          <dd className="mt-2 text-slate-700">{queue.focus}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3 rounded-[1.2rem] border border-dashed border-slate-200 px-4 py-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Last update
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.lastUpdate}</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Next action
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{item.nextAction}</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Escalation detail
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            {item.escalationDetail}
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

      <p className="mt-4 text-sm leading-6 text-slate-600">{item.summary}</p>

      <ul aria-label={`${item.id} tags`} className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}
