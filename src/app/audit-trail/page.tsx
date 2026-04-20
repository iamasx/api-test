import type { Metadata } from "next";

import { AuditTrailShell } from "./_components/audit-trail-shell";
import {
  readRequestedAuditFilter,
  resolveAuditTrailView,
} from "./_lib/audit-trail";

type AuditTrailPageProps = {
  searchParams: Promise<{
    view?: string | string[] | undefined;
  }>;
};

export const metadata: Metadata = {
  title: "Audit Trail",
  description:
    "Review recent audit entries, linked review flags, and reviewer ownership on a dedicated route.",
};

export default async function AuditTrailPage({
  searchParams,
}: AuditTrailPageProps) {
  const requestedFilterId = readRequestedAuditFilter((await searchParams).view);
  const view = resolveAuditTrailView(requestedFilterId);

  return <AuditTrailShell view={view} />;
}
