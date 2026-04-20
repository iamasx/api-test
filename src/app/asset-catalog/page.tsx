import type { Metadata } from "next";

import { AssetCatalogExperience } from "@/components/asset-catalog/asset-catalog-experience";
import {
  assetCatalogAssets,
  assetCatalogCategories,
} from "@/data/asset-catalog";

export const metadata: Metadata = {
  title: "Asset Catalog",
  description:
    "Search grouped mock assets by category and review a focused availability detail panel.",
};

export default function AssetCatalogPage() {
  return (
    <AssetCatalogExperience
      categories={assetCatalogCategories}
      items={assetCatalogAssets}
    />
  );
}
