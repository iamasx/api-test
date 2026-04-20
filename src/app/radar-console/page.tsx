import type { Metadata } from "next";

import { RadarConsoleShell } from "./_components/radar-console-shell";
import { readRequestedSignalId, resolveRadarConsoleView } from "./_lib/radar-console";

type RadarConsolePageProps = {
  searchParams: Promise<{
    signal?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Radar Console",
  description:
    "Monitor mock sectors, contact ownership, and selected signal priorities from a dedicated radar-console route.",
};

export default async function RadarConsolePage({
  searchParams,
}: RadarConsolePageProps) {
  const requestedSignalId = readRequestedSignalId((await searchParams).signal);
  const view = resolveRadarConsoleView(requestedSignalId);

  return <RadarConsoleShell view={view} />;
}
