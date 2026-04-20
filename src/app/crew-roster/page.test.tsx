import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CrewRosterPage from "./page";
import { getCrewRosterView } from "./_data/crew-roster-data";

describe("CrewRosterPage", () => {
  it("renders the crew roster route shell and not the home page content", () => {
    render(<CrewRosterPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /keep every shift staffed, visible, and ready for the next handoff/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /coverage totals and watchpoints/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /grouped teams with staffing detail/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /keep the next command window visible before the handoff starts/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/controlled conflict drill b landing page headline/i),
    ).not.toBeInTheDocument();
  });

  it("renders all staffing summary cards from the mock roster view", () => {
    const view = getCrewRosterView();

    render(<CrewRosterPage />);

    const summaryList = screen.getByRole("list", {
      name: /crew roster staffing summaries/i,
    });

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(
      view.staffingSummaries.length,
    );

    for (const summary of view.staffingSummaries) {
      const summaryCard = within(summaryList)
        .getByText(summary.label)
        .closest('[role="listitem"]');

      expect(summaryCard).toBeInTheDocument();
      expect(summaryCard).toHaveTextContent(summary.value);
      expect(summaryCard).toHaveTextContent(summary.detail);
    }
  });

  it("renders each shift group with its teams, staffing totals, and role details", () => {
    const view = getCrewRosterView();

    render(<CrewRosterPage />);

    for (const shiftGroup of view.shiftGroups) {
      const shiftRegion = screen.getByRole("region", {
        name: `${shiftGroup.name} coverage`,
      });

      expect(within(shiftRegion).getByText(shiftGroup.handoffLead)).toBeInTheDocument();
      expect(
        within(shiftRegion).getByText(
          `${shiftGroup.totals.staffed}/${shiftGroup.totals.target}`,
        ),
      ).toBeInTheDocument();

      for (const team of shiftGroup.teams) {
        expect(
          within(shiftRegion).getByRole("heading", {
            level: 3,
            name: team.name,
          }),
        ).toBeInTheDocument();
        expect(within(shiftRegion).getByText(team.callsign)).toBeInTheDocument();
        expect(within(shiftRegion).getByText(team.staffingNote)).toBeInTheDocument();

        for (const slot of team.roleSlots) {
          const slotCard = within(shiftRegion).getByText(slot.title).closest("div");

          expect(slotCard).toBeInTheDocument();
          expect(slotCard).toHaveTextContent(`${slot.staffed}/${slot.target}`);
        }
      }
    }
  });

  it("renders the highlighted duty rotation panel and each scheduled rotation entry", () => {
    const view = getCrewRosterView();

    render(<CrewRosterPage />);

    const rotationRegion = screen.getByRole("region", {
      name: /keep the next command window visible before the handoff starts/i,
    });
    const spotlight = view.dutyRotation[0];

    expect(within(rotationRegion).getByText(spotlight.location)).toBeInTheDocument();
    expect(within(rotationRegion).getAllByText(spotlight.assignment).length).toBeGreaterThan(0);
    expect(
      within(rotationRegion).getAllByText(new RegExp(spotlight.crew, "i")).length,
    ).toBeGreaterThan(0);

    for (const entry of view.dutyRotation) {
      expect(within(rotationRegion).getAllByText(entry.window).length).toBeGreaterThan(0);
      expect(within(rotationRegion).getAllByText(entry.assignment).length).toBeGreaterThan(0);
      expect(
        within(rotationRegion).getAllByText(new RegExp(entry.crew, "i")).length,
      ).toBeGreaterThan(0);
    }
  });
});
