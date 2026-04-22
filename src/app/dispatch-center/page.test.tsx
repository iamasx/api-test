import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DispatchCenterPage from "./page";
import {
  dispatchAssignments,
  dispatchBuckets,
  dispatchQueues,
} from "./_lib/dispatch-data";

describe("DispatchCenterPage", () => {
  it("renders the hero heading and dispatch pulse metrics", () => {
    render(<DispatchCenterPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /route, release, and resolve every active assignment from one board/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(String(dispatchAssignments.length))).toBeInTheDocument();
  }, 15000);

  it("renders every queue summary card", () => {
    render(<DispatchCenterPage />);

    const queueList = screen.getByRole("list", { name: /queues/i });
    const items = within(queueList).getAllByRole("listitem");
    expect(items).toHaveLength(dispatchQueues.length);

    for (const queue of dispatchQueues) {
      expect(screen.getByText(queue.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${queue.pendingCount} pending`),
      ).toBeInTheDocument();
    }
  }, 15000);

  it("renders all assignment buckets with correct titles", () => {
    render(<DispatchCenterPage />);

    for (const bucket of dispatchBuckets) {
      expect(
        screen.getByRole("region", { name: bucket.title }),
      ).toBeInTheDocument();
    }
  }, 15000);

  it("shows meaningful status and owner details on assignment cards", () => {
    render(<DispatchCenterPage />);

    const firstBucket = screen.getByRole("region", {
      name: "Dispatch now",
    });
    const firstCard = within(firstBucket).getByRole("article", {
      name: /cold-chain reroute/i,
    });

    expect(firstCard).toHaveTextContent("DC-204");
    expect(firstCard).toHaveTextContent("Critical");
    expect(firstCard).toHaveTextContent("Kira Holt");
    expect(firstCard).toHaveTextContent("Mercury Market");
    expect(firstCard).toHaveTextContent("53' reefer");
  }, 15000);

  it("renders the detail panel with blockers and next actions", () => {
    render(<DispatchCenterPage />);

    const detail = screen.getByLabelText(/assignment detail/i);
    expect(detail).toBeInTheDocument();
    expect(detail).toHaveTextContent("DC-204");

    const blockers = within(detail).getByRole("list", { name: /blockers/i });
    expect(within(blockers).getAllByRole("listitem").length).toBeGreaterThan(0);

    const actions = within(detail).getByRole("list", {
      name: /next actions/i,
    });
    expect(within(actions).getAllByRole("listitem").length).toBeGreaterThan(0);
  }, 15000);

  it("renders assignment cards in every non-empty bucket", () => {
    render(<DispatchCenterPage />);

    for (const bucket of dispatchBuckets) {
      const region = screen.getByRole("region", { name: bucket.title });
      const assignmentList = within(region).getByRole("list", {
        name: `${bucket.title} assignments`,
      });
      const cards = within(assignmentList).getAllByRole("listitem");
      const expectedCount = dispatchAssignments.filter(
        (a) => a.bucketId === bucket.id,
      ).length;
      expect(cards).toHaveLength(expectedCount);
    }
  }, 15000);
});
