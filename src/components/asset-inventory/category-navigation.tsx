import type { InventoryCategoryOption } from "@/data/asset-inventory";

type CategoryNavigationProps = {
  options: InventoryCategoryOption[];
  activeCategoryId: string;
  onSelect: (categoryId: string) => void;
};

export function CategoryNavigation({
  options,
  activeCategoryId,
  onSelect,
}: CategoryNavigationProps) {
  return (
    <nav
      aria-label="Inventory categories"
      className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-4 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Category Navigation
          </p>
          <h2 className="text-xl font-semibold text-slate-950">
            Shift between catalog groups
          </h2>
        </div>
        <p className="max-w-2xl text-sm text-slate-600">
          Each filter preserves the current selection when possible and keeps
          the detail panel aligned with the visible catalog.
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
                    isActive
                      ? "bg-white/12 text-white"
                      : "bg-slate-900 text-white"
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
