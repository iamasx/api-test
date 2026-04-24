import type { IncomingRequest } from "../_data/intake-desk-data";
import styles from "../intake-desk.module.css";

const urgencyLabels: Record<IncomingRequest["urgency"], string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  critical: "Critical",
};

const urgencyBadgeStyles: Record<IncomingRequest["urgency"], string> = {
  low: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  normal: "border-cyan-300/20 bg-cyan-300/10 text-cyan-50",
  high: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const urgencySurfaceStyles: Record<IncomingRequest["urgency"], string> = {
  low: styles.urgencyLow,
  normal: styles.urgencyNormal,
  high: styles.urgencyHigh,
  critical: styles.urgencyCritical,
};

type RequestCardProps = {
  request: IncomingRequest;
};

export function RequestCard({ request }: RequestCardProps) {
  return (
    <article
      className={`${styles.requestCard} ${urgencySurfaceStyles[request.urgency]} rounded-[1.7rem] border p-6`}
      role="listitem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {request.title}
          </h3>
          <p className="text-sm text-slate-300">{request.requester}</p>
        </div>
        <span
          className={`${styles.statusBadge} inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${urgencyBadgeStyles[request.urgency]}`}
        >
          {urgencyLabels[request.urgency]}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Category
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
            {request.category}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Received
          </p>
          <p className="mt-1 text-sm font-medium text-slate-100">
            {request.receivedAt}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300">{request.summary}</p>
    </article>
  );
}
