"use client";

import { startTransition, useState } from "react";

import {
  actionPrompts,
  activeScenario,
  assumptions,
  laneFilters,
  outcomes,
  playbooks,
  type MatrixFilter,
  type PlaybookLaneFilter,
  type ScenarioMode,
} from "@/app/scenario-board/scenario-board-data";
import { AssumptionsPanel } from "./assumptions-panel";
import { OutcomeMatrix } from "./outcome-matrix";
import { PlaybookRail } from "./playbook-rail";
import { ScenarioBoardHeader } from "./scenario-board-header";

function toggleId(items: string[], id: string) {
  return items.includes(id) ? items.filter((item) => item !== id) : [...items, id];
}

export function ScenarioBoardShell() {
  const [mode, setMode] = useState<ScenarioMode>("Containment");
  const [selectedLane, setSelectedLane] = useState<PlaybookLaneFilter>("all");
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string | null>(playbooks[0]?.id ?? null);
  const [activeAssumptionIds, setActiveAssumptionIds] = useState<string[]>(assumptions.map((assumption) => assumption.id));
  const [matrixFilter, setMatrixFilter] = useState<MatrixFilter>("all");

  const visiblePlaybooks = playbooks.filter(
    (playbook) => playbook.modes.includes(mode) && (selectedLane === "all" || playbook.lane === selectedLane),
  );
  const selectedPlaybook =
    visiblePlaybooks.find((playbook) => playbook.id === selectedPlaybookId) ?? visiblePlaybooks[0] ?? null;
  const visibleOutcomes = outcomes.filter((outcome) => {
    if (!outcome.modes.includes(mode) || (matrixFilter === "downside" && outcome.direction !== "downside")) return false;
    return activeAssumptionIds.length > 0 && outcome.assumptionIds.some((id) => activeAssumptionIds.includes(id));
  });
  const visiblePrompts = selectedPlaybook
    ? actionPrompts.filter((prompt) => prompt.playbookId === selectedPlaybook.id)
    : [];
  const filterCounts = laneFilters.map((filter) => ({
    ...filter,
    count: playbooks.filter(
      (playbook) => playbook.modes.includes(mode) && (filter.id === "all" || playbook.lane === filter.id),
    ).length,
  }));

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_36%),linear-gradient(180deg,_#2a160d_0%,_#140d09_46%,_#070707_100%)] px-4 py-6 text-stone-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ScenarioBoardHeader
          activeAssumptionCount={activeAssumptionIds.length}
          mode={mode}
          outcomeCount={visibleOutcomes.length}
          onModeChange={(nextMode) => startTransition(() => setMode(nextMode))}
          playbookCount={visiblePlaybooks.length}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="space-y-6">
            <PlaybookRail
              filters={filterCounts}
              modeLabel={activeScenario.modeBadges[mode]}
              onLaneChange={(lane) => startTransition(() => setSelectedLane(lane))}
              onSelectPlaybook={(playbookId) => startTransition(() => setSelectedPlaybookId(playbookId))}
              playbooks={visiblePlaybooks}
              prompts={visiblePrompts}
              selectedLane={selectedLane}
              selectedPlaybook={selectedPlaybook}
              selectedPlaybookId={selectedPlaybook?.id ?? null}
            />
            <OutcomeMatrix
              assumptionsActive={activeAssumptionIds.length}
              filter={matrixFilter}
              onFilterChange={(nextFilter) => startTransition(() => setMatrixFilter(nextFilter))}
              outcomes={visibleOutcomes}
            />
          </div>

          <AssumptionsPanel
            activeIds={activeAssumptionIds}
            assumptions={assumptions}
            onClear={() => startTransition(() => setActiveAssumptionIds([]))}
            onReset={() => startTransition(() => setActiveAssumptionIds(assumptions.map((assumption) => assumption.id)))}
            onToggle={(assumptionId) =>
              startTransition(() => setActiveAssumptionIds((items) => toggleId(items, assumptionId)))
            }
            selectedPlaybook={selectedPlaybook}
          />
        </div>
      </div>
    </main>
  );
}
