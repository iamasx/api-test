import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  assignmentEntries,
  incomingRequests,
  intakeDeskOverview,
  intakeStats,
  triageCards,
} from "./_data/intake-desk-data";
import IntakeDeskPage from "./page";

afterEach(() => {
  cleanup();
});

describe("IntakeDeskPage", () => {
  it("renders the hero with primary heading, overview metadata, and back link", () => {
    render(<IntakeDeskPage />);

    expect(
      screen.getByText(intakeDeskOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(intakeDeskOverview.shiftWindow)).toBeInTheDocument();
    expect(screen.getByText(intakeDeskOverview.queue)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary stats for intake desk", () => {
    render(<IntakeDeskPage />);

    const summarySection = screen.getByLabelText(/intake desk summary/i);

    for (const stat of intakeStats) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all incoming requests with titles, requesters, and urgency badges", () => {
    render(<IntakeDeskPage />);

    const requestList = screen.getByRole("list", { name: /incoming requests/i });
    const requestItems = within(requestList).getAllByRole("listitem");

    expect(requestItems).toHaveLength(incomingRequests.length);

    for (const request of incomingRequests) {
      expect(within(requestList).getByText(request.title)).toBeInTheDocument();
      expect(within(requestList).getByText(request.requester)).toBeInTheDocument();
      expect(within(requestList).getByText(request.category)).toBeInTheDocument();
    }
  });

  it("renders all triage cards with reviewers, outcomes, and notes", () => {
    render(<IntakeDeskPage />);

    const triageList = screen.getByRole("list", { name: /triage cards/i });
    const triageItems = within(triageList).getAllByRole("listitem");

    expect(triageItems).toHaveLength(triageCards.length);

    for (const card of triageCards) {
      expect(within(triageList).getByText(card.reviewer)).toBeInTheDocument();
      expect(within(triageList).getByText(card.notes)).toBeInTheDocument();
    }
  });

  it("renders the assignment summary panel with all entries", () => {
    render(<IntakeDeskPage />);

    const assignmentSection = screen.getByLabelText(/assignment summary/i);
    const assignmentList = within(assignmentSection).getByRole("list", {
      name: /assignment entries/i,
    });
    const assignmentItems = within(assignmentList).getAllByRole("listitem");

    expect(assignmentItems).toHaveLength(assignmentEntries.length);

    for (const entry of assignmentEntries) {
      expect(within(assignmentList).getByText(entry.requestTitle)).toBeInTheDocument();
      expect(within(assignmentList).getByText(entry.assignee)).toBeInTheDocument();
    }
  });
});
