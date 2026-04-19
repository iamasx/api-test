import type { Metadata } from "next"
import { scenarioBoardScenario } from "./mock-data"
import { ScenarioBoardShell } from "@/components/scenario-board/scenario-board-shell"

export const metadata: Metadata = {
  title: "Scenario Board | API Test",
  description: "Mock scenario board with local playbooks, assumptions, and an outcome matrix.",
}

export default function ScenarioBoardPage() {
  return <ScenarioBoardShell scenario={scenarioBoardScenario} />
}
