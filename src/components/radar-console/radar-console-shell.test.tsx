import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RadarConsoleShell } from "./radar-console-shell";

describe("RadarConsoleShell", () => {
  it("shows the filtered empty state when a quiet sector is focused in alert-only mode", () => {
    render(<RadarConsoleShell />);

    fireEvent.click(screen.getByRole("button", { name: /Focus Sector Vanta/i }));
    fireEvent.click(screen.getByRole("button", { name: /Show alert contacts only/i }));

    expect(screen.getByText(/No alert-marked contacts remain in Sector Vanta/i)).toBeInTheDocument();
  });

  it("updates the inspector and tracks local alert toggles", () => {
    render(<RadarConsoleShell />);

    fireEvent.click(screen.getByRole("button", { name: /Meridian-5/i }));

    const inspector = screen.getByLabelText(/Contact inspector/i);
    expect(within(inspector).getByRole("heading", { name: /Meridian-5/i })).toBeInTheDocument();

    fireEvent.click(within(inspector).getByRole("button", { name: /Enable Flag intercept/i }));
    expect(within(inspector).getByRole("button", { name: /Disable Flag intercept/i })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(within(inspector).getByRole("button", { name: /Toggle note Thermal bloom/i }));
    expect(within(inspector).getByRole("button", { name: /Toggle note Thermal bloom/i })).toHaveAttribute("aria-pressed", "true");
  });
});
