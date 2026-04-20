import {
  backlogItems,
  forecastWindows,
  queueSummaries,
  type AgeBand,
  type AgeFilter,
  type BacklogForecastState,
  type BacklogItem,
  type EscalationLevelId,
  type ForecastPoint,
  type ForecastWindow,
  type ForecastWindowId,
  type PriorityBand,
  type PriorityFilter,
  type QueueScope,
  type QueueSummary,
  type QueueTone,
  type ThroughputSummary,
  type ViewMode,
} from "./queue-monitor-data";

export type EscalationStateSnapshot = Record<string, { level: EscalationLevelId }>;

export type QueueDisplay = QueueSummary & {
  activePoint: ForecastPoint | null;
  displayAgingCount: number;
  displayBacklogCount: number;
  displayBreachCount: number;
  displayCarryover: number;
  displayClearedPerHour: number;
  displayIntakePerHour: number;
  displayOldestMinutes: number;
  displayPriorityDelta: number;
  displayPriorityRank: number;
  displayStatusLabel: string;
  displaySummary: string;
  displayTone: QueueTone;
  displayWaitMinutes: number;
};

export type ItemDisplay = BacklogItem & {
  activeForecast: BacklogForecastState | null;
  displayAgeBand: AgeBand;
  displayAgeMinutes: number;
  displayEtaLabel: string;
  displayNextAction: string;
  displayPriorityBand: PriorityBand;
  displayPriorityReason: string;
  displayRiskLabel: string;
};

export type QueueColumn = {
  items: ItemDisplay[];
  queue: QueueDisplay;
};

export type QueueMonitorView = {
  ageCounts: Record<AgeFilter, number>;
  agingCount: number;
  backlogTotal: number;
  breachCount: number;
  columns: QueueColumn[];
  escalatedCount: number;
  forecastWindowMeta: ForecastWindow;
  nextItemId: string | null;
  nextQueueId: string | null;
  priorityCounts: Record<PriorityFilter, number>;
  queueCounts: Record<QueueScope, number>;
  queueEscalations: Record<string, number>;
  queueTotals: Record<string, number>;
  queuesAtRisk: number;
  scopedItems: ItemDisplay[];
  selectedItem: ItemDisplay | null;
  selectedQueue: QueueDisplay | null;
  throughputSummaries: ThroughputSummary[];
};

type BuildQueueMonitorViewOptions = {
  ageFilter: AgeFilter;
  escalationState: EscalationStateSnapshot;
  forecastWindow: ForecastWindowId;
  priorityFilter: PriorityFilter;
  queueScope: QueueScope;
  selectedItemId: string | null;
  selectedQueueId: string | null;
  viewMode: ViewMode;
};

function getForecastWindow(windowId: ForecastWindowId) {
  return forecastWindows.find((window) => window.id === windowId) ?? forecastWindows[0];
}

function getQueueForecastPoint(queue: QueueSummary, windowId: ForecastWindowId) {
  return queue.forecast.find((point) => point.windowId === windowId) ?? queue.forecast[0];
}

function getItemForecastState(item: BacklogItem, windowId: ForecastWindowId) {
  return item.forecast.find((state) => state.windowId === windowId) ?? item.forecast[0];
}

export function matchesQueueScope(tone: QueueTone, scope: QueueScope) {
  if (scope === "watch") {
    return tone !== "stable";
  }

  if (scope === "stable") {
    return tone === "stable";
  }

  return true;
}

export function matchesAgeFilter(ageBand: AgeBand, filter: AgeFilter) {
  if (filter === "aging") {
    return ageBand !== "fresh";
  }

  if (filter === "breach") {
    return ageBand === "breach";
  }

  return true;
}

export function matchesPriorityFilter(priorityBand: PriorityBand, filter: PriorityFilter) {
  if (filter === "expedite") {
    return priorityBand !== "monitor";
  }

  if (filter === "critical") {
    return priorityBand === "critical";
  }

  return true;
}

