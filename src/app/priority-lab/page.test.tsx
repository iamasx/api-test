import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  comparisonNotes,
  priorityLabOverview,
  priorityLabStats,
  rankedItems,
  signalEntries,
} from "./_data/priority-lab-data";
import PriorityLabPage from "./page";

afterEach(() => {
  cleanup();
});

describe("PriorityLabPage", () => {
  it("renders the hero with primary heading, overview metadata, and back link", () => {
    render(<PriorityLabPage />);

    expect(
      screen.getByText(priorityLabOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(priorityLabOverview.reviewCycle)).toBeInTheDocument();
    expect(screen.getByText(priorityLabOverview.scope)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary stats for priority lab", () => {
    render(<PriorityLabPage />);

    const summarySection = screen.getByLabelText(/priority lab summary/i);

    for (const stat of priorityLabStats) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all ranked items with titles, scores, and tier badges", () => {
    render(<PriorityLabPage />);

    const itemList = screen.getByRole("list", { name: /ranked items/i });
    const items = within(itemList).getAllByRole("listitem");

    expect(items).toHaveLength(rankedItems.length);

    for (const item of rankedItems) {
      expect(within(itemList).getByText(item.title)).toBeInTheDocument();
      expect(within(itemList).getByText(item.score)).toBeInTheDocument();
      expect(within(itemList).getByText(item.owner)).toBeInTheDocument();
    }
  });

  it("renders comparison notes with authors, timestamps, and verdict badges", () => {
    render(<PriorityLabPage />);

    const notesSection = screen.getByLabelText(/comparison notes$/i);
    const notesList = within(notesSection).getByRole("list", { name: /comparison notes list/i });
    const noteItems = within(notesList).getAllByRole("listitem");

    expect(noteItems).toHaveLength(comparisonNotes.length);

    for (const note of comparisonNotes) {
      expect(within(notesList).getByText(note.author)).toBeInTheDocument();
      expect(within(notesList).getByText(note.timestamp)).toBeInTheDocument();
      expect(within(notesList).getByText(note.body)).toBeInTheDocument();
    }
  });

  it("renders signal summary with labels, values, and strength badges", () => {
    render(<PriorityLabPage />);

    const signalSection = screen.getByLabelText(/signal summary/i);
    const signalList = within(signalSection).getByRole("list", { name: /signal entries/i });
    const signalItems = within(signalList).getAllByRole("listitem");

    expect(signalItems).toHaveLength(signalEntries.length);

    for (const signal of signalEntries) {
      expect(within(signalList).getByText(signal.label)).toBeInTheDocument();
      expect(within(signalList).getByText(signal.value)).toBeInTheDocument();
    }
  });
});
