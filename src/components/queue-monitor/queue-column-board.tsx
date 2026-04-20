import type {
  AgeFilter,
  EscalationLevelId,
  ForecastWindow,
  InsightMode,
  PriorityFilter,
  QueueScope,
  QueueTone,
  ViewMode,
} from "./queue-monitor-data";
import type { ItemDisplay, QueueDisplay } from "./queue-monitor-selectors";

import { QueueForecastStrip } from "./queue-forecast-strip";

type QueueColumnBoardProps = {
  ageFilter: AgeFilter;
  columns: { items: ItemDisplay[]; queue: QueueDisplay }[];
  escalationState: Record<string, { level: EscalationLevelId }>;
  forecastWindow: ForecastWindow;
  insightMode: InsightMode;
  onSelectItem: (queueId: string, itemId: string) => void;
  onSelectQueue: (queueId: string) => void;
  priorityFilter: PriorityFilter;
  queueEscalations: Record<string, number>;
  queueScope: QueueScope;
  queueTotals: Record<string, number>;
  selectedItemId: string | null;
  selectedQueueId: string | null;
  viewMode: ViewMode;
};

const queueToneClasses: Record<QueueTone, string> = {
  stable: "border-emerald-300/20 bg-emerald-300/10 text-emerald-50",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-50",
  critical: "border-rose-300/20 bg-rose-300/10 text-rose-50",
};

const severityClasses = {
  low: "bg-slate-200/15 text-slate-100",
  medium: "bg-amber-200/15 text-amber-100",
  high: "bg-rose-200/15 text-rose-100",
};

const priorityBandClasses = {
  monitor: "border border-slate-300/20 bg-slate-300/10 text-slate-100",
  expedite: "border border-amber-300/20 bg-amber-300/10 text-amber-100",
  critical: "border border-rose-300/20 bg-rose-300/10 text-rose-100",
};

const driverToneClasses = {
  calm: "border-slate-300/20 bg-slate-300/10 text-slate-100",
  watch: "border-amber-300/20 bg-amber-300/10 text-amber-100",
  hot: "border-rose-300/20 bg-rose-300/10 text-rose-100",
};

const filterCopy = {
  all: "all backlog anchors",
  aging: "aging or breach anchors",
  breach: "breach anchors",
};

const priorityCopy = {
  all: "all priorities",
  expedite: "expedite or critical work",
  critical: "critical work",
};

const scopeCopy = {
  all: "all queues",
  watch: "attention queues",
  stable: "stable queues",
};

function formatEscalation(level: EscalationLevelId) {
  if (level === "lead") {
    return "Lead escalated";
  }

  if (level === "director") {
    return "Director paged";
  }

  return "Local watch";
}

function formatPriorityMovement(delta: number) {
  if (delta > 0) {
    return `Priority moves up ${delta} spot${delta === 1 ? "" : "s"}.`;
  }

  if (delta < 0) {
    return `Priority drops ${Math.abs(delta)} spot${Math.abs(delta) === 1 ? "" : "s"}.`;
  }

  return "Priority rank is unchanged.";
}

