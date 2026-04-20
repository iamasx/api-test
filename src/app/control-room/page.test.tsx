import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityRail } from "./_components/activity-rail";
import { AlertList } from "./_components/alert-list";
import {
  controlRoomAlertSections,
  controlRoomMetrics,
  operatorActivityEntries,
} from "./_data/control-room-data";
import ControlRoomPage from "./page";

describe("ControlRoomPage", () => {
  it("renders the route shell with the required headings", () => {
    render(<ControlRoomPage />);

    expect(
      screen.getByRole("heading", {
        name: /see operational drift before it becomes customer impact\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /operational health snapshot/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /intervention lanes/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /live handoff rail/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/to get started, edit the page\.tsx file\./i),
    ).not.toBeInTheDocument();
  });

  it("renders every metric card from route-local mock data", () => {
    render(<ControlRoomPage />);

    const metricList = screen.getByRole("list", { name: /control room metrics/i });
    expect(within(metricList).getAllByRole("listitem")).toHaveLength(
      controlRoomMetrics.length,
    );

    for (const metric of controlRoomMetrics) {
      const card = within(metricList)
        .getByText(metric.label)
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(metric.value);
      expect(card).toHaveTextContent(metric.delta);
      expect(card).toHaveTextContent(metric.focus);
    }
  });

  it("renders alert lanes, activity entries, and responsive layout hooks", () => {
    render(<ControlRoomPage />);

    const panels = screen.getByTestId("control-room-panels");
    const activityRail = screen.getByRole("list", {
      name: /operator activity rail/i,
    });

    expect(panels.className).toContain(
      "xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.92fr)]",
    );
    expect(within(activityRail).getAllByRole("listitem")).toHaveLength(
      operatorActivityEntries.length,
    );
    expect(
      screen.getByText(controlRoomAlertSections[0].alerts[0].nextStep),
    ).toBeInTheDocument();
    expect(
      screen.getByText(operatorActivityEntries[0].handoff),
    ).toBeInTheDocument();

    for (const section of controlRoomAlertSections) {
      const alertList = screen.getByRole("list", { name: section.title });
      expect(within(alertList).getAllByRole("listitem")).toHaveLength(
        section.alerts.length,
      );
    }
  });
});

describe("control-room dashboard components", () => {
  it("renders an empty-state alert lane when a section has no alerts", () => {
    render(
      <AlertList
        sections={[
          {
            ...controlRoomAlertSections[0],
            alerts: [],
          },
        ]}
      />,
    );

    expect(
      screen.getByText(/no active alerts in this lane\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/operators can confirm the lane is intentionally clear/i),
    ).toBeInTheDocument();
  });

  it("renders an empty-state activity rail when no entries are present", () => {
    render(<ActivityRail entries={[]} />);

    expect(
      screen.getByText(/no operator activity has been logged yet\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/fresh activity can appear without shifting the rest/i),
    ).toBeInTheDocument();
  });
});
