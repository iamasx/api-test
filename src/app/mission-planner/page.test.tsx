import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  missionPlannerSummary,
  missionScenarios,
  missionStages,
  readinessSignals,
} from "./_data/mission-planner-data";
import MissionPlannerPage from "./page";

afterEach(() => {
  cleanup();
});

describe("MissionPlannerPage", () => {
  it("renders the route headings and entry points for planning sections", () => {
    render(<MissionPlannerPage />);

    expect(
      screen.getByRole("heading", {
        name: /sequence launch-day contingencies before they become field delays\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /live mission snapshot/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /choose the path that best protects the launch window/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /walk the crew through the mission in sequence/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open staged checklist/i }),
    ).toHaveAttribute("href", "#mission-stage-checklist");
  });

  it("renders scenario cards from mock data with owners and checkpoints", () => {
    render(<MissionPlannerPage />);

    const scenarioList = screen.getByRole("list", { name: /mission scenarios/i });

    expect(scenarioList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      missionScenarios.length,
    );

    for (const scenario of missionScenarios) {
      const card = within(scenarioList)
        .getByRole("heading", { name: scenario.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(scenario.lead);
      expect(card?.textContent).toContain(scenario.support);
      expect(card?.textContent).toContain(scenario.checkpoints[0]);
    }
  });

  it("shows readiness metrics and signal states for the planner summary rail", () => {
    render(<MissionPlannerPage />);

    const readinessSummary = screen.getByLabelText(/mission readiness summary/i);

    for (const stat of missionPlannerSummary.stats) {
      expect(within(readinessSummary).getByText(stat.label)).toBeInTheDocument();
      expect(within(readinessSummary).getByText(stat.value)).toBeInTheDocument();
    }

    for (const signal of readinessSignals) {
      expect(within(readinessSummary).getByText(signal.label)).toBeInTheDocument();
      expect(within(readinessSummary).getByText(signal.value)).toBeInTheDocument();
    }

    expect(within(readinessSummary).getByText("Blocked")).toBeInTheDocument();
    expect(within(readinessSummary).getAllByText("Ready")).toHaveLength(2);
  });

  it("renders the staged checklist with every stage and task status", () => {
    render(<MissionPlannerPage />);

    const stageList = screen.getByRole("list", { name: /mission stages/i });

    expect(stageList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      missionStages.length,
    );

    for (const stage of missionStages) {
      const stageCard = within(stageList)
        .getByRole("heading", { name: stage.name })
        .closest('[role="listitem"]');

      expect(stageCard).toBeTruthy();
      expect(stageCard?.textContent).toContain(stage.focus);

      for (const task of stage.tasks) {
        expect(within(stageCard as HTMLElement).getByText(task.label)).toBeInTheDocument();
        expect(within(stageCard as HTMLElement).getByText(task.owner)).toBeInTheDocument();
      }
    }
  });
});
