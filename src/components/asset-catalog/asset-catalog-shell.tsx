"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  assetCatalogItems,
  assetCatalogSyncLabel,
  assetCategories,
  availabilityOptions,
  crewProfiles,
  planningWindows,
  reservationIntents,
  reservationPreviews,
  type AssetAvailability,
  type AssetCategoryId,
  type CrewProfileId,
  type PlanningWindowId,
  type ReservationIntentId,
} from "@/app/asset-catalog/mock-data";
import {
  buildReservationPlannerSnapshot,
  getAssetById,
  getAssetForecast,
} from "@/app/asset-catalog/planner";
import { AssetCard } from "./asset-card";
import { AssetCatalogHeader } from "./asset-catalog-header";
import { BundleRecommendations } from "./bundle-recommendations";
import { CatalogControls } from "./catalog-controls";
import { CategoryTabs } from "./category-tabs";
import { ForecastBoard } from "./forecast-board";
import { PlannerTabs } from "./planner-tabs";
import { ReservationPreview } from "./reservation-preview";

type PlannerViewId = "browse" | "planner" | "forecast";

function matchesQuery(assetId: string, query: string) {
  return assetId.includes(query);
}

function uniqueAssetIds(assetIds: string[]) {
  return Array.from(new Set(assetIds));
}

