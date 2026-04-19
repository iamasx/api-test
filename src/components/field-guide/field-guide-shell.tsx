"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  procedureDifficulties,
  procedures,
  procedureStatuses,
  procedureTeams,
} from "@/components/field-guide/field-guide-data";
import GuideFilters from "@/components/field-guide/guide-filters";
import GuideSearch from "@/components/field-guide/guide-search";
import ProcedureCard from "@/components/field-guide/procedure-card";
import ProcedureDrawer from "@/components/field-guide/procedure-drawer";

type ChecklistState = Record<string, Record<string, boolean>>;

export default function FieldGuideShell() {
  const [query, setQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(
    procedures[0]?.id ?? null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checklistState, setChecklistState] = useState<ChecklistState>({});

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredProcedures = procedures.filter((procedure) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      procedure.title.toLowerCase().includes(normalizedQuery) ||
      procedure.summary.toLowerCase().includes(normalizedQuery);
    const matchesTeam =
      selectedTeam === "all" || procedure.team === selectedTeam;
    const matchesDifficulty =
      selectedDifficulty === "all" || procedure.difficulty === selectedDifficulty;
    const matchesStatus =
      selectedStatus === "all" || procedure.status === selectedStatus;

    return matchesQuery && matchesTeam && matchesDifficulty && matchesStatus;
  });

  const activeProcedureId = filteredProcedures.some(
    (procedure) => procedure.id === selectedProcedureId,
  )
    ? selectedProcedureId
    : (filteredProcedures[0]?.id ?? null);

  const activeProcedure =
    filteredProcedures.find((procedure) => procedure.id === activeProcedureId) ??
    null;
  const drawerIsOpen =
    isDrawerOpen && selectedProcedureId === activeProcedureId && activeProcedure !== null;

  const hasActiveFilters =
    query.length > 0 ||
    selectedTeam !== "all" ||
    selectedDifficulty !== "all" ||
    selectedStatus !== "all";

  const handleSelectProcedure = (procedureId: string) => {
    startTransition(() => {
      setSelectedProcedureId(procedureId);
      setIsDrawerOpen(true);
    });
  };

  const handleToggleStep = (procedureId: string, stepId: string) => {
    startTransition(() => {
      setChecklistState((currentState) => ({
        ...currentState,
        [procedureId]: {
          ...currentState[procedureId],
          [stepId]: !currentState[procedureId]?.[stepId],
        },
      }));
    });
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedTeam("all");
    setSelectedDifficulty("all");
    setSelectedStatus("all");
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
      <div className="space-y-5">
        <GuideSearch
          onQueryChange={setQuery}
          query={query}
          resultCount={filteredProcedures.length}
          totalCount={procedures.length}
        />
        <GuideFilters
          difficulties={procedureDifficulties}
          hasActiveFilters={hasActiveFilters}
          onClear={handleClearFilters}
          onDifficultyChange={setSelectedDifficulty}
          onStatusChange={setSelectedStatus}
          onTeamChange={setSelectedTeam}
          selectedDifficulty={selectedDifficulty}
          selectedStatus={selectedStatus}
          selectedTeam={selectedTeam}
          statuses={procedureStatuses}
          teams={procedureTeams}
        />
        {filteredProcedures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredProcedures.map((procedure) => {
              const completedCount = procedure.checklist.filter(
                (step) => checklistState[procedure.id]?.[step.id],
              ).length;

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
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-lg shadow-slate-200/40">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              No results
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              No procedures match the current search or filters.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Clear one or more filters to reopen the mock library and restore
              the checklist drawer.
            </p>
          </div>
        )}
      </div>
      <ProcedureDrawer
        completedSteps={
          activeProcedure ? checklistState[activeProcedure.id] : undefined
        }
        isOpen={drawerIsOpen}
        onClose={() => setIsDrawerOpen(false)}
        onToggleStep={handleToggleStep}
        procedure={activeProcedure}
      />
    </section>
  );
}
