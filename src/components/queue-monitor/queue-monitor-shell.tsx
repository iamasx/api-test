"use client";

import { startTransition, useState } from "react";

import { QueueColumnBoard } from "./queue-column-board";
import { QueueDetailPanel } from "./queue-detail-panel";
import { QueueFilterBar } from "./queue-filter-bar";
import { QueueMonitorHeader } from "./queue-monitor-header";
import {
  backlogItems,
  escalationLevels,
  forecastWindows,
  queueMonitorSnapshot,
  queueSummaries,
  type AgeFilter,
  type EscalationLevelId,
  type ForecastWindowId,
  type InsightMode,
  type PriorityFilter,
  type QueueScope,
  type ViewMode,
} from "./queue-monitor-data";
import { buildQueueMonitorView } from "./queue-monitor-selectors";

type LocalEscalationState = {
  addToDigest: boolean;
  holdRelease: boolean;
  level: EscalationLevelId;
  notifyFloor: boolean;
  reviewed: boolean;
};

const initialEscalationState = Object.fromEntries(
  backlogItems.map((item) => [
    item.id,
    {
      addToDigest: item.escalationLevel === "director",
      holdRelease: item.ageBand === "breach",
      level: item.escalationLevel,
      notifyFloor: item.severity === "high",
      reviewed: false,
    },
  ]),
) as Record<string, LocalEscalationState>;

export function QueueMonitorShell() {
  const [viewMode, setViewMode] = useState<ViewMode>("live");
  const [insightMode, setInsightMode] = useState<InsightMode>("operations");
  const [forecastWindow, setForecastWindow] = useState<ForecastWindowId>("60m");
  const [queueScope, setQueueScope] = useState<QueueScope>("all");
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(
    queueSummaries[0]?.id ?? null,
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    backlogItems[0]?.id ?? null,
  );
  const [escalationState, setEscalationState] = useState<
    Record<string, LocalEscalationState>
  >(initialEscalationState);

  const view = buildQueueMonitorView({
    ageFilter,
    escalationState,
    forecastWindow,
    priorityFilter,
    queueScope,
    selectedItemId,
    selectedQueueId,
    viewMode,
  });

  const selectedItemState = view.selectedItem
    ? escalationState[view.selectedItem.id]
    : null;

  const handleSelectQueue = (queueId: string) => {
    const queueItems =
      view.columns.find((column) => column.queue.id === queueId)?.items ?? [];

    startTransition(() => {
      setSelectedQueueId(queueId);
      setSelectedItemId(queueItems[0]?.id ?? null);
    });
  };

  const handleSelectItem = (queueId: string, itemId: string) => {
    startTransition(() => {
      setSelectedQueueId(queueId);
      setSelectedItemId(itemId);
    });
  };

  const handleEscalationLevelChange = (level: EscalationLevelId) => {
    if (!view.selectedItem) {
      return;
    }

    startTransition(() => {
      setEscalationState((current) => ({
        ...current,
        [view.selectedItem!.id]: {
          ...current[view.selectedItem!.id],
          level,
        },
      }));
    });
  };

  const handleToggle = (key: keyof Omit<LocalEscalationState, "level">) => {
    if (!view.selectedItem) {
      return;
    }

    startTransition(() => {
      setEscalationState((current) => ({
        ...current,
        [view.selectedItem!.id]: {
          ...current[view.selectedItem!.id],
          [key]: !current[view.selectedItem!.id][key],
        },
      }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(248,113,113,0.14),transparent_26%),linear-gradient(180deg,#111827_0%,#0f172a_52%,#020617_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <QueueMonitorHeader
          agingCount={view.agingCount}
          backlogTotal={view.backlogTotal}
          breachCount={view.breachCount}
          escalatedCount={view.escalatedCount}
          forecastWindow={view.forecastWindowMeta}
          insightMode={insightMode}
          queuesAtRisk={view.queuesAtRisk}
          snapshot={queueMonitorSnapshot}
          throughputSummaries={view.throughputSummaries}
          viewMode={viewMode}
        />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(21rem,0.95fr)]">
          <section className="space-y-5">
            <QueueFilterBar
              ageCounts={view.ageCounts}
              ageFilter={ageFilter}
              forecastWindow={forecastWindow}
              forecastWindows={forecastWindows}
              insightMode={insightMode}
              onAgeFilterChange={(filter) =>
                startTransition(() => setAgeFilter(filter))
              }
              onForecastWindowChange={(windowId) =>
                startTransition(() => setForecastWindow(windowId))
              }
              onInsightModeChange={(mode) =>
                startTransition(() => setInsightMode(mode))
              }
              onPriorityFilterChange={(filter) =>
                startTransition(() => setPriorityFilter(filter))
              }
              onQueueScopeChange={(scope) =>
                startTransition(() => setQueueScope(scope))
              }
              onViewModeChange={(mode) => startTransition(() => setViewMode(mode))}
              priorityCounts={view.priorityCounts}
              priorityFilter={priorityFilter}
              queueCounts={view.queueCounts}
              queueScope={queueScope}
              viewMode={viewMode}
            />
            <QueueColumnBoard
              ageFilter={ageFilter}
              columns={view.columns}
              escalationState={escalationState}
              forecastWindow={view.forecastWindowMeta}
              insightMode={insightMode}
              onSelectItem={handleSelectItem}
              onSelectQueue={handleSelectQueue}
              priorityFilter={priorityFilter}
              queueEscalations={view.queueEscalations}
              queueScope={queueScope}
              queueTotals={view.queueTotals}
              selectedItemId={view.nextItemId}
              selectedQueueId={view.nextQueueId}
              viewMode={viewMode}
            />
          </section>
          <QueueDetailPanel
            escalationLevels={escalationLevels}
            forecastWindow={view.forecastWindowMeta}
            insightMode={insightMode}
            itemState={selectedItemState}
            onEscalationLevelChange={handleEscalationLevelChange}
            onToggle={handleToggle}
            queueEscalations={view.selectedQueue ? view.queueEscalations[view.selectedQueue.id] : 0}
            queueItemsVisible={
              view.columns.find((column) => column.queue.id === view.nextQueueId)?.items
                .length ?? 0
            }
            selectedItem={view.selectedItem}
            selectedQueue={view.selectedQueue}
            viewMode={viewMode}
          />
        </div>
      </div>
    </main>
  );
}
