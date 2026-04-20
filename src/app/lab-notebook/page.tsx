import type { Metadata } from "next";

import { LabNotebookShell } from "@/components/lab-notebook/lab-notebook-shell";

import {
  boardLanes,
  comparisonMetrics,
  experimentRuns,
  experimentTemplates,
  experiments,
  milestoneTags,
  notebookStatus,
  observationEntries,
  outcomeReviews,
  reviewDecisionOptions,
  statusOptions,
} from "./notebook-data";

export const metadata: Metadata = {
  title: "Lab Notebook | API Test",
  description: "Mock notebook workspace with experiment templates, multi-run comparison, and outcome review helpers.",
};

export default function LabNotebookPage() {
  return (
    <LabNotebookShell
      boardLanes={boardLanes}
      comparisonMetrics={comparisonMetrics}
      experimentRuns={experimentRuns}
      experimentTemplates={experimentTemplates}
      experiments={experiments}
      milestoneTags={milestoneTags}
      notebookStatus={notebookStatus}
      observationEntries={observationEntries}
      outcomeReviews={outcomeReviews}
      reviewDecisionOptions={reviewDecisionOptions}
      statusOptions={statusOptions}
    />
  );
}
