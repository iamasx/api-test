import type { Metadata } from "next";

import { TelemetryDeskShell } from "@/components/telemetry-desk/telemetry-desk-shell";

export const metadata: Metadata = {
  title: "Telemetry Desk",
  description:
    "Mock telemetry desk with local metric tiles, trend comparisons, and alert summaries.",
};

export default function TelemetryDeskPage() {
  return <TelemetryDeskShell />;
}
