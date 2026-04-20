import {
  balancingScenarios,
  laneExceptions,
  packageSummaries,
  shipmentLanes,
  type BalancingScenario,
  type BalancingScenarioMove,
  type LaneException,
  type PackageSummary,
  type ParcelGroup,
  type ScenarioExceptionImpact,
  type ShipmentLane,
  type ShipmentLaneTone,
} from "./parcel-hub-data";

export type ProjectedParcelGroup = ParcelGroup & {
  baselineCount: number;
  delta: number;
};

export type ProjectedLaneExceptionState =
  | "active"
  | "softened"
  | "resolved"
  | "introduced";

export type ProjectedLaneException = LaneException & {
  previewState: ProjectedLaneExceptionState;
  isResolved: boolean;
  isScenarioPreview: boolean;
  previewLabel: string;
  previewNote: string;
  canToggleResolved: boolean;
};

export type ProjectedPackageSummary = PackageSummary & {
  movedParcels: number;
  slaRiskDelta: number;
  projectionNote: string;
  projectionStatus: "steady" | "improved" | "watch";
};

export type ProjectedLane = Omit<ShipmentLane, "parcelGroups" | "tone" | "statusLabel" | "checkpoint" | "balanceNote"> & {
  parcelGroups: ProjectedParcelGroup[];
  baseTone: ShipmentLaneTone;
  projectedTone: ShipmentLaneTone;
  baseStatusLabel: string;
  projectedStatusLabel: string;
  baseCheckpoint: string;
  projectedCheckpoint: string;
  baseBalanceNote: string;
  projectedBalanceNote: string;
  baseStagedParcels: number;
  stagedParcels: number;
  basePressurePercent: number;
  pressurePercent: number;
  pressureDelta: number;
  headroomParcels: number;
  projectedDelayedParcels: number;
  delayedDelta: number;
  projectedSlaRiskParcels: number;
  slaRiskDelta: number;
  projectedOpenExceptions: number;
  projectedResolvedExceptions: number;
  outboundMoves: BalancingScenarioMove[];
  inboundMoves: BalancingScenarioMove[];
  projectedExceptions: ProjectedLaneException[];
};

export type ScenarioCard = {
  scenarioId: string | null;
  label: string;
  summary: string;
  postureLabel: string;
  projectedOpenExceptions: number;
  openExceptionsDelta: number;
  projectedSlaRiskParcels: number;
  slaRiskDelta: number;
  projectedPeakPressure: number;
  peakPressureDelta: number;
  projectedDelayedParcels: number;
  delayedParcelsDelta: number;
  introducedRiskCount: number;
  resolvedInPreview: number;
  moves: BalancingScenarioMove[];
  operator: string;
  dispatchWindow: string;
  tradeoff: string;
  comparisonNote: string;
};

export type ParcelHubProjectionSummary = {
  totalParcels: number;
  currentDelayedParcels: number;
  projectedDelayedParcels: number;
  delayedParcelsDelta: number;
  currentOpenExceptions: number;
  projectedOpenExceptions: number;
  openExceptionsDelta: number;
  currentResolvedExceptions: number;
  projectedResolvedExceptions: number;
  currentSlaRiskParcels: number;
  projectedSlaRiskParcels: number;
  slaRiskParcelsDelta: number;
  currentPeakPressure: number;
  projectedPeakPressure: number;
  peakPressureDelta: number;
  currentWatchLanes: number;
  projectedWatchLanes: number;
  watchLanesDelta: number;
  introducedRiskCount: number;
  resolvedInPreview: number;
  softenedInPreview: number;
};

export type ParcelHubProjection = {
  activeScenarioId: string | null;
  activeScenario: BalancingScenario | null;
  lanes: ProjectedLane[];
  packageSummaries: ProjectedPackageSummary[];
  laneCounts: Record<"all" | "watch" | "steady", number>;
  summary: ParcelHubProjectionSummary;
  scenarioCards: ScenarioCard[];
};

type ProjectScenarioResult = Omit<ParcelHubProjection, "scenarioCards">;

function sumParcelGroups(groups: Pick<ParcelGroup, "count">[]) {
  return groups.reduce((sum, group) => sum + group.count, 0);
}

function toPressurePercent(total: number, capacity: number) {
  return Math.round((total / capacity) * 100);
}

function clampCount(value: number) {
  return value < 0 ? 0 : value;
}

function findScenario(scenarioId: string | null) {
  if (!scenarioId) {
    return null;
  }

  return balancingScenarios.find((scenario) => scenario.id === scenarioId) ?? null;
}