function buildQueueDisplay(
  queue: QueueSummary,
  viewMode: ViewMode,
  forecastWindow: ForecastWindowId,
) {
  if (viewMode === "forecast") {
    const point = getQueueForecastPoint(queue, forecastWindow);

    return {
      ...queue,
      activePoint: point,
      displayAgingCount: point.agingCount,
      displayBacklogCount: point.backlogCount,
      displayBreachCount: point.breachCount,
      displayCarryover: point.carryover,
      displayClearedPerHour: point.clearedPerHour,
      displayIntakePerHour: point.intakePerHour,
      displayOldestMinutes: point.oldestMinutes,
      displayPriorityDelta: queue.priorityRank - point.priorityRank,
      displayPriorityRank: point.priorityRank,
      displayStatusLabel: point.statusLabel,
      displaySummary: point.explanationSummary,
      displayTone: point.tone,
      displayWaitMinutes: point.projectedWaitMinutes,
    } satisfies QueueDisplay;
  }

  return {
    ...queue,
    activePoint: null,
    displayAgingCount: queue.agingCount,
    displayBacklogCount: queue.backlogCount,
    displayBreachCount: queue.breachCount,
    displayCarryover: queue.carryover,
    displayClearedPerHour: queue.clearedPerHour,
    displayIntakePerHour: queue.intakePerHour,
    displayOldestMinutes: queue.oldestMinutes,
    displayPriorityDelta: 0,
    displayPriorityRank: queue.priorityRank,
    displayStatusLabel: queue.statusLabel,
    displaySummary: queue.prioritySummary,
    displayTone: queue.tone,
    displayWaitMinutes: queue.projectedWaitMinutes,
  } satisfies QueueDisplay;
}

function buildItemDisplay(
  item: BacklogItem,
  viewMode: ViewMode,
  forecastWindow: ForecastWindowId,
) {
  if (viewMode === "forecast") {
    const state = getItemForecastState(item, forecastWindow);

    return {
      ...item,
      activeForecast: state,
      displayAgeBand: state.ageBand,
      displayAgeMinutes: state.ageMinutes,
      displayEtaLabel: state.etaLabel,
      displayNextAction: state.nextAction,
      displayPriorityBand: state.priorityBand,
      displayPriorityReason: state.rationale,
      displayRiskLabel: state.riskLabel,
    } satisfies ItemDisplay;
  }

  return {
    ...item,
    activeForecast: null,
    displayAgeBand: item.ageBand,
    displayAgeMinutes: item.ageMinutes,
    displayEtaLabel: "Current queue state",
    displayNextAction: item.nextAction,
    displayPriorityBand: item.priorityBand,
    displayPriorityReason: item.priorityReason,
    displayRiskLabel: item.blockingSignal,
  } satisfies ItemDisplay;
}

function buildThroughputSummaries(
  queues: QueueDisplay[],
  viewMode: ViewMode,
  forecastWindowMeta: ForecastWindow,
) {
  const totalIntake = queues.reduce((sum, queue) => sum + queue.displayIntakePerHour, 0);
  const totalClearance = queues.reduce(
    (sum, queue) => sum + queue.displayClearedPerHour,
    0,
  );
  const totalCarryover = queues.reduce((sum, queue) => sum + queue.displayCarryover, 0);
  const queuesUnderwater = queues.filter(
    (queue) => queue.displayClearedPerHour < queue.displayIntakePerHour,
  ).length;
  const queuesCritical = queues.filter((queue) => queue.displayTone === "critical").length;

  return [
    {
      id: "inflow",
      label: "Inflow / hr",
      value: `${totalIntake}`,
      note:
        viewMode === "forecast"
          ? `${forecastWindowMeta.note} keeps arrivals elevated in claims and returns.`
          : `${queuesUnderwater} queues are taking in more work than they clear.`,
      tone: totalIntake > totalClearance ? "up" : "flat",
    },
    {
      id: "clearance",
      label: "Clearance / hr",
      value: `${totalClearance}`,
      note:
        viewMode === "forecast"
          ? `Assumes no extra staffing before the ${forecastWindowMeta.label} mark.`
          : "Current staffing is holding only one queue above intake.",
      tone: totalClearance >= totalIntake ? "up" : "down",
    },
    {
      id: "stability",
      label: "Projected carryover",
      value: `${totalCarryover}`,
      note:
        viewMode === "forecast"
          ? `${queuesCritical} queues are forecast to stay in critical territory by ${forecastWindowMeta.label}.`
          : "If unchanged, these tracked anchors remain exposed into the next pass.",
      tone:
        totalCarryover > 4 ? "down" : queues.some((queue) => queue.displayTone !== "stable") ? "flat" : "up",
    },
  ] satisfies ThroughputSummary[];
}

