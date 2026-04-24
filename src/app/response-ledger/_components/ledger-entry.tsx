import type { ActionEntry } from "../_data/response-ledger-data";

type LedgerEntryProps = {
  action: ActionEntry;
};

const statusStyles: Record<ActionEntry["status"], string> = {
  completed: "border-l-emerald-500",
  "in-progress": "border-l-sky-400",
  escalated: "border-l-rose-500",
  deferred: "border-l-slate-400",
};

const statusBadge: Record<ActionEntry["status"], string> = {
  completed: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-sky-100 text-sky-700",
  escalated: "bg-rose-100 text-rose-700",
  deferred: "bg-slate-100 text-slate-600",
};

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function LedgerEntry({ action }: LedgerEntryProps) {
  return (
    <article
      role="listitem"
      className={`rounded-xl border-l-4 bg-white/90 px-5 py-4 shadow-sm transition-shadow hover:shadow-md ${statusStyles[action.status]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <time
            dateTime={action.timestamp}
            className="shrink-0 font-mono text-xs tabular-nums text-slate-500"
          >
            {formatTimestamp(action.timestamp)}
          </time>
          <span
            className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusBadge[action.status]}`}
          >
            {action.status}
          </span>
          <h3 className="text-sm font-semibold text-slate-900">
            {action.title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {action.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {action.description}
      </p>

      <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
        <span>{action.owner}</span>
        <span>&middot;</span>
        <span>{action.team}</span>
      </div>
    </article>
  );
}