function buildExceptionModel(
  laneId: string,
  resolvedIds: Record<string, boolean>,
  scenario: BalancingScenario | null,
) {
  const impactsByExceptionId = new Map<string, ScenarioExceptionImpact>();
  const introducedByLaneId = new Map<string, ScenarioExceptionImpact[]>();

  if (scenario) {
    scenario.exceptionImpacts.forEach((impact) => {
      if (impact.existingExceptionId) {
        impactsByExceptionId.set(impact.existingExceptionId, impact);
        return;
      }

      const current = introducedByLaneId.get(impact.laneId) ?? [];
      current.push(impact);
      introducedByLaneId.set(impact.laneId, current);
    });
  }

  const projectedExceptions = laneExceptions
    .filter((exception) => exception.laneId === laneId)
    .map<ProjectedLaneException>((exception) => {
      const impact = impactsByExceptionId.get(exception.id);
      const resolvedLocally = Boolean(resolvedIds[exception.id]);
      const previewState: ProjectedLaneExceptionState = impact
        ? impact.change === "resolve"
          ? "resolved"
          : "softened"
        : "active";
      const isResolved = resolvedLocally || previewState === "resolved";

      return {
        ...exception,
        previewState,
        isResolved,
        isScenarioPreview: false,
        previewLabel: resolvedLocally
          ? "Resolved locally"
          : previewState === "resolved"
            ? "Clears in preview"
            : previewState === "softened"
              ? "Risk reduced in preview"
              : "Current exposure",
        previewNote: resolvedLocally
          ? "Local marker is already applied to this exception."
          : impact?.slaRiskNote ?? exception.slaRiskNote,
        canToggleResolved: previewState !== "resolved",
        severity: impact?.severity ?? exception.severity,
      };
    });

  const introducedImpacts = introducedByLaneId.get(laneId) ?? [];

  introducedImpacts.forEach((impact) => {
    projectedExceptions.push({
      id: impact.id,
      laneId: impact.laneId,
      type: impact.type,
      title: impact.title,
      detail: impact.detail,
      severity: impact.severity,
      owner: impact.owner,
      updatedAt: "Preview",
      affectedParcels: impact.affectedParcels,
      slaRiskNote: impact.slaRiskNote,
      previewState: "introduced",
      isResolved: false,
      isScenarioPreview: true,
      previewLabel: "New risk in preview",
      previewNote: impact.slaRiskNote,
      canToggleResolved: false,
    });
  });

  return projectedExceptions;
}

function applyScenarioMoves(
  lane: ShipmentLane,
  moves: BalancingScenarioMove[],
): ProjectedParcelGroup[] {
  const projectedGroups = lane.parcelGroups.map<ProjectedParcelGroup>((group) => ({
    ...group,
    baselineCount: group.count,
    delta: 0,
  }));

  moves.forEach((move) => {
    if (move.fromLaneId === lane.id) {
      const sourceGroup = projectedGroups.find(
        (group) => group.summaryId === move.summaryId,
      );

      if (sourceGroup) {
        sourceGroup.count = clampCount(sourceGroup.count - move.parcelCount);
        sourceGroup.delta = sourceGroup.count - sourceGroup.baselineCount;
      }
    }

    if (move.toLaneId === lane.id) {
      const targetGroup = projectedGroups.find(
        (group) => group.summaryId === move.summaryId,
      );

      if (targetGroup) {
        targetGroup.count += move.parcelCount;
        targetGroup.delta = targetGroup.count - targetGroup.baselineCount;
        return;
      }

      projectedGroups.push({
        id: `${lane.id}-${move.summaryId}-preview`,
        summaryId: move.summaryId,
        label: move.label,
        count: move.parcelCount,
        statusLabel: move.toStatusLabel,
        zone: move.toZone,
        baselineCount: 0,
        delta: move.parcelCount,
      });
    }
  });

  return projectedGroups;
}

