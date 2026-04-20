import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SignalMonitorShell } from "./_components/signal-monitor-shell";
import { resolveSignalMonitorView } from "./_lib/signal-monitor";
import { signalStreams } from "./_lib/signal-monitor-data";

describe("SignalMonitorShell", () => {
  it("renders the live monitoring route with signal cards, anomaly summaries, and the inspector", () => {
    const view = resolveSignalMonitorView();

    render(<SignalMonitorShell view={view} />);

    expect(
      screen.getByRole("heading", {
        name: /watch live streams, anomaly pressure, and operator detail in one route\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /live signal cards/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /anomaly summary/i }),
    ).toBeInTheDocument();

    const liveSignals = screen.getByRole("list", { name: /live signals/i });

    expect(within(liveSignals).getAllByRole("listitem")).toHaveLength(
      signalStreams.length,
    );
    const inspector = screen.getByRole("complementary", {
      name: /signal inspector/i,
    });

    expect(inspector).toBeInTheDocument();
    expect(
      within(inspector).getByRole("heading", { name: view.selectedSignal.name }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keep the relay in buffered replay mode/i),
    ).toBeInTheDocument();
  });

  it("shows the requested signal in the inspector and marks its card link as current", () => {
    const chosenSignal = signalStreams[3];
    const view = resolveSignalMonitorView(chosenSignal.id);

    render(<SignalMonitorShell view={view} />);

    const inspector = screen.getByRole("complementary", {
      name: /signal inspector/i,
    });

    expect(
      within(inspector).getByRole("heading", { name: chosenSignal.name }),
    ).toBeInTheDocument();

    const selectedLink = screen.getByRole("link", {
      name: new RegExp(`inspect ${chosenSignal.name} selected`, "i"),
    });

    expect(selectedLink).toHaveAttribute(
      "href",
      `/signal-monitor?signal=${chosenSignal.id}`,
    );
    expect(selectedLink).toHaveAttribute("aria-current", "page");
    expect(
      within(inspector).getByText(/controller blackout at east ingress/i),
    ).toBeInTheDocument();
  });

  it("falls back to the default signal and shows a status message for an unknown selection", () => {
    const view = resolveSignalMonitorView("missing-signal");

    render(<SignalMonitorShell view={view} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /missing-signal.*default inspector stream/i,
    );
    const inspector = screen.getByRole("complementary", {
      name: /signal inspector/i,
    });

    expect(
      within(inspector).getByRole("heading", { name: signalStreams[0].name }),
    ).toBeInTheDocument();
  });

  it("renders severity labels and recommended actions for representative anomalies", () => {
    const view = resolveSignalMonitorView();

    render(<SignalMonitorShell view={view} />);

    expect(screen.getAllByText(/critical/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/elevated/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/watch/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/dispatch on-site verification immediately/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/hold the watch posture and stage a calibration crew/i),
    ).toBeInTheDocument();
  });
});
