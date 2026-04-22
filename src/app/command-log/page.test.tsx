import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CommandLogShell } from "./_components/command-log-shell";
import { resolveCommandLogView } from "./_lib/command-log";
import { commandLogEvents } from "./_lib/command-log-data";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

describe("CommandLogShell", () => {
  it("renders the route shell with the full chronological list and default detail", () => {
    const view = resolveCommandLogView();

    render(<CommandLogShell view={view} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /chronological command events, grouped signals, and one focused detail panel\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: new RegExp(`repeated patterns across ${commandLogEvents.length} events`, "i"),
      }),
    ).toBeInTheDocument();

    const eventList = screen.getByRole("list", {
      name: /chronological events/i,
    });
    const detail = screen.getByRole("region", { name: /event detail/i });

    expect(within(eventList).getAllByRole("listitem")).toHaveLength(
      commandLogEvents.length,
    );
    expect(
      within(detail).getByRole("heading", { name: commandLogEvents[0].title }),
    ).toBeInTheDocument();
    expect(
      within(detail).getByText(commandLogEvents[0].nextAction),
    ).toBeInTheDocument();
  });

  it("shows the requested event detail and marks the selected entry link", () => {
    const chosenEvent = commandLogEvents[4];
    const view = resolveCommandLogView(chosenEvent.id);

    render(<CommandLogShell view={view} />);

    const detail = screen.getByRole("region", { name: /event detail/i });
    const activeLink = screen.getByRole("link", {
      name: new RegExp(
        `viewing detail for ${escapeRegExp(chosenEvent.title)}`,
        "i",
      ),
    });

    expect(
      within(detail).getByRole("heading", { name: chosenEvent.title }),
    ).toBeInTheDocument();
    expect(within(detail).getByText(chosenEvent.command)).toBeInTheDocument();
    expect(activeLink).toHaveAttribute("href", `/command-log?event=${chosenEvent.id}`);
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("falls back to the latest event and exposes recurring tag groups for an unknown id", () => {
    const view = resolveCommandLogView("missing-event");
    const queueDepthGroup = view.tagSummary.find((group) => group.tag === "queue-depth");

    render(<CommandLogShell view={view} />);

    expect(queueDepthGroup).toMatchObject({
      tag: "queue-depth",
      eventCount: 5,
    });
    expect(screen.getByRole("status")).toHaveTextContent(
      /missing-event.*not found/i,
    );
    expect(screen.getAllByText("#queue-depth").length).toBeGreaterThan(0);
    expect(screen.getByText(/5 events/i)).toBeInTheDocument();

    const detail = screen.getByRole("region", { name: /event detail/i });

    expect(
      within(detail).getByRole("heading", { name: commandLogEvents[0].title }),
    ).toBeInTheDocument();
  });

  it("renders the severity breakdown section with distribution buckets", () => {
    const view = resolveCommandLogView();

    render(<CommandLogShell view={view} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /event severity across the shift/i,
      }),
    ).toBeInTheDocument();

    const severityBuckets = screen.getByRole("list", {
      name: /severity buckets/i,
    });
    const bucketItems = within(severityBuckets).getAllByRole("listitem");

    expect(bucketItems.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/critical/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /severity distribution bar/i })).toBeInTheDocument();
  });

  it("includes the newly added events in the chronological list", () => {
    const view = resolveCommandLogView();

    render(<CommandLogShell view={view} />);

    expect(screen.getByText(/canary deploy verified for notification pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/rate-limit override applied for migration batch/i)).toBeInTheDocument();
    expect(screen.getByText(/incident retrospective scheduled for queue drift/i)).toBeInTheDocument();
    expect(screen.getByText(/automated health check restored after dns propagation/i)).toBeInTheDocument();
  });

  it("renders correct event count in the tag summary heading", () => {
    const view = resolveCommandLogView();

    render(<CommandLogShell view={view} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: new RegExp(`repeated patterns across ${view.events.length} events`, "i"),
      }),
    ).toBeInTheDocument();
  });
});