function projectScenarioState(
  scenarioId: string | null,
  resolvedIds: Record<string, boolean>,
): ProjectScenarioResult {
  const activeScenario = findScenario(scenarioId);
  const moves = activeScenario?.moves ?? [];

  const lanes = shipmentLanes.map<ProjectedLane>((lane) => {
    const projectedGroups = applyScenarioMoves(lane, moves);
    const laneEffect = activeScenario?.laneEffects.find(
      (effect) => effect.laneId === lane.id,
    );
    const projectedExceptions = buildExceptionModel(
      lane.id,
      resolvedIds,
      activeScenario,
    );
    const baseStagedParcels = sumParcelGroups(lane.parcelGroups);
    const stagedParcels = sumParcelGroups(projectedGroups);
    const basePressurePercent = toPressurePercent(baseStagedParcels, lane.capacity);
    const pressurePercent = toPressurePercent(stagedParcels, lane.capacity);
    const projectedDelayedParcels = clampCount(
      lane.delayedParcels + (laneEffect?.delayedParcelsDelta ?? 0),
    );
    const projectedSlaRiskParcels = clampCount(
      lane.slaRiskParcels + (laneEffect?.slaRiskParcelsDelta ?? 0),
    );

    return {
      ...lane,
      parcelGroups: projectedGroups,
      baseTone: lane.tone,
      projectedTone: laneEffect?.tone ?? lane.tone,
      baseStatusLabel: lane.statusLabel,
      projectedStatusLabel: laneEffect?.statusLabel ?? lane.statusLabel,
      baseCheckpoint: lane.checkpoint,
      projectedCheckpoint: laneEffect?.checkpoint ?? lane.checkpoint,
      baseBalanceNote: lane.balanceNote,
      projectedBalanceNote: laneEffect?.balanceNote ?? lane.balanceNote,
      baseStagedParcels,
      stagedParcels,
      basePressurePercent,
      pressurePercent,
      pressureDelta: pressurePercent - basePressurePercent,
      headroomParcels: lane.capacity - stagedParcels,
      projectedDelayedParcels,
      delayedDelta: projectedDelayedParcels - lane.delayedParcels,
      projectedSlaRiskParcels,
      slaRiskDelta: projectedSlaRiskParcels - lane.slaRiskParcels,
      projectedOpenExceptions: projectedExceptions.filter(
        (exception) => !exception.isResolved,
      ).length,
      projectedResolvedExceptions: projectedExceptions.filter(
        (exception) => exception.isResolved,
      ).length,
      outboundMoves: moves.filter((move) => move.fromLaneId === lane.id),
      inboundMoves: moves.filter((move) => move.toLaneId === lane.id),
      projectedExceptions,
    };
  });

  const totalParcels = packageSummaries.reduce(
    (sum, summary) => sum + summary.count,
    0,
  );
  const currentDelayedParcels = shipmentLanes.reduce(
    (sum, lane) => sum + lane.delayedParcels,
    0,
  );
  const projectedDelayedParcels = lanes.reduce(
    (sum, lane) => sum + lane.projectedDelayedParcels,
    0,
  );
  const currentOpenExceptions = laneExceptions.filter(
    (exception) => !resolvedIds[exception.id],
  ).length;
  const currentResolvedExceptions = laneExceptions.filter(
    (exception) => resolvedIds[exception.id],
  ).length;
  const projectedOpenExceptions = lanes.reduce(
    (sum, lane) => sum + lane.projectedOpenExceptions,
    0,
  );
  const projectedResolvedExceptions = lanes.reduce(
    (sum, lane) => sum + lane.projectedResolvedExceptions,
    0,
  );
  const currentSlaRiskParcels = shipmentLanes.reduce(
    (sum, lane) => sum + lane.slaRiskParcels,
    0,
  );
  const projectedSlaRiskParcels = lanes.reduce(
    (sum, lane) => sum + lane.projectedSlaRiskParcels,
    0,
  );
  const currentPeakPressure = Math.max(
    ...shipmentLanes.map((lane) =>
      toPressurePercent(sumParcelGroups(lane.parcelGroups), lane.capacity),
    ),
  );
  const projectedPeakPressure = Math.max(
    ...lanes.map((lane) => lane.pressurePercent),
  );
  const currentWatchLanes = shipmentLanes.filter(
    (lane) => lane.tone !== "steady",
  ).length;
  const projectedWatchLanes = lanes.filter(
    (lane) => lane.projectedTone !== "steady",
  ).length;

  const packageEffectMap = new Map(
    (activeScenario?.packageEffects ?? []).map((effect) => [
      effect.summaryId,
      effect,
    ]),
  );

  const projectedPackageSummaries = packageSummaries.map<ProjectedPackageSummary>(
    (summary) => {
      const effect = packageEffectMap.get(summary.id);

      return {
        ...summary,
        movedParcels: effect?.movedParcels ?? 0,
        slaRiskDelta: effect?.slaRiskDelta ?? 0,
        projectionNote: effect?.note ?? summary.note,
        projectionStatus: effect?.status ?? "steady",
      };
    },
  );

  return {
    activeScenarioId: activeScenario?.id ?? null,
    activeScenario,
    lanes,
    packageSummaries: projectedPackageSummaries,
    laneCounts: {
      all: lanes.length,
      watch: lanes.filter((lane) => lane.projectedTone !== "steady").length,
      steady: lanes.filter((lane) => lane.projectedTone === "steady").length,
    },
    summary: {
      totalParcels,
      currentDelayedParcels,
      projectedDelayedParcels,
      delayedParcelsDelta: projectedDelayedParcels - currentDelayedParcels,
      currentOpenExceptions,
      projectedOpenExceptions,
      openExceptionsDelta: projectedOpenExceptions - currentOpenExceptions,
      currentResolvedExceptions,
      projectedResolvedExceptions,
      currentSlaRiskParcels,
      projectedSlaRiskParcels,
      slaRiskParcelsDelta: projectedSlaRiskParcels - currentSlaRiskParcels,
      currentPeakPressure,
      projectedPeakPressure,
      peakPressureDelta: projectedPeakPressure - currentPeakPressure,
      currentWatchLanes,
      projectedWatchLanes,
      watchLanesDelta: projectedWatchLanes - currentWatchLanes,
      introducedRiskCount:
        activeScenario?.exceptionImpacts.filter(
          (impact) => impact.change === "introduce",
        ).length ?? 0,
      resolvedInPreview:
        activeScenario?.exceptionImpacts.filter(
          (impact) => impact.change === "resolve",
        ).length ?? 0,
      softenedInPreview:
        activeScenario?.exceptionImpacts.filter(
          (impact) => impact.change === "soften",
        ).length ?? 0,
    },
  };
}

