"use client";

import { startTransition, useState } from "react";

import { QueueColumnBoard } from "./queue-column-board";
import { QueueDetailPanel } from "./queue-detail-panel";
import { QueueFilterBar } from "./queue-filter-bar";
import { QueueMonitorHeader } from "./queue-monitor-header";
import {
  backlogItems,
  escalationLevels,
  queueMonitorSnapshot,
  queueSummaries,
  throughputSummaries,
  type AgeFilter,
  type EscalationLevelId,
  type QueueScope,
} from "./queue-monitor-data";

type LocalEscalationState = {
  addToDigest: boolean; holdRelease: boolean; level: EscalationLevelId; notifyFloor: boolean; reviewed: boolean;
};

function matchesQueueScope(tone: (typeof queueSummaries)[number]["tone"], scope: QueueScope) {
  if (scope === "watch") return tone !== "stable";
  if (scope === "stable") return tone === "stable";
  return true;
}

function matchesAgeFilter(ageBand: (typeof backlogItems)[number]["ageBand"], filter: AgeFilter) {
  if (filter === "aging") return ageBand !== "fresh";
  if (filter === "breach") return ageBand === "breach";
  return true;
}

const initialEscalationState = Object.fromEntries(
  backlogItems.map((item) => [item.id, {
    level: item.escalationLevel,
    holdRelease: item.ageBand === "breach",
    notifyFloor: item.severity === "high",
    addToDigest: item.escalationLevel === "director",
    reviewed: false,
  }]),
) as Record<string, LocalEscalationState>;

export function QueueMonitorShell() {
  const [queueScope, setQueueScope] = useState<QueueScope>("all");
  const [ageFilter, setAgeFilter] = useState<AgeFilter>("all");
  const [selectedQueueId, setSelectedQueueId] = useState<string | null>(queueSummaries[0]?.id ?? null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(backlogItems[0]?.id ?? null);
  const [escalationState, setEscalationState] = useState<Record<string, LocalEscalationState>>(initialEscalationState);

  const visibleQueues = queueSummaries.filter((queue) => matchesQueueScope(queue.tone, queueScope));
  const columns = visibleQueues.map((queue) => ({
    queue,
    items: backlogItems.filter((item) => item.queueId === queue.id && matchesAgeFilter(item.ageBand, ageFilter)),
  }));
  const nextQueueId = visibleQueues.some((queue) => queue.id === selectedQueueId) ? selectedQueueId : visibleQueues[0]?.id ?? null;
  const nextQueueItems = columns.find((column) => column.queue.id === nextQueueId)?.items ?? [];
  const nextItemId = nextQueueItems.some((item) => item.id === selectedItemId) ? selectedItemId : nextQueueItems[0]?.id ?? null;

  const selectedQueue = queueSummaries.find((queue) => queue.id === nextQueueId) ?? null;
  const selectedItem = nextQueueItems.find((item) => item.id === nextItemId) ?? null;
  const selectedItemState = selectedItem ? escalationState[selectedItem.id] : null;
  const scopedItems = backlogItems.filter((item) => visibleQueues.some((queue) => queue.id === item.queueId));
  const backlogTotal = backlogItems.length;
  const agingCount = backlogItems.filter((item) => item.ageBand !== "fresh").length;
  const breachCount = backlogItems.filter((item) => item.ageBand === "breach").length;
  const escalatedCount = backlogItems.filter((item) => escalationState[item.id].level !== "none").length;
  const queuesAtRisk = queueSummaries.filter((queue) => queue.tone !== "stable").length;
  const queueCounts = {
    all: queueSummaries.length,
    watch: queueSummaries.filter((queue) => matchesQueueScope(queue.tone, "watch")).length,
    stable: queueSummaries.filter((queue) => matchesQueueScope(queue.tone, "stable")).length,
  };
  const ageCounts = {
    all: scopedItems.length,
    aging: scopedItems.filter((item) => matchesAgeFilter(item.ageBand, "aging")).length,
    breach: scopedItems.filter((item) => matchesAgeFilter(item.ageBand, "breach")).length,
  };
  const queueTotals = Object.fromEntries(queueSummaries.map((queue) => [queue.id, backlogItems.filter((item) => item.queueId === queue.id).length])) as Record<string, number>;
  const queueEscalations = Object.fromEntries(queueSummaries.map((queue) => [queue.id, backlogItems.filter((item) => item.queueId === queue.id && escalationState[item.id].level !== "none").length])) as Record<string, number>;

  const handleSelectQueue = (queueId: string) => {
    const queueItems = columns.find((column) => column.queue.id === queueId)?.items ?? [];
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
    if (!selectedItem) return;
    startTransition(() => {
      setEscalationState((current) => ({ ...current, [selectedItem.id]: { ...current[selectedItem.id], level } }));
    });
  };

  const handleToggle = (key: keyof Omit<LocalEscalationState, "level">) => {
    if (!selectedItem) return;
    startTransition(() => {
      setEscalationState((current) => ({ ...current, [selectedItem.id]: { ...current[selectedItem.id], [key]: !current[selectedItem.id][key] } }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(248,113,113,0.14),transparent_26%),linear-gradient(180deg,#111827_0%,#0f172a_52%,#020617_100%)] px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <QueueMonitorHeader agingCount={agingCount} backlogTotal={backlogTotal} breachCount={breachCount} escalatedCount={escalatedCount} queuesAtRisk={queuesAtRisk} snapshot={queueMonitorSnapshot} throughputSummaries={throughputSummaries} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(21rem,0.95fr)]">
          <section className="space-y-5">
            <QueueFilterBar ageCounts={ageCounts} ageFilter={ageFilter} onAgeFilterChange={(filter) => startTransition(() => setAgeFilter(filter))} onQueueScopeChange={(scope) => startTransition(() => setQueueScope(scope))} queueCounts={queueCounts} queueScope={queueScope} />
            <QueueColumnBoard ageFilter={ageFilter} columns={columns} escalationState={escalationState} onSelectItem={handleSelectItem} onSelectQueue={handleSelectQueue} queueEscalations={queueEscalations} queueScope={queueScope} queueTotals={queueTotals} selectedItemId={nextItemId} selectedQueueId={nextQueueId} />
          </section>
          <QueueDetailPanel escalationLevels={escalationLevels} itemState={selectedItemState} onEscalationLevelChange={handleEscalationLevelChange} onToggle={handleToggle} queueEscalations={selectedQueue ? queueEscalations[selectedQueue.id] : 0} queueItemsVisible={nextQueueItems.length} selectedItem={selectedItem} selectedQueue={selectedQueue} />
        </div>
      </div>
    </main>
  );
}
