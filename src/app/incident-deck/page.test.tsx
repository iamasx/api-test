import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  activeIncidents,
  getIncidentDeckMetrics,
  getOwnershipSnapshot,
  incidentDeckOverview,
  ownershipCells,
  responseTimeline,
} from "./_data/incident-deck-data";
import IncidentDeckPage from "./page";

describe("IncidentDeckPage", () => {
  it("renders the hero, overview controls, and derived route metrics", () => {
    const metrics = getIncidentDeckMetrics();

    render(<IncidentDeckPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: incidentDeckOverview.title,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(incidentDeckOverview.description)).toBeInTheDocument();
    expect(screen.getByText(incidentDeckOverview.activeWindow)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");

    const metricsRegion = screen.getByRole("region", {
      name: /incident deck metrics/i,
    });

    for (const metric of metrics) {
      const metricCard = within(metricsRegion).getByText(metric.label).closest("article");

      expect(metricCard).toBeInTheDocument();
      expect(metricCard).toHaveTextContent(metric.value);
      expect(metricCard).toHaveTextContent(metric.detail);
    }
  });

  it("renders every incident card with key operational content", () => {
    render(<IncidentDeckPage />);

    const incidentList = screen.getByRole("list", { name: /active incidents/i });

    expect(incidentList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      activeIncidents.length,
    );

    for (const incident of activeIncidents) {
      const card = within(incidentList)
        .getByRole("heading", { level: 3, name: incident.title })
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(incident.service);
      expect(card).toHaveTextContent(incident.severity);
      expect(card).toHaveTextContent(incident.status);
      expect(card).toHaveTextContent(incident.incidentCommander);
      expect(card).toHaveTextContent(incident.channel);
      expect(card).toHaveTextContent(incident.region);
      expect(card).toHaveTextContent(incident.blastRadius);
      expect(card).toHaveTextContent(incident.customerImpact);
      expect(card).toHaveTextContent(incident.workstreams[0]);
      expect(card).toHaveTextContent(incident.owners[0]);
      expect(card).toHaveTextContent(incident.updateNote);
    }
  });

  it("renders the response timeline with event metadata and linked incident labels", () => {
    render(<IncidentDeckPage />);

    const timelineList = screen.getByRole("list", { name: /response timeline/i });

    expect(within(timelineList).getAllByRole("listitem")).toHaveLength(
      responseTimeline.length,
    );

    for (const event of responseTimeline) {
      const item = within(timelineList)
        .getByRole("heading", { level: 3, name: event.title })
        .closest('[role="listitem"]');

      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(event.type);
      expect(item).toHaveTextContent(event.loggedAt);
      expect(item).toHaveTextContent(event.actor);
      expect(item).toHaveTextContent(event.detail);

      for (const incidentId of event.linkedIncidentIds) {
        const linkedIncident = activeIncidents.find((incident) => incident.id === incidentId);

        expect(linkedIncident).toBeTruthy();
        expect(item).toHaveTextContent(linkedIncident?.service ?? "");
      }
    }
  });

  it("renders ownership summary metrics and every active response cell", () => {
    const snapshot = getOwnershipSnapshot();

    render(<IncidentDeckPage />);

    const ownershipList = screen.getByRole("list", { name: /ownership summary/i });
    const ownershipPanel = screen
      .getByRole("heading", { level: 2, name: /ownership summary/i })
      .closest("aside");

    expect(within(ownershipList).getAllByRole("listitem")).toHaveLength(
      ownershipCells.length,
    );

    expect(ownershipPanel).toBeInTheDocument();
    expect(within(ownershipPanel as HTMLElement).getByText("Teams engaged").closest("div")).toHaveTextContent(
      String(snapshot.teamsEngaged),
    );
    expect(
      within(ownershipPanel as HTMLElement)
        .getByText("Responders engaged")
        .closest("div"),
    ).toHaveTextContent(String(snapshot.respondersEngaged));
    expect(within(ownershipPanel as HTMLElement).getByText("Hot teams").closest("div")).toHaveTextContent(
      String(snapshot.hotTeams),
    );
    expect(
      within(ownershipPanel as HTMLElement).getByText("Stretched teams").closest("div"),
    ).toHaveTextContent(String(snapshot.stretchedTeams));

    for (const cell of ownershipCells) {
      const card = within(ownershipList)
        .getByRole("heading", { level: 3, name: cell.team })
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(cell.lead);
      expect(card).toHaveTextContent(cell.role);
      expect(card).toHaveTextContent(cell.shift);
      expect(card).toHaveTextContent(cell.queue);
      expect(card).toHaveTextContent(`${cell.responders} active responders`);
      expect(card).toHaveTextContent(cell.focus);
      expect(card).toHaveTextContent(cell.nextHandoff);
    }
  });
});
