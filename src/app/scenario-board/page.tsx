import type { Metadata } from "next";

import { ScenarioBoardShell } from "@/components/scenario-board/scenario-board-shell";

export const metadata: Metadata = {
  title: "Scenario Board",
  description:
    "Mock scenario-planning board with local playbooks, assumptions, and outcome matrix state.",
};

export default function ScenarioBoardPage() {
  return <ScenarioBoardShell />;
}
