import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionStatus } from "@/app/mission-briefing/mission-data";
import { statusLabels } from "@/app/mission-briefing/mission-data";

import type { MissionScenarioView } from "./mission-briefing.utils";

type ScenarioFilter = "all" | MissionStatus;

const filterLabels: Record<ScenarioFilter, string> = {
  all: "All",
  ready: "Ready",
  watch: "Watch",
  blocked: "Blocked",
};

export function ScenarioRail({
  activeScenarioId,
  compareScenarioIds,
  isPending,
  onFilterChange,
  onQueryChange,
  onSelect,
  onToggleCompare,
  query,
  scenarios,
  statusFilter,
}: Readonly<{
  activeScenarioId: string | null;
  compareScenarioIds: string[];
  isPending: boolean;
  onFilterChange: (nextFilter: ScenarioFilter) => void;
  onQueryChange: (nextQuery: string) => void;
  onSelect: (scenarioId: string) => void;
  onToggleCompare: (scenarioId: string) => void;
  query: string;
  scenarios: MissionScenarioView[];
  statusFilter: ScenarioFilter;
}>) {
  return (
    <aside className={`${styles.panel} ${styles.rail}`}>
      <div>
        <p className={styles.eyebrow}>Scenario Rail</p>
        <h2 className={styles.sectionTitle}>Mission set</h2>
        <p className={styles.muted}>
          Filter the route, focus a scenario, and pin plans into the review board.
        </p>
      </div>

      <div>
        <label className={styles.small} htmlFor="mission-scenario-search">
          Search scenarios
        </label>
        <input
          className={styles.field}
          id="mission-scenario-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Callsign, lead, theater, or plan"
          type="search"
          value={query}
        />
      </div>

      <div className={styles.filters}>
        {Object.entries(filterLabels).map(([key, label]) => (
          <button
            className={styles.button}
            data-active={statusFilter === key}
            key={key}
            onClick={() => onFilterChange(key as ScenarioFilter)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      {scenarios.length === 0 ? (
        <div className={styles.empty}>
          <strong>No scenarios match this filter.</strong>
          <p>Clear the search or widen the readiness filter to restore the rail.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {scenarios.map((view) => {
            const isPinned = compareScenarioIds.includes(view.scenario.id);

            return (
              <article className={styles.cardPanel} key={view.scenario.id}>
                <button
                  aria-label={`Focus scenario ${view.scenario.callsign}`}
                  className={styles.cardButton}
                  data-active={activeScenarioId === view.scenario.id}
                  onClick={() => onSelect(view.scenario.id)}
                  type="button"
                >
                  <div className={styles.head}>
                    <div>
                      <p className={styles.small}>{view.scenario.theater}</p>
                      <h3 className={styles.cardTitle}>{view.scenario.callsign}</h3>
                    </div>
                    <span
                      className={styles.status}
                      data-state={view.scenario.status}
                    >
                      {statusLabels[view.scenario.status]}
                    </span>
                  </div>

                  <div className={styles.metricRow}>
                    <span className={styles.scoreBadge}>
                      Score {view.overallScore}
                    </span>
                    <span className={styles.tag}>
                      {view.readyCount} ready team
                      {view.readyCount === 1 ? "" : "s"}
                    </span>
                  </div>

                  <p className={styles.copy}>{view.scenario.summary}</p>

                  <div className={styles.badges}>
                    <span className={styles.tag}>{view.scenario.horizon}</span>
                    <span className={styles.tag}>
                      {view.activePlan?.label ?? "No plan"}
                    </span>
                    <span className={styles.tag}>
                      {view.activeOutcome?.label ?? "No outcome"}
                    </span>
                  </div>

                  <div className={styles.chips}>
                    {view.scenario.blockers.map((blocker) => (
                      <span
                        className={styles.chip}
                        data-severity={blocker.severity}
                        key={blocker.label}
                      >
                        {blocker.label}
                      </span>
                    ))}
                  </div>
                </button>

                <div className={styles.cardFooter}>
                  <button
                    aria-pressed={isPinned}
                    aria-label={`${
                      isPinned ? "Remove" : "Pin"
                    } ${view.scenario.callsign} for review`}
                    className={styles.secondaryButton}
                    onClick={() => onToggleCompare(view.scenario.id)}
                    type="button"
                  >
                    {isPinned ? "Remove from review" : "Pin for review"}
                  </button>
                  <span className={styles.small}>
                    {view.watchCount} watch · {view.blockedCount} blocked
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className={styles.badges}>
        <span className={styles.tag}>{scenarios.length} visible</span>
        <span className={styles.tag}>
          {compareScenarioIds.length} pinned for review
        </span>
        {isPending ? <span className={styles.tag}>Syncing focus</span> : null}
      </div>
    </aside>
  );
}
