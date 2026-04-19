"use client";

import { startTransition, useState } from "react";

import type {
  Experiment,
  MilestoneTag,
  NotebookStatus,
  ObservationEntry,
  ObservationSection,
  StatusFilter,
  StatusOption,
} from "@/app/lab-notebook/notebook-data";
import { ExperimentBoard } from "./experiment-board";
import { LabNotebookHeader } from "./lab-notebook-header";
import { ObservationDrawer } from "./observation-drawer";
import { StatusFilterBar } from "./status-filter-bar";

type LabNotebookShellProps = {
  experiments: Experiment[]; milestoneTags: MilestoneTag[]; notebookStatus: NotebookStatus;
  observationEntries: ObservationEntry[]; statusOptions: StatusOption[];
};

function matchesStatus(experiment: Experiment, filter: StatusFilter) {
  return filter === "all" || experiment.status === filter;
}

export function LabNotebookShell({
  experiments,
  milestoneTags,
  notebookStatus,
  observationEntries,
  statusOptions,
}: LabNotebookShellProps) {
  const [selectedFilter, setSelectedFilter] = useState<StatusFilter>("all");
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(experiments[0]?.id ?? null);
  const [drawerSection, setDrawerSection] = useState<ObservationSection>("notes");
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);
  const visibleExperiments = experiments.filter((experiment) => matchesStatus(experiment, selectedFilter));
  const selectedExperiment = visibleExperiments.find((experiment) => experiment.id === selectedExperimentId) ?? null;
  const selectedEntries = observationEntries.filter((entry) => entry.experimentId === selectedExperimentId);
  const lastEntrySummary = selectedExperiment?.lastEntry ?? notebookStatus.lastEntrySummary;
  const activeCount = experiments.filter((experiment) => experiment.status === "active").length;
  const flaggedCount = observationEntries.filter((entry) => entry.section === "flags").length;
  const counts = {
    all: experiments.length,
    active: experiments.filter((experiment) => experiment.status === "active").length,
    watch: experiments.filter((experiment) => experiment.status === "watch").length,
    stabilizing: experiments.filter((experiment) => experiment.status === "stabilizing").length,
    archived: experiments.filter((experiment) => experiment.status === "archived").length,
  } as Record<StatusFilter, number>;
  const milestoneTagsById = Object.fromEntries(milestoneTags.map((tag) => [tag.id, tag])) as Record<string, MilestoneTag>;

  const handleFilterChange = (filter: StatusFilter) => {
    startTransition(() => {
      setSelectedFilter(filter);
      setExpandedEntryId(null);

      const nextVisible = experiments.filter((experiment) => matchesStatus(experiment, filter));
      if (!nextVisible.some((experiment) => experiment.id === selectedExperimentId)) {
        setSelectedExperimentId(nextVisible[0]?.id ?? null);
      }
    });
  };
  const handleSelectExperiment = (experimentId: string) => {
    startTransition(() => {
      setSelectedExperimentId(experimentId);
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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_30%),radial-gradient(circle_at_right,rgba(20,184,166,0.1),transparent_24%),linear-gradient(180deg,#fefce8_0%,#fffbeb_34%,#f8fafc_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <LabNotebookHeader
          activeCount={activeCount}
          flaggedCount={flaggedCount}
          lastEntrySummary={lastEntrySummary}
          notebookStatus={notebookStatus}
          visibleCount={visibleExperiments.length}
        />
        <StatusFilterBar counts={counts} onChange={handleFilterChange} selectedFilter={selectedFilter} statusOptions={statusOptions} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.88fr)]">
          <ExperimentBoard
            experiments={visibleExperiments}
            milestoneTagsById={milestoneTagsById}
            onSelect={handleSelectExperiment}
            selectedExperimentId={selectedExperimentId}
          />
          <ObservationDrawer
            entries={selectedEntries}
            expandedEntryId={expandedEntryId}
            experiment={selectedExperiment}
            milestoneTagsById={milestoneTagsById}
            onExpandEntry={handleExpandEntry}
            onSectionChange={handleSectionChange}
            section={drawerSection}
          />
        </div>
      </div>
    </main>
  );
}
