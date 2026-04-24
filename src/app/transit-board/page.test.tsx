import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TransitBoardPage from "./page";

describe("TransitBoardPage", () => {
  it("renders the page heading and description", () => {
    render(<TransitBoardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /corridor movements, schedules, and delay tracking at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/monitor active corridors/i),
    ).toBeInTheDocument();
  });

  it("renders all corridor summary cards", () => {
    render(<TransitBoardPage />);

    expect(screen.getAllByText("North Arterial").length).toBeGreaterThan(0);
    expect(screen.getAllByText("East Connector").length).toBeGreaterThan(0);
    expect(screen.getAllByText("South Bypass").length).toBeGreaterThan(0);
    expect(screen.getAllByText("West Loop").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Central Trunk").length).toBeGreaterThan(0);
  });

  it("displays corridor status and metrics", () => {
    render(<TransitBoardPage />);

    expect(screen.getByText(/Flowing · Northbound/)).toBeInTheDocument();
    expect(screen.getByText(/Congested · Eastbound/)).toBeInTheDocument();
    expect(screen.getByText(/Blocked · Westbound/)).toBeInTheDocument();
    expect(screen.getByText(/97% on-time/)).toBeInTheDocument();
  });

  it("renders summary bar with correct counts", () => {
    render(<TransitBoardPage />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });

  it("renders all movement cards with status badges", () => {
    render(<TransitBoardPage />);

    expect(screen.getAllByText("MV-1001").length).toBeGreaterThan(0);
    expect(screen.getByText("Express Freight Alpha")).toBeInTheDocument();
    expect(screen.getAllByText("MV-1004").length).toBeGreaterThan(0);
    expect(screen.getByText("Relief Convoy Delta")).toBeInTheDocument();
    expect(screen.getByText(/Depot A → Terminal 7/)).toBeInTheDocument();
  });

  it("renders movement origin-destination and cargo info", () => {
    render(<TransitBoardPage />);

    expect(screen.getByText(/Yard 3 → Hub East · Bulk materials/)).toBeInTheDocument();
    expect(screen.getByText(/Base West → Junction 9 · Emergency supplies/)).toBeInTheDocument();
  });

  it("renders delay highlights with severity and delay duration", () => {
    render(<TransitBoardPage />);

    expect(screen.getByText("+32 min")).toBeInTheDocument();
    expect(screen.getByText("+67 min")).toBeInTheDocument();
    expect(screen.getByText("+8 min")).toBeInTheDocument();
    expect(screen.getByText("+14 min")).toBeInTheDocument();
  });

  it("renders delay reasons", () => {
    render(<TransitBoardPage />);

    expect(
      screen.getByText(/signal failure at junction EC-4/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/track obstruction reported between WL-2 and WL-3/i),
    ).toBeInTheDocument();
  });

  it("shows the tracked movements count", () => {
    render(<TransitBoardPage />);

    expect(
      screen.getByText(/6 tracked movements across all corridors/),
    ).toBeInTheDocument();
  });

  it("shows the active delay reports count", () => {
    render(<TransitBoardPage />);

    expect(
      screen.getByText(/4 active delay reports/),
    ).toBeInTheDocument();
  });
});
