import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  anomalySummary,
  telemetryDeskNotes,
  telemetryMetrics,
  telemetryTrends,
} from "./_data/telemetry-desk-data";
import TelemetryDeskPage from "./page";

afterEach(() => {
  cleanup();
});

describe("TelemetryDeskPage", () => {
  it("renders the route shell, major headings, and anomaly summary entry point", () => {
    render(<TelemetryDeskPage />);

    expect(
      screen.getByRole("heading", {
        name: /compare telemetry shifts before the desk inherits noisy alerts\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /metric overview/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /review how the desk is shifting/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /three clusters are shaping the next manual review pass\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review anomaly summary/i }),
    ).toHaveAttribute("href", "#telemetry-anomalies");
    expect(
      screen.queryByText(/to get started, edit the page\.tsx file\./i),
    ).toBeNull();
  });

  it("renders each metric tile from the mock desk data", () => {
    render(<TelemetryDeskPage />);

    const metricList = screen.getByRole("list", { name: /telemetry metrics/i });

    expect(metricList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      telemetryMetrics.length,
    );

    for (const metric of telemetryMetrics) {
      const card = within(metricList)
        .getByText(metric.label)
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(metric.value);
      expect(card?.textContent).toContain(metric.delta);
      expect(card?.textContent).toContain(metric.benchmark);
      expect(card?.textContent).toContain(metric.signal);
    }
  });

  it("renders trend comparison panels with current and reference values", () => {
    render(<TelemetryDeskPage />);

    const trendList = screen.getByRole("list", {
      name: /trend comparison panels/i,
    });

    expect(trendList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      telemetryTrends.length,
    );

    for (const trend of telemetryTrends) {
      const panel = within(trendList)
        .getByRole("heading", { name: trend.title })
        .closest('[role="listitem"]');

      expect(panel).toBeTruthy();
      expect(panel?.textContent).toContain(trend.currentValue);
      expect(panel?.textContent).toContain(trend.comparisonValue);
      expect(panel?.textContent).toContain(trend.changeLabel);
      expect(panel?.textContent).toContain(trend.note);

      for (const checkpoint of trend.checkpoints) {
        expect(panel?.textContent).toContain(checkpoint.label);
        expect(panel?.textContent).toContain(checkpoint.value);
        expect(panel?.textContent).toContain(checkpoint.emphasis);
      }
    }
  });

  it("shows anomaly stats, active clusters, and supporting desk notes", () => {
    render(<TelemetryDeskPage />);

    const summary = screen.getByLabelText(/anomaly summary/i);
    const clusterList = within(summary).getByRole("list", {
      name: /active anomaly clusters/i,
    });
    const notesPanel = screen.getByLabelText(/desk notes/i);
    const lowerPanels = screen.getByTestId("telemetry-desk-lower-panels");

    for (const stat of anomalySummary.stats) {
      expect(within(summary).getByText(stat.label)).toBeInTheDocument();
      expect(within(summary).getByText(stat.value)).toBeInTheDocument();
    }

    expect(clusterList.querySelectorAll(":scope > li")).toHaveLength(
      anomalySummary.anomalies.length,
    );

    for (const cluster of anomalySummary.anomalies) {
      const item = within(clusterList)
        .getByRole("heading", { name: cluster.title })
        .closest("li");

      expect(item).toBeTruthy();
      expect(item?.textContent).toContain(cluster.surface);
      expect(item?.textContent).toContain(cluster.owner);
      expect(item?.textContent).toContain(cluster.action);
    }

    for (const note of telemetryDeskNotes) {
      expect(notesPanel.textContent).toContain(note.label);
      expect(notesPanel.textContent).toContain(note.value);
      expect(notesPanel.textContent).toContain(note.detail);
    }

    expect(screen.getByText(anomalySummary.handoff.owner)).toBeInTheDocument();
    expect(lowerPanels.className).toContain(
      "xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]",
    );
  });
});
