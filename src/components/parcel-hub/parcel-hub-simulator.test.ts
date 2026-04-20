import { describe, expect, it } from "vitest";

import { buildParcelHubProjection } from "./parcel-hub-simulator";

describe("parcel hub simulator", () => {
  it("builds the baseline route summary from current dispatch state", () => {
    const projection = buildParcelHubProjection(null, {});
    const miaLane = projection.lanes.find((lane) => lane.id === "mia-atl");

    expect(projection.summary.projectedOpenExceptions).toBe(5);
    expect(projection.summary.projectedSlaRiskParcels).toBe(158);
    expect(projection.summary.projectedPeakPressure).toBe(106);
    expect(projection.summary.projectedDelayedParcels).toBe(305);
    expect(miaLane?.projectedTone).toBe("steady");
  });

  it("projects priority protection moves into lane pressure and exception changes", () => {
    const projection = buildParcelHubProjection("priority-protect", {});
    const denLane = projection.lanes.find((lane) => lane.id === "den-chi");
    const miaLane = projection.lanes.find((lane) => lane.id === "mia-atl");
    const prioritySummary = projection.packageSummaries.find(
      (summary) => summary.id === "priority",
    );

    expect(projection.summary.projectedOpenExceptions).toBe(4);
    expect(projection.summary.projectedSlaRiskParcels).toBe(128);
    expect(projection.summary.projectedPeakPressure).toBe(98);
    expect(denLane?.stagedParcels).toBe(178);
    expect(denLane?.projectedOpenExceptions).toBe(1);
    expect(miaLane?.projectedExceptions.some((item) => item.previewState === "introduced")).toBe(true);
    expect(prioritySummary?.movedParcels).toBe(26);
    expect(prioritySummary?.slaRiskDelta).toBe(-24);
  });

  it("combines local resolution markers with aggressive scenario clears", () => {
    const projection = buildParcelHubProjection("exception-drain", {
      "lane-ex-5": true,
    });
    const phxLane = projection.lanes.find((lane) => lane.id === "phx-dfw");

    expect(projection.summary.currentOpenExceptions).toBe(4);
    expect(projection.summary.projectedOpenExceptions).toBe(2);
    expect(projection.summary.projectedResolvedExceptions).toBe(4);
    expect(phxLane?.projectedOpenExceptions).toBe(0);
    expect(phxLane?.projectedExceptions.filter((item) => item.previewState === "resolved")).toHaveLength(2);
  });
});
