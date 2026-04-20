import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  radarContacts,
  radarInspectorMetadata,
  radarSectors,
  radarSignalPriorities,
} from "./_data/radar-console-data";
import { RadarConsoleShell } from "./_components/radar-console-shell";
import { resolveRadarConsoleView } from "./_lib/radar-console";
import RadarConsolePage from "./page";

describe("RadarConsolePage", () => {
  it("renders the route shell with the hero, summary cards, sections, and default inspector selection", () => {
    const view = resolveRadarConsoleView();

    render(<RadarConsoleShell view={view} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /track sector posture, contact ownership, and signal escalation from one route\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /sector cards/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /contact summaries/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to route index/i }),
    ).toHaveAttribute("href", "/");

    const summaryList = screen.getByRole("list", {
      name: /radar console summary/i,
    });
    const inspector = screen.getByLabelText(/signal inspector/i);

    expect(within(summaryList).getAllByRole("listitem")).toHaveLength(4);
    expect(
      within(inspector).getByRole("heading", {
        level: 3,
        name: "Aurora Bloom",
      }),
    ).toBeInTheDocument();
    expect(within(inspector).getByText(radarInspectorMetadata.title)).toBeInTheDocument();
  });

  it("renders every sector card with its metadata, lead signal, and assigned contacts", () => {
    const view = resolveRadarConsoleView();

    render(<RadarConsoleShell view={view} />);

    const sectorList = screen.getByRole("list", { name: /radar sectors/i });

    expect(sectorList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      radarSectors.length,
    );

    for (const sector of radarSectors) {
      const signals = radarSignalPriorities.filter(
        (signal) => signal.sectorId === sector.id,
      );
      const contacts = radarContacts.filter((contact) =>
        sector.contactIds.includes(contact.id),
      );
      const card = within(sectorList)
        .getByRole("heading", { level: 3, name: sector.name })
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(sector.code);
      expect(card).toHaveTextContent(sector.posture);
      expect(card).toHaveTextContent(sector.sweepWindow);
      expect(card).toHaveTextContent(sector.orbit);
      expect(card).toHaveTextContent(sector.terrain);
      expect(card).toHaveTextContent(signals[0].title);

      for (const contact of contacts) {
        expect(card).toHaveTextContent(contact.name);
        expect(card).toHaveTextContent(contact.callSign);
      }
    }
  });

  it("renders contact summaries with response metadata and assigned priority content", () => {
    const view = resolveRadarConsoleView();

    render(<RadarConsoleShell view={view} />);

    const contactList = screen.getByRole("list", {
      name: /radar contact summaries/i,
    });

    expect(contactList.querySelectorAll(':scope > [role="listitem"]')).toHaveLength(
      radarContacts.length,
    );

    for (const contact of radarContacts) {
      const assignedSignals = radarSignalPriorities.filter((signal) =>
        signal.ownerContactIds.includes(contact.id),
      );
      const card = within(contactList)
        .getByRole("heading", { level: 3, name: contact.name })
        .closest('[role="listitem"]');

      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(contact.channel);
      expect(card).toHaveTextContent(contact.responseWindow);
      expect(card).toHaveTextContent(contact.location);
      expect(card).toHaveTextContent(contact.specialty);
      expect(card).toHaveTextContent(`${assignedSignals.length} live signals`);

      for (const signal of assignedSignals) {
        expect(card).toHaveTextContent(signal.title);
      }
    }
  });

  it("renders a requested signal in the inspector when the page receives a signal search param", async () => {
    const chosenSignal = radarSignalPriorities.find(
      (signal) => signal.id === "sig-bridge-shadow",
    );

    expect(chosenSignal).toBeDefined();

    render(
      await RadarConsolePage({
        searchParams: Promise.resolve({ signal: chosenSignal?.id }),
      }),
    );

    const inspector = screen.getByLabelText(/signal inspector/i);
    const activeLink = within(inspector).getByRole("link", {
      name: /viewing signal bridge shadow/i,
    });

    expect(
      within(inspector).getByRole("heading", {
        level: 3,
        name: "Bridge Shadow",
      }),
    ).toBeInTheDocument();
    expect(within(inspector).getByText(chosenSignal?.recommendedWindow ?? "")).toBeInTheDocument();
    expect(activeLink).toHaveAttribute(
      "href",
      `/radar-console?signal=${chosenSignal?.id}`,
    );
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("falls back to the default signal and explains the fallback when the search param is unknown", async () => {
    render(
      await RadarConsolePage({
        searchParams: Promise.resolve({ signal: "missing-signal" }),
      }),
    );

    const inspector = screen.getByLabelText(/signal inspector/i);

    expect(
      within(inspector).getByText(
        /missing-signal was not found\. showing aurora bloom instead\./i,
      ),
    ).toBeInTheDocument();
    expect(
      within(inspector).getByRole("heading", {
        level: 3,
        name: "Aurora Bloom",
      }),
    ).toBeInTheDocument();
  });
});
