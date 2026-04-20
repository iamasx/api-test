import type { Metadata } from "next";

import { CommandLogShell } from "./_components/command-log-shell";
import {
  readRequestedEventId,
  resolveCommandLogView,
} from "./_lib/command-log";

type CommandLogPageProps = {
  searchParams: Promise<{
    event?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Command Log",
  description:
    "Review chronological command events, recurring tags, and focused event detail on a dedicated route.",
};

export default async function CommandLogPage({
  searchParams,
}: CommandLogPageProps) {
  const requestedEventId = readRequestedEventId((await searchParams).event);
  const view = resolveCommandLogView(requestedEventId);

  return <CommandLogShell view={view} />;
}
