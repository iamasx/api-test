import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AuditTrailShell } from "./_components/audit-trail-shell";
import { resolveAuditTrailView } from "./_lib/audit-trail";
import { auditTrailEntries } from "./_lib/audit-trail-data";
import AuditTrailPage from "./page";

afterEach(() => {
  cleanup();
});

describe("AuditTrailPage", () => {
  it("renders the default route with every audit entry, summary metrics, and reviewer coverage", () => {
    const view = resolveAuditTrailView();

    render(<AuditTrailShell view={view} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /review change history, linked flags, and reviewer context in one timeline\./i,
      }),
    ).toBeInTheDocument();

    const timeline = screen.getByRole("list", { name: /audit timeline/i });
    const reviewFlags = screen.getByRole("list", { name: /review flags/i });
    const filterNav = screen.getByRole("navigation", {
      name: /audit trail filters/i,
    });

    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(auditTrailEntries.length);
    expect(reviewFlags.querySelectorAll(":scope > li")).toHaveLength(
      view.reviewFlags.length,
    );
    expect(
      within(filterNav).getByRole("link", { name: /all changes \(6\)/i }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /reviewer ownership and follow-the-sun context/i,
      }),
    ).toBeInTheDocument();
  });

  it("filters the route to active flags and removes ready-to-close-only changes", () => {
    const view = resolveAuditTrailView("flagged");

    render(<AuditTrailShell view={view} />);

    const timeline = screen.getByRole("list", { name: /audit timeline/i });
    const reviewFlags = screen.getByRole("list", { name: /review flags/i });
    const filterNav = screen.getByRole("navigation", {
      name: /audit trail filters/i,
    });

    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(view.entries.length);
    expect(reviewFlags.querySelectorAll(":scope > li")).toHaveLength(
      view.reviewFlags.length,
    );
    expect(
      within(filterNav).getByRole("link", {
        name: new RegExp(`active flags \\(${view.entries.length}\\)`, "i"),
      }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.queryByText(/export replay cleanup approved after checksum verification/i),
    ).not.toBeInTheDocument();
    expect(
      within(reviewFlags).getByRole("heading", {
        name: /certificate lineage mismatch blocks apac rollout parity/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/replay evidence needs one final tenant sampling pass/i),
    ).not.toBeInTheDocument();
  });

  it("falls back to all changes and shows a notice for an unknown filter", async () => {
    render(
      await AuditTrailPage({
        searchParams: Promise.resolve({ view: "unknown-filter" }),
      }),
    );

    const timeline = screen.getByRole("list", { name: /audit timeline/i });

    expect(screen.getByRole("status")).toHaveTextContent(
      /filter "unknown-filter" was not recognized/i,
    );
    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(auditTrailEntries.length);
    expect(
      screen.getByRole("link", { name: /all changes \(6\)/i }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("reads the approved filter from async search params on the route page", async () => {
    render(
      await AuditTrailPage({
        searchParams: Promise.resolve({ view: "approved" }),
      }),
    );

    const timeline = screen.getByRole("list", { name: /audit timeline/i });
    const reviewFlags = screen.getByRole("list", { name: /review flags/i });

    expect(timeline.querySelectorAll(":scope > li")).toHaveLength(1);
    expect(reviewFlags.querySelectorAll(":scope > li")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 2, name: "Approved" }),
    ).toBeInTheDocument();
    expect(
      within(timeline).getByRole("heading", {
        name: /export replay cleanup approved after checksum verification/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/certificate parity escalation opened before apac traffic ramps/i),
    ).not.toBeInTheDocument();
  });
});
