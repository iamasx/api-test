import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  routeConstraints,
  routeDecisionQueue,
  routeNotes,
  routePlannerOverview,
  routePlannerStats,
  routeSegmentGroups,
  routeTimingSignals,
} from "./_data/route-planner-data";
import RoutePlannerPage from "./page";

afterEach(() => {
  cleanup();
});

describe("RoutePlannerPage", () => {
  it("renders the route-planner shell with the primary headings and route metadata", () => {
    render(<RoutePlannerPage />);

    expect(screen.getByText(routePlannerOverview.title, { selector: "h1" })).toBeInTheDocument();
    expect(screen.getByText(routePlannerOverview.routeName)).toBeInTheDocument();
    expect(screen.getByText(routePlannerOverview.shiftLabel)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /segment cards for every control point on the route/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary banners for planner stats, timing signals, and constraints", () => {
    render(<RoutePlannerPage />);

    const summarySection = screen.getByLabelText(/route planner summary banners/i);

    for (const stat of routePlannerStats) {
      expect(within(summarySection).getByText(stat.label)).toBeInTheDocument();
      expect(within(summarySection).getByText(stat.value)).toBeInTheDocument();
    }

    for (const signal of routeTimingSignals) {
      expect(within(summarySection).getByText(signal.label)).toBeInTheDocument();
      expect(within(summarySection).getByText(signal.value)).toBeInTheDocument();
    }

    for (const constraint of routeConstraints) {
      expect(within(summarySection).getByText(constraint.label)).toBeInTheDocument();
      expect(within(summarySection).getByText(constraint.owner)).toBeInTheDocument();
    }

    expect(within(summarySection).getByText("On time")).toBeInTheDocument();
    expect(within(summarySection).getByText("Delayed")).toBeInTheDocument();
    expect(within(summarySection).getByText("Blocked")).toBeInTheDocument();
    expect(within(summarySection).getByText("Critical")).toBeInTheDocument();
  });

  it("renders every segment group with segment-specific checkpoints and attached constraints", () => {
    render(<RoutePlannerPage />);

    for (const group of routeSegmentGroups) {
      const segmentList = screen.getByRole("list", { name: group.label });

      expect(
        segmentList.querySelectorAll(':scope > [role="listitem"]'),
      ).toHaveLength(group.segments.length);

      for (const segment of group.segments) {
        const card = within(segmentList)
          .getByRole("heading", { name: segment.lane })
          .closest('[role="listitem"]');

        expect(card).toBeTruthy();
        expect(card?.textContent).toContain(segment.owner);
        expect(card?.textContent).toContain(segment.checkpoint.label);
        expect(card?.textContent).toContain(segment.checkpoint.detail);

        for (const constraintId of segment.constraints) {
          const constraint = routeConstraints.find((item) => item.id === constraintId);

          expect(constraint).toBeTruthy();
          expect(card?.textContent).toContain(constraint?.label);
        }
      }
    }
  });

  it("renders the decision sidebar with route-level counts and pending decisions", () => {
    render(<RoutePlannerPage />);

    const sidebar = screen.getByLabelText(/route decision sidebar/i);
    const blockedSignals = routeTimingSignals.filter(
      (signal) => signal.tone === "blocked",
    ).length;
    const criticalConstraints = routeConstraints.filter(
      (constraint) => constraint.tone === "critical",
    ).length;
    const blockedSignalCard = within(sidebar)
      .getByText("Blocked timing signals")
      .closest("div");
    const criticalConstraintCard = within(sidebar)
      .getByText("Critical constraints")
      .closest("div");

    expect(within(sidebar).getByText("Blocked timing signals")).toBeInTheDocument();
    expect(
      within(blockedSignalCard as HTMLElement).getByText(String(blockedSignals)),
    ).toBeInTheDocument();
    expect(within(sidebar).getByText("Critical constraints")).toBeInTheDocument();
    expect(
      within(criticalConstraintCard as HTMLElement).getByText(
        String(criticalConstraints),
      ),
    ).toBeInTheDocument();

    for (const decision of routeDecisionQueue) {
      expect(within(sidebar).getByText(decision.title)).toBeInTheDocument();
      expect(within(sidebar).getByText(decision.owner)).toBeInTheDocument();
      expect(within(sidebar).getByText(decision.deadline)).toBeInTheDocument();
    }
  });

  it("renders the route notes sidebar with all notes and summary counts", () => {
    render(<RoutePlannerPage />);

    const notesSidebar = screen.getByLabelText(/route notes/i);

    expect(
      within(notesSidebar).getByRole("heading", { name: /route notes/i }),
    ).toBeInTheDocument();

    const notesList = within(notesSidebar).getByRole("list", {
      name: /route notes list/i,
    });
    expect(within(notesList).getAllByRole("listitem")).toHaveLength(
      routeNotes.length,
    );

    const highCount = routeNotes.filter(
      (note) => note.priority === "high",
    ).length;
    const totalCountCard = within(notesSidebar)
      .getByText("Total notes")
      .closest("div");
    const highCountCard = within(notesSidebar)
      .getByText("High priority")
      .closest("div");

    expect(
      within(totalCountCard as HTMLElement).getByText(String(routeNotes.length)),
    ).toBeInTheDocument();
    expect(
      within(highCountCard as HTMLElement).getByText(String(highCount)),
    ).toBeInTheDocument();

    for (const note of routeNotes) {
      expect(within(notesSidebar).getByText(note.title)).toBeInTheDocument();
      expect(within(notesSidebar).getByText(note.author)).toBeInTheDocument();
      expect(within(notesSidebar).getByText(note.timestamp)).toBeInTheDocument();
    }
  });
});
