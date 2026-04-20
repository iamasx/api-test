"use client";

import { useState } from "react";

import {
  getInventoryCategoryOptions,
  getInventorySections,
  type InventoryCategory,
  type InventoryItem,
} from "@/data/asset-inventory";

import { CategoryNavigation } from "./category-navigation";
import { InventoryCatalogSection } from "./inventory-catalog-section";
import { InventoryDetailPanel } from "./inventory-detail-panel";

type AssetInventoryExperienceProps = {
  categories: InventoryCategory[];
  items: InventoryItem[];
};

export function AssetInventoryExperience({
  categories,
  items,
}: AssetInventoryExperienceProps) {
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? "");

  const categoryOptions = getInventoryCategoryOptions(items, categories);
  const sections = getInventorySections(items, categories, activeCategoryId);
  const visibleItems = sections.flatMap((section) => section.items);
  const selectedItem =
    visibleItems.find((item) => item.id === selectedItemId) ??
    items.find((item) => item.id === selectedItemId) ??
    visibleItems[0];

  const operationalCount = items.filter((item) => item.status === "Operational").length;
  const attentionCount = items.filter((item) => item.status !== "Operational").length;
  const totalUnits = items.reduce((sum, item) => sum + item.availableUnits, 0);

  function handleCategoryChange(categoryId: string) {
    const nextSections = getInventorySections(items, categories, categoryId);
    const nextVisibleItems = nextSections.flatMap((section) => section.items);

    setActiveCategoryId(categoryId);

    if (!nextVisibleItems.some((item) => item.id === selectedItemId)) {
      setSelectedItemId(nextVisibleItems[0]?.id ?? "");
    }
  }

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef6f1_46%,#f8fafc_100%)] font-sans text-slate-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_32px_100px_-40px_rgba(15,23,42,0.85)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.8fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-300">
                Asset Inventory
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Catalog route for field hardware, live stock signals, and
                selected-item detail.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This isolated route tracks inventory groups across sensors,
                safety systems, mobility rigs, and power modules. Category
                filters keep the catalog focused while the detail panel stays
                pinned to the active asset.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Categories
                </p>
                <p className="mt-3 text-3xl font-semibold">{categories.length}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Organized catalog sections
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Tracked Units
                </p>
                <p className="mt-3 text-3xl font-semibold">{totalUnits}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Available across every item
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Attention Needed
                </p>
                <p className="mt-3 text-3xl font-semibold">{attentionCount}</p>
                <p className="mt-2 text-sm text-slate-300">
                  Non-operational or constrained assets
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              {operationalCount} operational items
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              Detail panel is always visible
            </span>
            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5">
              Inventory data is fully mocked for isolated development
            </span>
          </div>
        </section>

        <CategoryNavigation
          options={categoryOptions}
          activeCategoryId={activeCategoryId}
          onSelect={handleCategoryChange}
        />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_380px]">
          <div className="space-y-6">
            {sections.map((section) => (
              <InventoryCatalogSection
                key={section.id}
                section={section}
                selectedItemId={selectedItem.id}
                onSelectItem={setSelectedItemId}
              />
            ))}
          </div>
          <InventoryDetailPanel item={selectedItem} />
        </div>
      </main>
    </div>
  );
}
