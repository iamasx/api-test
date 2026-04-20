import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ScenarioExplorerPage from "./page";

describe("ScenarioExplorerPage", () => {
  it("renders the route heading and every scenario summary card", () => {
    render(<ScenarioExplorerPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Scenario Explorer" }),
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("scenario-card")).toHaveLength(3);

    expect(screen.getAllByText("Launch Sprint").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Phased Rollout").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Reliability Hardening").length).toBeGreaterThan(
      0,
    );
  });

  it("renders comparison content and recommendation guidance", () => {
    render(<ScenarioExplorerPage />);

    expect(screen.getAllByText("Delivery posture").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Operating signal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Intervention triggers").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByText(
        /Wave-based launch with explicit hold points between rollout stages\./,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Measured capacity growth that can be paused between waves without stopping the program\./,
      ).length,
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByRole("heading", {
        level: 2,
        name: "Recommended operating mode",
      }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Phased Rollout leads because it keeps momentum high without sacrificing the controls needed to expand responsibly\./,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Cap the first wave to two customer cohorts and a narrow SLA tier\./,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Lock the first two cohorts and define the success threshold for each wave\./,
      ).length,
    ).toBeGreaterThan(0);
  });
});
