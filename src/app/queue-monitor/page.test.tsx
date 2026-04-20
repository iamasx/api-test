import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import QueueMonitorPage from "./page";
import {
  queueMonitorColumns,
  queueMonitorFocusedItemId,
  queueMonitorItems,
  queueMonitorQueues,
} from "./_data/queue-monitor-data";

describe("QueueMonitorPage", () => {
  it("renders the route sections for summaries, queues, backlog columns, and escalation detail", () => {
    render(<QueueMonitorPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /scan backlog columns, queue summaries, and the highest-risk escalation from one route/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /workflow pressure at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /queue-by-queue workload/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /backlog columns with a focused escalation lane/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/controlled conflict drill b landing page headline/i),
    ).not.toBeInTheDocument();
  });

  it("renders summary metrics and queue summaries from the mock dataset", () => {
    render(<QueueMonitorPage />);

    const metricList = screen.getByRole("list", {
      name: /queue summary metrics/i,
    });
    const queueSummaryList = screen.getByRole("list", {
      name: /queue summaries/i,
    });

    expect(within(metricList).getAllByRole("listitem")).toHaveLength(4);
    expect(within(queueSummaryList).getAllByRole("listitem")).toHaveLength(
      queueMonitorQueues.length,
    );

    for (const queue of queueMonitorQueues) {
      const queueCard = within(queueSummaryList)
        .getByText(queue.name)
        .closest('[role="listitem"]');

      expect(queueCard).toBeInTheDocument();
      expect(queueCard).toHaveTextContent(queue.focus);
      expect(queueCard).toHaveTextContent(queue.summaryWindow);
    }
  });

  it("renders each backlog column with the expected number of cards", () => {
    render(<QueueMonitorPage />);

    const board = screen.getByTestId("queue-monitor-columns");

    for (const column of queueMonitorColumns) {
      const expectedItems = queueMonitorItems.filter(
        (item) => item.columnId === column.id,
      );
      const columnRegion = within(board).getByRole("region", {
        name: column.title,
      });
      const itemList = within(columnRegion).getByRole("list", {
        name: `${column.title} items`,
      });

      expect(within(columnRegion).getByText(column.description)).toBeInTheDocument();
      expect(within(columnRegion).getByText(column.backlogExpectation)).toBeInTheDocument();
      expect(within(itemList).getAllByRole("article")).toHaveLength(
        expectedItems.length,
      );
    }
  });

  it("shows representative blocked and escalated content in cards and the detail panel", () => {
    render(<QueueMonitorPage />);

    const focusedItem = queueMonitorItems.find(
      (item) => item.id === queueMonitorFocusedItemId,
    );

    expect(focusedItem).toBeDefined();

    const blockedCard = screen
      .getByRole("heading", {
        level: 3,
        name: /obtain weekend dispatch waiver for summit bio restock/i,
      })
      .closest("article");

    expect(blockedCard).toBeInTheDocument();
    expect(blockedCard).toHaveTextContent("Blocked");
    expect(blockedCard).toHaveTextContent("SLA Risk");
    expect(blockedCard).toHaveTextContent("Waiver required in 90 minutes");
    expect(blockedCard).toHaveTextContent(
      /clinical leadership has not returned the signed waiver packet/i,
    );

    const detailPanel = screen
      .getByRole("heading", {
        level: 2,
        name: /obtain weekend dispatch waiver for summit bio restock/i,
      })
      .closest("aside");

    expect(detailPanel).toBeInTheDocument();
    expect(detailPanel).toHaveTextContent("Cold Chain Control");
    expect(detailPanel).toHaveTextContent("SLA Risk");
    expect(detailPanel).toHaveTextContent(
      /keep on the escalation panel until a recovery path is confirmed/i,
    );

    for (const point of focusedItem?.focusPoints ?? []) {
      expect(detailPanel).toHaveTextContent(point);
    }
  });
});
