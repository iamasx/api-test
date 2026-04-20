"use client";

import { useDeferredValue, useState } from "react";

import {
  getAssetCatalogSections,
  getAssetCategoryOptions,
  type AssetCategory,
  type CatalogAsset,
} from "@/data/asset-catalog";

import { AssetCatalogSection } from "./asset-catalog-section";
import { AvailabilityDetailPanel } from "./availability-detail-panel";
import { CatalogSearchBar } from "./catalog-search-bar";
import { CategoryTabs } from "./category-tabs";

type AssetCatalogExperienceProps = {
  categories: AssetCategory[];
  items: CatalogAsset[];
};

export function AssetCatalogExperience({
  categories,
  items,
}: AssetCatalogExperienceProps) {
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState(items[0]?.id ?? "");

  const deferredSearchValue = useDeferredValue(searchValue);
  const categoryOptions = getAssetCategoryOptions(items, categories);
  const sections = getAssetCatalogSections(
    items,
    categories,
    activeCategoryId,
    deferredSearchValue,
  );
  const visibleItems = sections.flatMap((section) => section.items);
  const selectedAsset =
    visibleItems.find((item) => item.id === selectedAssetId) ??
    items.find((item) => item.id === selectedAssetId) ??
    visibleItems[0];

  const availableAssets = items.filter((item) => item.state === "Available").length;
  const reservedAssets = items.filter((item) => item.state === "Reserved").length;
  const unavailableAssets = items.filter(
    (item) => item.state === "Unavailable",
  ).length;

  function syncSelectedAsset(nextCategoryId: string, nextSearchValue: string) {
    const nextSections = getAssetCatalogSections(
      items,
      categories,
      nextCategoryId,
      nextSearchValue,
    );
    const nextVisibleItems = nextSections.flatMap((section) => section.items);

    if (
      nextVisibleItems.length > 0 &&
      !nextVisibleItems.some((item) => item.id === selectedAssetId)
    ) {
      setSelectedAssetId(nextVisibleItems[0]?.id ?? "");
    }
  }

  function handleCategoryChange(categoryId: string) {
    setActiveCategoryId(categoryId);
    syncSelectedAsset(categoryId, searchValue);
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    syncSelectedAsset(activeCategoryId, value);
  }

  if (!selectedAsset) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf0_0%,#f6f1e7_48%,#f8fafc_100%)] text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_100px_-40px_rgba(15,23,42,0.85)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.8fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
                Asset Catalog
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Searchable asset sections with category tabs and a focused
                availability detail panel.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This route organizes staged assets into operating lanes, keeps
                search active across metadata-rich availability records, and
                anchors the selected asset beside the catalog for quick review.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Available
                </p>
                <p className="mt-3 text-3xl font-semibold">{availableAssets}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Assets ready now
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Reserved
                </p>
                <p className="mt-3 text-3xl font-semibold">{reservedAssets}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Assigned but healthy
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Unavailable
                </p>
                <p className="mt-3 text-3xl font-semibold">{unavailableAssets}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Blocked from dispatch
                </p>
              </div>
            </div>
          </div>
        </section>

        <CatalogSearchBar
          searchValue={searchValue}
          resultCount={visibleItems.length}
          totalCount={items.length}
          onSearchChange={handleSearchChange}
        />

        <CategoryTabs
          options={categoryOptions}
          activeCategoryId={activeCategoryId}
          onSelect={handleCategoryChange}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_380px]">
          <div className="space-y-6">
            {sections.length > 0 ? (
              sections.map((section) => (
                <AssetCatalogSection
                  key={section.id}
                  section={section}
                  selectedAssetId={selectedAsset.id}
                  onSelectAsset={setSelectedAssetId}
                />
              ))
            ) : (
              <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white/80 p-8 text-center shadow-[0_18px_60px_-40px_rgba(15,23,42,0.35)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  No Visible Assets
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Adjust the search or switch categories to bring assets back
                  into view.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The focused detail panel stays pinned to the last selected
                  asset so availability context remains visible while you refine
                  the catalog.
                </p>
              </section>
            )}
          </div>

          <AvailabilityDetailPanel item={selectedAsset} />
        </div>
      </main>
    </div>
  );
}
