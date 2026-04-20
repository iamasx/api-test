import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { incidents } from "./data";
import { IncidentTimelineReview } from "./incident-timeline-review";

describe("IncidentTimelineReview", () => {
  it("shows representative incident content on first render", () => {
    render(<IncidentTimelineReview incidents={incidents} />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Payments API latency spike",
      })
    ).toBeDefined();
    expect(
      screen.getByText(
        "Merchants processing bursty card traffic saw delayed authorizations and intermittent checkout failures until retry pressure was capped."
      )
    ).toBeDefined();
    expect(screen.getByText("Peak latency")).toBeDefined();
  });

  it("filters the incident list by severity and keeps the detail view in sync", () => {
    render(<IncidentTimelineReview incidents={incidents} />);

    const filters = screen.getByRole("group", { name: "Severity filters" });
    fireEvent.click(within(filters).getByRole("button", { name: /high/i }));

    const incidentList = screen.getByLabelText("Incident list");

    expect(
      within(incidentList).queryByRole("button", {
        name: /payments api latency spike/i,
      })
    ).toBeNull();
    expect(
      within(incidentList).getByRole("button", {
        name: /background job queue saturation/i,
      })
    ).toBeDefined();
    expect(screen.getByText("Background job queue saturation")).toBeDefined();
  });

  it("updates the detail timeline when a different incident is selected", () => {
    render(<IncidentTimelineReview incidents={incidents} />);

    const incidentList = screen.getByLabelText("Incident list");

    fireEvent.click(
      within(incidentList).getByRole("button", {
        name: /login provider token refresh failures/i,
      })
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Login provider token refresh failures",
      })
    ).toBeDefined();
    expect(screen.getByText("Customer session advisory shared")).toBeDefined();
    expect(
      screen.getByLabelText("Login provider token refresh failures response timeline")
    ).toBeDefined();
  });
});
