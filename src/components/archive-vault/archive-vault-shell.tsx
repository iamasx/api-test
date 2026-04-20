"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import {
  advanceExportQueueStatus,
  archiveStatuses,
  archiveTags,
  buildComparisonKey,
  createExportQueueEntry,
  exportQueueEntries,
  findComparisonSummary,
  snapshotRecords,
  type ArchiveStatus,
  type ExportQueueEntry,
} from "@/app/archive-vault/archive-vault-data";
import { ArchiveVaultFilters } from "./archive-vault-filters";
import styles from "./archive-vault.module.css";
import { ComparisonDetailPanel } from "./comparison-detail-panel";
import { CompareSummaryPanel } from "./compare-summary-panel";
import { ExportQueuePanel } from "./export-queue-panel";
import { RecordDetailPanel } from "./record-detail-panel";
import { SnapshotList } from "./snapshot-list";

const initialReviewedPairs = exportQueueEntries.reduce<Record<string, boolean>>(
  (state, entry) => {
    state[entry.comparisonKey] = true;
    return state;
  },
  {},
);

export function ArchiveVaultShell() {
  const [query, setQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<ArchiveStatus[]>([]);
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [focusedRecordId, setFocusedRecordId] = useState<string | null>(snapshotRecords[0]?.id ?? null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedChangeId, setSelectedChangeId] = useState<string | null>(null);
  const [reviewedPairs, setReviewedPairs] = useState<Record<string, boolean>>(
    () => initialReviewedPairs,
  );
  const [exportQueue, setExportQueue] = useState<ExportQueueEntry[]>(
    () => [...exportQueueEntries],
  );
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();

  const visibleRecords = snapshotRecords.filter((record) => {
    const haystack = [
      record.label,
      record.cluster,
      record.owner,
      record.region,
      record.summary,
      record.lineage,
      record.exportTarget,
      record.reviewLane,
      record.checksumStatus,
      ...record.tags,
    ].join(" ").toLowerCase();

    return (
      (!deferredQuery || haystack.includes(deferredQuery)) &&
      (statusFilters.length === 0 || statusFilters.includes(record.status)) &&
      (tagFilter === "all" || record.tags.includes(tagFilter))
    );
  });

  const activeRecordId = focusedRecordId && visibleRecords.some((record) => record.id === focusedRecordId)
    ? focusedRecordId
    : visibleRecords[0]?.id ?? null;
  const visibleCompareIds = compareIds.filter((id) => visibleRecords.some((record) => record.id === id));
  const activeRecord = snapshotRecords.find((record) => record.id === activeRecordId) ?? null;
  const comparedRecords = visibleCompareIds.flatMap((id) => {
    const match = snapshotRecords.find((record) => record.id === id);
    return match ? [match] : [];
  });
  const comparison = comparedRecords.length === 2
    ? findComparisonSummary(comparedRecords[0].id, comparedRecords[1].id)
    : null;
  const activeComparisonKey = comparison ? buildComparisonKey(...comparison.pair) : null;
  const hasFilters = query.trim().length > 0 || statusFilters.length > 0 || tagFilter !== "all";
  const reviewedCount = Object.values(reviewedPairs).filter(Boolean).length;
  const readyCount = exportQueue.filter((entry) => entry.status === "ready").length;
  const activeQueueEntry = activeComparisonKey
    ? exportQueue.find((entry) => entry.comparisonKey === activeComparisonKey) ?? null
    : null;
  const isReviewed = activeComparisonKey ? reviewedPairs[activeComparisonKey] ?? false : false;

  useEffect(() => {
    if (!comparison) {
      setSelectedChangeId(null);
      return;
    }

    if (!comparison.recordChanges.some((change) => change.id === selectedChangeId)) {
      setSelectedChangeId(comparison.recordChanges[0]?.id ?? null);
    }
  }, [comparison, selectedChangeId]);

  function resetFilters() {
    startTransition(() => {
      setQuery("");
      setStatusFilters([]);
      setTagFilter("all");
    });
  }

  function toggleStatus(status: ArchiveStatus) {
    startTransition(() => {
      setStatusFilters((current) => current.includes(status)
        ? current.filter((value) => value !== status)
        : [...current, status]);
    });
  }

  function toggleCompare(recordId: string) {
    startTransition(() => {
      setCompareIds((current) => {
        const visibleSelection = current.filter((id) => visibleRecords.some((record) => record.id === id));

        if (visibleSelection.includes(recordId)) {
          return visibleSelection.filter((value) => value !== recordId);
        }

        if (visibleSelection.length < 2) return [...visibleSelection, recordId];
        return [visibleSelection[1], recordId];
      });
      setFocusedRecordId(recordId);
    });
  }

  function markComparisonReviewed() {
    if (!activeComparisonKey) return;

    startTransition(() => {
      setReviewedPairs((current) => current[activeComparisonKey]
        ? current
        : { ...current, [activeComparisonKey]: true });
    });
  }

  function queueComparison() {
    if (!comparison || !activeComparisonKey || !isReviewed || activeQueueEntry) return;

    startTransition(() => {
      setExportQueue((current) => {
        if (current.some((entry) => entry.comparisonKey === activeComparisonKey)) {
          return current;
        }

        return [createExportQueueEntry(comparison, comparedRecords), ...current];
      });
    });
  }

  function advanceQueueEntry(entryId: string) {
    startTransition(() => {
      setExportQueue((current) => current.map((entry) => entry.id === entryId
        ? { ...entry, status: advanceExportQueueStatus(entry.status) }
        : entry));
    });
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Archive Vault</p>
          <h1 className={styles.title}>
            Snapshot diff explorer for sealed baselines, drift investigations, and queued review exports.
          </h1>
          <p className={styles.intro}>
            Compare two saved snapshots, inspect record-level deltas, mark the review complete, and stage export packages without leaving the client.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <span>Snapshots</span>
            <strong>{snapshotRecords.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Reviewed pairs</span>
            <strong>{reviewedCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Queue packages</span>
            <strong>{exportQueue.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Ready exports</span>
            <strong>{readyCount}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Drift watch</span>
            <strong>{snapshotRecords.filter((record) => record.status === "drift").length}</strong>
          </div>
        </div>
      </section>

      <ArchiveVaultFilters
        query={query}
        activeStatuses={statusFilters}
        activeTag={tagFilter}
        hasFilters={hasFilters}
        onQueryChange={(value) => startTransition(() => setQuery(value))}
        onReset={resetFilters}
        onTagChange={(value) => startTransition(() => setTagFilter(value))}
        onToggleStatus={toggleStatus}
        resultCount={visibleRecords.length}
        statuses={archiveStatuses}
        tags={archiveTags}
        totalCount={snapshotRecords.length}
      />

      <div className={styles.workspace}>
        <section className={styles.primaryColumn}>
          <SnapshotList
            activeRecordId={activeRecordId}
            compareIds={visibleCompareIds}
            hasFilters={hasFilters}
            onActivate={setFocusedRecordId}
            onClearCompare={() => startTransition(() => setCompareIds([]))}
            onResetFilters={resetFilters}
            onToggleCompare={toggleCompare}
            records={visibleRecords}
          />
          <ComparisonDetailPanel
            onSelectChange={setSelectedChangeId}
            selectedChangeId={selectedChangeId}
            summary={comparison}
          />
        </section>

        <aside className={styles.sideRail}>
          <CompareSummaryPanel
            isQueued={Boolean(activeQueueEntry)}
            onMarkReviewed={markComparisonReviewed}
            onQueue={queueComparison}
            records={comparedRecords}
            reviewed={isReviewed}
            summary={comparison}
          />
          <RecordDetailPanel
            comparison={comparison}
            isCompared={visibleCompareIds.includes(activeRecord?.id ?? "")}
            record={activeRecord}
          />
          <ExportQueuePanel
            activeComparisonKey={activeComparisonKey}
            entries={exportQueue}
            onAdvance={advanceQueueEntry}
          />
        </aside>
      </div>
    </main>
  );
}
