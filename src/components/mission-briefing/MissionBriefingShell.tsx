"use client";

import { startTransition, useDeferredValue, useState } from "react";

import styles from "@/app/mission-briefing/mission-briefing.module.css";
import {
  reviewModeLabels,
  statusLabels,
  type MissionScenario,
  type MissionStatus,
  type ReviewMode,
} from "@/app/mission-briefing/mission-data";

import { DecisionDesk } from "./DecisionDesk";
import {
  createDefaultOutcomeSelections,
  createDefaultPlanSelections,
  getPlanStorageKey,
  getScenarioSearchText,
  resolveScenarioView,
} from "./mission-briefing.utils";
import { MissionTimeline } from "./MissionTimeline";
import { OutcomeScoreboard } from "./OutcomeScoreboard";
import { ReadinessMatrix } from "./ReadinessMatrix";
import { ScenarioPlanner } from "./ScenarioPlanner";
import { ScenarioRail } from "./ScenarioRail";
import { StrategyReviewBoard } from "./StrategyReviewBoard";

type ScenarioFilter = "all" | MissionStatus;

function getCompareViews(
  visibleScenarioViews: ReturnType<typeof resolveScenarioView>[],
  selectedScenarioId: string | null,
  compareScenarioIds: string[],
) {
  const orderedViews: ReturnType<typeof resolveScenarioView>[] = [];
  const seen = new Set<string>();

  for (const scenarioId of [selectedScenarioId, ...compareScenarioIds]) {
    if (!scenarioId || seen.has(scenarioId)) {
      continue;
    }

    const match = visibleScenarioViews.find((view) => view.scenario.id === scenarioId);

    if (match) {
      orderedViews.push(match);
      seen.add(scenarioId);
    }
  }

  return orderedViews;
}

