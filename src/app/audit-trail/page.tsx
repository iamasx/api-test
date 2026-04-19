import type { Metadata } from "next";

import { AuditTrailShell } from "@/components/audit-trail/audit-trail-shell";

export const metadata: Metadata = {
  title: "Audit Trail | API Test",
  description:
    "Mock audit ledger with local review filters, reviewer badges, and session-only flags.",
};

export default function AuditTrailPage() {
  return <AuditTrailShell />;
}
