import type { Metadata } from "next";

import { RadarConsoleShell } from "@/components/radar-console/radar-console-shell";

export const metadata: Metadata = {
  title: "Radar Console | API Test",
  description:
    "Synthetic tracking console with sector summaries, contact cards, and a focused inspector panel.",
};

export default function RadarConsolePage() {
  return <RadarConsoleShell />;
}
