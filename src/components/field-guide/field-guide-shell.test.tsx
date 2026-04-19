import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FieldGuideShell from "@/components/field-guide/field-guide-shell";

describe("FieldGuideShell", () => {
  it("filters procedures by title or summary", () => {
    render(<FieldGuideShell />);

    fireEvent.change(screen.getByLabelText("Search procedures"), {
      target: { value: "weather mast" },
    });

    expect(
      screen.getByRole("button", { name: "Open procedure: Sensor Mast Hot Swap" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Open procedure: Dock Safety Sweep" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when filters remove every procedure", () => {
    render(<FieldGuideShell />);

    fireEvent.change(screen.getByLabelText("Search procedures"), {
      target: { value: "does-not-exist" },
    });

    expect(
      screen.getByText("No procedures match the current search or filters."),
    ).toBeInTheDocument();
  });

  it("tracks checklist completion for the active procedure", () => {
    render(<FieldGuideShell />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open procedure: Sensor Mast Hot Swap" }),
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Inspect mast seal and tether line",
    });

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getAllByText("1 of 3 steps complete")).toHaveLength(2);
  });
});
