import type { Metadata } from "next";

import { SignalMonitorShell } from "./_components/signal-monitor-shell";
import {
  readRequestedSignalId,
  resolveSignalMonitorView,
} from "./_lib/signal-monitor";

export const metadata: Metadata = {
  title: "Signal Monitor",
  description:
    "Monitoring route with live signal cards, anomaly summaries, and an inspector panel.",
};

type SignalMonitorPageProps = {
  searchParams: Promise<{
    signal?: string | string[] | undefined;
  }>;
};

export default async function SignalMonitorPage({
  searchParams,
}: SignalMonitorPageProps) {
  const requestedSignalId = readRequestedSignalId((await searchParams).signal);
  const view = resolveSignalMonitorView(requestedSignalId);

  return <SignalMonitorShell view={view} />;
}
