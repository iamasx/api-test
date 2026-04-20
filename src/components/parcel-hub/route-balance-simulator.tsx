import {
  shipmentLanes,
  type BalancingScenario,
} from "./parcel-hub-data";
import type { ScenarioCard } from "./parcel-hub-simulator";

type RouteBalanceSimulatorProps = {
  activeScenario: BalancingScenario | null;
  activeScenarioId: string | null;
  scenarioCards: ScenarioCard[];
  onSelectScenario: (scenarioId: string | null) => void;
};

function formatSigned(value: number) {
  if (value === 0) {
    return "0";
  }

  return `${value > 0 ? "+" : ""}${value}`;
}

function formatDeltaLabel(
  value: number,
  improvedSuffix: string,
  worsenedSuffix: string,
) {
  if (value === 0) {
    return "No change from current";
  }

  return `${formatSigned(value)} ${value < 0 ? improvedSuffix : worsenedSuffix}`;
}

export function RouteBalanceSimulator({
  activeScenario,
  activeScenarioId,
  scenarioCards,
  onSelectScenario,
}: RouteBalanceSimulatorProps) {
  const laneCodeById = new Map(
    shipmentLanes.map((lane) => [lane.id, lane.laneCode]),
  );
  const activeCard =
    scenarioCards.find((scenario) => scenario.scenarioId === activeScenarioId) ??
    scenarioCards[0];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(15,23,42,0.72))] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.38)] sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            Route-balancing simulator
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Compare reassignment paths before dispatch changes go live.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Each card previews lane pressure, open exception drift, and SLA risk
            tradeoffs against the current route. Selecting a scenario updates the
            board, summary, and exception drawer without applying a live change.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-4 text-amber-50 lg:max-w-sm">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-100/80">
            Active preview
          </p>
          <p className="mt-2 text-lg font-semibold">
            {activeScenario ? activeScenario.label : "Current dispatch"}
          </p>
          <p className="mt-2 text-sm text-amber-100/85">
            {activeScenario
              ? activeScenario.comparisonNote
              : "Use the simulator cards to preview reassignment outcomes before operators touch live dispatch."}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {scenarioCards.map((scenario) => {
          const isActive = scenario.scenarioId === activeScenarioId;

          return (
            <button
              aria-pressed={isActive}
              className={`rounded-[1.75rem] border p-5 text-left transition ${
                isActive
                  ? "border-amber-300/50 bg-amber-300/10 shadow-[0_18px_60px_rgba(251,191,36,0.14)]"
                  : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
              }`}
              key={scenario.scenarioId ?? "baseline"}
              onClick={() => onSelectScenario(scenario.scenarioId)}
              type="button"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-200">
                    {scenario.postureLabel}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {scenario.label}
                  </h3>
                </div>
                {scenario.scenarioId ? (
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-100">
                    {scenario.resolvedInPreview} clears
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                {scenario.summary}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Projected SLA risk
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {scenario.projectedSlaRiskParcels}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatDeltaLabel(
                      scenario.slaRiskDelta,
                      "lower than current",
                      "higher than current",
                    )}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Open exceptions
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {scenario.projectedOpenExceptions}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatDeltaLabel(
                      scenario.openExceptionsDelta,
                      "fewer than current",
                      "more than current",
                    )}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Peak lane pressure
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {scenario.projectedPeakPressure}%
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatDeltaLabel(
                      scenario.peakPressureDelta,
                      "below current peak",
                      "above current peak",
                    )}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/55 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Delayed parcels
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {scenario.projectedDelayedParcels}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {formatDeltaLabel(
                      scenario.delayedParcelsDelta,
                      "fewer than current",
                      "more than current",
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                <span>{scenario.moves.length} route moves</span>
                <span className="text-slate-600">/</span>
                <span>{scenario.introducedRiskCount} new preview risks</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Reassignment preview
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {activeCard.label}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {activeCard.comparisonNote}
            </p>
          </div>
          <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Operator
              </p>
              <p className="mt-1 text-white">{activeCard.operator}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Dispatch hold
              </p>
              <p className="mt-1 text-white">{activeCard.dispatchWindow}</p>
            </div>
          </div>
        </div>

        {activeCard.moves.length > 0 ? (
          <div className="mt-5 grid gap-3 xl:grid-cols-2">
            {activeCard.moves.map((move) => (
              <article
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
                key={move.id}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {move.label}
                </p>
                <h4 className="mt-2 text-lg font-semibold text-white">
                  {move.parcelCount} parcels from{" "}
                  {laneCodeById.get(move.fromLaneId) ?? move.fromLaneId} to{" "}
                  {laneCodeById.get(move.toLaneId) ?? move.toLaneId}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {move.reason}
                </p>
                <p className="mt-3 text-sm text-emerald-200">{move.etaChange}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] p-5 text-center">
            <p className="text-sm font-medium text-white">
              The baseline card keeps the current route untouched.
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Pick any balancing scenario to preview which parcel groups move,
              where they land, and what tradeoffs operators inherit.
            </p>
          </div>
        )}

        <div className="mt-5 rounded-[1.5rem] border border-rose-300/15 bg-rose-300/10 p-4 text-sm leading-6 text-rose-50">
          <span className="font-semibold text-white">Tradeoff:</span>{" "}
          {activeCard.tradeoff}
        </div>
      </div>
    </section>
  );
}
