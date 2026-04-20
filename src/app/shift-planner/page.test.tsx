import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  getShiftPlannerView,
  handoffNotes,
  openShiftWarnings,
} from "./_data/shift-planner-data";
import ShiftPlannerPage from "./page";

describe("ShiftPlannerPage", () => {
  it("renders the hero, command-post metadata, and summary cards", () => {
    const view = getShiftPlannerView();

    render(<ShiftPlannerPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: view.summary.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(view.summary.commandPost)).toBeInTheDocument();
    expect(screen.getByText(view.summary.shiftLabel)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");

    const summarySection = screen.getByLabelText(/shift planner summary cards/i);

    for (const card of view.summaryCards) {
      expect(within(summarySection).getByText(card.label)).toBeInTheDocument();
      expect(within(summarySection).getByText(card.value)).toBeInTheDocument();
      expect(within(summarySection).getByText(card.detail)).toBeInTheDocument();
    }
  });

  it("renders every coverage segment with grouped summaries and lane-level matrix content", () => {
    const view = getShiftPlannerView();

    render(<ShiftPlannerPage />);

    const coverageList = screen.getByRole("list", {
      name: /coverage segments/i,
    });

    expect(within(coverageList).getAllByRole("listitem")).toHaveLength(
      view.coverageSegments.length,
    );

    for (const segment of view.coverageSegments) {
      const section = screen
        .getByRole("heading", { level: 3, name: segment.label })
        .closest('[role="listitem"]');
      const matrix = screen.getByRole("table", { name: segment.label });

      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent(segment.window);
      expect(section).toHaveTextContent(segment.supervisor);
      expect(section).toHaveTextContent(segment.summary);
      expect(matrix).toBeInTheDocument();

      for (const summary of segment.summaries) {
        const summaryCard = within(section as HTMLElement)
          .getByText(summary.label)
          .closest("div");

        expect(summaryCard).toBeInTheDocument();
        expect(within(summaryCard as HTMLElement).getByText(summary.value)).toBeInTheDocument();
      }

      for (const lane of segment.lanes) {
        expect(within(matrix).getByText(lane.label)).toBeInTheDocument();
        expect(within(matrix).getByText(lane.lead)).toBeInTheDocument();
        expect(within(matrix).getByText(lane.focus)).toBeInTheDocument();
        expect(within(matrix).getByText(lane.queueDepth)).toBeInTheDocument();

        for (const cell of lane.cells) {
          expect(
            within(matrix).getAllByText(`${cell.assigned}/${cell.required}`).length,
          ).toBeGreaterThan(0);
          expect(within(matrix).getAllByText(cell.assignees).length).toBeGreaterThan(0);
          expect(within(matrix).getByText(cell.detail)).toBeInTheDocument();
        }
      }
    }
  });

  it("renders warning cards with affected coverage segments and recommended actions", () => {
    render(<ShiftPlannerPage />);

    const warningList = screen.getByRole("list", {
      name: /open shift warnings/i,
    });

    expect(within(warningList).getAllByRole("listitem")).toHaveLength(
      openShiftWarnings.length,
    );

    expect(screen.getByText("Active warnings")).toBeInTheDocument();
    expect(screen.getByText("Critical warnings")).toBeInTheDocument();

    for (const warning of openShiftWarnings) {
      const card = within(warningList)
        .getByRole("heading", { level: 3, name: warning.title })
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(warning.owner);
      expect(card).toHaveTextContent(warning.window);
      expect(card).toHaveTextContent(warning.summary);
      expect(card).toHaveTextContent(warning.action);
    }
  });

  it("renders handoff notes with note status, blockers, and next-step content", () => {
    render(<ShiftPlannerPage />);

    const handoffList = screen.getByRole("list", {
      name: /shift handoff notes/i,
    });

    expect(handoffList.querySelectorAll(":scope > article")).toHaveLength(
      handoffNotes.length,
    );

    for (const note of handoffNotes) {
      const card = within(handoffList)
        .getByRole("heading", { level: 3, name: note.title })
        .closest('[role="listitem"]');
      const blockerList = within(card as HTMLElement).getByRole("list", {
        name: `${note.title} blockers`,
      });

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(note.owner);
      expect(card).toHaveTextContent(note.window);
      expect(card).toHaveTextContent(note.status);
      expect(card).toHaveTextContent(note.summary);
      expect(card).toHaveTextContent(note.nextStep);

      for (const blocker of note.blockers) {
        expect(within(blockerList).getByText(blocker)).toBeInTheDocument();
      }
    }
  });
});
