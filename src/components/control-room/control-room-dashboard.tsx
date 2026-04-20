"use client";

import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  activityFilters,
  alertSeverityFilters,
  buildControlRoomSnapshot,
  controlRoomRegions,
  type AlertRemediationAction,
  type AlertSeverityFilter,
  type ActivityFilter,
  type ControlRoomRegion,
  type ControlRoomSnapshot,
  type OperatorPosture,
  type WorkflowEffect,
} from "@/app/control-room/mock-data";
import { ActivityFeed } from "./activity-feed";
import { AlertDrilldownPanel } from "./alert-drilldown-panel";
import { AlertList } from "./alert-list";
import { CommandPalette, type PaletteAction } from "./command-palette";
import { ControlRoomHeader } from "./control-room-header";
import { MetricsGrid } from "./metrics-grid";
import { QuickActions } from "./quick-actions";

type ControlRoomDashboardProps = {
  initialSnapshot: ControlRoomSnapshot;
};

type ActionLogEntry = {
  id: string;
  label: string;
  source: string;
  timeLabel: string;
};

type WorkflowState = {
  actionLog: ActionLogEntry[];
  divertWorkers: boolean;
  freezeDeploys: boolean;
  lastAction: string;
  posture: OperatorPosture;
  samplingRate: number;
  silenceInfoAlerts: boolean;
  stagedActionIds: string[];
};

const commandClock = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const initialWorkflowState: WorkflowState = {
  actionLog: [],
  divertWorkers: false,
  freezeDeploys: true,
  lastAction: "Awaiting operator input. Controls are browser-only.",
  posture: "contain",
  samplingRate: 72,
  silenceInfoAlerts: false,
  stagedActionIds: [],
};

function getDefaultAlertId(snapshot: ControlRoomSnapshot) {
  return (
    snapshot.alerts.find((alert) => alert.severity === "critical")?.id ??
    snapshot.alerts[0]?.id ??
    null
  );
}

function getRegionLabel(region: ControlRoomRegion) {
  return (
    controlRoomRegions.find((candidate) => candidate.id === region)?.label ??
    "Desk"
  );
}

function getFeedFilterLabel(filter: ActivityFilter) {
  return (
    activityFilters.find((candidate) => candidate.id === filter)?.label ?? "All"
  );
}

function getAlertFilterLabel(filter: AlertSeverityFilter) {
  return (
    alertSeverityFilters.find((candidate) => candidate.id === filter)?.label ??
    "All severities"
  );
}

function getSeverityTone(severity: "info" | "warning" | "critical") {
  switch (severity) {
    case "critical":
      return "critical" as const;
    case "warning":
      return "warning" as const;
    default:
      return "default" as const;
  }
}

