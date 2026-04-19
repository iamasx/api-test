import type { Reviewer } from "@/app/audit-trail/mock-data";

type ReviewerBadgesProps = {
  reviewerIds: string[];
  reviewersById: Record<string, Reviewer>;
};

export function ReviewerBadges({
  reviewerIds,
  reviewersById,
}: ReviewerBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {reviewerIds.map((reviewerId) => {
        const reviewer = reviewersById[reviewerId];
        if (!reviewer) return null;

        return (
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs text-slate-700" key={reviewer.id}>
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-[11px] font-semibold text-slate-50">{reviewer.initials}</span>
            <span>{reviewer.name}</span>
          </span>
        );
      })}
    </div>
  );
}
