import { describe, expect, it } from "vitest";

import {
  buildComparisonDetail,
  buildComparisonSummary,
  buildInspectorPeerNotes,
} from "./signal-lab-model";

describe("signal lab comparison model", () => {
  it("summarizes pinned comparison posture across multiple streams", () => {
    const summary = buildComparisonSummary(
      ["ion-trace-07", "phase-array-12", "lattice-echo-03"],
      "2h",
    );

    expect(summary?.headline).toContain("Ion Trace 07");
    expect(summary?.headline).toContain("Lattice Echo 03");
    expect(summary?.metrics[0]?.value).toBe("3");
  });

  it("builds detail rows and peer notes for the inspector", () => {
    const detail = buildComparisonDetail(
      ["ion-trace-07", "phase-array-12", "lattice-echo-03"],
      "45m",
    );
    const peerNotes = buildInspectorPeerNotes(
      "phase-array-12",
      ["ion-trace-07", "phase-array-12", "lattice-echo-03"],
      "45m",
    );

    expect(detail?.rows[0]?.name).toBe("Ion Trace 07");
    expect(detail?.rows.at(-1)?.name).toBe("Lattice Echo 03");
    expect(peerNotes).toHaveLength(2);
    expect(peerNotes[0]?.summary).toMatch(/still outranks|stays ahead/i);
  });
});
