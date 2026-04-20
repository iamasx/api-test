"use client";

import { startTransition, useDeferredValue, useState } from "react";

import type {
  BoardLane,
  ComparisonMetric,
  ComparisonView,
  Experiment,
  ExperimentRun,
  ExperimentTemplate,
  MilestoneTag,
  NotebookStatus,
  ObservationEntry,
  ObservationSection,
  OutcomeReview,
  ReviewDecisionId,
  ReviewDecisionOption,
  StatusFilter,
  StatusOption,
} from "@/app/lab-notebook/notebook-data";
import { createExperimentBundleFromTemplate } from "@/app/lab-notebook/notebook-data";
import { ExperimentBoard } from "./experiment-board";
import { LabNotebookHeader } from "./lab-notebook-header";
import { ObservationDrawer } from "./observation-drawer";
import { OutcomeReviewPanel } from "./outcome-review-panel";
import { RunComparisonPanel } from "./run-comparison-panel";
import { StatusFilterBar } from "./status-filter-bar";
import { TemplateGallery } from "./template-gallery";

type LabNotebookShellProps = {
  boardLanes: BoardLane[];
  comparisonMetrics: ComparisonMetric[];
  experimentRuns: ExperimentRun[];
  experimentTemplates: ExperimentTemplate[];
  experiments: Experiment[];
  milestoneTags: MilestoneTag[];
  notebookStatus: NotebookStatus;
  observationEntries: ObservationEntry[];
  outcomeReviews: OutcomeReview[];
  reviewDecisionOptions: ReviewDecisionOption[];
  statusOptions: StatusOption[];
};

function matchesStatus(experiment: Experiment, filter: StatusFilter) {
  return filter === "all" || experiment.status === filter;
}

function matchesTemplate(experiment: Experiment, templateId: string | null) {
  return templateId === null || experiment.templateId === templateId;
}

function getDefaultRunIds(experiment: Experiment | null, runs: ExperimentRun[]) {
  if (!experiment) {
    return [];
  }

  if (experiment.comparisonRunIds.length > 0) {
    return experiment.comparisonRunIds;
  }

  return runs.filter((run) => run.experimentId === experiment.id).slice(0, 2).map((run) => run.id);
}

