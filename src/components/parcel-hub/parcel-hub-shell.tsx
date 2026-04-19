"use client";

import { startTransition, useState } from "react";

import { ExceptionDrawer, type DrawerScope } from "./exception-drawer";
import { LaneBoard } from "./lane-board";
import { LaneFilterBar, type LaneFilter } from "./lane-filter-bar";
import {
  exceptionTypes,
  laneExceptions,
  packageSummaries,
  parcelHubSyncLabel,
  shipmentLanes,
  type ShipmentLane,
} from "./parcel-hub-data";
import { ParcelHubHeader } from "./parcel-hub-header";
import { ParcelSummaryPanel } from "./parcel-summary-panel";

function matchesLaneFilter(lane: ShipmentLane, filter: LaneFilter) {
  if (filter === "watch") {
    return lane.tone !== "steady";
  }

  if (filter === "steady") {
    return lane.tone === "steady";
  }

  return true;
}

export function ParcelHubShell() {
  const [laneFilter, setLaneFilter] = useState<LaneFilter>("all");
  const [selectedLaneId, setSelectedLaneId] = useState<string | null>(null);
  const [drawerScope, setDrawerScope] = useState<DrawerScope>("open");
  const [resolvedIds, setResolvedIds] = useState<Record<string, boolean>>({});

  const filteredLanes = shipmentLanes.filter((lane) => matchesLaneFilter(lane, laneFilter));
  const selectedLane = shipmentLanes.find((lane) => lane.id === selectedLaneId) ?? null;
  const selectedLaneExceptions = laneExceptions.filter((exception) => exception.laneId === selectedLaneId);
  const totalParcels = packageSummaries.reduce((sum, summary) => sum + summary.count, 0);
  const delayedParcels = shipmentLanes.reduce((sum, lane) => sum + lane.delayedParcels, 0);
  const openExceptions = laneExceptions.filter((exception) => !resolvedIds[exception.id]).length;
  const resolvedExceptions = laneExceptions.filter((exception) => resolvedIds[exception.id]).length;
  const laneCounts = {
    all: shipmentLanes.length,
    watch: shipmentLanes.filter((lane) => matchesLaneFilter(lane, "watch")).length,
    steady: shipmentLanes.filter((lane) => matchesLaneFilter(lane, "steady")).length,
  };

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

  const handleToggleResolved = (exceptionId: string) => {
    startTransition(() => {
      setResolvedIds((current) => ({ ...current, [exceptionId]: !current[exceptionId] }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.15),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_58%,#111827_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ParcelHubHeader
          delayedParcels={delayedParcels}
          openExceptions={openExceptions}
          resolvedExceptions={resolvedExceptions}
          syncLabel={parcelHubSyncLabel}
          totalLanes={shipmentLanes.length}
          watchLanes={laneCounts.watch}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(22rem,0.95fr)]">
          <section className="space-y-5">
            <LaneFilterBar activeFilter={laneFilter} counts={laneCounts} onChange={handleLaneFilterChange} />
            <LaneBoard lanes={filteredLanes} onInspectLane={handleInspectLane} resolvedIds={resolvedIds} selectedLaneId={selectedLaneId} />
          </section>
          <div className="space-y-6">
            <ParcelSummaryPanel exceptionTypes={exceptionTypes} openExceptions={openExceptions} packageSummaries={packageSummaries} totalParcels={totalParcels} />
            <ExceptionDrawer
              exceptions={selectedLaneExceptions}
              onClearSelection={() => setSelectedLaneId(null)}
              onScopeChange={(scope) => setDrawerScope(scope)}
              onToggleResolved={handleToggleResolved}
              resolvedIds={resolvedIds}
              scope={drawerScope}
              selectedLane={selectedLane}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
