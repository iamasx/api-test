import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  operationsCenterActivity,
  operationsCenterAlerts,
  operationsCenterMetrics,
} from "./_data/dashboard-data";
import OperationsCenterPage from "./page";

afterEach(() => {
  cleanup();
});

describe("OperationsCenterPage", () => {
  it("renders the dashboard shell independently from the home page", () => {
    render(<OperationsCenterPage />);

    expect(
      screen.getByRole("heading", {
        name: /keep critical lanes, crews, and customer promises in sync\./i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /kpi snapshot/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /live alerts/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /recent activity/i }),
    ).toBeTruthy();
    expect(
      screen.queryByText(/to get started, edit the page\.tsx file\./i),
    ).toBeNull();
  });

  it("renders each metric card from mock content", () => {
    render(<OperationsCenterPage />);

    const metricList = screen.getByRole("list", { name: /kpi metrics/i });
    expect(within(metricList).getAllByRole("listitem")).toHaveLength(
      operationsCenterMetrics.length,
    );

    for (const metric of operationsCenterMetrics) {
      const metricCard = within(metricList)
        .getByText(metric.label)
        .closest('[role="listitem"]');

      expect(metricCard).toBeTruthy();
      expect(metricCard?.textContent).toContain(metric.value);
      expect(metricCard?.textContent).toContain(metric.delta);
    }
  });

  it("renders alert and activity sections with mock items and responsive layout hooks", () => {
    render(<OperationsCenterPage />);

    const alertList = screen.getByRole("list", { name: /live alerts/i });
    const activityList = screen.getByRole("list", { name: /recent activity/i });
    const panels = screen.getByTestId("operations-center-panels");

    expect(within(alertList).getAllByRole("listitem")).toHaveLength(
      operationsCenterAlerts.length,
    );
    expect(within(activityList).getAllByRole("listitem")).toHaveLength(
      operationsCenterActivity.length,
    );
    expect(screen.getByText(operationsCenterAlerts[0].playbook)).toBeTruthy();
    expect(screen.getByText(operationsCenterActivity[0].outcome)).toBeTruthy();
    expect(panels.className).toContain("xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)]");
  });
});
