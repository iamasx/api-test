import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IncidentTimelinePage from "./page";

describe("IncidentTimelinePage", () => {
  it("renders the route heading and summary content", () => {
    render(<IncidentTimelinePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Incident Timeline Review",
      })
    ).toBeDefined();
    expect(screen.getByText("Incidents in scope")).toBeDefined();
    expect(screen.getByText("Response timeline")).toBeDefined();
  });
});
