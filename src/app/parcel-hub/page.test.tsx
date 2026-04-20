import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ParcelHubPage from "./page";
import { getParcelHubView } from "./_data/parcel-hub-data";

describe("ParcelHubPage", () => {
  it("renders the parcel hub route shell with metrics, exception summaries, and lane sections", () => {
    render(<ParcelHubPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /monitor shipment lanes, parcel exceptions, and recovery moves from one parcel hub route/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /open recovery work/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /lane-by-lane parcel flow/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/archive browser route focuses on quick inspection/i),
    ).not.toBeInTheDocument();
  });

  it("renders every configured metric card from the parcel hub view", () => {
    const view = getParcelHubView();

    render(<ParcelHubPage />);

    const metricList = screen.getByRole("list", {
      name: /parcel hub metrics/i,
    });

    expect(within(metricList).getAllByRole("listitem")).toHaveLength(
      view.metrics.length,
    );

    for (const metric of view.metrics) {
      const metricCard = within(metricList)
        .getByText(metric.label)
        .closest('[role="listitem"]');

      expect(metricCard).toBeInTheDocument();
      expect(metricCard).toHaveTextContent(metric.value);
      expect(metricCard).toHaveTextContent(metric.detail);
    }
  });

  it("renders each lane with the full parcel summary list and representative parcel details", () => {
    const view = getParcelHubView();

    render(<ParcelHubPage />);

    for (const lane of view.lanes) {
      const laneRegion = screen.getByRole("region", { name: lane.name });
      const parcelList = within(laneRegion).getByRole("list", {
        name: `${lane.name} parcels`,
      });

      expect(within(laneRegion).getByText(lane.routeLabel)).toBeInTheDocument();
      expect(within(laneRegion).getByText(lane.summary)).toBeInTheDocument();
      expect(within(parcelList).getAllByRole("article")).toHaveLength(
        lane.parcels.length,
      );
    }

    const summitParcel = screen.getByRole("article", {
      name: /summit bio/i,
    });

    expect(summitParcel).toHaveTextContent("Exception");
    expect(summitParcel).toHaveTextContent("PH-8801-44");
    expect(summitParcel).toHaveTextContent("$10.2K promise exposure");
    expect(summitParcel).toHaveTextContent(
      /escalate to the chicago gate supervisor for the late acceptance override/i,
    );
  });

  it("shows the exception summary cards and the highlighted exception detail with affected parcels", () => {
    const view = getParcelHubView();
    const highlightedException = view.highlightedException;

    render(<ParcelHubPage />);

    const exceptionSummaryList = screen.getByRole("list", {
      name: /exception summaries/i,
    });
    const detailPanel = screen.getByRole("region", {
      name: highlightedException.title,
    });

    expect(
      within(exceptionSummaryList).getAllByRole("listitem"),
    ).toHaveLength(view.exceptions.length);
    expect(detailPanel).toHaveTextContent(highlightedException.owner);
    expect(detailPanel).toHaveTextContent(highlightedException.valueAtRisk);
    expect(detailPanel).toHaveTextContent(
      highlightedException.recommendedAction,
    );

    const affectedParcelList = within(detailPanel).getByRole("list", {
      name: /affected parcels/i,
    });

    expect(within(affectedParcelList).getAllByRole("article")).toHaveLength(
      highlightedException.parcels.length,
    );

    for (const parcel of highlightedException.parcels) {
      expect(
        within(detailPanel).getByRole("heading", {
          level: 3,
          name: parcel.recipient,
        }),
      ).toBeInTheDocument();
      expect(within(detailPanel).getByText(parcel.checkpointLabel)).toBeInTheDocument();
    }
  });
});
