import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  activeAlerts,
  kpiMetrics,
  recentActivity,
} from "./_data/dashboard-data";
import OperationsCenterPage from "./page";

afterEach(() => {
  cleanup();
});

describe("OperationsCenterPage", () => {
  it("renders the page heading and description", () => {
    render(<OperationsCenterPage />);

    expect(
      screen.getByRole("heading", { name: /shift overview/i }),
    ).toBeTruthy();
    expect(
      screen.getByText(/monitor network kpis, active alerts/i),
    ).toBeTruthy();
  });

  it("renders all three section headings", () => {
    render(<OperationsCenterPage />);

    expect(
      screen.getByRole("heading", { name: /kpi snapshot/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /active alerts/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /recent activity/i }),
    ).toBeTruthy();
  });

  it("renders each KPI metric tile from mock data", () => {
    render(<OperationsCenterPage />);

    const metricList = screen.getByRole("list", { name: /kpi metrics/i });
    expect(within(metricList).getAllByRole("listitem")).toHaveLength(
      kpiMetrics.length,
    );

    for (const metric of kpiMetrics) {
      expect(screen.getByText(metric.label)).toBeTruthy();
      expect(screen.getByText(metric.value)).toBeTruthy();
    }
  });

  it("renders alert items with severity and title", () => {
    render(<OperationsCenterPage />);

    const alertList = screen.getByRole("list", { name: /active alerts/i });
    expect(within(alertList).getAllByRole("listitem")).toHaveLength(
      activeAlerts.length,
    );

    for (const alert of activeAlerts) {
      expect(screen.getByText(alert.title)).toBeTruthy();
    }
  });

  it("renders activity entries with timestamps", () => {
    render(<OperationsCenterPage />);

    const activityList = screen.getByRole("list", { name: /recent activity/i });
    expect(within(activityList).getAllByRole("listitem")).toHaveLength(
      recentActivity.length,
    );

    for (const entry of recentActivity) {
      expect(screen.getByText(entry.title)).toBeTruthy();
      expect(screen.getByText(entry.timestamp)).toBeTruthy();
    }
  });

  it("includes responsive layout panel container", () => {
    render(<OperationsCenterPage />);

    const panels = screen.getByTestId("operations-center-panels");
    expect(panels).toBeTruthy();
  });
});
