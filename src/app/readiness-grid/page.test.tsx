import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  dependencyNotes,
  progressEntries,
  readinessGridOverview,
  readinessStats,
  readinessTiles,
} from "./_data/readiness-grid-data";
import ReadinessGridPage from "./page";

afterEach(() => {
  cleanup();
});

describe("ReadinessGridPage", () => {
  it("renders the hero with primary heading, overview metadata, and back link", () => {
    render(<ReadinessGridPage />);

    expect(
      screen.getByText(readinessGridOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(readinessGridOverview.reviewWindow)).toBeInTheDocument();
    expect(screen.getByText(readinessGridOverview.scope)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary stats for readiness grid", () => {
    render(<ReadinessGridPage />);

    const summarySection = screen.getByLabelText(/readiness grid summary/i);

    for (const stat of readinessStats) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all readiness tiles with areas, owners, and level badges", () => {
    render(<ReadinessGridPage />);

    const tileList = screen.getByRole("list", { name: /readiness tiles/i });
    const tileItems = within(tileList).getAllByRole("listitem");

    expect(tileItems).toHaveLength(readinessTiles.length);

    for (const tile of readinessTiles) {
      expect(within(tileList).getByText(tile.area)).toBeInTheDocument();
      expect(within(tileList).getByText(tile.owner)).toBeInTheDocument();
    }
  });

  it("renders dependency notes with source-target pairs and status badges", () => {
    render(<ReadinessGridPage />);

    const notesSection = screen.getByLabelText(/dependency notes$/i);
    const notesList = within(notesSection).getByRole("list", { name: /dependency notes list/i });
    const noteItems = within(notesList).getAllByRole("listitem");

    expect(noteItems).toHaveLength(dependencyNotes.length);

    for (const dep of dependencyNotes) {
      expect(within(notesList).getByText(dep.note)).toBeInTheDocument();
    }
  });

  it("renders the progress strip with all workstream entries", () => {
    render(<ReadinessGridPage />);

    const progressSection = screen.getByLabelText(/progress strip/i);
    const progressList = within(progressSection).getByRole("list", { name: /progress entries/i });
    const progressItems = within(progressList).getAllByRole("listitem");

    expect(progressItems).toHaveLength(progressEntries.length);

    for (const entry of progressEntries) {
      expect(within(progressList).getByText(entry.label)).toBeInTheDocument();
    }
  });
});
