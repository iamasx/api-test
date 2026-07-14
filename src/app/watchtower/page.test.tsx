import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  watchtowerAlerts,
  watchtowerHealthSummaries,
  watchtowerOperatorNotes,
  watchtowerOverview,
} from "./_data/watchtower-data";
import WatchtowerPage from "./page";

describe("WatchtowerPage", () => {
  it("renders the route shell headings, pulse copy, and primary actions", () => {
    render(<WatchtowerPage />);

    expect(screen.getByRole("heading", { name: watchtowerOverview.title })).toBeInTheDocument();
    expect(screen.getByText(watchtowerOverview.digestWindow)).toBeInTheDocument();
    expect(screen.getByText(watchtowerOverview.shiftLead)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /alert digest cards built for the next operator handoff/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /short health summaries for the systems that shape the handoff/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /jump to alert digest/i }),
    ).toHaveAttribute("href", "#watchtower-digest");
    expect(
      screen.getByRole("link", { name: /review health summaries/i }),
    ).toHaveAttribute("href", "#watchtower-health");
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders every alert digest card with scope, ownership, systems, and next steps", () => {
    render(<WatchtowerPage />);

    const alertList = screen.getByRole("list", { name: /watchtower alert digest cards/i });

    expect(alertList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      watchtowerAlerts.length,
    );

    for (const alert of watchtowerAlerts) {
      const card = within(alertList)
        .getByRole("heading", { name: alert.title })
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(alert.service);
      expect(card?.textContent).toContain(alert.scope);
      expect(card?.textContent).toContain(alert.owner);
      expect(card?.textContent).toContain(alert.nextStep);
      expect(card?.textContent).toContain(alert.affectedSystems[0]);
    }
  });

  it("renders health summaries with signals, owners, and recommendations", () => {
    render(<WatchtowerPage />);

    const healthSection = screen.getByLabelText(/watchtower health summaries/i);
    const healthList = within(healthSection).getByRole("list", { name: /watchtower health summary cards/i });

    expect(within(healthList).getAllByRole("listitem")).toHaveLength(
      watchtowerHealthSummaries.length,
    );

    for (const summary of watchtowerHealthSummaries) {
      expect(within(healthSection).getByText(summary.title)).toBeInTheDocument();
      expect(within(healthSection).getByText(summary.signal)).toBeInTheDocument();
      expect(within(healthSection).getByText(summary.owner)).toBeInTheDocument();
      expect(within(healthSection).getByText(summary.recommendation)).toBeInTheDocument();
    }

    expect(within(healthSection).getByText("Stable")).toBeInTheDocument();
    expect(within(healthSection).getByText("Watch")).toBeInTheDocument();
    expect(within(healthSection).getByText("Risk")).toBeInTheDocument();
  });

  it("renders the operator notes rail with the handoff anchor and every note entry", () => {
    render(<WatchtowerPage />);

    const notesRail = screen.getByLabelText(/operator notes rail/i);
    const noteList = within(notesRail).getByRole("list", { name: /watchtower operator note entries/i });

    expect(within(notesRail).getByText(watchtowerOverview.focusNote)).toBeInTheDocument();
    expect(
      within(notesRail).getByText(`Review window · ${watchtowerOverview.reviewWindow}`),
    ).toBeInTheDocument();
    expect(noteList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      watchtowerOperatorNotes.length,
    );

    for (const note of watchtowerOperatorNotes) {
      const card = within(noteList)
        .getByText(note.author)
        .closest('[role="listitem"]');

      expect(card).toBeTruthy();
      expect(card?.textContent).toContain(note.channel);
      expect(card?.textContent).toContain(note.time);
      expect(card?.textContent).toContain(note.note);
      expect(card?.textContent).toContain(note.followUp);
    }
  });
});
