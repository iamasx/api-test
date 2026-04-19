"use client"

import { startTransition, useState } from "react"
import type { OutcomeImpact, ScenarioRecord } from "@/app/scenario-board/mock-data"
import { ActionPromptPanel } from "./action-prompt-panel"
import { AssumptionPanel } from "./assumption-panel"
import { OutcomeMatrix } from "./outcome-matrix"
import { PlaybookCardGrid } from "./playbook-card-grid"
import { ScenarioBoardHeader } from "./scenario-board-header"

type ScenarioBoardShellProps = { scenario: ScenarioRecord }

function getBaselineAssumptions(scenario: ScenarioRecord) {
  return scenario.assumptions.filter((assumption) => assumption.initiallyActive).map((assumption) => assumption.id)
}

export function ScenarioBoardShell({ scenario }: ScenarioBoardShellProps) {
  const [selectedPlaybookId, setSelectedPlaybookId] = useState(scenario.playbooks[0]?.id ?? "")
  const [activeAssumptionIds, setActiveAssumptionIds] = useState(getBaselineAssumptions(scenario))
  const [impactFilter, setImpactFilter] = useState<"all" | OutcomeImpact>("all")
  const selectedPlaybook = scenario.playbooks.find((playbook) => playbook.id === selectedPlaybookId) ?? null
  const visibleOutcomes = scenario.outcomes.filter((outcome) => selectedPlaybookId.length > 0 && outcome.playbookIds.includes(selectedPlaybookId) && outcome.assumptionIds.every((id) => activeAssumptionIds.includes(id)) && (impactFilter === "all" || outcome.impact === impactFilter))
  const visiblePrompts = scenario.prompts.filter((prompt) => selectedPlaybookId.length > 0 && prompt.playbookIds.includes(selectedPlaybookId))

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.14),transparent_28%),radial-gradient(circle_at_right,rgba(15,118,110,0.16),transparent_32%),linear-gradient(180deg,#140d09_0%,#261716_40%,#f5efe8_40.1%,#f5efe8_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <ScenarioBoardHeader activeAssumptionCount={activeAssumptionIds.length} scenario={scenario} selectedPlaybookTitle={selectedPlaybook?.title ?? null} visibleOutcomeCount={visibleOutcomes.length} />
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
          <div className="space-y-6">
            <PlaybookCardGrid onSelectPlaybook={(playbookId) => startTransition(() => setSelectedPlaybookId((current) => current === playbookId ? "" : playbookId))} playbooks={scenario.playbooks} selectedPlaybookId={selectedPlaybookId} />
            <OutcomeMatrix impactFilter={impactFilter} onImpactFilterChange={(nextFilter) => startTransition(() => setImpactFilter(nextFilter))} outcomes={visibleOutcomes} selectedPlaybookTitle={selectedPlaybook?.title ?? null} />
          </div>
          <div className="space-y-6">
            <AssumptionPanel activeAssumptionIds={activeAssumptionIds} assumptions={scenario.assumptions} onReset={() => startTransition(() => setActiveAssumptionIds(getBaselineAssumptions(scenario)))} onToggleAssumption={(assumptionId) => startTransition(() => setActiveAssumptionIds((current) => current.includes(assumptionId) ? current.filter((id) => id !== assumptionId) : [...current, assumptionId]))} />
            <ActionPromptPanel activeAssumptionIds={activeAssumptionIds} prompts={visiblePrompts} selectedPlaybookTitle={selectedPlaybook?.title ?? null} />
          </div>
        </div>
      </div>
    </main>
  )
}
