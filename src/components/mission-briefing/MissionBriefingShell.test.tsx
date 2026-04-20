import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { missionScenarios } from "@/app/mission-briefing/mission-data";

import { MissionBriefingShell } from "./MissionBriefingShell";

describe("MissionBriefingShell", { timeout: 20000 }, () => {
  it("preserves notes per active plan while scenario focus changes", () => {
    render(<MissionBriefingShell scenarios={missionScenarios} />);

    fireEvent.click(screen.getByLabelText(/focus scenario harbor echo/i));
    fireEvent.click(screen.getByLabelText(/select plan delay for clean window/i));

    fireEvent.change(screen.getByLabelText(/decision notes/i), {
      target: { value: "Hold delta until patrol traffic fully clears the lane." },
    });

    fireEvent.click(screen.getByLabelText(/select plan berth gamma fallback/i));
    expect(screen.getByLabelText(/decision notes/i)).toHaveValue("");

    fireEvent.click(screen.getByLabelText(/select plan delay for clean window/i));
    expect(screen.getByLabelText(/decision notes/i)).toHaveValue(
      "Hold delta until patrol traffic fully clears the lane.",
    );

    fireEvent.click(screen.getByLabelText(/focus scenario polar relay/i));
    fireEvent.click(screen.getByLabelText(/focus scenario harbor echo/i));

    expect(screen.getByLabelText(/decision notes/i)).toHaveValue(
      "Hold delta until patrol traffic fully clears the lane.",
    );
  });

  it("updates active scoring and outcome summaries when projections change", () => {
    render(<MissionBriefingShell scenarios={missionScenarios} />);

    fireEvent.click(screen.getByLabelText(/focus scenario harbor echo/i));

    expect(screen.getByText("Active score 75")).toBeInTheDocument();

    fireEvent.click(
      screen.getByLabelText(/select outcome fallback lane opens early/i),
    );

    expect(screen.getByText("Active score 81")).toBeInTheDocument();
    expect(
      screen.getAllByText(/harbor team finishes before the overlap intensifies/i),
    ).toHaveLength(2);

    fireEvent.click(
      screen.getByLabelText(/select outcome gamma crowds unexpectedly/i),
    );

    expect(
      screen.getAllByText(/a second pier move creates more chaos/i),
    ).toHaveLength(2);
    expect(screen.getAllByText(/Outcome stress/i).length).toBeGreaterThan(0);
  });

  it("switches review prompts when the readiness review mode changes", () => {
    render(<MissionBriefingShell scenarios={missionScenarios} />);

    fireEvent.click(screen.getByLabelText(/focus scenario polar relay/i));
    fireEvent.click(
      screen.getByLabelText(/select plan reserve controller activation/i),
    );

    expect(
      screen.getByText(/use this when the crew gap is the true blocker/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /support review/i }));

    expect(
      screen.getByText(/command net support rises during the handoff/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /risk review/i }));

    expect(
      screen.getByText(/a late handoff can turn the staff-first idea into pure delay/i),
    ).toBeInTheDocument();
  });

  it("keeps the compare board coherent when pinned scenarios are filtered away", () => {
    render(<MissionBriefingShell scenarios={missionScenarios} />);

    expect(
      screen.getByLabelText(/focus review scenario northern line/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/focus review scenario harbor echo/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/pin polar relay for review/i));

    expect(
      screen.getByLabelText(/focus review scenario polar relay/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ready" }));

    expect(
      screen.queryByLabelText(/focus review scenario harbor echo/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/focus review scenario polar relay/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/pin another scenario from the rail to compare alternate plans/i),
    ).toBeInTheDocument();
  });
});
