"use client";

import { startTransition, useDeferredValue, useState } from "react";

import ExecutionPreviewPanel from "./execution-preview-panel";
import ProcedureCard from "./procedure-card";
import RunbookStudioHeader from "./runbook-studio-header";
import {
  executionStages,
  procedures,
  runbookSections,
  type RunbookSection,
  type SectionFilter,
  type StageId,
} from "./runbook-studio-data";

type ChecklistState = Record<string, Record<string, boolean>>;

function toggleId(items: StageId[], id: StageId) {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

const sectionCounts = Object.fromEntries(
  runbookSections.map((section) => [
    section,
    procedures.filter((procedure) => procedure.section === section).length,
  ]),
) as Record<RunbookSection, number>;

const sectionFilters: { id: SectionFilter; label: string; count: number }[] = [
  { id: "all", label: "All sections", count: procedures.length },
  ...runbookSections.map((section) => ({
    id: section,
    label: section,
    count: sectionCounts[section],
  })),
];

const attentionCount = procedures.filter(
  (procedure) => procedure.validation.tone !== "ready",
).length;

export default function RunbookStudioShell() {
  const [selectedSection, setSelectedSection] = useState<SectionFilter>("all");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(procedures[0]?.id ?? null);
  const [hiddenStageIds, setHiddenStageIds] = useState<StageId[]>([]);
  const [checklistState, setChecklistState] = useState<ChecklistState>({});

  const deferredSection = useDeferredValue(selectedSection);
  const filteredProcedures = procedures.filter((procedure) => deferredSection === "all" || procedure.section === deferredSection);
  const activeProcedureId = filteredProcedures.some((procedure) => procedure.id === selectedProcedureId) ? selectedProcedureId : (filteredProcedures[0]?.id ?? null);
  const activeProcedure = filteredProcedures.find((procedure) => procedure.id === activeProcedureId) ?? null;

  const handleSelectSection = (section: SectionFilter) => startTransition(() => setSelectedSection(section));
  const handleSelectProcedure = (procedureId: string) => startTransition(() => setSelectedProcedureId(procedureId));
  const handleToggleStage = (stageId: StageId) => startTransition(() => setHiddenStageIds((items) => toggleId(items, stageId)));

  const handleToggleStep = (procedureId: string, stepId: string) => {
    startTransition(() => {
      setChecklistState((state) => ({
        ...state,
        [procedureId]: {
          ...state[procedureId],
          [stepId]: !state[procedureId]?.[stepId],
        },
      }));
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.16),transparent_28%),radial-gradient(circle_at_right,rgba(15,23,42,0.08),transparent_24%),linear-gradient(180deg,#fffaf5_0%,#f8fafc_48%,#eef2ff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <RunbookStudioHeader
          attentionCount={attentionCount}
          procedureCount={procedures.length}
          stageCount={executionStages.length}
        />
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Procedure Cards</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">Filter drafts by section and open one into the live preview.</h2>
                </div>
                <p className="text-sm text-slate-600">{filteredProcedures.length} of {procedures.length} cards visible</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sectionFilters.map((filter) => {
                  const isSelected = selectedSection === filter.id;
                  return (
                    <button
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isSelected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
                      key={filter.id}
                      onClick={() => handleSelectSection(filter.id)}
                      type="button"
                    >
                      {filter.label}
                      <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${isSelected ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"}`}>
                        {filter.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredProcedures.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">No cards in this section</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">The selected section has no local runbook drafts yet.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">Switch sections or return to all cards to restore the authoring surface.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {filteredProcedures.map((procedure) => {
                  const completedCount = procedure.steps.filter((step) => checklistState[procedure.id]?.[step.id]).length;
                  return (
                    <ProcedureCard
                      completedCount={completedCount}
                      isSelected={procedure.id === activeProcedureId}
                      key={procedure.id}
                      onSelect={handleSelectProcedure}
                      procedure={procedure}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <ExecutionPreviewPanel
            completedSteps={activeProcedure ? checklistState[activeProcedure.id] : undefined}
            hiddenStageIds={hiddenStageIds}
            onToggleStage={handleToggleStage}
            onToggleStep={handleToggleStep}
            procedure={activeProcedure}
          />
        </section>
      </div>
    </main>
  );
}
