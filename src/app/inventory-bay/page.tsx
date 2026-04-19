import type { Metadata } from "next";

import {
  inventoryItems,
  restockSuggestions,
  stockBands,
  storageZones,
} from "./mock-data";
import { InventoryBayShell } from "@/components/inventory-bay/inventory-bay-shell";

export const metadata: Metadata = {
  title: "Inventory Bay | API Test",
  description:
    "Monitor mock stock bands, critical thresholds, and local restock suggestions for an isolated inventory bay.",
};

export default function InventoryBayPage() {
  return (
    <InventoryBayShell
      items={inventoryItems}
      suggestions={restockSuggestions}
      bands={stockBands}
      zones={storageZones}
    />
  );
}
