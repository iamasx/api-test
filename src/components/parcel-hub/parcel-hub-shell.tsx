"use client";

import { startTransition, useState } from "react";

import { ExceptionDrawer, type DrawerScope } from "./exception-drawer";
import { LaneBoard } from "./lane-board";
import { LaneFilterBar, type LaneFilter } from "./lane-filter-bar";
import {
  exceptionTypes,
  parcelHubSyncLabel,
} from "./parcel-hub-data";
import { ParcelHubHeader } from "./parcel-hub-header";
import { ParcelSummaryPanel } from "./parcel-summary-panel";
import { buildParcelHubProjection, type ProjectedLane } from "./parcel-hub-simulator";
import { RouteBalanceSimulator } from "./route-balance-simulator";

function matchesLaneFilter(lane: ProjectedLane, filter: LaneFilter) {
  if (filter === "watch") {
    return lane.projectedTone !== "steady";
  }

  if (filter === "steady") {
    return lane.projectedTone === "steady";
  }

  return true;
}

export function ParcelHubShell() {
  const [laneFilter, setLaneFilter] = useState<LaneFilter>("all");
  const [selectedLaneId, setSelectedLaneId] = useState<string | null>(null);
  const [drawerScope, setDrawerScope] = useState<DrawerScope>("open");
  const [resolvedIds, setResolvedIds] = useState<Record<string, boolean>>({});
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const projection = buildParcelHubProjection(activeScenarioId, resolvedIds);
  const filteredLanes = projection.lanes.filter((lane) =>
    matchesLaneFilter(lane, laneFilter),
  );
  const selectedLane =
    projection.lanes.find((lane) => lane.id === selectedLaneId) ?? null;
  const selectedLaneExceptions = selectedLane?.projectedExceptions ?? [];
  const activeScenario = projection.activeScenario;

  const handleLaneFilterChange = (filter: LaneFilter) => {
    startTransition(() => {
      setLaneFilter(filter);

      if (selectedLane && !matchesLaneFilter(selectedLane, filter)) {
        setSelectedLaneId(null);
      }
    });
  };

  const handleInspectLane = (laneId: string) => {
    startTransition(() => {
      setSelectedLaneId(laneId);
      setDrawerScope("open");
    });
  };

  const handleScenarioChange = (scenarioId: string | null) => {
    startTransition(() => {
      setActiveScenarioId(scenarioId);

      const nextProjection = buildParcelHubProjection(scenarioId, resolvedIds);
      const nextSelectedLane =
        nextProjection.lanes.find((lane) => lane.id === selectedLaneId) ?? null;

      if (nextSelectedLane && !matchesLaneFilter(nextSelectedLane, laneFilter)) {
        setSelectedLaneId(null);
      }
    });
  };

  const handleToggleResolved = (exceptionId: string) => {
    startTransition(() => {
      setResolvedIds((current) => ({ ...current, [exceptionId]: !current[exceptionId] }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.15),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_58%,#111827_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ParcelHubHeader
          activeScenarioLabel={activeScenario?.label ?? null}
          delayedParcels={projection.summary.projectedDelayedParcels}
          delayedParcelsDelta={projection.summary.delayedParcelsDelta}
          openExceptions={projection.summary.projectedOpenExceptions}
          openExceptionsDelta={projection.summary.openExceptionsDelta}
          resolvedExceptions={projection.summary.projectedResolvedExceptions}
          resolvedInPreview={projection.summary.resolvedInPreview}
          slaRiskParcels={projection.summary.projectedSlaRiskParcels}
          slaRiskDelta={projection.summary.slaRiskParcelsDelta}
          syncLabel={parcelHubSyncLabel}
          totalLanes={projection.laneCounts.all}
          watchLanes={projection.summary.projectedWatchLanes}
          watchLanesDelta={projection.summary.watchLanesDelta}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.95fr)]">
          <section className="space-y-5">
            <RouteBalanceSimulator
              activeScenario={activeScenario}
              activeScenarioId={activeScenarioId}
              onSelectScenario={handleScenarioChange}
              scenarioCards={projection.scenarioCards}
            />
            <LaneFilterBar
              activeFilter={laneFilter}
              counts={projection.laneCounts}
              onChange={handleLaneFilterChange}
            />
            <LaneBoard
              activeScenarioLabel={activeScenario?.label ?? null}
              lanes={filteredLanes}
              onInspectLane={handleInspectLane}
              selectedLaneId={selectedLaneId}
            />
          </section>
          <div className="space-y-6">
            <ParcelSummaryPanel
              activeScenarioLabel={activeScenario?.label ?? null}
              exceptionTypes={exceptionTypes}
              packageSummaries={projection.packageSummaries}
              summary={projection.summary}
            />
            <ExceptionDrawer
              activeScenarioLabel={activeScenario?.label ?? null}
              exceptions={selectedLaneExceptions}
              onClearSelection={() => setSelectedLaneId(null)}
              onScopeChange={(scope) => setDrawerScope(scope)}
              onToggleResolved={handleToggleResolved}
              scope={drawerScope}
              selectedLane={selectedLane}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
