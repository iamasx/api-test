type PlannerView = {
  id: string;
  label: string;
  summary: string;
  badge: string;
};

type PlannerTabsProps = {
  activeView: string;
  views: PlannerView[];
  onChange: (viewId: string) => void;
};

export function PlannerTabs({
  activeView,
  views,
  onChange,
}: PlannerTabsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-3 shadow-[0_20px_70px_-46px_rgba(15,23,42,0.4)]">
      <div className="grid gap-3 lg:grid-cols-3">
        {views.map((view) => {
          const isActive = view.id === activeView;

          return (
            <button
              key={view.id}
              aria-pressed={isActive}
              className={`rounded-[1.45rem] border px-4 py-4 text-left transition ${
                isActive
                  ? "border-cyan-700 bg-cyan-950 text-white shadow-[0_16px_45px_-28px_rgba(8,145,178,0.9)]"
                  : "border-slate-200 bg-slate-50 text-slate-900 hover:border-cyan-200 hover:bg-cyan-50"
              }`}
              onClick={() => onChange(view.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{view.label}</span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    isActive ? "bg-white/15 text-white" : "bg-white text-slate-600"
                  }`}
                >
                  {view.badge}
                </span>
              </div>
              <p
                className={`mt-2 text-sm leading-6 ${
                  isActive ? "text-cyan-50" : "text-slate-600"
                }`}
              >
                {view.summary}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