export function QueueColumnBoard({
  ageFilter,
  columns,
  escalationState,
  forecastWindow,
  insightMode,
  onSelectItem,
  onSelectQueue,
  priorityFilter,
  queueEscalations,
  queueScope,
  queueTotals,
  selectedItemId,
  selectedQueueId,
  viewMode,
}: QueueColumnBoardProps) {
  const visibleItemTotal = columns.reduce((sum, column) => sum + column.items.length, 0);

  if (visibleItemTotal === 0) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/55 p-8 text-center text-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          No items in view
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          The current filter mix leaves {scopeCopy[queueScope]} with no{" "}
          {filterCopy[ageFilter]} in {priorityCopy[priorityFilter]}.
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Switch the queue scope, age filter, or priority filter to reopen the
          board and inspect projected queue pressure.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {columns.map(({ items, queue }) => {
        const isSelectedQueue = queue.id === selectedQueueId;
        const throughputDelta = queue.displayClearedPerHour - queue.displayIntakePerHour;

        return (
          <article
            className={`rounded-[1.9rem] border p-4 shadow-[0_20px_70px_rgba(15,23,42,0.32)] ${
              isSelectedQueue
                ? "border-orange-200/45 bg-slate-900/95"
                : "border-white/10 bg-slate-950/72"
            }`}
            key={queue.id}
          >
            <button className="w-full text-left" onClick={() => onSelectQueue(queue.id)} type="button">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] ${queueToneClasses[queue.displayTone]}`}
                >
                  {queue.displayStatusLabel}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {queue.slaWindow}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                  {viewMode === "live" ? "Live" : forecastWindow.label}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{queue.label}</h2>
              <p className="mt-1 text-sm text-slate-300">
                {queue.region} · {queue.owner}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-200">{queue.displaySummary}</p>
              {insightMode === "operations" ? (
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-slate-200">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Queue load
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {queueTotals[queue.id]}
                    </p>
                    <p className="text-xs text-slate-400">
                      {queue.displayBreachCount} breach risk
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Throughput
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {queue.displayClearedPerHour}/{queue.displayIntakePerHour}
                    </p>
                    <p
                      className={`text-xs ${
                        throughputDelta >= 0 ? "text-emerald-200" : "text-rose-200"
                      }`}
                    >
                      {throughputDelta >= 0 ? `+${throughputDelta}` : throughputDelta} vs
                      intake
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                      Carryover
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {queue.displayCarryover}
                    </p>
                    <p className="text-xs text-slate-400">
                      {queue.displayWaitMinutes} min wait
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-200">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        Priority rank
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        #{queue.displayPriorityRank}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatPriorityMovement(queue.displayPriorityDelta)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                        Rationale
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-white">
                        {queue.displayBreachCount}
                      </p>
                      <p className="text-xs text-slate-400">
                        breach drivers in view
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {queue.priorityDrivers.slice(0, 2).map((driver) => (
                      <div
                        className={`rounded-[1.2rem] border p-3 text-left ${driverToneClasses[driver.tone]}`}
                        key={driver.id}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-white">
                            {driver.label}
                          </p>
                          <span className="text-[11px] uppercase tracking-[0.18em] opacity-80">
                            {driver.impact}
                          </span>
                        </div>
                        <p className="mt-2 text-sm opacity-85">{driver.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4">
                <QueueForecastStrip
                  activeWindow={forecastWindow.id}
                  points={queue.forecast}
                  variant="compact"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>{queue.displayOldestMinutes} min oldest</span>
                <span>{queueEscalations[queue.id]} local escalations</span>
              </div>
            </button>
            <div className="mt-4 space-y-3">
              {items.length > 0 ? (
                items.map((item) => {
                  const isSelectedItem = item.id === selectedItemId;
                  const localLevel = escalationState[item.id].level;

                  return (
                    <button
                      className={`block w-full rounded-[1.4rem] border p-4 text-left transition ${
                        isSelectedItem
                          ? "border-orange-200/45 bg-orange-200/10"
                          : "border-white/10 bg-white/5 hover:bg-white/8"
                      }`}
                      key={item.id}
                      onClick={() => onSelectItem(queue.id, item.id)}
                      type="button"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${severityClasses[item.severity]}`}
                        >
                          {item.severity}
                        </span>
                        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                          {viewMode === "live"
                            ? `${item.displayAgeMinutes} min`
                            : `${forecastWindow.shortLabel} ${item.displayAgeMinutes} min`}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] ${priorityBandClasses[item.displayPriorityBand]}`}
                        >
                          {item.displayPriorityBand}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">{item.customer}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        {insightMode === "operations"
                          ? item.displayRiskLabel
                          : item.displayPriorityReason}
                      </p>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400">
                        <span>{item.caseRef}</span>
                        <span>{formatEscalation(localLevel)}</span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-5 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Filtered clear
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    No {filterCopy[ageFilter]} in {priorityCopy[priorityFilter]} are
                    parked in this queue right now.
                  </p>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}
