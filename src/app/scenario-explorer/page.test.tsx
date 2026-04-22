import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ScenarioExplorerPage from "./page";

describe("ScenarioExplorerPage", () => {
  it("renders the hero section with title and description", () => {
    render(<ScenarioExplorerPage />);

    expect(
      screen.getByText("Compare futures, decide now"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/scenario summaries, trade-offs, and recommendations/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Scenario Explorer")).toBeInTheDocument();
  });

  it("renders all scenario summary cards with meaningful content", () => {
    render(<ScenarioExplorerPage />);

    const scenarioList = screen.getByRole("list", {
      name: /scenario summaries/i,
    });

    expect(
      within(scenarioList).getByText("Steady-state growth"),
    ).toBeInTheDocument();
    expect(
      within(scenarioList).getByText("Accelerated expansion"),
    ).toBeInTheDocument();
    expect(
      within(scenarioList).getByText("Market contraction"),
    ).toBeInTheDocument();
    expect(
      within(scenarioList).getByText("Regulatory shift"),
    ).toBeInTheDocument();

    expect(
      within(scenarioList).getByText(/retention rate holds above 92%/i),
    ).toBeInTheDocument();
    expect(
      within(scenarioList).getByText(/enterprise deal velocity drops 40%/i),
    ).toBeInTheDocument();
  });

  it("renders comparison notes with cross-scenario references", () => {
    render(<ScenarioExplorerPage />);

    expect(
      screen.getByText("Growth vs. contraction staffing"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Infrastructure readiness overlap"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Revenue sensitivity to churn"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/prioritizing multi-region infrastructure/i),
    ).toBeInTheDocument();
  });

  it("renders the recommendation panel with actionable items", () => {
    render(<ScenarioExplorerPage />);

    const recPanel = screen.getByLabelText(/recommendations/i);

    expect(
      within(recPanel).getByText("Suggested next moves"),
    ).toBeInTheDocument();
    expect(
      within(recPanel).getByText(
        "Invest in multi-region infrastructure early",
      ),
    ).toBeInTheDocument();
    expect(
      within(recPanel).getByText("Maintain a flexible hiring pipeline"),
    ).toBeInTheDocument();
    expect(
      within(recPanel).getByText(
        "Strengthen retention and onboarding tooling",
      ),
    ).toBeInTheDocument();
    expect(
      within(recPanel).getByText("Run a quarterly scenario review"),
    ).toBeInTheDocument();

    expect(within(recPanel).getAllByText(/high priority/i)).toHaveLength(2);
  });

  it("renders hero metrics with correct counts", () => {
    render(<ScenarioExplorerPage />);

    expect(
      screen.getByText("Distinct planning futures tracked"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cross-scenario trade-off notes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Actionable next steps proposed"),
    ).toBeInTheDocument();
  });

  it("displays tone badges on scenario cards", () => {
    render(<ScenarioExplorerPage />);

    const scenarioList = screen.getByRole("list", {
      name: /scenario summaries/i,
    });

    expect(within(scenarioList).getAllByText("steady")).toHaveLength(1);
    expect(within(scenarioList).getAllByText("watch")).toHaveLength(2);
    expect(within(scenarioList).getAllByText("risk")).toHaveLength(1);
  });
});
