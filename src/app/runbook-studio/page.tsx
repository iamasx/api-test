import type { Metadata } from "next";

import RunbookStudioShell from "@/components/runbook-studio/runbook-studio-shell";

export const metadata: Metadata = {
  title: "Runbook Studio | API Test",
  description:
    "Isolated mock runbook authoring surface with procedure cards, execution stages, and a preview panel.",
};

export default function RunbookStudioPage() {
  return <RunbookStudioShell />;
}
