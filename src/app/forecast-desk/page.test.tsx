import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  comparisonMetrics,
  forecastDeskOverview,
  forecastNotes,
  trendSnapshots,
} from "./_data/forecast-desk-data";
import ForecastDeskPage from "./page";

afterEach(() => {
  cleanup();
});

describe("ForecastDeskPage", () => {
  it("renders the hero content and route actions", () => {
    render(<ForecastDeskPage />);

    expect(
      screen.getByRole("heading", {
        name: /read the next operating window through trend snapshots instead of a single blended forecast\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: forecastDeskOverview.primaryAction }),
    ).toHaveAttribute("href", "#trend-snapshots");
    expect(
      screen.getByRole("link", { name: forecastDeskOverview.secondaryAction }),
    ).toHaveAttribute("href", "#forecast-notes");
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders every metric in the comparison band", () => {
    render(<ForecastDeskPage />);

    const comparisonBand = screen.getByLabelText(/metric comparison band/i);

    for (const metric of comparisonMetrics) {
      const card = within(comparisonBand).getByText(metric.label).closest("article");

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(metric.current);
      expect(card?.textContent).toContain(metric.nextWindow);
      expect(card?.textContent).toContain(metric.nextDay);
      expect(card?.textContent).toContain(metric.note);
    }
  });

  it("renders each trend snapshot with drivers and action guidance", () => {
    render(<ForecastDeskPage />);

    const snapshotList = screen.getByRole("list", { name: /trend snapshots/i });

    expect(snapshotList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      trendSnapshots.length,
    );

    for (const snapshot of trendSnapshots) {
      const card = within(snapshotList)
        .getByRole("heading", { name: snapshot.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(snapshot.metricValue);
      expect(card?.textContent).toContain(snapshot.confidence);
      expect(card?.textContent).toContain(snapshot.drivers[0]);
      expect(card?.textContent).toContain(snapshot.action);
    }
  });

  it("renders the forecast notes with owners, windows, and triggers", () => {
    render(<ForecastDeskPage />);

    const notesList = screen.getByRole("list", { name: /forecast notes/i });

    expect(notesList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      forecastNotes.length,
    );

    for (const note of forecastNotes) {
      const card = within(notesList)
        .getByRole("heading", { name: note.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(note.owner);
      expect(card?.textContent).toContain(note.window);
      expect(card?.textContent).toContain(note.summary);
      expect(card?.textContent).toContain(note.trigger);
    }
  });
});
