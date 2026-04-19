type CategoryTab = {
  id: string;
  label: string;
  summary: string;
  count: number;
};

type CategoryTabsProps = {
  activeCategory: string;
  categories: CategoryTab[];
  onChange: (categoryId: string) => void;
};

export function CategoryTabs({ activeCategory, categories, onChange }: CategoryTabsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-3 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              aria-pressed={isActive}
              className={`min-w-[13rem] rounded-[1.35rem] border px-4 py-3 text-left transition ${
                isActive
                  ? "border-cyan-700 bg-cyan-950 text-white shadow-[0_16px_45px_-28px_rgba(8,145,178,0.9)]"
                  : "border-slate-200 bg-slate-50 text-slate-900 hover:border-cyan-200 hover:bg-cyan-50"
              }`}
              onClick={() => onChange(category.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{category.label}</span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${isActive ? "bg-white/15 text-white" : "bg-white text-slate-600"}`}>
                  {category.count}
                </span>
              </div>
              <p className={`mt-2 text-xs leading-5 ${isActive ? "text-cyan-50" : "text-slate-600"}`}>{category.summary}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