export function buildParcelHubProjection(
  scenarioId: string | null,
  resolvedIds: Record<string, boolean>,
): ParcelHubProjection {
  const projection = projectScenarioState(scenarioId, resolvedIds);
  const scenarioCards: ScenarioCard[] = [
    {
      scenarioId: null,
      label: "Current dispatch",
      summary:
        "No simulated reassignments. The route stays on the live queue and exception posture.",
      postureLabel: "Current state",
      projectedOpenExceptions: projection.summary.currentOpenExceptions,
      openExceptionsDelta: 0,
      projectedSlaRiskParcels: projection.summary.currentSlaRiskParcels,
      slaRiskDelta: 0,
      projectedPeakPressure: projection.summary.currentPeakPressure,
      peakPressureDelta: 0,
      projectedDelayedParcels: projection.summary.currentDelayedParcels,
      delayedParcelsDelta: 0,
      introducedRiskCount: 0,
      resolvedInPreview: 0,
      moves: [],
      operator: "Current staffing",
      dispatchWindow: "No additional hold",
      tradeoff: "Keeps the present pressure and exception queue intact.",
      comparisonNote: "Reference state for all route-balancing previews.",
    },
    ...balancingScenarios.map<ScenarioCard>((scenario) => {
      const snapshot = projectScenarioState(scenario.id, resolvedIds);

      return {
        scenarioId: scenario.id,
        label: scenario.label,
        summary: scenario.summary,
        postureLabel:
          scenario.posture === "aggressive"
            ? "Aggressive"
            : scenario.posture === "protective"
              ? "Protective"
              : "Conservative",
        projectedOpenExceptions: snapshot.summary.projectedOpenExceptions,
        openExceptionsDelta: snapshot.summary.openExceptionsDelta,
        projectedSlaRiskParcels: snapshot.summary.projectedSlaRiskParcels,
        slaRiskDelta: snapshot.summary.slaRiskParcelsDelta,
        projectedPeakPressure: snapshot.summary.projectedPeakPressure,
        peakPressureDelta: snapshot.summary.peakPressureDelta,
        projectedDelayedParcels: snapshot.summary.projectedDelayedParcels,
        delayedParcelsDelta: snapshot.summary.delayedParcelsDelta,
        introducedRiskCount: snapshot.summary.introducedRiskCount,
        resolvedInPreview: snapshot.summary.resolvedInPreview,
        moves: scenario.moves,
        operator: scenario.operator,
        dispatchWindow: scenario.dispatchWindow,
        tradeoff: scenario.tradeoff,
        comparisonNote: scenario.comparisonNote,
      };
    }),
  ];

  return {
    ...projection,
    scenarioCards,
  };
}
