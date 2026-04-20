import { describe, expect, it } from "vitest";

import {
  buildBundleRecommendations,
  buildReservationConflicts,
  buildReservationPlannerSnapshot,
} from "./planner";

describe("asset catalog planner helpers", () => {
  it("prioritizes the interview bundle around the selected hero asset", () => {
    const recommendations = buildBundleRecommendations({
      primaryAssetId: "cam-c70",
      assetIds: ["cam-c70"],
      intentId: "interview",
      windowId: "friday-dawn",
      crewProfileId: "pair",
      flexibleMatching: true,
    });

    expect(recommendations[0]?.id).toBe("interview-sprint");
    expect(recommendations[0]?.statusLabel).toBe("Ready to apply");
  });

  it("surfaces blocking conflicts for maintenance and forecast collisions", () => {
    const conflicts = buildReservationConflicts({
      primaryAssetId: "lit-tubes",
      assetIds: ["lit-tubes"],
      intentId: "livestream",
      windowId: "today-pm",
      crewProfileId: "pair",
      flexibleMatching: false,
    });

    expect(
      conflicts.some(
        (conflict) =>
          conflict.severity === "blocking" &&
          conflict.title.includes("maintenance"),
      ),
    ).toBe(true);
    expect(
      conflicts.some(
        (conflict) =>
          conflict.severity === "blocking" &&
          conflict.title.includes("forecasted demand"),
      ),
    ).toBe(true);
  });

  it("merges intent, preview, and crew notes into the snapshot checklist", () => {
    const snapshot = buildReservationPlannerSnapshot({
      primaryAssetId: "cam-c70",
      assetIds: ["cam-c70", "aud-lav"],
      intentId: "interview",
      windowId: "tomorrow-am",
      crewProfileId: "crew",
      flexibleMatching: true,
    });

    expect(snapshot.primaryPreview?.project).toBe("Customer Story Sprint");
    expect(snapshot.checklist).toContain("Signed interview kit receipt");
    expect(snapshot.checklist).toContain(
      "Assign one crew member to gear handoff and return notes.",
    );
    expect(snapshot.missingCategories.map((category) => category.id)).toEqual(
      expect.arrayContaining(["lighting", "support"]),
    );
  });
});
