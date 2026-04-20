import type { Metadata } from "next";

import { AlertJournalShell } from "./_components/alert-journal-shell";
import {
  readRequestedAlertId,
  resolveAlertJournalView,
} from "./_lib/alert-journal";

export const metadata: Metadata = {
  title: "Alert Journal",
  description:
    "Review alert history by day, recurring tags, and a focused resolution panel on the alert journal route.",
};

type AlertJournalPageProps = {
  searchParams: Promise<{
    alert?: string | string[] | undefined;
  }>;
};

export default async function AlertJournalPage({
  searchParams,
}: AlertJournalPageProps) {
  const requestedAlertId = readRequestedAlertId((await searchParams).alert);
  const view = resolveAlertJournalView(requestedAlertId);

  return <AlertJournalShell view={view} />;
}
