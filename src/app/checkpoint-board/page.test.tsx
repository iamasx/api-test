import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  checkpointGroups,
  getCheckpointBoardView,
  reviewCadence,
  reviewNotes,
} from "./_data/checkpoint-board-data";
import CheckpointBoardPage from "./page";

describe("CheckpointBoardPage", () => {
  it("renders the route hero, readiness section, grouped board, and review panel entry points", () => {
    render(<CheckpointBoardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /track grouped checkpoints, readiness posture, and review follow-through on one route\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /board readiness at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /grouped checkpoint board/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /recent review notes/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /review readiness/i })).toHaveAttribute(
      "href",
      "#checkpoint-readiness",
    );
    expect(screen.getByRole("link", { name: /browse groups/i })).toHaveAttribute(
      "href",
      "#checkpoint-groups",
    );
  });

  it("renders hero metrics and readiness summaries from the route-local view model", () => {
    const view = getCheckpointBoardView();

    render(<CheckpointBoardPage />);

    const summaryList = screen.getByRole("list", {
      name: /checkpoint readiness summaries/i,
    });

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(
      view.readinessSummaries.length,
    );

    for (const metric of view.heroMetrics) {
      const metricCard = screen.getByText(metric.detail).closest("div");

      expect(metricCard).toBeInTheDocument();
      expect(metricCard).toHaveTextContent(metric.label);
      expect(metricCard).toHaveTextContent(metric.value);
      expect(metricCard).toHaveTextContent(metric.detail);
    }

    for (const summary of view.readinessSummaries) {
      const card = within(summaryList).getByText(summary.label).closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(summary.value);
      expect(card).toHaveTextContent(summary.detail);
      expect(card).toHaveTextContent(summary.support);
    }
  });

  it("renders every milestone group with focus areas and milestone detail content", () => {
    render(<CheckpointBoardPage />);

    const groupList = screen.getByRole("list", {
      name: /checkpoint milestone groups/i,
    });

    expect(groupList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      checkpointGroups.length,
    );

    for (const group of checkpointGroups) {
      const groupCard = within(groupList)
        .getByRole("heading", { level: 3, name: group.title })
        .closest('[role="listitem"]');

      expect(groupCard).toBeInTheDocument();
      expect(groupCard).toHaveTextContent(group.label);
      expect(groupCard).toHaveTextContent(group.summary);
      expect(groupCard).toHaveTextContent(group.lead);
      expect(groupCard).toHaveTextContent(group.reviewWindow);
      expect(groupCard).toHaveTextContent(group.focusAreas[0]);

      const milestoneList = within(groupCard as HTMLElement).getByRole("list", {
        name: `${group.title} milestones`,
      });

      expect(milestoneList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
        group.milestones.length,
      );

      for (const milestone of group.milestones) {
        const milestoneCard = within(milestoneList)
          .getByRole("heading", { level: 3, name: milestone.title })
          .closest('[role="listitem"]');

        expect(milestoneCard).toBeInTheDocument();
        expect(milestoneCard).toHaveTextContent(milestone.status);
        expect(milestoneCard).toHaveTextContent(milestone.owner);
        expect(milestoneCard).toHaveTextContent(milestone.window);
        expect(milestoneCard).toHaveTextContent(`${milestone.readiness}% ready`);
        expect(milestoneCard).toHaveTextContent(milestone.deliverables[0]);
        expect(milestoneCard).toHaveTextContent(milestone.blockers[0]);
        expect(milestoneCard).toHaveTextContent(milestone.nextReview);
      }
    }
  });

  it("renders review cadence and the recent review-note metadata with next steps", () => {
    render(<CheckpointBoardPage />);

    const cadenceList = screen.getByRole("list", { name: /review cadence/i });
    const notesList = screen.getByRole("list", { name: /review notes/i });

    expect(within(cadenceList).getAllByRole("listitem")).toHaveLength(
      reviewCadence.length,
    );
    expect(within(notesList).getAllByRole("listitem")).toHaveLength(reviewNotes.length);

    for (const cadenceItem of reviewCadence) {
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
      expect(noteCard).toHaveTextContent(note.nextStep);
    }
  });
});
