import type { OwnershipRecord } from "../_data/response-ledger-data";

type OwnershipRailProps = {
  records: OwnershipRecord[];
};

export function OwnershipRail({ records }: OwnershipRailProps) {
  return (
    <div className="rounded-[var(--card-radius)] border border-[var(--line)] bg-[var(--surface-strong)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
        Ownership
      </p>
      <ul className="mt-4 space-y-3" aria-label="Ownership summary">
        {records.map((record) => (
          <li
            key={record.owner}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white/75 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                {record.owner}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{record.team}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-slate-900">
                {record.actionCount}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {record.resolvedCount} resolved
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