export function ControlRoomDashboard({
  initialSnapshot,
}: ControlRoomDashboardProps) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [cycle, setCycle] = useState(0);
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("all");
  const [alertFilter, setAlertFilter] = useState<AlertSeverityFilter>("all");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(
    getDefaultAlertId(initialSnapshot),
  );
  const [focusedRegion, setFocusedRegion] =
    useState<ControlRoomRegion>("alerts");
  const [isPaletteOpen, setPaletteOpen] = useState(false);
  const [workflowState, setWorkflowState] =
    useState<WorkflowState>(initialWorkflowState);
  const [isRefreshing, startTransition] = useTransition();
  const metricsSectionRef = useRef<HTMLElement | null>(null);
  const feedSectionRef = useRef<HTMLElement | null>(null);
  const alertsSectionRef = useRef<HTMLElement | null>(null);
  const drilldownSectionRef = useRef<HTMLElement | null>(null);
  const controlsSectionRef = useRef<HTMLElement | null>(null);

  const warningCount = snapshot.alerts.filter(
    (alert) => alert.severity === "warning",
  ).length;
  const criticalCount = snapshot.alerts.filter(
    (alert) => alert.severity === "critical",
  ).length;
  const visibleAlerts = snapshot.alerts.filter(
    (alert) => alertFilter === "all" || alert.severity === alertFilter,
  );

  useEffect(() => {
    if (!isPaletteOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPaletteOpen]);

  const handleGlobalKeydown = useEffectEvent((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setPaletteOpen((currentValue) => !currentValue);
      return;
    }

    if (event.key === "Escape" && isPaletteOpen) {
      event.preventDefault();
      setPaletteOpen(false);
    }
  });

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      handleGlobalKeydown(event);
    }

    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, []);

  const resolvedSelectedAlertId = snapshot.alerts.some(
    (alert) => alert.id === selectedAlertId,
  )
    ? selectedAlertId
    : getDefaultAlertId(snapshot);
  const selectedAlert =
    snapshot.alerts.find((alert) => alert.id === resolvedSelectedAlertId) ??
    null;
  const relatedMetrics = selectedAlert
    ? snapshot.metrics.filter((metric) =>
        selectedAlert.relatedMetricIds.includes(metric.id),
      )
    : [];

  function focusRegion(region: ControlRoomRegion) {
    setFocusedRegion(region);

    const node =
      region === "metrics"
        ? metricsSectionRef.current
        : region === "feed"
          ? feedSectionRef.current
          : region === "alerts"
            ? alertsSectionRef.current
            : region === "drilldown"
              ? drilldownSectionRef.current
              : controlsSectionRef.current;
    if (!node) {
      return;
    }

    node.scrollIntoView?.({ behavior: "smooth", block: "start" });
    node.focus();
  }

  function refreshSnapshot() {
    const nextCycle = cycle + 1;

    startTransition(() => {
      setCycle(nextCycle);
      setSnapshot(buildControlRoomSnapshot(nextCycle, new Date()));
    });
  }

  function stageOperatorAction(
    label: string,
    source: string,
    effects: WorkflowEffect[],
    stagedActionId?: string,
  ) {
    const issuedAt = commandClock.format(new Date());
    let nextFeedFilter: ActivityFilter | null = null;
    let nextAlertFilter: AlertSeverityFilter | null = null;
    let nextFocusRegion: ControlRoomRegion | null = null;
    let nextAlertId: string | null = null;
    let shouldRefresh = false;

    setWorkflowState((currentState) => {
      let nextFreezeDeploys = currentState.freezeDeploys;
      let nextDivertWorkers = currentState.divertWorkers;
      let nextSamplingRate = currentState.samplingRate;
      let nextPosture = currentState.posture;
      let nextSilenceInfoAlerts = currentState.silenceInfoAlerts;

      for (const effect of effects) {
        switch (effect.type) {
          case "focus-region":
            nextFocusRegion = effect.region;
            break;
          case "refresh-snapshot":
            shouldRefresh = true;
            break;
          case "select-alert":
            nextAlertId = effect.alertId;
            if (nextFocusRegion === null) {
              nextFocusRegion = "drilldown";
            }
            break;
          case "set-alert-filter":
            nextAlertFilter = effect.filter;
            break;
          case "set-divert-workers":
            nextDivertWorkers = effect.value;
            break;
          case "set-feed-filter":
            nextFeedFilter = effect.filter;
            break;
          case "set-freeze-deploys":
            nextFreezeDeploys = effect.value;
            break;
          case "set-posture":
            nextPosture = effect.posture;
            break;
          case "set-sampling-rate":
            nextSamplingRate = effect.value;
            break;
          case "set-silence-info-alerts":
            nextSilenceInfoAlerts = effect.value;
            break;
        }
      }

      return {
        actionLog: [
          {
            id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            label,
            source,
            timeLabel: issuedAt,
          },
          ...currentState.actionLog,
        ].slice(0, 5),
        divertWorkers: nextDivertWorkers,
        freezeDeploys: nextFreezeDeploys,
        lastAction: `${label} staged at ${issuedAt} via ${source}. No request sent.`,
        posture: nextPosture,
        samplingRate: nextSamplingRate,
        silenceInfoAlerts: nextSilenceInfoAlerts,
        stagedActionIds:
          stagedActionId && !currentState.stagedActionIds.includes(stagedActionId)
            ? [stagedActionId, ...currentState.stagedActionIds]
            : currentState.stagedActionIds,
      };
    });

    if (nextFeedFilter !== null) {
      setActivityFilter(nextFeedFilter);
    }

    if (nextAlertFilter !== null) {
      setAlertFilter(nextAlertFilter);
    }

    if (nextAlertId !== null) {
      setSelectedAlertId(nextAlertId);
    }

    if (shouldRefresh) {
      refreshSnapshot();
    }

    if (nextFocusRegion !== null) {
      window.setTimeout(() => {
        focusRegion(nextFocusRegion as ControlRoomRegion);
      }, 0);
    }
  }

  function openAlertDrilldown(alertId: string, source: string) {
    const targetAlert = snapshot.alerts.find((alert) => alert.id === alertId);

    stageOperatorAction(
      `Opened drilldown for ${targetAlert?.title ?? "selected alert"}`,
      source,
      [
        { type: "select-alert", alertId },
        { type: "focus-region", region: "drilldown" },
      ],
    );
  }

  function handleActivityFilterChange(filter: ActivityFilter, source: string) {
    stageOperatorAction(
      filter === "all" ? "Cleared activity filter" : `Filtered activity to ${filter}`,
      source,
      [
        { type: "set-feed-filter", filter },
        { type: "focus-region", region: "feed" },
      ],
    );
  }

  function handleAlertFilterChange(
    filter: AlertSeverityFilter,
    source: string,
  ) {
    stageOperatorAction(
      filter === "all"
        ? "Cleared alert severity filter"
        : `Filtered queue to ${filter} alerts`,
      source,
      [
        { type: "set-alert-filter", filter },
        { type: "focus-region", region: "alerts" },
      ],
    );
  }

  function handleRemediation(action: AlertRemediationAction) {
    if (!selectedAlert) {
      return;
    }

    stageOperatorAction(
      `${selectedAlert.title}: ${action.label}`,
      "Alert drilldown",
      action.effects,
      action.id,
    );
  }

  const paletteActions: PaletteAction[] = [
    {
      id: "desk-refresh",
      group: "Desk",
      label: "Refresh mock metrics",
      description: "Rotate the desk snapshot and advance all local mock signals.",
      keywords: ["refresh", "reload", "snapshot", "desk"],
      onSelect: () =>
        stageOperatorAction("Refreshed desk snapshot", "Command palette", [
          { type: "refresh-snapshot" },
        ]),
    },
    {
      id: "nav-metrics",
      group: "Navigate",
      label: "Focus metrics grid",
      description: "Jump to the live health signals and related metric cards.",
      keywords: ["metrics", "signals", "availability", "latency"],
      onSelect: () =>
        stageOperatorAction("Focused metrics grid", "Command palette", [
          { type: "focus-region", region: "metrics" },
        ]),
    },
    {
      id: "nav-feed",
      group: "Navigate",
      label: "Focus activity feed",
      description: "Move directly to the operator timeline and active feed lens.",
      keywords: ["feed", "timeline", "activity"],
      onSelect: () =>
        stageOperatorAction("Focused activity feed", "Command palette", [
          { type: "focus-region", region: "feed" },
        ]),
    },
    {
      id: "nav-alerts",
      group: "Navigate",
      label: "Focus alert queue",
      description: "Jump to the current alert list and severity filters.",
      keywords: ["alerts", "queue", "severity"],
      onSelect: () =>
        stageOperatorAction("Focused alert queue", "Command palette", [
          { type: "focus-region", region: "alerts" },
        ]),
    },
    {
      id: "nav-drilldown",
      group: "Navigate",
      label: "Focus alert drilldown",
      description: "Center the desk on the selected alert context panel.",
      keywords: ["drilldown", "incident", "context"],
      onSelect: () =>
        stageOperatorAction("Focused alert drilldown", "Command palette", [
          { type: "focus-region", region: "drilldown" },
        ]),
    },
    {
      id: "nav-controls",
      group: "Navigate",
      label: "Focus drill controls",
      description: "Jump to local operator controls and the command log.",
      keywords: ["controls", "quick actions", "posture"],
      onSelect: () =>
        stageOperatorAction("Focused drill controls", "Command palette", [
          { type: "focus-region", region: "controls" },
        ]),
    },
    {
      id: "filter-feed-all",
      group: "Filters",
      label: "Show all activity",
      description: "Reset the timeline lens and reveal every feed category.",
      keywords: ["timeline", "all", "activity"],
      onSelect: () => handleActivityFilterChange("all", "Command palette"),
    },
    {
      id: "filter-feed-incidents",
      group: "Filters",
      label: "Filter timeline to incidents",
      description: "Trim the feed to incident escalations and bridge updates.",
      keywords: ["incidents", "timeline", "feed"],
      tone: "warning",
      onSelect: () => handleActivityFilterChange("incidents", "Command palette"),
    },
    {
      id: "filter-feed-automation",
      group: "Filters",
      label: "Filter timeline to automation",
      description: "Surface bots, replays, and guardrail automation decisions.",
      keywords: ["automation", "timeline", "feed"],
      onSelect: () => handleActivityFilterChange("automation", "Command palette"),
    },
    {
      id: "filter-alerts-all",
      group: "Filters",
      label: "Show all alerts",
      description: "Clear the severity filter for the operator queue.",
      keywords: ["alerts", "all", "queue"],
      onSelect: () => handleAlertFilterChange("all", "Command palette"),
    },
    {
      id: "filter-alerts-critical",
      group: "Filters",
      label: "Show critical alerts only",
      description: "Reduce the queue to the highest-severity incidents.",
      keywords: ["alerts", "critical", "queue"],
      tone: "critical",
      onSelect: () => handleAlertFilterChange("critical", "Command palette"),
    },
    {
      id: "filter-alerts-warning",
      group: "Filters",
      label: "Show warning alerts only",
      description: "Focus the queue on warnings that still need operator review.",
      keywords: ["alerts", "warning", "queue"],
      tone: "warning",
      onSelect: () => handleAlertFilterChange("warning", "Command palette"),
    },
    {
      id: "control-freeze",
      group: "Controls",
      label: workflowState.freezeDeploys
        ? "Reopen deploy lane"
        : "Freeze deploy lane",
      description: workflowState.freezeDeploys
        ? "Lift the local deploy freeze staged in the drill controls."
        : "Stage a local deploy freeze for the canary lane.",
      keywords: ["deploy", "freeze", "lane"],
      tone: workflowState.freezeDeploys ? "default" : "warning",
      onSelect: () =>
        stageOperatorAction(
          workflowState.freezeDeploys
            ? "Reopened deploy lane"
            : "Froze deploy lane",
          "Command palette",
          [
            {
              type: "set-freeze-deploys",
              value: !workflowState.freezeDeploys,
            },
            { type: "focus-region", region: "controls" },
          ],
        ),
    },
    {
      id: "control-divert-workers",
      group: "Controls",
      label: workflowState.divertWorkers
        ? "Normalize background workers"
        : "Divert background workers",
      description: workflowState.divertWorkers
        ? "Return workers to normal routing."
        : "Borrow spare capacity for the canary fan-out lane.",
      keywords: ["workers", "queue", "background"],
      tone: workflowState.divertWorkers ? "default" : "warning",
      onSelect: () =>
        stageOperatorAction(
          workflowState.divertWorkers
            ? "Normalized background workers"
            : "Diverted background workers",
          "Command palette",
          [
            {
              type: "set-divert-workers",
              value: !workflowState.divertWorkers,
            },
            { type: "focus-region", region: "controls" },
          ],
        ),
    },
    {
      id: "control-info-alerts",
      group: "Controls",
      label: workflowState.silenceInfoAlerts
        ? "Resume info alerts"
        : "Silence info alerts",
      description: workflowState.silenceInfoAlerts
        ? "Restore lower-severity info alerts to the local workflow."
        : "Mute lower-severity info alerts locally while triaging incidents.",
      keywords: ["info", "mute", "silence"],
      onSelect: () =>
        stageOperatorAction(
          workflowState.silenceInfoAlerts
            ? "Resumed info alerts"
            : "Silenced info alerts",
          "Command palette",
          [
            {
              type: "set-silence-info-alerts",
              value: !workflowState.silenceInfoAlerts,
            },
            { type: "focus-region", region: "controls" },
          ],
        ),
    },
    {
      id: "control-dry-failover",
      group: "Controls",
      label: "Run dry failover",
      description: "Stage the local failover drill without leaving Control Room.",
      keywords: ["drill", "failover", "dry run"],
      onSelect: () =>
        stageOperatorAction("Dry failover sequence queued", "Command palette", [
          { type: "focus-region", region: "controls" },
        ]),
    },
    ...snapshot.alerts.map((alert) => ({
      id: `alert-${alert.id}`,
      group: "Alert drilldowns",
      label: `Open ${alert.title}`,
      description: `${alert.severity} alert owned by ${alert.owner}. ${alert.impact}`,
      keywords: [alert.service, alert.region, ...alert.tags],
      tone: getSeverityTone(alert.severity),
      onSelect: () => openAlertDrilldown(alert.id, "Command palette"),
    })),
    ...(selectedAlert
      ? selectedAlert.remediationActions.map((action) => ({
          id: `remediation-${action.id}`,
          group: "Selected alert",
          label: action.label,
          description: `${selectedAlert.title}: ${action.description}`,
          keywords: [selectedAlert.title, ...selectedAlert.tags],
          tone: action.tone,
          onSelect: () => handleRemediation(action),
        }))
      : []),
  ];

  return (
    <>
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,95,70,0.18),transparent_32%),linear-gradient(180deg,#021014_0%,#031a21_55%,#01070c_100%)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <ControlRoomHeader
            activeAlertFilterLabel={getAlertFilterLabel(alertFilter)}
            activeFeedFilterLabel={getFeedFilterLabel(activityFilter)}
            activeRegionLabel={getRegionLabel(focusedRegion)}
            criticalCount={criticalCount}
            environment={snapshot.environment}
            filteredAlertCount={visibleAlerts.length}
            isRefreshing={isRefreshing}
            lastUpdated={snapshot.lastUpdated}
            selectedAlertTitle={selectedAlert?.title ?? null}
            warningCount={warningCount}
            onOpenPalette={() => setPaletteOpen(true)}
            onRefresh={refreshSnapshot}
          />
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,1fr)]">
            <div className="space-y-6">
              <MetricsGrid
                activeMetricIds={selectedAlert?.relatedMetricIds ?? []}
                isSpotlighted={focusedRegion === "metrics"}
                metrics={snapshot.metrics}
                sectionRef={metricsSectionRef}
              />
              <ActivityFeed
                activeFilter={activityFilter}
                highlightAlertId={selectedAlert?.id ?? null}
                isSpotlighted={focusedRegion === "feed"}
                items={snapshot.feed}
                onFilterChange={(filter) =>
                  handleActivityFilterChange(filter, "Activity feed")
                }
                sectionRef={feedSectionRef}
              />
            </div>
            <div className="space-y-6">
              <AlertList
                activeSeverityFilter={alertFilter}
                alerts={snapshot.alerts}
                isInfoSilenced={workflowState.silenceInfoAlerts}
                isSpotlighted={focusedRegion === "alerts"}
                selectedAlertId={selectedAlert?.id ?? null}
                onSelectAlert={(alertId) => openAlertDrilldown(alertId, "Alert queue")}
                onSeverityFilterChange={(filter) =>
                  handleAlertFilterChange(filter, "Alert queue")
                }
                sectionRef={alertsSectionRef}
              />
              <AlertDrilldownPanel
                alert={selectedAlert}
                isInfoSilenced={workflowState.silenceInfoAlerts}
                isSpotlighted={focusedRegion === "drilldown"}
                relatedMetrics={relatedMetrics}
                stagedActionIds={workflowState.stagedActionIds}
                onRunRemediation={handleRemediation}
                sectionRef={drilldownSectionRef}
              />
              <QuickActions
                actionLog={workflowState.actionLog}
                divertWorkers={workflowState.divertWorkers}
                freezeDeploys={workflowState.freezeDeploys}
                isSpotlighted={focusedRegion === "controls"}
                lastAction={workflowState.lastAction}
                posture={workflowState.posture}
                samplingRate={workflowState.samplingRate}
                silenceInfoAlerts={workflowState.silenceInfoAlerts}
                onRunDryFailover={() =>
                  stageOperatorAction(
                    "Dry failover sequence queued",
                    "Drill controls",
                    [{ type: "focus-region", region: "controls" }],
                  )
                }
                onSetPosture={(posture) =>
                  stageOperatorAction(
                    `Set operator posture to ${posture}`,
                    "Drill controls",
                    [{ type: "set-posture", posture }],
                  )
                }
                onSetSamplingRate={(value) =>
                  stageOperatorAction(
                    `Adjusted event sampling to ${value}%`,
                    "Drill controls",
                    [{ type: "set-sampling-rate", value }],
                  )
                }
                onToggleDivertWorkers={() =>
                  stageOperatorAction(
                    workflowState.divertWorkers
                      ? "Normalized background workers"
                      : "Diverted background workers",
                    "Drill controls",
                    [
                      {
                        type: "set-divert-workers",
                        value: !workflowState.divertWorkers,
                      },
                    ],
                  )
                }
                onToggleFreezeDeploys={() =>
                  stageOperatorAction(
                    workflowState.freezeDeploys
                      ? "Reopened deploy lane"
                      : "Froze deploy lane",
                    "Drill controls",
                    [
                      {
                        type: "set-freeze-deploys",
                        value: !workflowState.freezeDeploys,
                      },
                    ],
                  )
                }
                onToggleSilenceInfoAlerts={() =>
                  stageOperatorAction(
                    workflowState.silenceInfoAlerts
                      ? "Resumed info alerts"
                      : "Silenced info alerts",
                    "Drill controls",
                    [
                      {
                        type: "set-silence-info-alerts",
                        value: !workflowState.silenceInfoAlerts,
                      },
                    ],
                  )
                }
                sectionRef={controlsSectionRef}
              />
            </div>
          </div>
        </div>
      </main>

      {isPaletteOpen ? (
        <CommandPalette
          actions={paletteActions}
          selectedAlertTitle={selectedAlert?.title ?? null}
          onClose={() => setPaletteOpen(false)}
        />
      ) : null}
    </>
  );
}
