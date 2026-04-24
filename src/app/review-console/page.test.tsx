import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { decisionNoteSections, reviewItems } from "./_data/review-console-data";
import ReviewConsolePage from "./page";

const TEST_TIMEOUT = 15000;

describe("ReviewConsolePage", () => {
  it("renders the hero, summary strip, actions, and review items", () => {
    render(<ReviewConsolePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /stage decisions, reviewer notes, and a compact status strip in one route\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /compact status strip/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to overview/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /browse review items/i })).toHaveAttribute("href", "#review-items");
    expect(within(screen.getByRole("list", { name: /review console status summary/i })).getAllByRole("listitem")).toHaveLength(4);

    const itemList = screen.getByRole("list", { name: /review items/i });
    expect(itemList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(reviewItems.length);

    for (const item of reviewItems) {
      const card = within(itemList).getByRole("heading", { level: 3, name: item.title }).closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      for (const value of [item.lane, item.reviewer, item.owner, item.updatedAt, item.dueWindow, item.status, item.tags[0], item.nextStep]) {
        expect(card).toHaveTextContent(value);
      }
    }
  }, TEST_TIMEOUT);

  it("renders decision-note sections with their notes and outcomes", () => {
    render(<ReviewConsolePage />);

    expect(screen.getByRole("heading", { level: 2, name: /decision notes grouped by outcome/i })).toBeInTheDocument();

    for (const section of decisionNoteSections) {
      const list = screen.getByRole("list", { name: section.title });
      expect(within(list).getAllByRole("listitem")).toHaveLength(section.notes.length);

      for (const note of section.notes) {
        const card = within(list).getByText(note.title).closest('[role="listitem"]');

        expect(card).toBeInTheDocument();
        for (const value of [note.author, note.loggedAt, note.outcome, note.detail]) {
          expect(card).toHaveTextContent(value);
        }
      }
    }
  }, TEST_TIMEOUT);
});
