import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import QueueBoardPage from "./page";
import { getQueueBoardView } from "./_data/queue-board-data";

describe("QueueBoardPage", () => {
  it("renders the queue board route shell and not the home page content", () => {
    render(<QueueBoardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /visualize workflow load, escalations, and next actions in one board/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /queue health at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /workflow board/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/browse sealed archive snapshots without leaving the app shell/i),
    ).not.toBeInTheDocument();
  });

  it("renders all summary metrics from the mock queue snapshot", () => {
    const view = getQueueBoardView();

    render(<QueueBoardPage />);

    const metricList = screen.getByRole("list", {
      name: /queue summary metrics/i,
    });

    expect(within(metricList).getAllByRole("listitem")).toHaveLength(view.metrics.length);

    for (const metric of view.metrics) {
      const metricCard = within(metricList)
        .getByText(metric.label)
        .closest('[role="listitem"]');

      expect(metricCard).toBeInTheDocument();
      expect(metricCard).toHaveTextContent(metric.value);
      expect(metricCard).toHaveTextContent(metric.detail);
    }
  });

  it("renders each queue column with representative escalation and blocker content", () => {
    const view = getQueueBoardView();

    render(<QueueBoardPage />);

    const board = screen.getByTestId("queue-board-columns");

    for (const column of view.columns) {
      const columnRegion = within(board).getByRole("region", { name: column.title });
      const itemList = within(columnRegion).getByRole("list", {
        name: `${column.title} items`,
      });

      expect(within(columnRegion).getByText(column.description)).toBeInTheDocument();
      expect(within(itemList).getAllByRole("article")).toHaveLength(column.items.length);
    }

    const slaRiskCard = screen
      .getByRole("heading", {
        level: 3,
        name: /await signed carrier waiver from summit bio/i,
      })
      .closest("article");

    expect(slaRiskCard).toBeInTheDocument();
    expect(slaRiskCard).toHaveTextContent("Waiting");
    expect(slaRiskCard).toHaveTextContent("SLA Risk");
    expect(slaRiskCard).toHaveTextContent("Blocked");
    expect(slaRiskCard).toHaveTextContent(
      /customer legal review has not released the final waiver language/i,
    );

    const priorityCard = screen
      .getByRole("heading", {
        level: 3,
        name: /escalate missed pickup credit memo for atlas home/i,
      })
      .closest("article");

    expect(priorityCard).toBeInTheDocument();
    expect(priorityCard).toHaveTextContent("Priority");
    expect(priorityCard).toHaveTextContent(/same-day callback/i);
  });
});
