import type { QuickAction } from "./control-room-data";

const actionToneStyles = {
  teal: "border-cyan-300/20 bg-cyan-300/8 hover:bg-cyan-300/12",
  amber: "border-amber-300/20 bg-amber-300/8 hover:bg-amber-300/12",
  rose: "border-rose-300/20 bg-rose-300/8 hover:bg-rose-300/12",
  sky: "border-sky-300/20 bg-sky-300/8 hover:bg-sky-300/12",
  slate: "border-white/12 bg-white/5 hover:bg-white/8",
};

type QuickActionsProps = {
  actions: QuickAction[];
  activeActionId: string | null;
  message: string;
  onAction: (actionId: string) => void;
};

export function QuickActions({
  actions,
  activeActionId,
  message,
  onAction,
}: Readonly<QuickActionsProps>) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 shadow-[0_22px_80px_rgba(2,6,23,0.34)] backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
        Quick Actions
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Dry-run controls</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        These buttons do not call external systems. They only update this isolated mock control
        surface.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const isActive = action.id === activeActionId;

          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onAction(action.id)}
              aria-pressed={isActive}
              className={`rounded-2xl border p-4 text-left transition ${actionToneStyles[action.tone]} ${
                isActive ? "ring-1 ring-cyan-200/45" : ""
              }`}
            >
              <span className="block text-base font-semibold text-white">{action.label}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-300">
                {action.description}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="status"
        aria-live="polite"
        className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 px-4 py-3 text-sm leading-6 text-cyan-50"
      >
        {message}
      </div>
    </section>
  );
}
