"use client";

import { useDeferredValue, useState } from "react";

import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionScenario, MissionStatus } from "@/app/mission-briefing/mission-data";
import { statusLabels } from "@/app/mission-briefing/mission-data";

import { DecisionDesk } from "./DecisionDesk";
import { MissionTimeline } from "./MissionTimeline";
import { ReadinessMatrix } from "./ReadinessMatrix";
import { ScenarioRail } from "./ScenarioRail";

type ScenarioFilter = "all" | MissionStatus;

export function MissionBriefingShell({
  scenarios,
}: Readonly<{
  scenarios: MissionScenario[];
}>) {
  const [statusFilter, setStatusFilter] = useState<ScenarioFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    scenarios[0]?.id ?? null,
  );
  const [notesByScenario, setNotesByScenario] = useState<Record<string, string>>({});
  const [markersByScenario, setMarkersByScenario] = useState<Record<string, Record<string, boolean>>>({});
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const visibleScenarios = scenarios.filter((scenario) => {
    const matchesFilter =
      statusFilter === "all" ? true : scenario.status === statusFilter;
    const searchable = `${scenario.callsign} ${scenario.lead} ${scenario.theater}`.toLowerCase();
    const matchesQuery =
      deferredQuery.length === 0 ? true : searchable.includes(deferredQuery);

    return matchesFilter && matchesQuery;
  });

  const selectedScenario =
    visibleScenarios.find((scenario) => scenario.id === selectedScenarioId) ??
    null;

  const visibleTeams = visibleScenarios.flatMap((scenario) => scenario.readiness);
  const visibleRisks = visibleScenarios.flatMap((scenario) => [
    ...scenario.blockers,
    ...scenario.timeline.flatMap((phase) => phase.blockers),
  ]);

  const note = selectedScenario ? notesByScenario[selectedScenario.id] ?? "" : "";
  const markers = selectedScenario
    ? markersByScenario[selectedScenario.id] ?? {}
    : {};

  const clearMessage = visibleScenarios.length === 0
    ? "No briefing is in focus because the current filter rail is empty."
    : "Select a scenario card to populate the briefing workspace.";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <section className={`${styles.panel} ${styles.lead}`}>
          <p className={styles.eyebrow}>Mission Briefing Route</p>
          <h1 className={styles.title}>Scenario planning under active constraints.</h1>
          <p className={styles.copy}>This workspace keeps mission cards, phase timing, readiness posture, and notes isolated to a single route and a single client session.</p>
          <div className={styles.badges}>
            <span className={styles.tag}>/mission-briefing</span>
            <span className={styles.tag}>Independent route shell</span>
            <span className={styles.tag}>Local state only</span>
          </div>
        </section>

        <section className={`${styles.panel} ${styles.stats}`}>
          <p className={styles.eyebrow}>Readiness Snapshot</p>
          <div className={styles.statsGrid}>
            <article className={styles.metric}>
              <span className={styles.value}>{visibleScenarios.length}</span>
              <span className={styles.label}>Visible scenarios</span>
            </article>
            <article className={styles.metric}>
              <span className={styles.value}>{visibleTeams.filter((team) => team.readiness === "ready").length}</span>
              <span className={styles.label}>Teams ready</span>
            </article>
            <article className={styles.metric}>
              <span className={styles.value}>{visibleRisks.filter((risk) => risk.severity === "high").length}</span>
              <span className={styles.label}>High blockers</span>
            </article>
          </div>
        </section>
      </section>

      <section className={styles.workspace}>
        <ScenarioRail
          activeScenarioId={selectedScenarioId}
          isPending={false}
          onFilterChange={setStatusFilter}
          onQueryChange={setQuery}
          onSelect={setSelectedScenarioId}
          query={query}
          scenarios={visibleScenarios}
          statusFilter={statusFilter}
        />

        <div className={styles.content}>
          <section className={`${styles.panel} ${styles.spotlight}`}>
            {selectedScenario ? (
              <>
                <div className={styles.head}>
                  <div>
                    <p className={styles.eyebrow}>Focused Briefing</p>
                    <h2 className={styles.cardTitle}>{selectedScenario.callsign}</h2>
                  </div>
                  <div className={styles.badges}>
                    <span className={styles.status} data-state={selectedScenario.status}>{statusLabels[selectedScenario.status]}</span>
                    <button className={styles.button} onClick={() => setSelectedScenarioId(null)} type="button">Clear focus</button>
                  </div>
                </div>
                <p className={styles.copy}>{selectedScenario.alert}</p>
                <div className={styles.meta}>
                  <span className={styles.tag}>{selectedScenario.theater}</span>
                  <span className={styles.tag}>{selectedScenario.horizon}</span>
                  <span className={styles.tag}>{selectedScenario.lead}</span>
                </div>
                <div className={styles.spotlightGrid}>
                  <article className={styles.card}><p className={styles.small}>Mission summary</p><p className={styles.copy}>{selectedScenario.summary}</p></article>
                  <article className={styles.card}><p className={styles.small}>Open blockers</p><div className={styles.chips}>{selectedScenario.blockers.map((blocker) => <span className={styles.chip} data-severity={blocker.severity} key={blocker.label}>{blocker.label}</span>)}</div></article>
                </div>
              </>
            ) : (
              <div className={styles.empty}>
                <strong>Briefing focus cleared.</strong>
                <p>{clearMessage}</p>
              </div>
            )}
          </section>
          <div className={styles.grid}>
            <MissionTimeline scenario={selectedScenario} />
            <ReadinessMatrix scenario={selectedScenario} />
            <DecisionDesk
              markers={markers}
              note={note}
              onNoteChange={(nextNote) => selectedScenario && setNotesByScenario((currentNotes) => ({ ...currentNotes, [selectedScenario.id]: nextNote }))}
              onToggleMarker={(decisionId) => selectedScenario && setMarkersByScenario((currentMarkers) => ({ ...currentMarkers, [selectedScenario.id]: { ...(currentMarkers[selectedScenario.id] ?? {}), [decisionId]: !currentMarkers[selectedScenario.id]?.[decisionId] } }))}
              scenario={selectedScenario}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
