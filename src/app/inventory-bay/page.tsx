import type { Metadata } from "next";

import { InventoryBayShell } from "./_components/inventory-bay-shell";
import {
  getInventoryBayBandSummaries,
  getInventoryBayMetrics,
  getInventoryBayRecommendationViews,
  getInventoryBaySections,
  inventoryBayBands,
  inventoryBayCategories,
  inventoryBayItems,
  inventoryBayRecommendations,
} from "./_data/inventory-bay-data";

export const metadata: Metadata = {
  title: "Inventory Bay",
  description:
    "Mock inventory bay route with stock bands, category sections, and a restock recommendation panel.",
};

export default function InventoryBayPage() {
  const metrics = getInventoryBayMetrics(
    inventoryBayItems,
    inventoryBayRecommendations,
  );
  const bandSummaries = getInventoryBayBandSummaries(
    inventoryBayItems,
    inventoryBayBands,
  );
  const sections = getInventoryBaySections(
    inventoryBayItems,
    inventoryBayCategories,
  );
  const recommendations = getInventoryBayRecommendationViews(
    inventoryBayItems,
    inventoryBayCategories,
    inventoryBayBands,
    inventoryBayRecommendations,
  );

  return (
    <InventoryBayShell
      bandSummaries={bandSummaries}
      metrics={metrics}
      recommendations={recommendations}
      sections={sections}
    />
  );
}