export function AssetCatalogShell() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<AssetCategoryId | "all">(
    "all",
  );
  const [activeAvailability, setActiveAvailability] = useState<
    AssetAvailability | "all"
  >("all");
  const [plannerView, setPlannerView] = useState<PlannerViewId>("planner");
  const [focusedAssetId, setFocusedAssetId] = useState<string | null>(null);
  const [plannedAssetIds, setPlannedAssetIds] = useState<string[]>([]);
  const [intentId, setIntentId] = useState<ReservationIntentId>("interview");
  const [windowId, setWindowId] = useState<PlanningWindowId>("tomorrow-am");
  const [crewProfileId, setCrewProfileId] = useState<CrewProfileId>("pair");
  const [flexibleMatching, setFlexibleMatching] = useState(true);
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();

  const visibleAssets = assetCatalogItems.filter((asset) => {
    const searchable = [
      asset.name,
      asset.sku,
      asset.zone,
      asset.summary,
      asset.condition,
      asset.crewFit,
      ...asset.tags,
      ...asset.kit,
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!deferredQuery ||
        searchable.includes(deferredQuery) ||
        matchesQuery(asset.id, deferredQuery)) &&
      (activeCategory === "all" || asset.categoryId === activeCategory) &&
      (activeAvailability === "all" || asset.availability === activeAvailability)
    );
  });

  const plannerSnapshot = buildReservationPlannerSnapshot({
    primaryAssetId: focusedAssetId,
    assetIds: plannedAssetIds,
    intentId,
    windowId,
    crewProfileId,
    flexibleMatching,
  });
  const focusedAsset = plannerSnapshot.primaryAsset;
  const focusedPreview = focusedAsset
    ? reservationPreviews.find((preview) => preview.assetId === focusedAsset.id) ?? null
    : null;
  const focusedForecast = focusedAsset
    ? getAssetForecast(focusedAsset.id, windowId)
    : null;
  const selectionHidden = focusedAsset
    ? !visibleAssets.some((asset) => asset.id === focusedAsset.id)
    : false;
  const hasFilters =
    query.trim().length > 0 ||
    activeCategory !== "all" ||
    activeAvailability !== "all";
  const hasPlanningChanges =
    plannerView !== "planner" ||
    focusedAssetId !== null ||
    plannedAssetIds.length > 0 ||
    intentId !== "interview" ||
    windowId !== "tomorrow-am" ||
    crewProfileId !== "pair" ||
    !flexibleMatching;
  const readyAssets = assetCatalogItems.filter(
    (asset) => asset.availability === "available",
  ).length;
  const forecastAlerts = assetCatalogItems.filter((asset) => {
    const forecast = getAssetForecast(asset.id, windowId);

    return forecast?.status === "tight" || forecast?.status === "conflict";
  }).length;
  const bundleReadyCount = plannerSnapshot.recommendations.filter(
    (recommendation) => recommendation.conflictCount === 0,
  ).length;
  const categoryTabs = [
    {
      id: "all",
      label: "All assets",
      summary: "Entire planner catalog across every checkout lane.",
      count: assetCatalogItems.length,
    },
    ...assetCategories.map((category) => ({
      ...category,
      count: assetCatalogItems.filter(
        (asset) => asset.categoryId === category.id,
      ).length,
    })),
  ];
  const availabilityCounts = availabilityOptions.map((availability) => ({
    ...availability,
    count: assetCatalogItems.filter(
      (asset) => asset.availability === availability.id,
    ).length,
  }));
  const selectedCategoryLabel = focusedAsset
    ? assetCategories.find((category) => category.id === focusedAsset.categoryId)?.label ??
      null
    : null;
  const activeWindow =
    planningWindows.find((window) => window.id === windowId) ?? planningWindows[0];
  const activeIntent =
    reservationIntents.find((intent) => intent.id === intentId) ??
    reservationIntents[0];
  const activeCrewProfile =
    crewProfiles.find((crewProfile) => crewProfile.id === crewProfileId) ??
    crewProfiles[0];
  const plannerViews = [
    {
      id: "planner",
      label: "Plan Reservation",
      summary: "Build a draft, inspect conflicts, and apply bundles in one flow.",
      badge: `${plannerSnapshot.planAssets.length} in draft`,
    },
    {
      id: "browse",
      label: "Browse Inventory",
      summary: "Review inventory cards without leaving the draft context.",
      badge: `${visibleAssets.length} visible`,
    },
    {
      id: "forecast",
      label: "Forecast Board",
      summary: "Pressure-test the active pickup window before confirming the plan.",
      badge: `${forecastAlerts} alerts`,
    },
  ];
  const topRecommendation = plannerSnapshot.recommendations[0];
  const topBundleAssetIds = new Set(topRecommendation?.assetIds ?? []);
  const forecastAssets =
    plannerSnapshot.planAssets.length > 0
      ? plannerSnapshot.planAssets
      : visibleAssets.slice(0, 4);

  const resolveAssetName = (assetId: string) =>
    getAssetById(assetId)?.name ?? assetId;

  const handleResetFilters = () => {
    startTransition(() => {
      setQuery("");
      setActiveCategory("all");
      setActiveAvailability("all");
    });
  };

  const handleResetPlanner = () => {
    startTransition(() => {
      setPlannerView("planner");
      setFocusedAssetId(null);
      setPlannedAssetIds([]);
      setIntentId("interview");
      setWindowId("tomorrow-am");
      setCrewProfileId("pair");
      setFlexibleMatching(true);
    });
  };

  const handleFocusAsset = (assetId: string) => {
    startTransition(() => {
      setFocusedAssetId((current) => (current === assetId ? null : assetId));
    });
  };

  const handleTogglePlanAsset = (assetId: string) => {
    startTransition(() => {
      setPlannedAssetIds((current) => {
        if (current.includes(assetId)) {
          return current.filter((existingAssetId) => existingAssetId !== assetId);
        }

        return uniqueAssetIds([...current, assetId]);
      });
      setFocusedAssetId((current) => current ?? assetId);
      setPlannerView("planner");
    });
  };

  const handleApplyBundle = (assetIds: string[], heroAssetId: string) => {
    startTransition(() => {
      setPlannedAssetIds(uniqueAssetIds(assetIds));
      setFocusedAssetId(heroAssetId);
      setPlannerView("planner");
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#fff7ed_48%,#ecfeff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AssetCatalogHeader
          bundleReadyCount={bundleReadyCount}
          draftAssets={plannerSnapshot.planAssets.length}
          forecastAlerts={forecastAlerts}
          readyAssets={readyAssets}
          syncLabel={assetCatalogSyncLabel}
          totalAssets={assetCatalogItems.length}
          windowLabel={activeWindow.label}
        />

        <PlannerTabs
          activeView={plannerView}
          onChange={(viewId) =>
            startTransition(() => setPlannerView(viewId as PlannerViewId))
          }
          views={plannerViews}
        />

        <CategoryTabs
          activeCategory={activeCategory}
          categories={categoryTabs}
          onChange={(categoryId) =>
            startTransition(() =>
              setActiveCategory(categoryId as AssetCategoryId | "all"),
            )
          }
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.92fr)]">
          <section className="space-y-5">
            <CatalogControls
              activeAvailability={activeAvailability}
              activeCrewProfileId={crewProfileId}
              activeIntentId={intentId}
              activeWindowId={windowId}
              availabilityCounts={availabilityCounts}
              crewProfiles={crewProfiles}
              flexibleMatching={flexibleMatching}
              hasFilters={hasFilters}
              hasPlanningChanges={hasPlanningChanges}
              intents={reservationIntents}
              onAvailabilityChange={(availability) =>
                startTransition(() => setActiveAvailability(availability))
              }
              onCrewProfileChange={(nextCrewProfileId) =>
                startTransition(() => setCrewProfileId(nextCrewProfileId))
              }
              onFlexibleMatchingChange={(value) =>
                startTransition(() => setFlexibleMatching(value))
              }
              onIntentChange={(nextIntentId) =>
                startTransition(() => setIntentId(nextIntentId))
              }
              onQueryChange={(value) => startTransition(() => setQuery(value))}
              onResetFilters={handleResetFilters}
              onResetPlanner={handleResetPlanner}
              onWindowChange={(nextWindowId) =>
                startTransition(() => setWindowId(nextWindowId))
              }
              planCount={plannerSnapshot.planAssets.length}
              query={query}
              resultCount={visibleAssets.length}
              totalCount={assetCatalogItems.length}
              windows={planningWindows}
            />

            {plannerView === "planner" ? (
              <BundleRecommendations
                plannedAssetIds={plannedAssetIds}
                recommendations={plannerSnapshot.recommendations}
                resolveAssetName={resolveAssetName}
                onApplyBundle={handleApplyBundle}
                onInspectAsset={handleFocusAsset}
              />
            ) : null}

            {plannerView === "forecast" ? (
              <ForecastBoard
                activeWindowId={windowId}
                assets={forecastAssets}
                focusedAssetId={focusedAssetId}
                onInspectAsset={handleFocusAsset}
              />
            ) : null}

            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {plannerView === "browse"
                      ? "Asset listing"
                      : plannerView === "forecast"
                        ? "Planner inventory"
                        : "Reservation candidates"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {plannerView === "browse"
                      ? "Browse the isolated mock catalog and inspect any handoff without leaving the route."
                      : plannerView === "forecast"
                        ? "Use the catalog beneath the forecast board to pull substitutes into the draft."
                        : "Add assets directly to the draft and use the recommendations to close coverage gaps."}
                  </p>
                </div>
                <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600">
                  {visibleAssets.length === 1
                    ? "1 matching asset"
                    : `${visibleAssets.length} matching assets`}
                </div>
              </div>

              {visibleAssets.length > 0 ? (
                <div className="grid gap-4">
                  {visibleAssets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      bundleHint={
                        topBundleAssetIds.has(asset.id) && topRecommendation
                          ? topRecommendation.label
                          : null
                      }
                      categoryLabel={
                        assetCategories.find((category) => category.id === asset.categoryId)
                          ?.label ?? asset.categoryId
                      }
                      forecast={getAssetForecast(asset.id, windowId)}
                      focused={focusedAssetId === asset.id}
                      planned={plannedAssetIds.includes(asset.id)}
                      preview={
                        reservationPreviews.find(
                          (preview) => preview.assetId === asset.id,
                        ) ?? null
                      }
                      onFocus={() => handleFocusAsset(asset.id)}
                      onTogglePlan={() => handleTogglePlanAsset(asset.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.9rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    No Matches
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
                    No assets match the current search and availability filters.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Try a different tag, switch categories, or clear the filters to
                    bring the full planner catalog back into view.
                  </p>
                  {hasFilters ? (
                    <button
                      className="mt-5 rounded-full bg-cyan-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-900"
                      onClick={handleResetFilters}
                      type="button"
                    >
                      Reset filters
                    </button>
                  ) : null}
                </div>
              )}
            </section>
          </section>

          <div className="xl:sticky xl:top-6 xl:self-start">
            <ReservationPreview
              asset={focusedAsset}
              categoryLabel={selectedCategoryLabel}
              checklist={plannerSnapshot.checklist}
              conflicts={plannerSnapshot.conflicts}
              coveredCategories={plannerSnapshot.coveredCategories}
              crewProfile={activeCrewProfile}
              forecast={focusedForecast}
              intent={activeIntent}
              missingCategories={plannerSnapshot.missingCategories}
              planAssets={plannerSnapshot.planAssets}
              preview={focusedPreview}
              recommendations={plannerSnapshot.recommendations}
              resolveAssetName={resolveAssetName}
              selectionHidden={selectionHidden}
              window={activeWindow}
              onClearPlan={() => startTransition(() => setPlannedAssetIds([]))}
              onClearSelection={() => startTransition(() => setFocusedAssetId(null))}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
