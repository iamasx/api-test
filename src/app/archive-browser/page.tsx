import type { Metadata } from "next";

import { ArchiveBrowserShell } from "./_components/archive-browser-shell";
import {
  readRequestedSnapshotId,
  resolveArchiveBrowserSelection,
} from "./_lib/archive-browser";

type ArchiveBrowserPageProps = {
  searchParams: Promise<{
    snapshot?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Archive Browser",
  description:
    "Inspect archived entries through snapshot cards, metadata sections, and a dedicated detail view.",
};

export default async function ArchiveBrowserPage({
  searchParams,
}: ArchiveBrowserPageProps) {
  const requestedSnapshotId = readRequestedSnapshotId(
    (await searchParams).snapshot,
  );
  const selection = resolveArchiveBrowserSelection(requestedSnapshotId);

  return <ArchiveBrowserShell selection={selection} />;
}
