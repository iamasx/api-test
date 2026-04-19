import styles from "@/app/mission-briefing/mission-briefing.module.css";
import type { MissionScenario, MissionStatus } from "@/app/mission-briefing/mission-data";
import { statusLabels } from "@/app/mission-briefing/mission-data";

type ScenarioFilter = "all" | MissionStatus;

const filterLabels: Record<ScenarioFilter, string> = { all: "All", ready: "Ready", watch: "Watch", blocked: "Blocked" };

export function ScenarioRail({
  activeScenarioId,
  isPending,
  onFilterChange,
  onQueryChange,
  onSelect,
  query,
  scenarios,
  statusFilter,
}: Readonly<{
  activeScenarioId: string | null;
  isPending: boolean;
  onFilterChange: (nextFilter: ScenarioFilter) => void;
  onQueryChange: (nextQuery: string) => void;
  onSelect: (scenarioId: string) => void;
  query: string;
  scenarios: MissionScenario[];
  statusFilter: ScenarioFilter;
}>) {
  return (
    <aside className={`${styles.panel} ${styles.rail}`}>
      <div>
        <p className={styles.eyebrow}>Scenario Rail</p>
        <h2 className={styles.sectionTitle}>Mission set</h2>
        <p className={styles.muted}>Toggle a card to reload the workspace without leaving the route.</p>
      </div>
      <div>
        <label className={styles.small} htmlFor="mission-scenario-search">Search scenarios</label>
        <input
          className={styles.field}
          id="mission-scenario-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Callsign, lead, or theater"
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
          {scenarios.map((scenario) => (
            <button
              className={styles.cardButton}
              data-active={activeScenarioId === scenario.id}
              key={scenario.id}
              onClick={() => onSelect(scenario.id)}
              type="button"
            >
              <div className={styles.head}>
                <div>
                  <p className={styles.small}>{scenario.theater}</p>
                  <h3 className={styles.cardTitle}>{scenario.callsign}</h3>
                </div>
                <span className={styles.status} data-state={scenario.status}>
                  {statusLabels[scenario.status]}
                </span>
              </div>
              <p className={styles.copy}>{scenario.summary}</p>
              <div className={styles.badges}>
                <span className={styles.tag}>{scenario.horizon}</span>
                <span className={styles.tag}>{scenario.lead}</span>
              </div>
              <div className={styles.chips}>
                {scenario.blockers.map((blocker) => (
                  <span className={styles.chip} data-severity={blocker.severity} key={blocker.label}>
                    {blocker.label}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
      <div className={styles.badges}>
        <span className={styles.tag}>{scenarios.length} visible</span>
        {isPending ? <span className={styles.tag}>Syncing focus</span> : null}
      </div>
    </aside>
  );
}
