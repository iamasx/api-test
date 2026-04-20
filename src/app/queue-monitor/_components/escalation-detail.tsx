import type { QueueMonitorCardView } from "./queue-card";
import styles from "../queue-monitor.module.css";

export function EscalationDetail({ view }: { view: QueueMonitorCardView }) {
  const { item, queue, owner, escalation, column } = view;

  return (
    <aside
      aria-labelledby="queue-monitor-escalation-heading"
      className={`rounded-[1.9rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_26px_80px_rgba(15,23,42,0.22)] sm:p-7 ${styles.detailPanel}`}
    >
      <div className={`space-y-6 ${styles.detailPanelContent}`}>
        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-sky-200/82">
            Escalation detail
          </p>
          <h2
            id="queue-monitor-escalation-heading"
            className="text-3xl font-semibold tracking-tight"
          >
            {item.title}
          </h2>
          <p className="text-sm leading-7 text-white/76">{item.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">
            {item.id}
          </span>
          <span className="rounded-full bg-rose-500/16 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-200">
            {escalation.label}
          </span>
          {item.blocked ? (
            <span className="rounded-full bg-amber-400/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-100">
              Blocked
            </span>
          ) : null}
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.3rem] bg-white/8 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
              Current column
            </dt>
            <dd className="mt-2 text-lg font-semibold">{column.title}</dd>
            <p className="mt-2 text-sm leading-6 text-white/72">{column.description}</p>
          </div>

          <div className="rounded-[1.3rem] bg-white/8 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
              Owner
            </dt>
            <dd className="mt-2 text-lg font-semibold">{owner.name}</dd>
            <p className="mt-2 text-sm leading-6 text-white/72">
              {owner.role}, {owner.team}
            </p>
          </div>

          <div className="rounded-[1.3rem] bg-white/8 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
              Response expectation
            </dt>
            <dd className="mt-2 text-sm leading-6 text-white/82">
              {escalation.responseExpectation}
            </dd>
            <p className="mt-2 text-sm leading-6 text-white/66">
              {escalation.attentionNote}
            </p>
          </div>

          <div className="rounded-[1.3rem] bg-white/8 px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
              Queue focus
            </dt>
            <dd className="mt-2 text-lg font-semibold">{queue.name}</dd>
            <p className="mt-2 text-sm leading-6 text-white/72">{queue.focus}</p>
          </div>
        </dl>

        <div className="rounded-[1.3rem] border border-white/12 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
            Due window
          </p>
          <p className="mt-2 text-lg font-semibold">{item.dueWindow}</p>
          <p className="mt-2 text-sm leading-6 text-white/76">{item.lastUpdate}</p>
        </div>

        <div className="rounded-[1.3rem] border border-white/12 bg-white/6 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
            Recovery path
          </p>
          <p className="mt-2 text-sm leading-7 text-white/82">{item.nextAction}</p>
          <p className="mt-3 text-sm leading-7 text-white/72">
            {item.escalationDetail}
          </p>
          {item.blocker ? (
            <p className="mt-3 rounded-2xl bg-white/8 px-3 py-3 text-sm leading-7 text-amber-100">
              {item.blocker}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/56">
            Focus points
          </p>
          <ul className="mt-3 space-y-3">
            {item.focusPoints.map((point) => (
              <li
                key={point}
                className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-white/78"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
