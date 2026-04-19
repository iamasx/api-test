"use client";

import { startTransition, useDeferredValue, useState } from "react";

import {
  assetCatalogItems,
  assetCatalogSyncLabel,
  assetCategories,
  availabilityOptions,
  reservationPreviews,
  type AssetAvailability,
  type AssetCategoryId,
} from "@/app/asset-catalog/mock-data";
import { AssetCard } from "./asset-card";
import { AssetCatalogHeader } from "./asset-catalog-header";
import { CatalogControls } from "./catalog-controls";
import { CategoryTabs } from "./category-tabs";
import { ReservationPreview } from "./reservation-preview";

function matchesQuery(assetId: string, query: string) {
  return assetId.includes(query);
}

export function AssetCatalogShell() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<AssetCategoryId | "all">("all");
  const [activeAvailability, setActiveAvailability] = useState<AssetAvailability | "all">("all");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();

  const visibleAssets = assetCatalogItems.filter((asset) => {
    const searchable = [asset.name, asset.sku, asset.zone, asset.summary, asset.condition, ...asset.tags, ...asset.kit]
      .join(" ")
      .toLowerCase();

    return (
      (!deferredQuery || searchable.includes(deferredQuery) || matchesQuery(asset.id, deferredQuery)) &&
      (activeCategory === "all" || asset.categoryId === activeCategory) &&
      (activeAvailability === "all" || asset.availability === activeAvailability)
    );
  });

  const selectedAsset = assetCatalogItems.find((asset) => asset.id === selectedAssetId) ?? null;
  const selectionHidden = selectedAsset ? !visibleAssets.some((asset) => asset.id === selectedAsset.id) : false;
  const selectedPreview = selectedAsset ? reservationPreviews.find((preview) => preview.assetId === selectedAsset.id) ?? null : null;
  const hasFilters = query.trim().length > 0 || activeCategory !== "all" || activeAvailability !== "all";
  const readyAssets = assetCatalogItems.filter((asset) => asset.availability === "available").length;
  const reservedAssets = assetCatalogItems.filter((asset) => asset.availability === "reserved").length;
  const attentionAssets = assetCatalogItems.filter((asset) => asset.availability === "hold" || asset.availability === "maintenance").length;

  const categoryTabs = [
    {
      id: "all",
      label: "All assets",
      summary: "Entire checkout floor with every mock item in view.",
      count: assetCatalogItems.length,
    },
    ...assetCategories.map((category) => ({
      ...category,
      count: assetCatalogItems.filter((asset) => asset.categoryId === category.id).length,
    })),
  ];

  const availabilityCounts = availabilityOptions.map((availability) => ({
    ...availability,
    count: assetCatalogItems.filter((asset) => asset.availability === availability.id).length,
  }));

  const selectedCategoryLabel = selectedAsset
    ? assetCategories.find((category) => category.id === selectedAsset.categoryId)?.label ?? null
    : null;

  const handleResetFilters = () => {
    startTransition(() => {
      setQuery("");
      setActiveCategory("all");
      setActiveAvailability("all");
    });
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#fff7ed_48%,#ecfeff_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AssetCatalogHeader
          attentionAssets={attentionAssets}
          readyAssets={readyAssets}
          reservedAssets={reservedAssets}
          syncLabel={assetCatalogSyncLabel}
          totalAssets={assetCatalogItems.length}
        />

        <CategoryTabs
          activeCategory={activeCategory}
          categories={categoryTabs}
          onChange={(categoryId) => startTransition(() => setActiveCategory(categoryId as AssetCategoryId | "all"))}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.92fr)]">
          <section className="space-y-5">
            <CatalogControls
              activeAvailability={activeAvailability}
              availabilityCounts={availabilityCounts}
              hasFilters={hasFilters}
              onAvailabilityChange={(availability) => startTransition(() => setActiveAvailability(availability))}
              onQueryChange={(value) => startTransition(() => setQuery(value))}
              onReset={handleResetFilters}
              query={query}
              resultCount={visibleAssets.length}
              totalCount={assetCatalogItems.length}
            />

            <section className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Asset listing</h2>
                  <p className="text-sm text-slate-600">Search results update on the client and never affect any other route.</p>
                </div>
                <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600">
                  {visibleAssets.length === 1 ? "1 matching asset" : `${visibleAssets.length} matching assets`}
                </div>
              </div>

              {visibleAssets.length > 0 ? (
                <div className="grid gap-4">
                  {visibleAssets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      categoryLabel={assetCategories.find((category) => category.id === asset.categoryId)?.label ?? asset.categoryId}
                      onSelect={() =>
                        startTransition(() => setSelectedAssetId((current) => current === asset.id ? null : asset.id))
                      }
                      preview={reservationPreviews.find((preview) => preview.assetId === asset.id) ?? null}
                      selected={selectedAssetId === asset.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.9rem] border border-dashed border-slate-300 bg-white/85 p-8 text-center shadow-[0_20px_70px_-46px_rgba(15,23,42,0.38)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">No Matches</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">No assets match the current search and availability filters.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Try a different tag, switch categories, or clear the filters to bring the full mock catalog back into view.
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
              asset={selectedAsset}
              categoryLabel={selectedCategoryLabel}
              onClearSelection={() => startTransition(() => setSelectedAssetId(null))}
              onResetFilters={handleResetFilters}
              preview={selectedPreview}
              selectionHidden={selectionHidden}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
