import { describe, expect, it } from "vitest";
import {
  advanceExportQueueStatus,
  createExportQueueEntry,
  findComparisonSummary,
  findSnapshotRecord,
} from "./archive-vault-data";

describe("archive vault comparison summaries", () => {
  it("returns seeded summaries with detailed change records", () => {
    const summary = findComparisonSummary("helix-171", "kestrel-176");

    expect(summary?.risk).toBe("High drift risk");
    expect(summary?.recordChanges.some((change) => change.severity === "high")).toBe(
      true,
    );
    expect(summary?.exportArtifacts).toContain("checksum mismatch brief");
  });

  it("derives fallback summaries for ad hoc selections", () => {
    const summary = findComparisonSummary("aurelia-204", "helix-171");

    expect(summary?.alignment).toContain("% field overlap");
    expect(summary?.recordChanges).toHaveLength(4);
    expect(summary?.timeline).toHaveLength(3);
  });

  it("creates export queue entries for reviewed comparisons", () => {
    const summary = findComparisonSummary("ember-198", "quartz-159");
    const records = [
      findSnapshotRecord("ember-198"),
      findSnapshotRecord("quartz-159"),
    ].flatMap((record) => (record ? [record] : []));

    expect(summary).not.toBeNull();

    const entry = createExportQueueEntry(summary!, records);

    expect(entry.label).toBe("Ember Registry vs Quartz Session Tape");
    expect(entry.status).toBe("queued");
    expect(entry.artifacts).toContain("masking variance appendix");
  });

  it("advances queue states until ready", () => {
    expect(advanceExportQueueStatus("queued")).toBe("packaging");
    expect(advanceExportQueueStatus("packaging")).toBe("ready");
    expect(advanceExportQueueStatus("ready")).toBe("ready");
  });
});
