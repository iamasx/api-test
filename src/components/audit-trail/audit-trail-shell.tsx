"use client";

import { startTransition, useState } from "react";

import {
  categoryTags,
  changeRecords,
  reviewFlags,
  reviewers,
  type ReviewState,
} from "@/app/audit-trail/mock-data";
import { AuditTrailFilters } from "./audit-trail-filters";
import { AuditTrailHeader } from "./audit-trail-header";
import { ChangeLedger } from "./change-ledger";
import { ReviewFlagPanel } from "./review-flag-panel";

const reviewersById = Object.fromEntries(
  reviewers.map((reviewer) => [reviewer.id, reviewer]),
);
const categoriesById = Object.fromEntries(
  categoryTags.map((category) => [category.id, category]),
);
const reviewTabs = [
  { id: "all", label: "All reviews" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "watch", label: "Watch" },
  { id: "changes-requested", label: "Changes requested" },
] as const;

type ReviewFilter = "all" | ReviewState;

function toggleId(items: string[], id: string) {
  return items.includes(id)
    ? items.filter((item) => item !== id)
    : [...items, id];
}

export function AuditTrailShell() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedReviewState, setSelectedReviewState] = useState<ReviewFilter>("all");
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);

  const visibleRecords = changeRecords.filter(
    (record) =>
      (selectedCategory === "all" || record.categoryId === selectedCategory) &&
      (selectedReviewState === "all" || record.reviewState === selectedReviewState),
  );
  const flaggedRecords = visibleRecords.filter((record) => flaggedIds.includes(record.id));
  const hiddenFlagCount = flaggedIds.length - flaggedRecords.length;
  const pendingCount = changeRecords.filter((record) => record.reviewState === "pending").length;
  const reviewedCount = changeRecords.length - pendingCount;
  const activeReviewerCount = new Set(changeRecords.flatMap((record) => record.reviewerIds)).size;
  const hasFilters = selectedCategory !== "all" || selectedReviewState !== "all";

  const reviewCounts = Object.fromEntries(
    reviewTabs.map((tab) => [
      tab.id,
      tab.id === "all" ? changeRecords.length : changeRecords.filter((record) => record.reviewState === tab.id).length,
    ]),
  ) as Record<string, number>;
  const categoryCounts = Object.fromEntries(
    categoryTags.map((category) => [category.id, changeRecords.filter((record) => record.categoryId === category.id).length]),
  ) as Record<string, number>;

  const handleCategoryChange = (value: string) => startTransition(() => setSelectedCategory(value));
  const handleReviewStateChange = (value: string) => startTransition(() => setSelectedReviewState(value as ReviewFilter));
  const handleToggleFlag = (recordId: string) => startTransition(() => setFlaggedIds((current) => toggleId(current, recordId)));
  const handleResetFilters = () => startTransition(() => { setSelectedCategory("all"); setSelectedReviewState("all"); });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_32%),radial-gradient(circle_at_right,_rgba(20,184,166,0.12),_transparent_26%),linear-gradient(180deg,_#fffaf3_0%,_#f8fafc_45%,_#f5f7fb_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AuditTrailHeader
          activeReviewerCount={activeReviewerCount}
          localFlagCount={flaggedIds.length}
          pendingCount={pendingCount}
          reviewedCount={reviewedCount}
          totalChanges={changeRecords.length}
        />

        <AuditTrailFilters
          categories={categoryTags}
          categoryCounts={categoryCounts}
          onCategoryChange={handleCategoryChange}
          onReviewStateChange={handleReviewStateChange}
          reviewCounts={reviewCounts}
          reviewTabs={reviewTabs}
          selectedCategory={selectedCategory}
          selectedReviewState={selectedReviewState}
          totalCount={changeRecords.length}
          visibleCount={visibleRecords.length}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
          <ChangeLedger
            categoriesById={categoriesById}
            flaggedIds={flaggedIds}
            hasFilters={hasFilters}
            onResetFilters={handleResetFilters}
            onToggleFlag={handleToggleFlag}
            records={visibleRecords}
            reviewersById={reviewersById}
          />

          <ReviewFlagPanel
            categoriesById={categoriesById}
            flagDefinitions={reviewFlags}
            flaggedRecords={flaggedRecords}
            hiddenFlagCount={hiddenFlagCount}
            onToggleFlag={handleToggleFlag}
            reviewersById={reviewersById}
            totalFlaggedCount={flaggedIds.length}
          />
        </div>
      </div>
    </main>
  );
}
