import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QueueMonitorShell } from "./queue-monitor-shell";

function clickButtonByText(text: string | RegExp, index = 0) {
  const target = screen.getAllByText(text)[index];
  const button = target?.closest("button");

  if (!button) {
    throw new Error(`No button found for ${String(text)}`);
  }

  fireEvent.click(button);
}

describe("QueueMonitorShell", () => {
  it(
    "uses projected item state when forecast mode and filters are active",
    () => {
    render(<QueueMonitorShell />);

      clickButtonByText(/^Breach only$/i);

      expect(
        screen.queryByText("Manual coding review queued after rule mismatch"),
      ).not.toBeInTheDocument();

      clickButtonByText(/^Forecast board$/i);
      clickButtonByText(/^90 min$/i);

      expect(
        screen.getByText("Manual coding review queued after rule mismatch"),
      ).toBeInTheDocument();
    },
    15000,
  );

  it(
    "shows queue and item rationale in priority explanation mode",
    () => {
    render(<QueueMonitorShell />);

      clickButtonByText(/^Priority explanation$/i);

      expect(
        screen.getByText(/Priority explanation mode is active/i),
      ).toBeInTheDocument();
      expect(screen.getAllByText("Intake outruns clearance").length).toBeGreaterThan(0);

      clickButtonByText(/Passport image review waiting on secondary verifier/i);

      expect(
        screen.getAllByText(
          /Second verifier coverage stays thin for the next hour/i,
        ).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getByText(
          /The trust desk cannot finish the review until a secondary verifier claims the package/i,
        ),
      ).toBeInTheDocument();
    },
    15000,
  );

  it(
    "keeps queue detail aligned to the active forecast horizon",
    () => {
    render(<QueueMonitorShell />);

      clickButtonByText(/^Forecast board$/i);
      clickButtonByText(/^90 min$/i);
      clickButtonByText(/^Returns Exceptions$/i);

      expect(
        screen.getAllByText(
          "Carrier arrivals push this lane ahead of identity by handoff unless proof and scans land together.",
        ).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getByText("Priority moves up 1 spot by handoff."),
      ).toBeInTheDocument();
    },
    15000,
  );
});