export function buildQueueMonitorView({
  ageFilter,
  escalationState,
  forecastWindow,
  priorityFilter,
  queueScope,
  selectedItemId,
  selectedQueueId,
  viewMode,
}: BuildQueueMonitorViewOptions): QueueMonitorView {
  const forecastWindowMeta = getForecastWindow(forecastWindow);
  const queueDisplays = queueSummaries.map((queue) =>
    buildQueueDisplay(queue, viewMode, forecastWindow),
  );
  const itemDisplays = backlogItems.map((item) =>
    buildItemDisplay(item, viewMode, forecastWindow),
  );
  const visibleQueues = queueDisplays.filter((queue) =>
    matchesQueueScope(queue.displayTone, queueScope),
  );
  const scopedItems = itemDisplays.filter((item) =>
    visibleQueues.some((queue) => queue.id === item.queueId),
  );
  const filteredItems = scopedItems.filter(
    (item) =>
      matchesAgeFilter(item.displayAgeBand, ageFilter) &&
      matchesPriorityFilter(item.displayPriorityBand, priorityFilter),
  );
  const columns = visibleQueues.map((queue) => ({
    items: filteredItems.filter((item) => item.queueId === queue.id),
    queue,
  }));
  const nextQueueId = visibleQueues.some((queue) => queue.id === selectedQueueId)
    ? selectedQueueId
    : visibleQueues[0]?.id ?? null;
  const nextQueueItems =
    columns.find((column) => column.queue.id === nextQueueId)?.items ?? [];
  const nextItemId = nextQueueItems.some((item) => item.id === selectedItemId)
    ? selectedItemId
    : nextQueueItems[0]?.id ?? null;
  const selectedQueue =
    visibleQueues.find((queue) => queue.id === nextQueueId) ?? null;
  const selectedItem =
    nextQueueItems.find((item) => item.id === nextItemId) ?? null;

  const queueCounts = {
    all: queueDisplays.length,
    watch: queueDisplays.filter((queue) => matchesQueueScope(queue.displayTone, "watch"))
      .length,
    stable: queueDisplays.filter((queue) => matchesQueueScope(queue.displayTone, "stable"))
      .length,
  } satisfies Record<QueueScope, number>;

  const ageCounts = {
    all: scopedItems.length,
    aging: scopedItems.filter((item) => matchesAgeFilter(item.displayAgeBand, "aging"))
      .length,
    breach: scopedItems.filter((item) => matchesAgeFilter(item.displayAgeBand, "breach"))
      .length,
  } satisfies Record<AgeFilter, number>;

  const priorityCounts = {
    all: scopedItems.length,
    expedite: scopedItems.filter((item) =>
      matchesPriorityFilter(item.displayPriorityBand, "expedite"),
    ).length,
    critical: scopedItems.filter((item) =>
      matchesPriorityFilter(item.displayPriorityBand, "critical"),
    ).length,
  } satisfies Record<PriorityFilter, number>;

  const queueTotals = Object.fromEntries(
    queueDisplays.map((queue) => [queue.id, queue.displayBacklogCount]),
  ) as Record<string, number>;

  const queueEscalations = Object.fromEntries(
    queueDisplays.map((queue) => [
      queue.id,
      itemDisplays.filter(
        (item) =>
          item.queueId === queue.id && escalationState[item.id]?.level !== "none",
      ).length,
    ]),
  ) as Record<string, number>;

  return {
    ageCounts,
    agingCount: queueDisplays.reduce(
      (sum, queue) => sum + queue.displayAgingCount,
      0,
    ),
    backlogTotal: queueDisplays.reduce(
      (sum, queue) => sum + queue.displayBacklogCount,
      0,
    ),
    breachCount: queueDisplays.reduce(
      (sum, queue) => sum + queue.displayBreachCount,
      0,
    ),
    columns,
    escalatedCount: itemDisplays.filter(
      (item) => escalationState[item.id]?.level !== "none",
    ).length,
    forecastWindowMeta,
    nextItemId,
    nextQueueId,
    priorityCounts,
    queueCounts,
    queueEscalations,
    queueTotals,
    queuesAtRisk: queueDisplays.filter((queue) => queue.displayTone !== "stable")
      .length,
    scopedItems,
    selectedItem,
    selectedQueue,
    throughputSummaries: buildThroughputSummaries(
      queueDisplays,
      viewMode,
      forecastWindowMeta,
    ),
  };
}
