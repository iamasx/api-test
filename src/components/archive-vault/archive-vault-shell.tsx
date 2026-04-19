"use client";

import { startTransition, useDeferredValue, useState } from "react";
import {
  archiveStatuses,
  archiveTags,
  findComparisonSummary,
  snapshotRecords,
  type ArchiveStatus,
} from "@/app/archive-vault/archive-vault-data";
import { ArchiveVaultFilters } from "./archive-vault-filters";
import styles from "./archive-vault.module.css";
import { CompareSummaryPanel } from "./compare-summary-panel";
import { RecordDetailPanel } from "./record-detail-panel";
import { SnapshotList } from "./snapshot-list";

export function ArchiveVaultShell() {
  const [query, setQuery] = useState("");
  const [statusFilters, setStatusFilters] = useState<ArchiveStatus[]>([]);
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [focusedRecordId, setFocusedRecordId] = useState<string | null>(snapshotRecords[0]?.id ?? null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();

  const visibleRecords = snapshotRecords.filter((record) => {
    const haystack = [record.label, record.cluster, record.owner, record.region, record.summary, ...record.tags].join(" ").toLowerCase();

    return (
      (!deferredQuery || haystack.includes(deferredQuery)) &&
      (statusFilters.length === 0 || statusFilters.includes(record.status)) &&
      (tagFilter === "all" || record.tags.includes(tagFilter))
    );
  });

  const activeRecordId = focusedRecordId && visibleRecords.some((record) => record.id === focusedRecordId) ? focusedRecordId : visibleRecords[0]?.id ?? null;
  const visibleCompareIds = compareIds.filter((id) => visibleRecords.some((record) => record.id === id));
  const activeRecord = snapshotRecords.find((record) => record.id === activeRecordId) ?? null;
  const comparedRecords = visibleCompareIds.flatMap((id) => {
    const match = snapshotRecords.find((record) => record.id === id);
    return match ? [match] : [];
  });
  const comparison = comparedRecords.length === 2 ? findComparisonSummary(comparedRecords[0].id, comparedRecords[1].id) : null;
  const hasFilters = query.trim().length > 0 || statusFilters.length > 0 || tagFilter !== "all";

  function toggleStatus(status: ArchiveStatus) {
    startTransition(() => setStatusFilters((current) => current.includes(status) ? current.filter((value) => value !== status) : [...current, status]));
  }

  function toggleCompare(recordId: string) {
    setCompareIds((current) => {
      const visibleSelection = current.filter((id) => visibleRecords.some((record) => record.id === id));

      if (visibleSelection.includes(recordId)) return visibleSelection.filter((value) => value !== recordId);
      if (visibleSelection.length < 2) return [...visibleSelection, recordId];
      return [visibleSelection[1], recordId];
    });
    setFocusedRecordId(recordId);
  }

  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Archive Vault</p>
          <h1 className={styles.title}>
            Snapshot browser for sealed records, review queues, and drift-ready comparisons.
          </h1>
          <p className={styles.intro}>
            Everything on this route is mock and local: search, filters, detail state, and pairwise compare summaries never leave the client.
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.statCard}>
            <span>Snapshots</span>
            <strong>{snapshotRecords.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Sealed</span>
            <strong>{snapshotRecords.filter((record) => record.status === "sealed").length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Drift Watch</span>
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
        onReset={() => startTransition(() => { setQuery(""); setStatusFilters([]); setTagFilter("all"); })}
        onTagChange={(value) => startTransition(() => setTagFilter(value))}
        onToggleStatus={toggleStatus}
        resultCount={visibleRecords.length}
        statuses={archiveStatuses}
        tags={archiveTags}
        totalCount={snapshotRecords.length}
      />

      <div className={styles.workspace}>
        <SnapshotList
          activeRecordId={activeRecordId}
          compareIds={visibleCompareIds}
          hasFilters={hasFilters}
          onActivate={setFocusedRecordId}
          onResetFilters={() => startTransition(() => { setQuery(""); setStatusFilters([]); setTagFilter("all"); })}
          onToggleCompare={toggleCompare}
          records={visibleRecords}
        />

        <aside className={styles.sideRail}>
          <RecordDetailPanel isCompared={visibleCompareIds.includes(activeRecord?.id ?? "")} record={activeRecord} />
          <CompareSummaryPanel records={comparedRecords} summary={comparison} />
        </aside>
      </div>
    </main>
  );
}