export function MissionBriefingShell({
  scenarios,
}: Readonly<{
  scenarios: MissionScenario[];
}>) {
  const [statusFilter, setStatusFilter] = useState<ScenarioFilter>("all");
  const [query, setQuery] = useState("");
  const [reviewMode, setReviewMode] = useState<ReviewMode>("command");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    scenarios[0]?.id ?? null,
  );
  const [compareScenarioIds, setCompareScenarioIds] = useState<string[]>([
    scenarios[1]?.id ?? "",
  ].filter(Boolean));
  const [selectedPlanByScenario, setSelectedPlanByScenario] = useState(() =>
    createDefaultPlanSelections(scenarios),
  );
  const [selectedOutcomeByScenario, setSelectedOutcomeByScenario] = useState(() =>
    createDefaultOutcomeSelections(scenarios),
  );
  const [notesByPlan, setNotesByPlan] = useState<Record<string, string>>({});
  const [markersByPlan, setMarkersByPlan] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visibleScenarios = scenarios.filter((scenario) => {
    const matchesFilter =
      statusFilter === "all" ? true : scenario.status === statusFilter;
    const matchesQuery =
      deferredQuery.length === 0
        ? true
        : getScenarioSearchText(scenario).includes(deferredQuery);

    return matchesFilter && matchesQuery;
  });
  const visibleScenarioViews = visibleScenarios.map((scenario) =>
    resolveScenarioView(
      scenario,
      selectedPlanByScenario[scenario.id],
      selectedOutcomeByScenario[scenario.id],
    ),
  );

  const selectedView =
    visibleScenarioViews.find((view) => view.scenario.id === selectedScenarioId) ??
    null;
  const compareViews = getCompareViews(
    visibleScenarioViews,
    selectedScenarioId,
    compareScenarioIds,
  );

  const visibleRisks = visibleScenarios.flatMap((scenario) => [
    ...scenario.blockers,
    ...scenario.timeline.flatMap((phase) => phase.blockers),
  ]);
  const visibleReadyTeams = visibleScenarioViews.reduce(
    (sum, view) => sum + view.readyCount,
    0,
  );
  const averageScore =
    visibleScenarioViews.length === 0
      ? 0
      : Math.round(
          visibleScenarioViews.reduce((sum, view) => sum + view.overallScore, 0) /
            visibleScenarioViews.length,
        );

  const noteKey =
    selectedView?.activePlan
      ? getPlanStorageKey(selectedView.scenario.id, selectedView.activePlan.id)
      : null;
  const note = noteKey ? notesByPlan[noteKey] ?? "" : "";
  const markers = noteKey ? markersByPlan[noteKey] ?? {} : {};

  const clearMessage =
    visibleScenarioViews.length === 0
      ? "No briefing is in focus because the current filter rail is empty."
      : "Select a scenario card to populate the briefing workspace.";

  function handleScenarioSelect(scenarioId: string) {
    startTransition(() => setSelectedScenarioId(scenarioId));
  }

  function handleToggleCompare(scenarioId: string) {
    startTransition(() =>
      setCompareScenarioIds((current) => {
        if (current.includes(scenarioId)) {
          return current.filter((value) => value !== scenarioId);
        }

        const next = [...current, scenarioId];
        return next.slice(-3);
      }),
    );
  }

  function handlePlanSelect(planId: string) {
    if (!selectedView) {
      return;
    }

    const nextPlan =
      selectedView.scenario.plans.find((plan) => plan.id === planId) ?? null;

    startTransition(() => {
      setSelectedPlanByScenario((current) => ({
        ...current,
        [selectedView.scenario.id]: planId,
      }));
      setSelectedOutcomeByScenario((current) => ({
        ...current,
        [selectedView.scenario.id]: nextPlan?.outcomes[0]?.id ?? "",
      }));
    });
  }

  function handleOutcomeSelect(outcomeId: string) {
    if (!selectedView) {
      return;
    }

    startTransition(() =>
      setSelectedOutcomeByScenario((current) => ({
        ...current,
        [selectedView.scenario.id]: outcomeId,
      })),
    );
  }

  function handleNoteChange(nextNote: string) {
    if (!noteKey) {
      return;
    }

    setNotesByPlan((currentNotes) => ({
      ...currentNotes,
      [noteKey]: nextNote,
    }));
  }

  function handleToggleMarker(decisionId: string) {
    if (!noteKey) {
      return;
    }

    setMarkersByPlan((currentMarkers) => ({
      ...currentMarkers,
      [noteKey]: {
        ...(currentMarkers[noteKey] ?? {}),
        [decisionId]: !currentMarkers[noteKey]?.[decisionId],
      },
    }));
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <section className={`${styles.panel} ${styles.lead}`}>
          <p className={styles.eyebrow}>Mission Briefing Route</p>
          <h1 className={styles.title}>
            Scenario planning with comparative outcomes and review controls.
          </h1>
          <p className={styles.copy}>
            Mission Briefing now tracks alternate plans, projected outcomes, score
            shifts, and readiness tradeoffs without leaving the route or the client
            session.
          </p>
          <div className={styles.badges}>
            <span className={styles.tag}>/mission-briefing</span>
            <span className={styles.tag}>Scenario compare board</span>
            <span className={styles.tag}>{reviewModeLabels[reviewMode]}</span>
          </div>
        </section>

        <section className={`${styles.panel} ${styles.stats}`}>
          <p className={styles.eyebrow}>Readiness Snapshot</p>
          <div className={styles.statsGrid}>
            <article className={styles.metric}>
              <span className={styles.value}>{visibleScenarioViews.length}</span>
              <span className={styles.label}>Visible scenarios</span>
            </article>
            <article className={styles.metric}>
              <span className={styles.value}>{averageScore}</span>
              <span className={styles.label}>Average active score</span>
            </article>
            <article className={styles.metric}>
              <span className={styles.value}>{visibleReadyTeams}</span>
              <span className={styles.label}>Teams ready</span>
            </article>
            <article className={styles.metric}>
              <span className={styles.value}>
                {visibleRisks.filter((risk) => risk.severity === "high").length}
              </span>
              <span className={styles.label}>High blockers</span>
            </article>
          </div>
        </section>
      </section>

      <section className={styles.workspace}>
        <ScenarioRail
          activeScenarioId={selectedScenarioId}
          compareScenarioIds={compareScenarioIds}
          isPending={false}
          onFilterChange={(nextFilter) =>
            startTransition(() => setStatusFilter(nextFilter))
          }
          onQueryChange={(nextQuery) => startTransition(() => setQuery(nextQuery))}
          onSelect={handleScenarioSelect}
          onToggleCompare={handleToggleCompare}
          query={query}
          scenarios={visibleScenarioViews}
          statusFilter={statusFilter}
        />

        <div className={styles.content}>
          <section className={`${styles.panel} ${styles.spotlight}`}>
            {selectedView ? (
              <>
                <div className={styles.head}>
                  <div>
                    <p className={styles.eyebrow}>Focused Briefing</p>
                    <h2 className={styles.cardTitle}>{selectedView.scenario.callsign}</h2>
                  </div>
                  <div className={styles.badges}>
                    <span
                      className={styles.status}
                      data-state={selectedView.scenario.status}
                    >
                      {statusLabels[selectedView.scenario.status]}
                    </span>
                    <button
                      className={styles.button}
                      onClick={() => setSelectedScenarioId(null)}
                      type="button"
                    >
                      Clear focus
                    </button>
                  </div>
                </div>

                <p className={styles.copy}>{selectedView.scenario.alert}</p>

                <div className={styles.meta}>
                  <span className={styles.tag}>{selectedView.scenario.theater}</span>
                  <span className={styles.tag}>{selectedView.scenario.horizon}</span>
                  <span className={styles.tag}>{selectedView.scenario.lead}</span>
                  <span className={styles.scoreBadge}>
                    Active score {selectedView.overallScore}
                  </span>
                </div>

                <div className={styles.spotlightGrid}>
                  <article className={styles.card}>
                    <p className={styles.small}>Mission summary</p>
                    <p className={styles.copy}>{selectedView.scenario.summary}</p>
                  </article>
                  <article className={styles.card}>
                    <p className={styles.small}>Active plan</p>
                    <p className={styles.copy}>
                      {selectedView.activePlan?.label ?? "No plan selected"}
                    </p>
                    <p className={styles.muted}>
                      {selectedView.activePlan?.tradeoff ??
                        "Choose a plan to populate the comparative brief."}
                    </p>
                  </article>
                  <article className={styles.card}>
                    <p className={styles.small}>Projected outcome</p>
                    <p className={styles.copy}>
                      {selectedView.activeOutcome?.label ?? "No outcome selected"}
                    </p>
                    <p className={styles.muted}>
                      {selectedView.activeOutcome?.commandNote ??
                        "Outcome-specific command notes appear here."}
                    </p>
                  </article>
                </div>
              </>
            ) : (
              <div className={styles.empty}>
                <strong>Briefing focus cleared.</strong>
                <p>{clearMessage}</p>
              </div>
            )}
          </section>

          <StrategyReviewBoard
            focusedScenarioId={selectedScenarioId}
            onFocusScenario={handleScenarioSelect}
            reviewMode={reviewMode}
            views={compareViews}
          />

          <div className={styles.grid}>
            <ScenarioPlanner onSelectPlan={handlePlanSelect} view={selectedView} />
            <OutcomeScoreboard
              onSelectOutcome={handleOutcomeSelect}
              view={selectedView}
            />
            <MissionTimeline view={selectedView} />
            <ReadinessMatrix reviewMode={reviewMode} view={selectedView} />
            <div className={styles.fullSpan}>
              <DecisionDesk
                activeOutcome={selectedView?.activeOutcome ?? null}
                activePlan={selectedView?.activePlan ?? null}
                markers={markers}
                note={note}
                onNoteChange={handleNoteChange}
                onReviewModeChange={(nextMode) =>
                  startTransition(() => setReviewMode(nextMode))
                }
                onToggleMarker={handleToggleMarker}
                reviewMode={reviewMode}
                scenario={selectedView?.scenario ?? null}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
