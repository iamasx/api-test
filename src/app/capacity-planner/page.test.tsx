import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  capacityPlannerOverview,
  capacityStats,
  demandBands,
  planningNotes,
  utilizationCards,
} from "./_data/capacity-planner-data";
import CapacityPlannerPage from "./page";

afterEach(() => {
  cleanup();
});

describe("CapacityPlannerPage", () => {
  it("renders the hero with primary heading, overview metadata, and back link", () => {
    render(<CapacityPlannerPage />);

    expect(
      screen.getByText(capacityPlannerOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(capacityPlannerOverview.planCycle)).toBeInTheDocument();
    expect(screen.getByText(capacityPlannerOverview.region)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary stats for capacity planner", () => {
    render(<CapacityPlannerPage />);

    const summarySection = screen.getByLabelText(/capacity planner summary/i);

    for (const stat of capacityStats) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all demand bands with their labels, levels, and forecasted loads", () => {
    render(<CapacityPlannerPage />);

    const bandList = screen.getByRole("list", { name: /demand bands/i });
    const bandItems = within(bandList).getAllByRole("listitem");

    expect(bandItems).toHaveLength(demandBands.length);

    for (const band of demandBands) {
      expect(within(bandList).getByText(band.label)).toBeInTheDocument();
      expect(within(bandList).getByText(band.forecastedLoad)).toBeInTheDocument();
      expect(within(bandList).getByText(band.peakWindow)).toBeInTheDocument();
    }
  });

  it("renders all utilization cards with resource names, utilization, and status badges", () => {
    render(<CapacityPlannerPage />);

    const utilList = screen.getByRole("list", { name: /utilization cards/i });
    const utilItems = within(utilList).getAllByRole("listitem");

    expect(utilItems).toHaveLength(utilizationCards.length);

    for (const card of utilizationCards) {
      expect(within(utilList).getByText(card.resource)).toBeInTheDocument();
      expect(within(utilList).getByText(card.currentUtilization)).toBeInTheDocument();
      expect(within(utilList).getByText(card.owner)).toBeInTheDocument();
    }
  });

  it("renders planning notes with authors, timestamps, and priority badges", () => {
    render(<CapacityPlannerPage />);

    const notesSection = screen.getByLabelText(/planning notes$/i);
    const notesList = within(notesSection).getByRole("list", { name: /planning notes list/i });
    const noteItems = within(notesList).getAllByRole("listitem");

    expect(noteItems).toHaveLength(planningNotes.length);

    for (const note of planningNotes) {
      expect(within(notesList).getByText(note.author)).toBeInTheDocument();
      expect(within(notesList).getByText(note.timestamp)).toBeInTheDocument();
      expect(within(notesList).getByText(note.body)).toBeInTheDocument();
    }
  });
});
