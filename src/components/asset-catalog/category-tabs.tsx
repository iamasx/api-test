import type { AssetCategoryOption } from "@/data/asset-catalog";

type CategoryTabsProps = {
  options: AssetCategoryOption[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
};

export function CategoryTabs({
  options,
  activeCategoryId,
  onSelect,
}: CategoryTabsProps) {
  return (
    <nav
      aria-label="Asset catalog categories"
      className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)]"
    >
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Category Tabs
          </p>
          <h2 className="text-xl font-semibold text-slate-950">
            Shift between asset groups
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          Each category keeps the catalog focused around a single operating
          lane while preserving the selected asset when possible.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {options.map((option) => {
          const isActive = option.id === activeCategoryId;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(option.id)}
              className={`rounded-[1.5rem] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15"
                  : "border-slate-200 bg-slate-50/80 text-slate-900 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{option.name}</div>
                  <div
                    className={`mt-1 text-xs leading-5 ${
                      isActive ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {option.description}
                  </div>
                </div>
                <span
                  className={`inline-flex min-w-10 justify-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isActive ? "bg-white/12 text-white" : "bg-slate-900 text-white"
                  }`}
                >
                  {option.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
