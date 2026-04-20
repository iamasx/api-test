import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  checkpointCadence,
  checkpointMilestones,
  getCheckpointGridView,
  reviewNotes,
} from "./_data/checkpoint-grid-data";
import CheckpointGridPage from "./page";

describe("CheckpointGridPage", () => {
  it("renders the route hero, progress summary heading, and review-note entry points", () => {
    render(<CheckpointGridPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /track milestone tiles, progress posture, and review notes without leaving one route\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /progress summaries/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /checkpoint milestones/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /recent review notes/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("link", { name: /browse milestones/i }),
    ).toHaveAttribute("href", "#checkpoint-milestones");
  });

  it("renders every milestone tile with status, owner, and next review content", () => {
    render(<CheckpointGridPage />);

    const milestoneList = screen.getByRole("list", {
      name: /checkpoint milestones/i,
    });

    expect(milestoneList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      checkpointMilestones.length,
    );

    for (const milestone of checkpointMilestones) {
      const tile = within(milestoneList)
        .getByRole("heading", { level: 3, name: milestone.title })
        .closest('[role="listitem"]');

      expect(tile).toBeInTheDocument();
      expect(tile).toHaveTextContent(milestone.status);
      expect(tile).toHaveTextContent(milestone.owner);
      expect(tile).toHaveTextContent(milestone.window);
      expect(tile).toHaveTextContent(`${milestone.completion}% complete`);
      expect(tile).toHaveTextContent(milestone.deliverables[0]);
      expect(tile).toHaveTextContent(milestone.dependencies[0]);
      expect(tile).toHaveTextContent(milestone.nextReview);
    }
  });

  it("shows derived progress summaries and hero metrics from the checkpoint view model", () => {
    const view = getCheckpointGridView();

    render(<CheckpointGridPage />);

    const summaryList = screen.getByRole("list", {
      name: /checkpoint progress summaries/i,
    });

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(
      view.progressSummaries.length,
    );

    for (const summary of view.progressSummaries) {
      const card = within(summaryList)
        .getByText(summary.label)
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(summary.value);
      expect(card).toHaveTextContent(summary.detail);
      expect(card).toHaveTextContent(summary.support);
    }

    for (const metric of view.heroMetrics) {
      const metricCard = screen.getByText(metric.label).closest("div");

      expect(metricCard).toBeInTheDocument();
      expect(metricCard).toHaveTextContent(metric.value);
      expect(metricCard).toHaveTextContent(metric.detail);
    }
  });

  it("renders review cadence items and the recent notes panel with actionable follow-up copy", () => {
    render(<CheckpointGridPage />);

    const cadenceList = screen.getByRole("list", {
      name: /review cadence/i,
    });
    const notesList = screen.getByRole("list", {
      name: /review notes/i,
    });

    expect(within(cadenceList).getAllByRole("listitem")).toHaveLength(
      checkpointCadence.length,
    );
    expect(within(notesList).getAllByRole("listitem")).toHaveLength(
      reviewNotes.length,
    );

    for (const cadenceItem of checkpointCadence) {
      expect(within(cadenceList).getByText(cadenceItem.label)).toBeInTheDocument();
      expect(within(cadenceList).getByText(cadenceItem.detail)).toBeInTheDocument();
    }

    for (const note of reviewNotes) {
      const noteCard = within(notesList)
        .getByRole("heading", { level: 3, name: note.title })
        .closest('[role="listitem"]');

      expect(noteCard).toBeInTheDocument();
      expect(noteCard).toHaveTextContent(note.reviewer);
      expect(noteCard).toHaveTextContent(note.role);
      expect(noteCard).toHaveTextContent(note.loggedAt);
      expect(noteCard).toHaveTextContent(note.outcome);
      expect(noteCard).toHaveTextContent(note.summary);
      expect(noteCard).toHaveTextContent(note.action);
    }
  });
});
