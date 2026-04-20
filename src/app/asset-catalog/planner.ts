import {
  assetCatalogItems,
  assetCategories,
  assetForecasts,
  bundleBlueprints,
  crewProfiles,
  planningWindows,
  reservationIntents,
  reservationPreviews,
  type AssetCatalogItem,
  type AssetCategory,
  type AssetForecast,
  type BundleBlueprint,
  type CrewProfile,
  type CrewProfileId,
  type PlanningWindow,
  type PlanningWindowId,
  type ReservationIntent,
  type ReservationIntentId,
  type ReservationPreview,
} from "./mock-data";

export type ConflictSeverity = "note" | "warning" | "blocking";

export type PlannerConflict = {
  id: string;
  severity: ConflictSeverity;
  title: string;
  detail: string;
  resolution: string;
  assetId?: string;
};

export type BundleRecommendation = {
  id: string;
  label: string;
  summary: string;
  heroAssetId: string;
  assetIds: string[];
  optionalAssetIds: string[];
  matchScore: number;
  coverageLabel: string;
  statusLabel: "Ready to apply" | "Needs one swap" | "Needs review";
  reason: string;
  caution: string;
  conflictCount: number;
};

export type ReservationPlanInput = {
  primaryAssetId: string | null;
  assetIds: string[];
  intentId: ReservationIntentId;
  windowId: PlanningWindowId;
  crewProfileId: CrewProfileId;
  flexibleMatching: boolean;
};

export type ReservationPlannerSnapshot = {
  primaryAsset: AssetCatalogItem | null;
  primaryPreview: ReservationPreview | null;
  planAssets: AssetCatalogItem[];
  intent: ReservationIntent;
  window: PlanningWindow;
  crewProfile: CrewProfile;
  forecasts: AssetForecast[];
  coveredCategories: AssetCategory[];
  missingCategories: AssetCategory[];
  conflicts: PlannerConflict[];
  recommendations: BundleRecommendation[];
  checklist: string[];
};

const assetMap = new Map(assetCatalogItems.map((asset) => [asset.id, asset]));
const categoryMap = new Map(assetCategories.map((category) => [category.id, category]));
const previewMap = new Map(reservationPreviews.map((preview) => [preview.assetId, preview]));
const forecastMap = new Map(
  assetForecasts.map((forecast) => [`${forecast.assetId}:${forecast.windowId}`, forecast]),
);
const intentMap = new Map(reservationIntents.map((intent) => [intent.id, intent]));
const windowMap = new Map(planningWindows.map((window) => [window.id, window]));
const crewMap = new Map(crewProfiles.map((crewProfile) => [crewProfile.id, crewProfile]));

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values));
}

