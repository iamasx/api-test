import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ReviewConsolePage from "./page";

describe("ReviewConsolePage", () => {
  it("renders the page heading and description", () => {
    render(<ReviewConsolePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /review items, decisions, and status at a glance/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/track proposals through review/i),
    ).toBeInTheDocument();
  });

  it("renders the status summary strip with all counts", () => {
    render(<ReviewConsolePage />);

    const summary = screen.getByRole("region", {
      name: /review status summary/i,
    });

    expect(within(summary).getByText("Total")).toBeInTheDocument();
    expect(within(summary).getByText("Pending")).toBeInTheDocument();
    expect(within(summary).getByText("Approved")).toBeInTheDocument();
    expect(within(summary).getByText("Rejected")).toBeInTheDocument();
    expect(within(summary).getByText("Deferred")).toBeInTheDocument();
    expect(within(summary).getByText("6")).toBeInTheDocument();
  });

  it("renders all review items with metadata", () => {
    render(<ReviewConsolePage />);

    const list = screen.getByRole("list", { name: /review items/i });
    const items = within(list).getAllByRole("listitem");

    expect(items.length).toBe(6);

    expect(screen.getByText("REV-101")).toBeInTheDocument();
    expect(
      screen.getByText("Migrate auth tokens to short-lived JWTs"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Priya Menon/)).toBeInTheDocument();
  });

  it("renders status and category badges on review items", () => {
    render(<ReviewConsolePage />);

    const badges = screen.getAllByText("Approved");
    expect(badges.length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText("engineering")).toBeTruthy();
    expect(screen.getByText("policy")).toBeTruthy();
    expect(screen.getByText("design")).toBeTruthy();
    expect(screen.getByText("operations")).toBeTruthy();
  });

  it("renders decision notes under their respective review items", () => {
    render(<ReviewConsolePage />);

    const notesList = screen.getByRole("list", { name: /notes for REV-101/i });
    const notes = within(notesList).getAllByRole("listitem");

    expect(notes.length).toBe(2);
    expect(
      screen.getByText(/token rotation looks solid/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/consider adding a grace period/i),
    ).toBeInTheDocument();
  });

  it("shows priority indicators on review items", () => {
    render(<ReviewConsolePage />);

    expect(screen.getAllByText(/high priority/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/medium priority/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/low priority/i).length).toBeGreaterThanOrEqual(1);
  });
});
