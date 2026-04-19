import type { Metadata } from "next";

import { RoutePlannerShell } from "@/components/route-planner/route-planner-shell";

export const metadata: Metadata = {
  title: "Route Planner",
  description:
    "Mock route planning board with local segment cards, constraint filters, and decision summaries.",
};

export default function RoutePlannerPage() {
  return <RoutePlannerShell />;
}
