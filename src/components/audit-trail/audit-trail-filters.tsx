type AuditTrailFiltersProps = {
  visibleCount: number;
  totalCount: number;
  selectedCategory: string;
  selectedReviewState: string;
  categoryCounts: Record<string, number>;
  reviewCounts: Record<string, number>;
  onCategoryChange: (value: string) => void;
  onReviewStateChange: (value: string) => void;
  categories: ReadonlyArray<{ id: string; label: string }>;
  reviewTabs: ReadonlyArray<{ id: string; label: string }>;
};

export function AuditTrailFilters({
  visibleCount,
  totalCount,
  selectedCategory,
  selectedReviewState,
  categoryCounts,
  reviewCounts,
  onCategoryChange,
  onReviewStateChange,
  categories,
  reviewTabs,
}: AuditTrailFiltersProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/70 bg-white/85 p-5 shadow-lg shadow-slate-200/50 backdrop-blur">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Review filters</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Narrow the ledger by category or review state.</h2>
          </div>
          <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-950">{visibleCount}</span> of {totalCount} records</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-slate-950 text-slate-50"
                  : "border border-slate-200 bg-slate-50 text-slate-700"
              }`}
              onClick={() => onCategoryChange("all")}
              type="button"
            >
              All categories ({totalCount})
            </button>
            {categories.map((category) => (
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? "bg-teal-700 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                type="button"
              >
                {category.label} ({categoryCounts[category.id] ?? 0})
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {reviewTabs.map((tab) => (
              <button
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedReviewState === tab.id ? "bg-amber-500 text-slate-950" : "border border-slate-200 bg-white text-slate-700"}`}
                key={tab.id}
                onClick={() => onReviewStateChange(tab.id)}
                type="button"
              >
                {tab.label} ({reviewCounts[tab.id] ?? 0})
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
