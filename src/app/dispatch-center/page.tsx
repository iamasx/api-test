import type { Metadata } from "next";

import { DispatchCenterShell } from "./_components/dispatch-center-shell";
import {
  readRequestedAssignmentId,
  resolveDispatchCenterView,
} from "./_lib/dispatch-center";

type DispatchCenterPageProps = {
  searchParams: Promise<{
    assignment?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Dispatch Center",
  description:
    "Operational board with assignment buckets, pending queue summaries, and a selected-assignment detail panel.",
};

export default async function DispatchCenterPage({
  searchParams,
}: DispatchCenterPageProps) {
  const requestedAssignmentId = readRequestedAssignmentId(
    (await searchParams).assignment,
  );
  const view = resolveDispatchCenterView(requestedAssignmentId);

  return <DispatchCenterShell view={view} />;
}
