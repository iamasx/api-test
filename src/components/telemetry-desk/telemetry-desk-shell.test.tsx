import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TelemetryDeskShell } from "./telemetry-desk-shell";

describe("TelemetryDeskShell", () => {
  it("clears and restores the local comparison focus", () => {
    render(<TelemetryDeskShell />);

    fireEvent.click(screen.getByRole("button", { name: /Uplink hold/i }));
    expect(screen.getByText(/No metric focus selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Restore recommended focus/i }));
    expect(screen.getByText(/Uplink hold comparison panels/i)).toBeInTheDocument();
  });

  it("switches the reporting window locally", () => {
    render(<TelemetryDeskShell />);

    fireEvent.click(screen.getByRole("button", { name: /72h Drift sweep/i }));
    expect(screen.getByText(/Long sweep \/ drift archive/i)).toBeInTheDocument();
    expect(screen.getByText("161k/s")).toBeInTheDocument();
  });
});
