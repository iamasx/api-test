import { describe, expect, it } from "vitest";
import {
  createIncidentStageState,
  getIncidentWorkflowStage,
  getNextIncidentStage,
  getPreviousIncidentStage,
  getVisibleTimelineEntries,
  incidents,
} from "./mock-data";

describe("incident deck workflow helpers", () => {
  it("seeds incident stages from the default mock workflow", () => {
    const stageState = createIncidentStageState();

    expect(stageState["deck-441"]).toBe("triage");
    expect(stageState["deck-438"]).toBe("containment");
    expect(stageState["deck-435"]).toBe("handoff");
    expect(stageState["deck-431"]).toBe("watch");
  });

  it("clamps workflow transitions at the first and last stage", () => {
    expect(getPreviousIncidentStage("signal")).toBe("signal");
    expect(getNextIncidentStage("watch")).toBe("watch");
    expect(getNextIncidentStage("triage")).toBe("containment");
    expect(getPreviousIncidentStage("handoff")).toBe("containment");
  });

  it("reveals later timeline entries only after a stage advances", () => {
    const incident = incidents[0];

    expect(
      getVisibleTimelineEntries(incident, "triage").map((entry) => entry.title),
    ).not.toContain("Follow-the-sun pod accepts recovery watch with rollback notes");

    expect(
      getVisibleTimelineEntries(incident, "handoff").map((entry) => entry.title),
    ).toContain("Follow-the-sun pod accepts recovery watch with rollback notes");

    expect(getIncidentWorkflowStage(incident, "handoff")?.ownership.state).toBe(
      "Pending handoff",
    );
  });
});