export function LabNotebookShell({
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
}: LabNotebookShellProps) {
  const [allExperiments, setAllExperiments] = useState(experiments);
  const [allRuns, setAllRuns] = useState(experimentRuns);
  const [allObservationEntries, setAllObservationEntries] = useState(observationEntries);
  const [allOutcomeReviews, setAllOutcomeReviews] = useState(outcomeReviews);
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(experiments[0]?.id ?? null);
  const [drawerSection, setDrawerSection] = useState<ObservationSection>("notes");
  const [comparisonView, setComparisonView] = useState<ComparisonView>("summary");
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);
  const [selectedRunIds, setSelectedRunIds] = useState<string[]>(
    getDefaultRunIds(experiments[0] ?? null, experimentRuns),
  );
  const [reviewDecisionByExperimentId, setReviewDecisionByExperimentId] = useState<Record<string, ReviewDecisionId>>(
    () => Object.fromEntries(outcomeReviews.map((review) => [review.experimentId, review.recommendedDecision])),
  );
  const [checkedHelpersByReviewId, setCheckedHelpersByReviewId] = useState<Record<string, string[]>>(
    () =>
      Object.fromEntries(
        outcomeReviews.map((review) => [
          review.id,
          review.helperChecklist.filter((helper) => helper.defaultChecked).map((helper) => helper.id),
        ]),
      ),
  );
  const deferredFilter = useDeferredValue(selectedFilter);
  const deferredTemplateId = useDeferredValue(selectedTemplateId);
  const visibleExperiments = allExperiments.filter(
    (experiment) => matchesStatus(experiment, deferredFilter) && matchesTemplate(experiment, deferredTemplateId),
  );
  const selectedExperiment = allExperiments.find((experiment) => experiment.id === selectedExperimentId) ?? null;
  const selectedTemplate = selectedExperiment
    ? experimentTemplates.find((template) => template.id === selectedExperiment.templateId) ?? null
    : selectedTemplateId
      ? experimentTemplates.find((template) => template.id === selectedTemplateId) ?? null
      : null;
  const selectedExperimentRuns = allRuns.filter((run) => run.experimentId === selectedExperimentId);
  const selectedRuns = selectedExperimentRuns.filter((run) => selectedRunIds.includes(run.id));
  const selectedEntries = allObservationEntries.filter(
    (entry) =>
      entry.experimentId === selectedExperimentId
      && (selectedRunIds.length === 0 || selectedRunIds.includes(entry.runId)),
  );
  const selectedReview = allOutcomeReviews.find((review) => review.experimentId === selectedExperimentId) ?? null;
  const lastEntrySummary = selectedExperiment?.lastEntry ?? notebookStatus.lastEntrySummary;
  const activeCount = allExperiments.filter((experiment) => experiment.status === "active").length;
  const flaggedCount = allObservationEntries.filter((entry) => entry.section === "flags").length;
  const selectedTemplateLabel = selectedTemplate ? `${selectedTemplate.name} template` : "All templates";
  const counts = {
    all: allExperiments.length,
    active: allExperiments.filter((experiment) => experiment.status === "active").length,
    watch: allExperiments.filter((experiment) => experiment.status === "watch").length,
    stabilizing: allExperiments.filter((experiment) => experiment.status === "stabilizing").length,
    archived: allExperiments.filter((experiment) => experiment.status === "archived").length,
  } as Record<StatusFilter, number>;
  const milestoneTagsById = Object.fromEntries(milestoneTags.map((tag) => [tag.id, tag])) as Record<string, MilestoneTag>;
  const runsById = Object.fromEntries(allRuns.map((run) => [run.id, run])) as Record<string, ExperimentRun>;
  const runsByExperimentId = Object.fromEntries(
    allExperiments.map((experiment) => [
      experiment.id,
      allRuns.filter((run) => run.experimentId === experiment.id),
    ]),
  ) as Record<string, ExperimentRun[]>;
  const templatesById = Object.fromEntries(
    experimentTemplates.map((template) => [template.id, template]),
  ) as Record<string, ExperimentTemplate>;
  const reviewDecisionOptionsById = Object.fromEntries(
    reviewDecisionOptions.map((option) => [option.id, option]),
  ) as Record<string, ReviewDecisionOption>;
  const countsByTemplateId = Object.fromEntries(
    experimentTemplates.map((template) => [
      template.id,
      allExperiments.filter((experiment) => experiment.templateId === template.id).length,
    ]),
  ) as Record<string, number>;

  const syncSelection = (nextExperiments: Experiment[], nextTemplateId: string | null, nextFilter: StatusFilter) => {
    const nextVisible = nextExperiments.filter(
      (experiment) => matchesStatus(experiment, nextFilter) && matchesTemplate(experiment, nextTemplateId),
    );

    if (!nextVisible.some((experiment) => experiment.id === selectedExperimentId)) {
      const fallback = nextVisible[0] ?? null;
      setSelectedExperimentId(fallback?.id ?? null);
      setSelectedRunIds(getDefaultRunIds(fallback, allRuns));
    }
  };

  const handleFilterChange = (filter: StatusFilter) => {
    startTransition(() => {
      setSelectedFilter(filter);
      setExpandedEntryId(null);
      syncSelection(allExperiments, selectedTemplateId, filter);
    });
  };

  const handleTemplateChange = (templateId: string | null) => {
    startTransition(() => {
      setSelectedTemplateId(templateId);
      setExpandedEntryId(null);
      syncSelection(allExperiments, templateId, selectedFilter);
    });
  };

  const handleSelectExperiment = (experimentId: string) => {
    const experiment = allExperiments.find((item) => item.id === experimentId) ?? null;

    startTransition(() => {
      setSelectedExperimentId(experimentId);
      setSelectedRunIds(getDefaultRunIds(experiment, allRuns));
      setDrawerSection("notes");
      setComparisonView("summary");
      setExpandedEntryId(null);
    });
  };

  const handleSectionChange = (section: ObservationSection) => {
    startTransition(() => {
      setDrawerSection(section);
      setExpandedEntryId(null);
    });
  };

  const handleExpandEntry = (entryId: string) => {
    startTransition(() => {
      setExpandedEntryId((current) => (current === entryId ? null : entryId));
    });
  };

  const handleToggleRun = (runId: string) => {
    startTransition(() => {
      setSelectedRunIds((current) => {
        if (current.includes(runId)) {
          return current.filter((id) => id !== runId);
        }

        const next = [...current, runId];
        return next.length > 3 ? next.slice(next.length - 3) : next;
      });
      setExpandedEntryId(null);
    });
  };

  const handleCreateFromTemplate = (templateId: string) => {
    const template = templatesById[templateId];

    if (!template) {
      return;
    }

    const nextSequence = (countsByTemplateId[templateId] ?? 0) + 1;
    const bundle = createExperimentBundleFromTemplate(template, nextSequence);
    const nextExperiments = [bundle.experiment, ...allExperiments];
    const nextRuns = [...bundle.runs, ...allRuns];

    startTransition(() => {
      setAllExperiments(nextExperiments);
      setAllRuns(nextRuns);
      setAllObservationEntries((current) => [...bundle.observationEntries, ...current]);
      setAllOutcomeReviews((current) => [bundle.outcomeReview, ...current]);
      setReviewDecisionByExperimentId((current) => ({
        ...current,
        [bundle.experiment.id]: bundle.outcomeReview.recommendedDecision,
      }));
      setCheckedHelpersByReviewId((current) => ({
        ...current,
        [bundle.outcomeReview.id]: bundle.outcomeReview.helperChecklist
          .filter((helper) => helper.defaultChecked)
          .map((helper) => helper.id),
      }));
      setSelectedTemplateId(templateId);
      setSelectedFilter("all");
      setSelectedExperimentId(bundle.experiment.id);
      setSelectedRunIds(getDefaultRunIds(bundle.experiment, nextRuns));
      setDrawerSection("notes");
      setComparisonView("summary");
      setExpandedEntryId(null);
    });
  };

  const handleToggleHelper = (helperId: string) => {
    if (!selectedReview) {
      return;
    }

    startTransition(() => {
      setCheckedHelpersByReviewId((current) => {
        const existing = current[selectedReview.id] ?? [];

        return {
          ...current,
          [selectedReview.id]: existing.includes(helperId)
            ? existing.filter((id) => id !== helperId)
            : [...existing, helperId],
        };
      });
    });
  };

  const handleSelectDecision = (decisionId: ReviewDecisionId) => {
    if (!selectedExperiment) {
      return;
    }

    const decision = reviewDecisionOptionsById[decisionId];

    if (!decision) {
      return;
    }

    startTransition(() => {
      setReviewDecisionByExperimentId((current) => ({
        ...current,
        [selectedExperiment.id]: decisionId,
      }));
      setAllExperiments((current) =>
        current.map((experiment) =>
          experiment.id === selectedExperiment.id
            ? {
                ...experiment,
                boardLaneId: decision.boardLaneId,
                status: decision.status,
                recommendation: decision.recommendation,
                boardNote: `${selectedTemplate?.name ?? "Template"} is currently sending this board toward ${decision.boardLaneId}.`,
              }
            : experiment,
        ),
      );
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_30%),radial-gradient(circle_at_right,rgba(20,184,166,0.1),transparent_24%),linear-gradient(180deg,#fefce8_0%,#fffbeb_34%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <LabNotebookHeader
          activeCount={activeCount}
          comparedRunCount={selectedRuns.length}
          flaggedCount={flaggedCount}
          lastEntrySummary={lastEntrySummary}
          notebookStatus={notebookStatus}
          selectedExperimentTitle={selectedExperiment?.title ?? null}
          selectedTemplateLabel={selectedTemplateLabel}
          visibleCount={visibleExperiments.length}
        />
        <TemplateGallery
          countsByTemplateId={countsByTemplateId}
          onCreateFromTemplate={handleCreateFromTemplate}
          onSelectTemplate={handleTemplateChange}
          selectedTemplateId={selectedTemplateId}
          templates={experimentTemplates}
        />
        <StatusFilterBar counts={counts} onChange={handleFilterChange} selectedFilter={selectedFilter} statusOptions={statusOptions} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.95fr)]">
          <ExperimentBoard
            boardLanes={boardLanes}
            experiments={visibleExperiments}
            milestoneTagsById={milestoneTagsById}
            onSelect={handleSelectExperiment}
            runsByExperimentId={runsByExperimentId}
            selectedExperimentId={selectedExperimentId}
            templatesById={templatesById}
          />
          <div className="space-y-6">
            <RunComparisonPanel
              comparisonMetrics={comparisonMetrics}
              comparisonView={comparisonView}
              experiment={selectedExperiment}
              onChangeComparisonView={setComparisonView}
              onToggleRun={handleToggleRun}
              runs={selectedExperimentRuns}
              selectedRunIds={selectedRunIds}
              template={selectedTemplate}
            />
            <ObservationDrawer
              entries={selectedEntries}
              expandedEntryId={expandedEntryId}
              experiment={selectedExperiment}
              milestoneTagsById={milestoneTagsById}
              onExpandEntry={handleExpandEntry}
              onSectionChange={handleSectionChange}
              runsById={runsById}
              section={drawerSection}
              selectedRuns={selectedRuns}
              template={selectedTemplate}
            />
            <OutcomeReviewPanel
              activeDecisionId={selectedExperiment ? reviewDecisionByExperimentId[selectedExperiment.id] ?? null : null}
              checkedHelperIds={selectedReview ? checkedHelpersByReviewId[selectedReview.id] ?? [] : []}
              decisionOptions={reviewDecisionOptions}
              experiment={selectedExperiment}
              onSelectDecision={handleSelectDecision}
              onToggleHelper={handleToggleHelper}
              review={selectedReview}
              selectedRuns={selectedRuns}
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
