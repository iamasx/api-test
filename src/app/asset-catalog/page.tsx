import type { Metadata } from "next";

import { AssetCatalogShell } from "@/components/asset-catalog/asset-catalog-shell";

export const metadata: Metadata = {
  title: "Asset Catalog | API Test",
  description:
    "Reservation planning workspace with asset forecasting, bundle recommendations, and route-local preview flows.",
};

export default function AssetCatalogPage() {
  return <AssetCatalogShell />;
}
