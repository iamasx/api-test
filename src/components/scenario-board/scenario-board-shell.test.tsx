import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScenarioBoardShell } from "./scenario-board-shell";

describe("ScenarioBoardShell", () => {
  it("swaps the selected playbook prompts when the mode changes", () => {
    render(<ScenarioBoardShell />);

    fireEvent.click(screen.getByText("Exploration"));
    fireEvent.click(screen.getByText("Priority Reroute"));

    const promptPanel = screen.getByLabelText("Selected playbook prompts");

    expect(
      within(promptPanel).getByText("Draft carrier comms with a two-window premium promise."),
    ).toBeInTheDocument();
    expect(
      within(promptPanel).getByText("Reserve one east basin gate marshal for the opening hour."),
    ).toBeInTheDocument();
  });

  it("shows the matrix empty state when every assumption is cleared", () => {
    render(<ScenarioBoardShell />);

    fireEvent.click(screen.getByRole("button", { name: "Clear assumptions" }));

    expect(
      screen.getByText("Re-enable at least one assumption to rebuild the matrix."),
    ).toBeInTheDocument();
  });
});
