import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  scenarioBoardScenarios,
  scenarioBoardSummary,
  scenarioDecisionPrompts,
  scenarioOutcomeMatrix,
} from "./_data/scenario-board-data";
import ScenarioBoardPage from "./page";

afterEach(() => {
  cleanup();
});

describe("ScenarioBoardPage", () => {
  it("renders the scenario board shell with its main planning sections", () => {
    render(<ScenarioBoardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: scenarioBoardSummary.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /weigh trade-offs across the board/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /questions to settle before execution starts/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /compare likely outcomes before you commit/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open outcome matrix/i }),
    ).toHaveAttribute("href", "#outcome-matrix");
  });

  it("renders every scenario card with ownership, measures, and checkpoints", () => {
    render(<ScenarioBoardPage />);

    const scenarioList = screen.getByRole("list", { name: /scenario options/i });

    expect(scenarioList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      scenarioBoardScenarios.length,
    );

    for (const scenario of scenarioBoardScenarios) {
      const card = within(scenarioList)
        .getByRole("heading", { name: scenario.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card).toHaveTextContent(scenario.lead);
      expect(card).toHaveTextContent(scenario.support);
      expect(card).toHaveTextContent(scenario.measures[0].value);
      expect(card).toHaveTextContent(scenario.checkpoints[0]);
    }
  });

  it("renders decision prompts with owners, review windows, and option trade-offs", () => {
    render(<ScenarioBoardPage />);

    const promptList = screen.getByRole("list", { name: /decision prompts/i });

    expect(promptList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      scenarioDecisionPrompts.length,
    );

    for (const prompt of scenarioDecisionPrompts) {
      const promptCard = within(promptList)
        .getByRole("heading", { name: prompt.title })
        .closest('[role="listitem"]');

      expect(promptCard).toBeTruthy();
      expect(promptCard).toHaveTextContent(prompt.question);
      expect(promptCard).toHaveTextContent(prompt.owner);
      expect(promptCard).toHaveTextContent(prompt.reviewWindow);
      expect(promptCard).toHaveTextContent(prompt.options[0].label);
      expect(promptCard).toHaveTextContent(prompt.options[0].risk);
    }

    const notesList = screen.getByRole("list", { name: /board notes/i });
    expect(within(notesList).getAllByRole("listitem")).toHaveLength(
      scenarioBoardSummary.boardNotes.length,
    );
  });

  it("renders the outcome matrix with every criterion and preserves responsive hooks", () => {
    render(<ScenarioBoardPage />);

    const matrix = screen.getByRole("table", {
      name: scenarioOutcomeMatrix.title,
    });
    const panelLayout = screen.getByTestId("scenario-board-panels");
    const matrixWrap = screen.getByTestId("outcome-matrix-wrap");

    expect(panelLayout.className).toContain(
      "xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]",
    );
    expect(matrixWrap.className).toContain("overflow-x-auto");

    for (const scenario of scenarioBoardScenarios) {
      expect(within(matrix).getByText(scenario.title)).toBeInTheDocument();
    }

    for (const row of scenarioOutcomeMatrix.rows) {
      expect(within(matrix).getByText(row.criterion)).toBeInTheDocument();
      expect(
        within(matrix).getByText(row.outcomes["hybrid-buffer"].label),
      ).toBeInTheDocument();
      expect(
        within(matrix).getByText(row.outcomes["airbridge-burst"].label),
      ).toBeInTheDocument();
      expect(
        within(matrix).getByText(row.outcomes["sealift-stretch"].label),
      ).toBeInTheDocument();
    }

    expect(screen.getByText(scenarioOutcomeMatrix.footer)).toBeInTheDocument();
  });
});
