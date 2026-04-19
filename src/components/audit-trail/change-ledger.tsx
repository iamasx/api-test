import type { CategoryTag, ChangeRecord, Reviewer } from "@/app/audit-trail/mock-data";

import { ReviewerBadges } from "./reviewer-badges";

const stateStyles = {
  pending: "bg-amber-100 text-amber-950",
  approved: "bg-emerald-100 text-emerald-950",
  watch: "bg-sky-100 text-sky-950",
  "changes-requested": "bg-rose-100 text-rose-950",
} as const;

const stateLabels = {
  pending: "Pending",
  approved: "Approved",
  watch: "Watch",
  "changes-requested": "Changes requested",
} as const;

type ChangeLedgerProps = {
  records: ChangeRecord[];
  flaggedIds: string[];
  hasFilters: boolean;
  onResetFilters: () => void;
  onToggleFlag: (recordId: string) => void;
  reviewersById: Record<string, Reviewer>;
  categoriesById: Record<string, CategoryTag>;
};

export function ChangeLedger({
  records,
  flaggedIds,
  hasFilters,
  onResetFilters,
  onToggleFlag,
  reviewersById,
  categoriesById,
}: ChangeLedgerProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-5 shadow-xl shadow-slate-200/50">
      <div className="flex flex-col gap-2 border-b border-slate-200/80 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Change ledger</p>
        <h2 className="text-2xl font-semibold text-slate-950">Review the mock change stream and flag items locally.</h2>
      </div>

      {records.length > 0 ? (
        <div className="mt-5 space-y-4">
          {records.map((record) => {
            const category = categoriesById[record.categoryId];
            const isFlagged = flaggedIds.includes(record.id);

            return (
              <article
                className={`rounded-[1.6rem] border p-5 transition ${
                  isFlagged
                    ? "border-rose-200 bg-rose-50/70 text-slate-900 shadow-lg shadow-rose-100/60"
                    : "border-slate-200 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.88))] text-slate-900"
                }`}
                key={record.id}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]">
                      <span className={`rounded-full px-3 py-1 ${stateStyles[record.reviewState]}`}>
                        {stateLabels[record.reviewState]}
                      </span>
                      <span className="text-slate-500">{record.service}</span>
                      <span className="text-slate-400">{record.changedAt}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{record.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{record.summary}</p>
                  </div>

                  <button
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      isFlagged
                        ? "bg-rose-500 text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => onToggleFlag(record.id)}
                    type="button"
                  >
                    {isFlagged ? "Remove flag" : "Flag for review"}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-teal-950">{category?.label ?? "Unsorted"}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">{record.diffLabel}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">Actor: {record.actor}</span>
                </div>

                <div className="mt-4"><ReviewerBadges reviewerIds={record.reviewerIds} reviewersById={reviewersById} /></div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.6rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">No ledger matches</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-950">No change records fit the active filters.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">Switch back to all categories or another review state to repopulate the isolated mock ledger.</p>
          {hasFilters ? (
            <button className="mt-5 rounded-full bg-slate-950 px-5 py-2 text-sm font-medium text-slate-50" onClick={onResetFilters} type="button">
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
