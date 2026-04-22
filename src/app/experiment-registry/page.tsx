import type { Metadata } from "next";

import { ExperimentRegistryShell } from "./_components/experiment-registry-shell";
import { getExperimentRegistryView } from "./_lib/experiment-registry-data";

export const metadata: Metadata = {
  title: "Experiment Registry",
  description:
    "Registry of experiments with status badges, owner details, and compact results summaries.",
};

export default function ExperimentRegistryPage() {
  const view = getExperimentRegistryView();

  return <ExperimentRegistryShell view={view} />;
}
