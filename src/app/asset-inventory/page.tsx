import type { Metadata } from "next";

import { AssetInventoryExperience } from "@/components/asset-inventory/asset-inventory-experience";
import { inventoryCategories, inventoryItems } from "@/data/asset-inventory";

export const metadata: Metadata = {
  title: "Asset Inventory Catalog",
  description:
    "Browse inventory categories, stock status indicators, and selected-item detail for mock operational assets.",
};

export default function AssetInventoryPage() {
  return (
    <AssetInventoryExperience
      categories={inventoryCategories}
      items={inventoryItems}
    />
  );
}
