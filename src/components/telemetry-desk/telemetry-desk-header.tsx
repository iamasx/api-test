import { type SummaryCard, telemetryWindows, type TelemetryWindowId } from "./mock-data";

type TelemetryDeskHeaderProps = { deskState: string; focusLabel: string | null; handoff: string; isPending: boolean; selectedWindow: TelemetryWindowId; summary: SummaryCard[]; onSelectWindow: (windowId: TelemetryWindowId) => void };

export function TelemetryDeskHeader({
  deskState,
  focusLabel,
  handoff,
  isPending,
  selectedWindow,
  summary,
  onSelectWindow,
}: TelemetryDeskHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-white/10 bg-stone-950/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.28em] text-stone-300">
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-amber-100">{deskState}</span>
            <span className="rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-teal-100">{focusLabel ? `Focus ${focusLabel}` : "Focus cleared"}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-stone-200">{isPending ? "Retuning desk" : "Local mock telemetry"}</span>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">Telemetry Desk</h1>
          <p className="mt-4 text-sm leading-6 text-stone-300 sm:text-base">
            Feature-local telemetry route with selectable metric tiles, local trend comparisons, and alert summaries that never leave the client.
          </p>
          <p className="mt-3 text-sm text-stone-400">{handoff}</p>
        </div>

        <div className="space-y-3 lg:max-w-sm lg:text-right">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Reporting window</p>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {telemetryWindows.map((window) => {
              const isActive = window.id === selectedWindow;
              return (
                <button
                  className={`rounded-full border px-4 py-2 text-sm transition ${isActive ? "border-amber-200/60 bg-amber-200 text-stone-950" : "border-white/10 bg-white/5 text-stone-200 hover:border-teal-200/30 hover:text-teal-100"}`}
                  disabled={isPending}
                  key={window.id}
                  onClick={() => onSelectWindow(window.id)}
                  type="button"
                >
                  <span className="font-medium">{window.label}</span> {window.caption}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {summary.map((card) => (
          <article className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5" key={card.id}><p className="text-xs uppercase tracking-[0.22em] text-stone-400">{card.label}</p><p className="mt-3 font-mono text-3xl font-semibold text-stone-50">{card.value}</p><p className="mt-2 text-sm leading-6 text-stone-300">{card.detail}</p></article>
        ))}
      </div>
    </header>
  );
}
