import type {
  EscalationLevel,
  EscalationLevelId,
  ForecastWindow,
  InsightMode,
  ViewMode,
} from "./queue-monitor-data";
import type { ItemDisplay, QueueDisplay } from "./queue-monitor-selectors";

import { QueueForecastStrip } from "./queue-forecast-strip";

type LocalEscalationState = {
  addToDigest: boolean;
  holdRelease: boolean;
  level: EscalationLevelId;
  notifyFloor: boolean;
  reviewed: boolean;
};

type QueueDetailPanelProps = {
  escalationLevels: EscalationLevel[];
  forecastWindow: ForecastWindow;
  insightMode: InsightMode;
  itemState: LocalEscalationState | null;
  onEscalationLevelChange: (level: EscalationLevelId) => void;
  onToggle: (key: keyof Omit<LocalEscalationState, "level">) => void;
  queueEscalations: number;
  queueItemsVisible: number;
  selectedItem: ItemDisplay | null;
  selectedQueue: QueueDisplay | null;
  viewMode: ViewMode;
};

const levelToneClasses = {
  calm: "border-slate-300/20 bg-slate-300/10 text-slate-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  hot: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const driverToneClasses = {
  calm: "border-slate-300/20 bg-slate-300/10 text-slate-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  hot: "border-rose-300/20 bg-rose-300/10 text-rose-100",
};

const priorityBandClasses = {
  monitor: "border border-slate-300/20 bg-slate-300/10 text-slate-100",
  expedite: "border border-amber-300/20 bg-amber-300/10 text-amber-100",
  critical: "border border-rose-300/20 bg-rose-300/10 text-rose-100",
};

const toggleLabels: {
  hint: string;
  key: keyof Omit<LocalEscalationState, "level">;
  label: string;
}[] = [
  {
    key: "holdRelease",
    label: "Hold release",
    hint: "Keep this item parked in the queue preview.",
  },
  {
    key: "notifyFloor",
    label: "Notify floor",
    hint: "Bring operations into the next sweep.",
  },
  {
    key: "addToDigest",
    label: "Digest flag",
    hint: "Include the item in the manager digest.",
  },
  {
    key: "reviewed",
    label: "Reviewed",
    hint: "Mark the local preview as checked.",
  },
];

function formatPriorityMovement(delta: number) {
  if (delta > 0) {
    return `Priority moves up ${delta} spot${delta === 1 ? "" : "s"} by handoff.`;
  }

  if (delta < 0) {
    return `Priority drops ${Math.abs(delta)} spot${Math.abs(delta) === 1 ? "" : "s"} by handoff.`;
  }

  return "Priority rank holds steady across the forecast horizon.";
}

