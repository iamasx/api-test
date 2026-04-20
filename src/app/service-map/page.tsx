import type { Metadata } from "next";

import { ServiceMapShell } from "./_components/service-map-shell";

export const metadata: Metadata = {
  title: "Service Map",
  description:
    "Route-local service topology with operational clusters, dependency highlights, and a selected-service inspector.",
};

export default function ServiceMapPage() {
  return <ServiceMapShell />;
}
