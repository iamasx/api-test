import type { Metadata } from "next";

import { InventoryBayShell } from "./_components/inventory-bay-shell";
import {
  getInventoryBayBandSummaries,
  getInventoryBayCategorySummaries,
  getInventoryBayLowStockViews,
  getInventoryBayOverviewMetrics,
  inventoryBayBands,
  inventoryBayCategories,
  inventoryBayItems,
  inventoryBayLowStockAlerts,
} from "./_data/inventory-bay-data";

export const metadata: Metadata = {
  title: "Inventory Bay",
  description:
    "Mock inventory bay route with stock bands, category summary tiles, and a compact low-stock warning panel.",
};

export default function InventoryBayPage() {
  const overviewMetrics = getInventoryBayOverviewMetrics(
    inventoryBayItems,
    inventoryBayCategories,
    inventoryBayLowStockAlerts,
  );
  const bandSummaries = getInventoryBayBandSummaries(
    inventoryBayItems,
    inventoryBayBands,
  );
  const categorySummaries = getInventoryBayCategorySummaries(
    inventoryBayItems,
    inventoryBayCategories,
  );
  const lowStockAlerts = getInventoryBayLowStockViews(
    inventoryBayItems,
    inventoryBayCategories,
    inventoryBayBands,
    inventoryBayLowStockAlerts,
  );

  return (
    <InventoryBayShell
      bandSummaries={bandSummaries}
      categorySummaries={categorySummaries}
      lowStockAlerts={lowStockAlerts}
      overviewMetrics={overviewMetrics}
    />
  );
}