export function QueueDetailPanel({
  escalationLevels,
  forecastWindow,
  insightMode,
  itemState,
  onEscalationLevelChange,
  onToggle,
  queueEscalations,
  queueItemsVisible,
  selectedItem,
  selectedQueue,
  viewMode,
}: QueueDetailPanelProps) {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(28,25,23,0.94))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.42)] sm:p-6">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            {viewMode === "live" ? "Live board" : `${forecastWindow.label} forecast`}
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
            {insightMode === "operations"
              ? "Operations detail"
              : "Priority explanation mode"}
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Queue preview
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          {selectedQueue ? selectedQueue.label : "Choose a queue"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          {selectedQueue
            ? `${selectedQueue.region} is owned by ${selectedQueue.owner}. ${queueItemsVisible} filtered items are visible with ${queueEscalations} local escalations applied.`
            : "Pick a queue column to inspect backlog details and adjust local escalation controls."}
        </p>
        {selectedQueue ? (
          <div className="mt-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Queue load
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {selectedQueue.displayBacklogCount}
                </p>
                <p className="text-xs text-slate-400">
                  {selectedQueue.displayBreachCount} breach risk
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Priority rank
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  #{selectedQueue.displayPriorityRank}
                </p>
                <p className="text-xs text-slate-400">
                  {formatPriorityMovement(selectedQueue.displayPriorityDelta)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Wait pressure
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {selectedQueue.displayWaitMinutes} min
                </p>
                <p className="text-xs text-slate-400">
                  {selectedQueue.displayCarryover} carryover anchors
                </p>
              </div>
            </div>
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Short-term trend
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {selectedQueue.displaySummary}
              </p>
              <div className="mt-4">
                <QueueForecastStrip
                  activeWindow={forecastWindow.id}
                  points={selectedQueue.forecast}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {selectedQueue ? (
        <section className="mt-5 rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Priority explanation
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Why this queue is moving
              </h3>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
              #{selectedQueue.displayPriorityRank}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            {selectedQueue.rationale}
          </p>
          {insightMode === "priority" ? (
            <p className="mt-3 rounded-[1.15rem] border border-orange-300/20 bg-orange-300/10 px-4 py-3 text-sm leading-6 text-orange-50">
              Priority explanation mode is active. Board cards and this detail
              panel are keyed to the rationale signals first, with operational
              metrics still available underneath.
            </p>
          ) : null}
          <div className="mt-4 space-y-3">
            {selectedQueue.priorityDrivers.map((driver) => (
              <div
                className={`rounded-[1.25rem] border p-4 ${driverToneClasses[driver.tone]}`}
                key={driver.id}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-white">{driver.label}</p>
                  <span className="text-xs uppercase tracking-[0.2em] opacity-80">
                    {driver.impact}
                  </span>
                </div>
                <p className="mt-2 text-sm opacity-90">{driver.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Pressure signals
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
              {selectedQueue.pressureSignals.map((signal) => (
                <li key={signal}>• {signal}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {selectedItem && itemState ? (
        <div className="mt-5 space-y-5">
          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                {selectedItem.caseRef}
              </span>
              <span className="rounded-full border border-orange-300/20 bg-orange-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-100">
                {selectedItem.displayAgeMinutes} min open
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${priorityBandClasses[selectedItem.displayPriorityBand]}`}
              >
                {selectedItem.displayPriorityBand}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">
              {selectedItem.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {selectedItem.customer} · {selectedItem.segment}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {selectedItem.detail}
            </p>
            <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {insightMode === "operations"
                  ? "Next action"
                  : "Why this item rises in priority"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                {insightMode === "operations"
                  ? selectedItem.displayNextAction
                  : selectedItem.displayPriorityReason}
              </p>
              <p className="mt-3 text-sm text-slate-400">
                {viewMode === "live"
                  ? `Risk signal: ${selectedItem.displayRiskLabel}`
                  : `${selectedItem.displayEtaLabel} Risk signal: ${selectedItem.displayRiskLabel}`}
              </p>
            </div>
            <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                Rationale points
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
                {selectedItem.explanationPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">Owner: {selectedItem.owner}</p>
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Escalation level
            </p>
            <div className="mt-4 space-y-3">
              {escalationLevels.map((level) => (
                <button
                  className={`flex w-full items-start justify-between gap-4 rounded-[1.3rem] border p-4 text-left transition ${
                    itemState.level === level.id
                      ? "border-orange-200/40 bg-orange-200/10"
                      : `${levelToneClasses[level.tone]} hover:bg-white/10`
                  }`}
                  key={level.id}
                  onClick={() => onEscalationLevelChange(level.id)}
                  type="button"
                >
                  <div>
                    <p className="font-medium text-white">{level.label}</p>
                    <p className="mt-1 text-sm text-slate-300">{level.note}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    {itemState.level === level.id ? "Selected" : "Available"}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Local controls
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {toggleLabels.map((toggle) => (
                <button
                  className={`rounded-[1.2rem] border p-4 text-left transition ${
                    itemState[toggle.key]
                      ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-50"
                      : "border-white/10 bg-slate-950/45 text-slate-200 hover:bg-white/10"
                  }`}
                  key={toggle.key}
                  onClick={() => onToggle(toggle.key)}
                  type="button"
                >
                  <p className="font-medium">{toggle.label}</p>
                  <p className="mt-1 text-sm opacity-80">{toggle.hint}</p>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">
              These toggles only update this route-local preview state. They do
              not affect any shared queue or page outside `/queue-monitor`.
            </p>
          </section>
        </div>
      ) : (
        <div className="mt-5 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.03] p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
            Nothing selected
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">
            {selectedQueue
              ? "This queue has no items in the current filter view."
              : "Select a queue column to inspect the backlog."}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {selectedQueue
              ? "Change the forecast horizon, age filter, or priority filter to reopen the detail preview."
              : "The detail panel will show queue rationale, item context, and escalation controls once a backlog card is selected."}
          </p>
        </div>
      )}
    </aside>
  );
}
