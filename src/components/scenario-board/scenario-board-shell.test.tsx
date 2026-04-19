import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { scenarioBoardScenario } from "@/app/scenario-board/mock-data";

import { ScenarioBoardShell } from "./scenario-board-shell";

describe("ScenarioBoardShell", () => {
  it("shows a zero-state when the active playbook is cleared", () => {
    render(<ScenarioBoardShell scenario={scenarioBoardScenario} />);

    expect(screen.getByText("VIP orders stay green")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /reroute premium loads/i }),
    );

    expect(
      screen.getByText(/Select a playbook card to project the matrix/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Choose a playbook to reveal the next prompts/i),
    ).toBeInTheDocument();
  });

  it("reacts to fragile assumption toggles and baseline reset", () => {
    render(<ScenarioBoardShell scenario={scenarioBoardScenario} />);

    fireEvent.click(
      screen.getByRole("button", { name: /buffer with partial kits/i }),
    );

    expect(
      screen.queryByText("Margin slips but churn holds"),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /finance approves temporary credits/i }),
    );

    expect(
      screen.getByText("Margin slips but churn holds"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /restore baseline/i }));

    expect(
      screen.queryByText("Margin slips but churn holds"),
    ).not.toBeInTheDocument();
  });

  it("filters matrix cells by impact focus", () => {
    render(<ScenarioBoardShell scenario={scenarioBoardScenario} />);

    fireEvent.click(screen.getByRole("button", { name: "Severe" }));

    expect(
      screen.getByText("Support volume doubles overnight"),
    ).toBeInTheDocument();
    expect(screen.queryByText("VIP orders stay green")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Contained" }));

    expect(screen.getByText("VIP orders stay green")).toBeInTheDocument();
    expect(
      screen.queryByText("Support volume doubles overnight"),
    ).not.toBeInTheDocument();
  });

  it("updates prompt readiness when a cue assumption is enabled", () => {
    render(<ScenarioBoardShell scenario={scenarioBoardScenario} />);

    fireEvent.click(
      screen.getByRole("button", { name: /buffer with partial kits/i }),
    );

    expect(screen.getByText("Draft margin-protection copy")).toBeInTheDocument();
    expect(screen.getByText("Hold")).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /finance approves temporary credits/i }),
    );

    expect(screen.queryByText("Hold")).not.toBeInTheDocument();
    expect(screen.getAllByText("Ready")).toHaveLength(2);
  });
});
