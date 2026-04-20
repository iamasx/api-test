import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildControlRoomSnapshot } from "@/app/control-room/mock-data";
import { ControlRoomDashboard } from "./control-room-dashboard";

function renderDashboard() {
  const snapshot = buildControlRoomSnapshot(
    0,
    new Date("2026-04-19T10:00:00.000Z"),
  );

  render(<ControlRoomDashboard initialSnapshot={snapshot} />);
}

describe("control room feature", () => {
  it("rotates snapshot values across refresh cycles", () => {
    const referenceTime = new Date("2026-04-19T10:00:00.000Z");
    const first = buildControlRoomSnapshot(0, referenceTime);
    const second = buildControlRoomSnapshot(1, referenceTime);

    expect(first.lastUpdated).not.toBe(second.lastUpdated);
    expect(first.metrics[0]?.value).not.toBe(second.metrics[0]?.value);
    expect(first.alerts[0]?.title).not.toBe(second.alerts[0]?.title);
  });

  it("opens the command palette with the keyboard and focuses the activity feed", async () => {
    renderDashboard();

    fireEvent.keyDown(document, { ctrlKey: true, key: "k" });

    const searchInput = screen.getByRole("textbox", {
      name: /search commands/i,
    });

    fireEvent.change(searchInput, { target: { value: "focus activity feed" } });
    fireEvent.click(
      screen.getByRole("option", { name: /focus activity feed/i }),
    );

    await waitFor(() => {
      expect(screen.getByText(/focus Activity Feed/i)).toBeInTheDocument();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters the alert queue from the command palette", () => {
    renderDashboard();

    fireEvent.click(
      screen.getByRole("button", { name: /open command palette/i }),
    );

    const searchInput = screen.getByRole("textbox", {
      name: /search commands/i,
    });

    fireEvent.change(searchInput, { target: { value: "show critical alerts only" } });
    fireEvent.click(
      screen.getByRole("option", { name: /show critical alerts only/i }),
    );

    const alertQueue = screen.getByLabelText(/alert queue/i);

    expect(
      within(alertQueue).queryByText("Background queue rising in canary lane"),
    ).not.toBeInTheDocument();
    expect(
      within(alertQueue).getByText("Replica drift exceeds guardrail"),
    ).toBeInTheDocument();
  });

  it("opens an alert drilldown and stages remediation shortcuts", () => {
    renderDashboard();

    fireEvent.click(
      screen.getByRole("button", { name: /open command palette/i }),
    );

    const searchInput = screen.getByRole("textbox", {
      name: /search commands/i,
    });

    fireEvent.change(searchInput, { target: { value: "background queue" } });
    fireEvent.click(
      screen.getByRole("option", {
        name: /open background queue rising in canary lane/i,
      }),
    );

    const drilldown = screen.getByLabelText(/alert drilldown/i);
    expect(
      within(drilldown).getByText("Background queue rising in canary lane"),
    ).toBeInTheDocument();
    expect(
      within(drilldown).getByText("Autoscale shortfall recorded"),
    ).toBeInTheDocument();

    fireEvent.click(
      within(drilldown).getByRole("button", {
        name: /divert background workers/i,
      }),
    );

    expect(screen.getByText("workers diverted")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Background queue rising in canary lane: Divert background workers",
      ),
    ).toBeInTheDocument();
    expect(within(drilldown).getByText("staged")).toBeInTheDocument();
  });
});
