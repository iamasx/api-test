import type { Metadata } from "next";

import { ArchiveBrowserShell } from "./_components/archive-browser-shell";
import {
  readRequestedSnapshotId,
  resolveArchiveBrowserView,
} from "./_lib/archive-browser";

type ArchiveBrowserPageProps = {
  searchParams: Promise<{
    snapshot?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Archive Browser",
  description:
    "Browse archived entries through snapshot cards, metadata badges, and a detail panel.",
};

export default async function ArchiveBrowserPage({
  searchParams,
}: ArchiveBrowserPageProps) {
  const requestedSnapshotId = readRequestedSnapshotId(
    (await searchParams).snapshot,
  );
  const view = resolveArchiveBrowserView(requestedSnapshotId);

  return <ArchiveBrowserShell view={view} />;
}
