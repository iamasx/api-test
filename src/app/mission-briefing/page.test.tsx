import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  briefingNotes,
  decisionPrompts,
  missionBriefingOverview,
  missionBriefingScenarios,
  readinessHighlights,
} from "./_data/mission-briefing-data";
import MissionBriefingPage from "./page";

afterEach(() => {
  cleanup();
});

describe("MissionBriefingPage", () => {
  it("renders the route shell headings and primary route actions", () => {
    render(<MissionBriefingPage />);

    expect(
      screen.getByRole("heading", {
        name: /build a briefing deck that compares branches before the field team commits\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /review the operational branches before the commit call/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /track where the plan is solid and where it can still break/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review scenario branches/i }),
    ).toHaveAttribute("href", "#mission-briefing-scenarios");
    expect(
      screen.getByRole("link", { name: /open decision support/i }),
    ).toHaveAttribute("href", "#decision-support");
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders every mission scenario with operators, assets, and friction points", () => {
    render(<MissionBriefingPage />);

    const scenarioList = screen.getByRole("list", {
      name: /mission briefing scenarios/i,
    });

    expect(scenarioList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      missionBriefingScenarios.length,
    );

    for (const scenario of missionBriefingScenarios) {
      const card = within(scenarioList)
        .getByRole("heading", { name: scenario.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(scenario.commander);
      expect(card?.textContent).toContain(scenario.supportLead);
      expect(card?.textContent).toContain(scenario.assetMix[0]);
      expect(card?.textContent).toContain(scenario.frictionPoints[0]);
      expect(card?.textContent).toContain(scenario.decision);
    }
  });

  it("shows readiness metrics and highlight cards with owners and next checks", () => {
    render(<MissionBriefingPage />);

    const readinessSection = screen.getByLabelText(/mission readiness highlights/i);

    for (const stat of missionBriefingOverview.stats) {
      expect(within(readinessSection).getByText(stat.label)).toBeInTheDocument();
      expect(within(readinessSection).getByText(stat.value)).toBeInTheDocument();
    }

    for (const highlight of readinessHighlights) {
      expect(within(readinessSection).getByText(highlight.label)).toBeInTheDocument();
      expect(within(readinessSection).getByText(highlight.value)).toBeInTheDocument();
      expect(within(readinessSection).getByText(highlight.owner)).toBeInTheDocument();
      expect(within(readinessSection).getByText(highlight.nextCheck)).toBeInTheDocument();
    }

    expect(within(readinessSection).getAllByText("Strong")).toHaveLength(2);
    expect(within(readinessSection).getAllByText("Moderate")).toHaveLength(2);
    expect(within(readinessSection).getByText("Weak")).toBeInTheDocument();
  });

  it("renders the decision support panel with the recommended branch, prompts, and notes", () => {
    render(<MissionBriefingPage />);

    const supportPanel = screen.getByLabelText(/decision support panel/i);

    expect(
      within(supportPanel).getByText(missionBriefingOverview.commandNote.decisionWindow),
    ).toBeInTheDocument();
    expect(
      within(supportPanel).getByRole("heading", {
        name: /delta ridge lift/i,
      }),
    ).toBeInTheDocument();

    for (const prompt of decisionPrompts) {
      expect(within(supportPanel).getByText(prompt.prompt)).toBeInTheDocument();
      expect(within(supportPanel).getByText(prompt.recommendation)).toBeInTheDocument();
      expect(within(supportPanel).getByText(prompt.threshold)).toBeInTheDocument();
    }

    for (const note of briefingNotes) {
      expect(within(supportPanel).getByText(note.title)).toBeInTheDocument();
      expect(within(supportPanel).getByText(note.owner)).toBeInTheDocument();
      expect(within(supportPanel).getByText(note.window)).toBeInTheDocument();
      expect(within(supportPanel).getByText(note.impact)).toBeInTheDocument();
    }
  });
});
