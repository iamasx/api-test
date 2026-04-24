import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getEscalationAtlasView } from "./_data/escalation-atlas-data";
import EscalationAtlasPage from "./page";

describe("EscalationAtlasPage", () => {
  it("renders the shell headings and route entry links", () => {
    const { container } = render(<EscalationAtlasPage />);
    const text = container.textContent ?? "";

    expect(text).toContain("Map active escalation lanes, owner posture, and the follow-up queue.");
    expect(text).toContain("Escalation lanes");
    expect(text).toContain("Owner summaries");
    expect(text).toContain("Compact follow-up queue");

    const links = Array.from(container.querySelectorAll("a")).map((link) => ({
      href: link.getAttribute("href"),
      text: link.textContent,
    }));

    expect(links).toContainEqual({ href: "#escalation-lanes", text: "Review escalation lanes" });
    expect(links).toContainEqual({ href: "#owner-summaries", text: "Open owner summaries" });
    expect(links).toContainEqual({ href: "/", text: "Back to route index" });
  });

  it("renders lane, owner, and follow-up content from the mock atlas view", () => {
    const view = getEscalationAtlasView();
    const { container } = render(<EscalationAtlasPage />);
    const text = container.textContent ?? "";

    expect(container.querySelectorAll('[aria-label$=" escalations"]')).toHaveLength(view.lanes.length);
    expect(container.querySelectorAll('[aria-label="Escalation owner summaries"] [role="listitem"]')).toHaveLength(view.ownerSummaries.length);
    expect(container.querySelectorAll('[aria-label="Compact follow-up queue"] [role="listitem"]')).toHaveLength(view.followUps.length);

    for (const lane of view.lanes) {
      expect(text).toContain(lane.title);
      expect(text).toContain(lane.serviceWindow);
      expect(text).toContain(`${lane.itemCount} active`);
      expect(text).toContain(lane.items[0].title);
      expect(text).toContain(lane.items[0].nextAction);
    }

    for (const owner of view.ownerSummaries) {
      expect(text).toContain(owner.name);
      expect(text).toContain(owner.focus);
      expect(text).toContain(owner.handoff);
    }

    for (const item of view.followUps) {
      expect(text).toContain(item.action);
      expect(text).toContain(item.ownerName);
      expect(text).toContain(item.escalationTitle);
    }
  });
});
