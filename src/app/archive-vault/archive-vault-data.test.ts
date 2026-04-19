import { describe, expect, it } from "vitest";
import { findComparisonSummary } from "./archive-vault-data";

describe("archive vault comparison summaries", () => {
  it("returns seeded summaries for curated pairs", () => {
    expect(findComparisonSummary("helix-171", "kestrel-176")?.risk).toBe(
      "High drift risk",
    );
  });

  it("derives fallback summaries for ad hoc selections", () => {
    expect(findComparisonSummary("aurelia-204", "helix-171")?.alignment).toContain(
      "% field overlap",
    );
  });
});
