import type { Metadata } from "next";

import { ServiceMapShell } from "@/components/service-map/service-map-shell";

export const metadata: Metadata = {
  title: "Service Map",
  description:
    "Mock service topology view with isolated node clusters, dependency highlights, and a focus inspector.",
};

export default function ServiceMapPage() {
  return <ServiceMapShell />;
}
