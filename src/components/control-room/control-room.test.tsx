import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildControlRoomSnapshot } from "@/app/control-room/mock-data";
import { ActivityFeed } from "./activity-feed";

describe("control room feature", () => {
  it("rotates snapshot values across refresh cycles", () => {
    const referenceTime = new Date("2026-04-19T10:00:00.000Z");
    const first = buildControlRoomSnapshot(0, referenceTime);
    const second = buildControlRoomSnapshot(1, referenceTime);

    expect(first.lastUpdated).not.toBe(second.lastUpdated);
    expect(first.metrics[0]?.value).not.toBe(second.metrics[0]?.value);
    expect(first.alerts[0]?.title).not.toBe(second.alerts[0]?.title);
  });

  it("filters and expands activity rows on the client", () => {
    const snapshot = buildControlRoomSnapshot(
      0,
      new Date("2026-04-19T10:00:00.000Z"),
    );

    render(<ActivityFeed items={snapshot.feed} />);

    expect(
      screen.getByText("Routing policy widened on eu-west ingress"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Incidents" }));

    expect(
      screen.queryByText("Routing policy widened on eu-west ingress"),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Runbook 7 escalated to platform on-call/i }),
    );

    expect(screen.getByText("Primary on-call")).toBeInTheDocument();
  });
});
