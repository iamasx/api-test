import type {
  CategoryTag,
  ChangeRecord,
  ReviewFlag,
  Reviewer,
} from "@/app/audit-trail/mock-data";

import { ReviewerBadges } from "./reviewer-badges";

const toneStyles = {
  amber: "border-amber-200 bg-amber-50/90 text-amber-950",
  rose: "border-rose-200 bg-rose-50/90 text-rose-950",
  sky: "border-sky-200 bg-sky-50/90 text-sky-950",
  emerald: "border-emerald-200 bg-emerald-50/90 text-emerald-950",
} as const;

type ReviewFlagPanelProps = {
  flagDefinitions: ReviewFlag[];
  flaggedRecords: ChangeRecord[];
  totalFlaggedCount: number;
  hiddenFlagCount: number;
  reviewersById: Record<string, Reviewer>;
  categoriesById: Record<string, CategoryTag>;
  onToggleFlag: (recordId: string) => void;
};

export function ReviewFlagPanel({
  flagDefinitions,
  flaggedRecords,
  totalFlaggedCount,
  hiddenFlagCount,
  reviewersById,
  categoriesById,
  onToggleFlag,
}: ReviewFlagPanelProps) {
  const flagById = Object.fromEntries(flagDefinitions.map((flag) => [flag.id, flag])) as Record<string, ReviewFlag>;

  return (
    <section className="rounded-[2rem] border border-slate-200/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(248,245,240,0.94))] p-5 shadow-xl shadow-slate-200/50 lg:sticky lg:top-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Review flags</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Stage local review follow-ups without leaving the route.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">These cues are mock-only and session-local. Use them to build a small review stack while you sort the ledger.</p>
      </div>

      <div className="mt-5 grid gap-3">
        {flagDefinitions.map((flag) => (
          <div className={`rounded-[1.4rem] border px-4 py-3 ${toneStyles[flag.tone]}`} key={flag.id}>
            <p className="text-sm font-semibold">{flag.label}</p>
            <p className="mt-1 text-sm opacity-80">{flag.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-slate-200/80 pt-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Flagged items</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">Session queue ({totalFlaggedCount})</h3>
          </div>
        </div>

        {flaggedRecords.length > 0 ? (
          <div className="mt-4 space-y-4">
            {flaggedRecords.map((record) => (
              <article
                className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4"
                key={record.id}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {record.service}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-slate-950">{record.title}</h4>
                  </div>
                  <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700" onClick={() => onToggleFlag(record.id)} type="button">
                    Remove
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {categoriesById[record.categoryId]?.label ?? "Unsorted"}
                  </span>
                  {record.suggestedFlagIds.map((flagId) => {
                    const flag = flagById[flagId];
                    if (!flag) return null;

                    return (
                      <span className={`rounded-full px-3 py-1 ${toneStyles[flag.tone]}`} key={flag.id}>
                        {flag.label}
                      </span>
                    );
                  })}
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">{record.summary}</p>

                <div className="mt-4"><ReviewerBadges reviewerIds={record.reviewerIds} reviewersById={reviewersById} /></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-[1.5rem] border border-dashed border-slate-300 bg-white/70 px-6 py-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Nothing visible</p>
            <h4 className="mt-3 text-xl font-semibold text-slate-950">
              {hiddenFlagCount > 0
                ? "Local flags exist, but the active filters hide them."
                : "No items are flagged for local review yet."}
            </h4>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {hiddenFlagCount > 0
                ? `Clear or change the ledger filters to reopen ${hiddenFlagCount} hidden flagged item${hiddenFlagCount === 1 ? "" : "s"}.`
                : "Use a ledger toggle to stage a review follow-up and this queue will populate here."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
