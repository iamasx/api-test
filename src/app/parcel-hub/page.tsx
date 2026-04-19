import type { Metadata } from "next";
import { ParcelHubShell } from "@/components/parcel-hub/parcel-hub-shell";

export const metadata: Metadata = {
  title: "Parcel Hub | API Test",
  description: "Mock parcel operations route with lane summaries and local exception handling.",
};

export default function ParcelHubPage() {
  return <ParcelHubShell />;
}
