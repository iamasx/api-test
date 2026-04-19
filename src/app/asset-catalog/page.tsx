import type { Metadata } from "next";

import { AssetCatalogShell } from "@/components/asset-catalog/asset-catalog-shell";

export const metadata: Metadata = {
  title: "Asset Catalog | API Test",
  description: "Searchable mock asset catalog with availability filters and local reservation previews.",
};

export default function AssetCatalogPage() {
  return <AssetCatalogShell />;
}
