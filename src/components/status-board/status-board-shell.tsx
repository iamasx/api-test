"use client";

import { startTransition, useState, useTransition } from "react";

import {
  buildStatusBoardSnapshot,
  type BoardTone,
  type StatusBoardSnapshot,
} from "@/app/status-board/mock-data";
import { DependencyTable } from "./dependency-table";
import { FailoverChecklist } from "./failover-checklist";
import { RegionalHealthGrid } from "./regional-health-grid";
import { StatusBoardHeader } from "./status-board-header";

type StatusBoardShellProps = { initialSnapshot: StatusBoardSnapshot };
type DependencyFilter = "all" | BoardTone;

const filterLabels: Record<DependencyFilter, string> = {
  all: "All dependencies",
  healthy: "Healthy",
  watch: "Watch",
  degraded: "Degraded",
  failover: "Failover",
};
const summaryToneClasses: Record<BoardTone, string> = {
  healthy: "border-emerald-200 bg-emerald-500/8",
  watch: "border-amber-200 bg-amber-400/10",
  degraded: "border-rose-200 bg-rose-500/10",
  failover: "border-cyan-200 bg-cyan-500/10",
};
const toggleId = (items: string[], id: string) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
const defaultChecklistIds = (snapshot: StatusBoardSnapshot) =>
  snapshot.checklist.filter((item) => item.defaultDone).map((item) => item.id);

export function StatusBoardShell({ initialSnapshot }: StatusBoardShellProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [cycle, setCycle] = useState(0);
  const [selectedRegionIds, setSelectedRegionIds] = useState(initialSnapshot.regions.map((region) => region.id));
  const [selectedFilter, setSelectedFilter] = useState<DependencyFilter>("all");
  const [completedChecklistIds, setCompletedChecklistIds] = useState(defaultChecklistIds(initialSnapshot));
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const scopedDependencies = snapshot.dependencies.filter((dependency) => dependency.regionIds.some((regionId) => selectedRegionIds.includes(regionId)));
  const visibleDependencies = scopedDependencies.filter((dependency) => selectedFilter === "all" || dependency.status === selectedFilter);
  const visibleChecklistItems = showOpenOnly ? snapshot.checklist.filter((item) => !completedChecklistIds.includes(item.id)) : snapshot.checklist;
  const filterOptions = (Object.keys(filterLabels) as DependencyFilter[]).map((id) => ({
    id,
    label: filterLabels[id],
    count: id === "all" ? scopedDependencies.length : scopedDependencies.filter((item) => item.status === id).length,
  }));

  function refreshSnapshot() {
    const nextCycle = cycle + 1;
    startRefreshTransition(() => {
      setCycle(nextCycle);
      setSnapshot(buildStatusBoardSnapshot(nextCycle, new Date()));
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_40%,_#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <StatusBoardHeader boardState={snapshot.boardState} environment={snapshot.environment} isRefreshing={isRefreshing} lastUpdated={snapshot.lastUpdated} onRefresh={refreshSnapshot} selectedRegionCount={selectedRegionIds.length} summaryCount={snapshot.summaryCards.length} />
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {snapshot.summaryCards.map((card) => (
            <article className={`rounded-[24px] border p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur ${summaryToneClasses[card.tone]}`} key={card.id}>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{card.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.note}</p>
            </article>
          ))}
        </section>
        <RegionalHealthGrid
          onClearAll={() => startTransition(() => setSelectedRegionIds([]))}
          onSelectAll={() => startTransition(() => setSelectedRegionIds(snapshot.regions.map((region) => region.id)))}
          onToggleRegion={(regionId) => startTransition(() => setSelectedRegionIds((current) => toggleId(current, regionId)))}
          regions={snapshot.regions}
          selectedRegionIds={selectedRegionIds}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.9fr)]">
          <DependencyTable dependencies={visibleDependencies} filterOptions={filterOptions} onFilterChange={(filterId) => startTransition(() => setSelectedFilter(filterId as DependencyFilter))} selectedFilter={selectedFilter} selectedRegionCount={selectedRegionIds.length} />
          <FailoverChecklist
            completedCount={completedChecklistIds.length}
            items={visibleChecklistItems}
            onReset={() => startTransition(() => { setCompletedChecklistIds(defaultChecklistIds(snapshot)); setShowOpenOnly(false); })}
            onToggleItem={(itemId) => startTransition(() => setCompletedChecklistIds((current) => toggleId(current, itemId)))}
            onToggleOpenOnly={() => startTransition(() => setShowOpenOnly((current) => !current))}
            showOpenOnly={showOpenOnly}
            toggledIds={completedChecklistIds}
            totalCount={snapshot.checklist.length}
          />
        </div>
      </div>
    </main>
  );
}