function joinLabels(labels: string[]) {
  if (labels.length === 0) {
    return "";
  }

  if (labels.length === 1) {
    return labels[0] ?? "";
  }

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(", ")}, and ${labels.at(-1)}`;
}

function normalizePlanAssetIds(primaryAssetId: string | null, assetIds: string[]) {
  const orderedIds = primaryAssetId ? [primaryAssetId, ...assetIds] : assetIds;

  return uniqueStrings(orderedIds).filter((assetId) => assetMap.has(assetId));
}

function getBundleConflictCount(
  bundle: BundleBlueprint,
  windowId: PlanningWindowId,
  flexibleMatching: boolean,
) {
  return bundle.assetIds.reduce((count, assetId) => {
    const asset = getAssetById(assetId);
    const forecast = getAssetForecast(assetId, windowId);

    if (!asset) {
      return count;
    }

    if (asset.availability === "maintenance") {
      return count + 1;
    }

    if (forecast?.status === "conflict") {
      return count + 1;
    }

    if (!flexibleMatching && asset.availability !== "available") {
      return count + 1;
    }

    return count;
  }, 0);
}

export function getAssetById(assetId: string) {
  return assetMap.get(assetId) ?? null;
}

export function getReservationPreviewByAssetId(assetId: string) {
  return previewMap.get(assetId) ?? null;
}

export function getAssetForecast(assetId: string, windowId: PlanningWindowId) {
  return forecastMap.get(`${assetId}:${windowId}`) ?? null;
}

export function buildReservationConflicts(
  input: ReservationPlanInput,
): PlannerConflict[] {
  const planAssetIds = normalizePlanAssetIds(input.primaryAssetId, input.assetIds);
  const planAssets = planAssetIds
    .map((assetId) => getAssetById(assetId))
    .filter((asset): asset is AssetCatalogItem => asset !== null);
  const intent = intentMap.get(input.intentId) ?? reservationIntents[0];
  const conflicts: PlannerConflict[] = [];

  if (planAssets.length === 0) {
    return conflicts;
  }

  for (const asset of planAssets) {
    const preview = getReservationPreviewByAssetId(asset.id);
    const forecast = getAssetForecast(asset.id, input.windowId);
    const alternatives =
      forecast?.alternativeAssetIds
        .map((assetId) => getAssetById(assetId)?.name)
        .filter((name): name is string => Boolean(name)) ?? [];

    if (asset.availability === "maintenance") {
      conflicts.push({
        id: `maintenance:${asset.id}`,
        assetId: asset.id,
        severity: "blocking",
        title: `${asset.name} is in maintenance`,
        detail: `${asset.condition}. The planner should not rely on this asset for the active pickup window.`,
        resolution: alternatives.length > 0
          ? `Swap to ${joinLabels(alternatives)} or move the pickup window.`
          : "Swap to another asset or move the pickup window.",
      });
    } else if (asset.availability === "reserved") {
      conflicts.push({
        id: `reserved:${asset.id}`,
        assetId: asset.id,
        severity: input.flexibleMatching ? "warning" : "blocking",
        title: `${asset.name} is already reserved`,
        detail: preview
          ? `Assigned to ${preview.project} during ${preview.pickupWindow}.`
          : `${asset.name} is committed to another handoff plan.`,
        resolution: alternatives.length > 0
          ? `Use ${joinLabels(alternatives)} or shift the plan to a looser window.`
          : "Choose another pickup window or swap the hero asset.",
      });
    } else if (asset.availability === "hold") {
      conflicts.push({
        id: `hold:${asset.id}`,
        assetId: asset.id,
        severity: "warning",
        title: `${asset.name} is on hold`,
        detail: preview?.note ?? `${asset.name} is still waiting on confirmation before release.`,
        resolution: alternatives.length > 0
          ? `Keep a backup ready: ${joinLabels(alternatives)}.`
          : "Confirm the hold owner or keep a backup ready.",
      });
    }

    if (forecast?.status === "tight") {
      conflicts.push({
        id: `tight:${asset.id}:${input.windowId}`,
        assetId: asset.id,
        severity: "warning",
        title: `${asset.name} has a tight pickup window`,
        detail: forecast.note,
        resolution: alternatives.length > 0
          ? `Pre-stage ${joinLabels(alternatives)} as alternates.`
          : "Use a later pickup slot if the schedule can flex.",
      });
    }

    if (forecast?.status === "conflict") {
      conflicts.push({
        id: `forecast:${asset.id}:${input.windowId}`,
        assetId: asset.id,
        severity: "blocking",
        title: `${asset.name} conflicts with the forecasted demand`,
        detail: forecast.note,
        resolution: alternatives.length > 0
          ? `Swap to ${joinLabels(alternatives)} or choose another planning window.`
          : "Choose another planning window.",
      });
    }
  }

  const coveredCategories = new Set(planAssets.map((asset) => asset.categoryId));
  const missingCategories = intent.requiredCategories
    .filter((categoryId) => !coveredCategories.has(categoryId))
    .map((categoryId) => categoryMap.get(categoryId)?.label)
    .filter((label): label is string => Boolean(label));

  if (missingCategories.length > 0) {
    conflicts.push({
      id: `coverage:${input.intentId}`,
      severity: "warning",
      title: "Plan is missing supporting coverage",
      detail: `${intent.label} reservations usually need ${joinLabels(missingCategories)}.`,
      resolution: `Add ${joinLabels(missingCategories)} before locking the reservation preview.`,
    });
  }

  if (input.crewProfileId === "crew" && !coveredCategories.has("support")) {
    conflicts.push({
      id: "crew-support-gap",
      severity: "warning",
      title: "Small crew plan needs a support anchor",
      detail: "Crew-sized pickups turn over more smoothly when one support item is reserved up front.",
      resolution: "Add a tripod, gimbal, or slider before handing off the plan.",
    });
  }

  return conflicts;
}

export function buildBundleRecommendations(
  input: ReservationPlanInput,
): BundleRecommendation[] {
  const intent = intentMap.get(input.intentId) ?? reservationIntents[0];
  const selectedIds = new Set(normalizePlanAssetIds(input.primaryAssetId, input.assetIds));

  return bundleBlueprints
    .map((bundle) => {
      const bundleAssets = bundle.assetIds
        .map((assetId) => getAssetById(assetId))
        .filter((asset): asset is AssetCatalogItem => asset !== null);
      const overlapCount = bundle.assetIds.filter((assetId) => selectedIds.has(assetId)).length;
      const coverageCount = intent.requiredCategories.filter((categoryId) =>
        bundleAssets.some((asset) => asset.categoryId === categoryId),
      ).length;
      const conflictCount = getBundleConflictCount(
        bundle,
        input.windowId,
        input.flexibleMatching,
      );

      let score = 18;

      if (bundle.intentId === input.intentId) {
        score += 28;
      }

      if (input.primaryAssetId && bundle.assetIds.includes(input.primaryAssetId)) {
        score += 24;
      }

      score += overlapCount * 10;
      score += coverageCount * 5;

      for (const asset of bundleAssets) {
        if (asset.recommendedFor.includes(input.intentId)) {
          score += 4;
        }

        if (intent.preferredTags.some((tag) => asset.tags.includes(tag))) {
          score += 2;
        }

        if (asset.availability === "available") {
          score += 4;
        } else if (asset.availability === "hold") {
          score -= input.flexibleMatching ? 4 : 10;
        } else if (asset.availability === "reserved") {
          score -= input.flexibleMatching ? 8 : 14;
        } else if (asset.availability === "maintenance") {
          score -= 18;
        }

        const forecast = getAssetForecast(asset.id, input.windowId);

        if (forecast?.status === "clear") {
          score += 3;
        } else if (forecast?.status === "tight") {
          score -= 5;
        } else if (forecast?.status === "conflict") {
          score -= 16;
        }
      }

      if (
        input.crewProfileId === "crew" &&
        bundleAssets.some((asset) => asset.categoryId === "support")
      ) {
        score += 6;
      }

      const optionalNames = bundle.optionalAssetIds
        .map((assetId) => getAssetById(assetId)?.name)
        .filter((name): name is string => Boolean(name));
      const statusLabel: BundleRecommendation["statusLabel"] =
        conflictCount === 0
          ? "Ready to apply"
          : conflictCount === 1
            ? "Needs one swap"
            : "Needs review";
      const coverageLabel = `${coverageCount}/${intent.requiredCategories.length} core categories covered`;
      const reason = input.primaryAssetId && bundle.assetIds.includes(input.primaryAssetId)
        ? `Built around ${getAssetById(input.primaryAssetId)?.name ?? "the selected hero asset"}.`
        : `Best aligned to the ${intent.label.toLowerCase()} plan settings.`;
      const caution = conflictCount > 0
        ? `${conflictCount} asset${conflictCount === 1 ? "" : "s"} need alternate timing or substitutions.`
        : optionalNames.length > 0
          ? `Optional add-ons: ${joinLabels(optionalNames)}.`
          : bundle.note;

      return {
        id: bundle.id,
        label: bundle.label,
        summary: bundle.summary,
        heroAssetId: bundle.heroAssetId,
        assetIds: bundle.assetIds,
        optionalAssetIds: bundle.optionalAssetIds,
        matchScore: score,
        coverageLabel,
        statusLabel,
        reason,
        caution,
        conflictCount,
      };
    })
    .sort((left, right) => right.matchScore - left.matchScore)
    .slice(0, 3);
}

export function buildReservationPlannerSnapshot(
  input: ReservationPlanInput,
): ReservationPlannerSnapshot {
  const planAssetIds = uniqueStrings(input.assetIds).filter((assetId) =>
    assetMap.has(assetId),
  );
  const analysisAssetIds = normalizePlanAssetIds(input.primaryAssetId, input.assetIds);
  const planAssets = planAssetIds
    .map((assetId) => getAssetById(assetId))
    .filter((asset): asset is AssetCatalogItem => asset !== null);
  const analysisAssets = analysisAssetIds
    .map((assetId) => getAssetById(assetId))
    .filter((asset): asset is AssetCatalogItem => asset !== null);
  const primaryAsset =
    (input.primaryAssetId ? getAssetById(input.primaryAssetId) : null) ??
    planAssets[0] ??
    null;
  const primaryPreview = primaryAsset
    ? getReservationPreviewByAssetId(primaryAsset.id)
    : null;
  const intent = intentMap.get(input.intentId) ?? reservationIntents[0];
  const window = windowMap.get(input.windowId) ?? planningWindows[0];
  const crewProfile = crewMap.get(input.crewProfileId) ?? crewProfiles[0];
  const forecasts = analysisAssets
    .map((asset) => getAssetForecast(asset.id, input.windowId))
    .filter((forecast): forecast is AssetForecast => forecast !== null);
  const coveredCategories = assetCategories.filter((category) =>
    analysisAssets.some((asset) => asset.categoryId === category.id),
  );
  const missingCategories = assetCategories.filter(
    (category) =>
      intent.requiredCategories.includes(category.id) &&
      !coveredCategories.some((coveredCategory) => coveredCategory.id === category.id),
  );
  const conflicts = buildReservationConflicts(input);
  const recommendations = buildBundleRecommendations(input);
  const checklist = uniqueStrings([
    ...intent.checklist,
    ...(primaryPreview?.checklist ?? []),
    ...(crewProfile.id === "crew"
      ? ["Assign one crew member to gear handoff and return notes."]
      : []),
  ]);

  return {
    primaryAsset,
    primaryPreview,
    planAssets,
    intent,
    window,
    crewProfile,
    forecasts,
    coveredCategories,
    missingCategories,
    conflicts,
    recommendations,
    checklist,
  };
}
