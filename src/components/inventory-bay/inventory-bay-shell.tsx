"use client";

import { startTransition, useState } from "react";

import type {
  InventoryItem,
  RestockSuggestion,
  StockBand,
  StockBandId,
  StorageZone,
} from "@/app/inventory-bay/mock-data";
import { InventoryBayControls } from "./inventory-bay-controls";
import { RestockSuggestionsPanel } from "./restock-suggestions-panel";
import { StockBandBoard } from "./stock-band-board";

type InventoryBayShellProps = {
  items: InventoryItem[];
  suggestions: RestockSuggestion[];
  bands: StockBand[];
  zones: StorageZone[];
};

export function InventoryBayShell({
  items,
  suggestions,
  bands,
  zones,
}: InventoryBayShellProps) {
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedBand, setSelectedBand] = useState<StockBandId | "all">("all");
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [showAcknowledged, setShowAcknowledged] = useState(false);
  const zoneMap = Object.fromEntries(zones.map((zone) => [zone.id, zone])) as Record<
    string,
    StorageZone
  >;
  const itemMap = Object.fromEntries(items.map((item) => [item.id, item])) as Record<
    string,
    InventoryItem
  >;

  const visibleItems = items.filter((item) => {
    return (
      (selectedZone === "all" || item.zoneId === selectedZone) &&
      (selectedBand === "all" || item.bandId === selectedBand) &&
      (!criticalOnly || item.bandId === "critical" || item.unitsOnHand <= item.reorderPoint)
    );
  });

  const visibleSuggestions = suggestions.filter((suggestion) => {
    const item = itemMap[suggestion.itemId];
    return (
      !!item &&
      visibleItems.some((visibleItem) => visibleItem.id === item.id) &&
      (showAcknowledged || !acknowledgedIds.includes(suggestion.id))
    );
  });

  const totalUnits = items.reduce((sum, item) => sum + item.unitsOnHand, 0);
  const criticalCount = items.filter(
    (item) => item.bandId === "critical" || item.unitsOnHand <= item.reorderPoint,
  ).length;
  const openSuggestionCount = suggestions.filter(
    (suggestion) => !acknowledgedIds.includes(suggestion.id),
  ).length;
  const hasFilters = selectedZone !== "all" || selectedBand !== "all" || criticalOnly;
  const activeBands = selectedBand === "all" ? bands : bands.filter((band) => band.id === selectedBand);

  function clearFilters() {
    startTransition(() => {
      setSelectedZone("all");
      setSelectedBand("all");
      setCriticalOnly(false);
    });
  }

  function toggleSuggestion(suggestionId: string) {
    startTransition(() => {
      setAcknowledgedIds((current) =>
        current.includes(suggestionId)
          ? current.filter((id) => id !== suggestionId)
          : [...current, suggestionId],
      );
    });
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(6,95,70,0.14),transparent_32%),linear-gradient(180deg,#fffaf1_0%,#f4ecdf_55%,#eadfcf_100%)] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/80 shadow-[0_18px_60px_rgba(120,53,15,0.14)] backdrop-blur">
          <div className="grid gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:px-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-700">
                Inventory Bay
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                Mock stock bands, threshold pressure, and restock calls for one isolated bay.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                Everything on this route is local: zone filters, band grouping, and
                acknowledgement state never leave the client.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-stone-950 px-5 py-4 text-stone-50">
                <p className="text-sm text-stone-300">Units on hand</p>
                <p className="mt-2 text-3xl font-semibold">{totalUnits}</p>
              </div>
              <div className="rounded-3xl bg-rose-100 px-5 py-4 text-rose-950">
                <p className="text-sm text-rose-700">Critical items</p>
                <p className="mt-2 text-3xl font-semibold">{criticalCount}</p>
              </div>
              <div className="rounded-3xl bg-amber-100 px-5 py-4 text-amber-950">
                <p className="text-sm text-amber-700">Open restocks</p>
                <p className="mt-2 text-3xl font-semibold">{openSuggestionCount}</p>
              </div>
              <div className="rounded-3xl bg-emerald-100 px-5 py-4 text-emerald-950">
                <p className="text-sm text-emerald-700">Visible / zones</p>
                <p className="mt-2 text-3xl font-semibold">
                  {visibleItems.length} / {zones.length}
                </p>
              </div>
            </div>
          </div>
        </section>
        <InventoryBayControls
          bandCounts={bands.map((band) => ({
            id: band.id,
            count: items.filter(
              (item) =>
                item.bandId === band.id &&
                (selectedZone === "all" || item.zoneId === selectedZone) &&
                (!criticalOnly || item.bandId === "critical" || item.unitsOnHand <= item.reorderPoint),
            ).length,
          }))}
          bands={bands}
          criticalOnly={criticalOnly}
          hasFilters={hasFilters}
          onBandChange={(bandId) => startTransition(() => setSelectedBand(bandId))}
          onClear={clearFilters}
          onCriticalToggle={() => startTransition(() => setCriticalOnly((value) => !value))}
          onZoneChange={(zoneId) => startTransition(() => setSelectedZone(zoneId))}
          selectedBand={selectedBand}
          selectedZone={selectedZone}
          zoneCounts={zones.map((zone) => ({
            id: zone.id,
            count: items.filter(
              (item) =>
                item.zoneId === zone.id &&
                (selectedBand === "all" || item.bandId === selectedBand) &&
                (!criticalOnly || item.bandId === "critical" || item.unitsOnHand <= item.reorderPoint),
            ).length,
          }))}
          zones={zones}
        />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
          <StockBandBoard
            activeBands={activeBands}
            hasFilters={hasFilters}
            items={visibleItems}
            onClearFilters={clearFilters}
            zoneMap={zoneMap}
          />
          <RestockSuggestionsPanel
            acknowledgedIds={acknowledgedIds}
            itemMap={itemMap}
            onToggleSuggestion={toggleSuggestion}
            showAcknowledged={showAcknowledged}
            suggestions={visibleSuggestions}
            toggleAcknowledgedView={() =>
              startTransition(() => setShowAcknowledged((value) => !value))
            }
            zoneMap={zoneMap}
          />
        </div>
      </div>
    </main>
  );
}
