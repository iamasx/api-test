import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  carryForwardNotes,
  handoffEntries,
  handoffJournalOverview,
  handoffJournalStats,
} from "./_data/handoff-journal-data";
import HandoffJournalPage from "./page";

afterEach(() => {
  cleanup();
});

describe("HandoffJournalPage", () => {
  it("renders the journal hero copy, anchor actions, and route escape hatch", () => {
    render(<HandoffJournalPage />);

    expect(
      screen.getByRole("heading", { name: handoffJournalOverview.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(handoffJournalOverview.description)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review handoff entries/i }),
    ).toHaveAttribute("href", "#handoff-entries");
    expect(
      screen.getByRole("link", { name: /jump to carry-forward/i }),
    ).toHaveAttribute("href", "#carry-forward");
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders every stat card from the route-local summary data", () => {
    render(<HandoffJournalPage />);

    const statList = screen.getByRole("list", {
      name: /handoff journal continuity stats/i,
    });

    expect(statList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      handoffJournalStats.length,
    );

    for (const stat of handoffJournalStats) {
      const card = within(statList).getByText(stat.label).closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(stat.value);
      expect(card?.textContent).toContain(stat.detail);
    }
  });

  it("renders multiple handoff entries with summaries, highlights, and action bullets", () => {
    render(<HandoffJournalPage />);

    const entryList = screen.getByRole("list", { name: /shift handoff entries/i });

    expect(entryList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      handoffEntries.length,
    );

    for (const entry of handoffEntries) {
      const card = within(entryList)
        .getByRole("heading", { name: entry.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(entry.summary);
      expect(card?.textContent).toContain(entry.operator);
      expect(card?.textContent).toContain(entry.channel);

      for (const highlight of entry.highlights) {
        expect(within(card as HTMLElement).getByText(highlight)).toBeInTheDocument();
      }

      const actionList = within(card as HTMLElement).getByRole("list", {
        name: `${entry.title} action bullets`,
      });

      expect(
        actionList.querySelectorAll(':scope > li'),
      ).toHaveLength(entry.actions.length);

      for (const action of entry.actions) {
        expect(within(actionList).getByText(action.label)).toBeInTheDocument();
        expect(within(actionList).getByText(action.owner)).toBeInTheDocument();
        expect(within(actionList).getByText(action.timing)).toBeInTheDocument();
      }
    }
  });

  it("renders the compact carry-forward panel with every unresolved note", () => {
    render(<HandoffJournalPage />);

    const carryForwardList = screen.getByRole("list", {
      name: /carry-forward notes/i,
    });

    expect(
      carryForwardList.querySelectorAll(':scope > [role="listitem"]'),
    ).toHaveLength(carryForwardNotes.length);

    for (const note of carryForwardNotes) {
      const card = within(carryForwardList)
        .getByText(note.lane)
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(note.note);
      expect(card?.textContent).toContain(note.owner);
      expect(card?.textContent).toContain(note.nextCheck);
    }
  });
});
