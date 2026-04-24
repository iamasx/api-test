import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  complianceNotes,
  policies,
  policyBoardOverview,
  reviewSummaries,
} from "./_data/policy-board-data";
import PolicyBoardPage from "./page";

afterEach(() => {
  cleanup();
});

describe("PolicyBoardPage", () => {
  it("renders the hero with primary heading, overview metadata, and back link", () => {
    render(<PolicyBoardPage />);

    expect(
      screen.getByText(policyBoardOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(policyBoardOverview.reviewCycle)).toBeInTheDocument();
    expect(screen.getByText(policyBoardOverview.scope)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders review summary stats", () => {
    render(<PolicyBoardPage />);

    const summarySection = screen.getByLabelText(/review summary/i);

    for (const stat of reviewSummaries) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all policy cards with names, categories, and status badges", () => {
    render(<PolicyBoardPage />);

    const policyList = screen.getByRole("list", { name: /policy cards/i });
    const policyItems = within(policyList).getAllByRole("listitem");

    expect(policyItems).toHaveLength(policies.length);

    for (const policy of policies) {
      expect(within(policyList).getByText(policy.name)).toBeInTheDocument();
      expect(within(policyList).getByText(policy.category)).toBeInTheDocument();
      expect(within(policyList).getByText(policy.owner)).toBeInTheDocument();
    }
  });

  it("renders compliance notes with authors, timestamps, and priority badges", () => {
    render(<PolicyBoardPage />);

    const notesSection = screen.getByLabelText(/compliance notes$/i);
    const notesList = within(notesSection).getByRole("list", { name: /compliance notes list/i });
    const noteItems = within(notesList).getAllByRole("listitem");

    expect(noteItems).toHaveLength(complianceNotes.length);

    for (const note of complianceNotes) {
      expect(within(notesList).getByText(note.author)).toBeInTheDocument();
      expect(within(notesList).getByText(note.timestamp)).toBeInTheDocument();
      expect(within(notesList).getByText(note.body)).toBeInTheDocument();
    }
  });
});
