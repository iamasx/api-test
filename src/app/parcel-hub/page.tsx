import type { Metadata } from "next";

import { ParcelHubShell } from "./_components/parcel-hub-shell";
import { getParcelHubView } from "./_data/parcel-hub-data";

export const metadata: Metadata = {
  title: "Parcel Hub",
  description:
    "Mock parcel hub route with shipment lanes, parcel summaries, and exception detail coverage.",
};

export default function ParcelHubPage() {
  const view = getParcelHubView();

  return <ParcelHubShell view={view} />;
}
