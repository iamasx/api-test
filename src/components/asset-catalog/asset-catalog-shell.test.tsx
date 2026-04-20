import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AssetCatalogShell } from "./asset-catalog-shell";

describe("AssetCatalogShell", () => {
  it("applies a recommended bundle and populates the reservation draft", () => {
    render(<AssetCatalogShell />);

    fireEvent.click(screen.getByLabelText("Apply bundle: Interview Sprint"));

    expect(screen.getByText("4 selected")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Remove from reservation: Canon C70 Interview Pack"),
    ).toBeInTheDocument();
    expect(screen.getByText("Existing reservation on this asset")).toBeInTheDocument();
  }, 20000);

  it("shows forecast pressure for the focused asset", () => {
    render(<AssetCatalogShell />);

    fireEvent.click(screen.getByLabelText("Inspect asset: Canon C70 Interview Pack"));
    fireEvent.click(screen.getByText("Forecast Board"));

    expect(
      screen.getByText(
        "Compare availability pressure before locking the pickup window.",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Collision risk").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(
        /Existing reservation overlaps the prime interview slot\./i,
      ).length,
    ).toBeGreaterThan(0);
  }, 20000);

  it("surfaces missing coverage when the draft is incomplete", () => {
    render(<AssetCatalogShell />);

    fireEvent.click(screen.getByLabelText("Add to reservation: Sony FX3 Field Kit"));

    expect(screen.getByText("Plan is missing supporting coverage")).toBeInTheDocument();
    expect(
      screen.getByText(/Add audio, lighting, and support/i),
    ).toBeInTheDocument();
  }, 20000);

  it("keeps the focused asset in preview when filters hide it", () => {
    render(<AssetCatalogShell />);

    fireEvent.click(screen.getByLabelText("Inspect asset: Sony FX3 Field Kit"));
    fireEvent.click(screen.getByText("Reserved - 2"));

    expect(
      screen.getByText("Sony FX3 Field Kit is outside the current filters."),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));

    expect(
      screen.queryByText("Sony FX3 Field Kit is outside the current filters."),
    ).not.toBeInTheDocument();
  }, 20000);
});
