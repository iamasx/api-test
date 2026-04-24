import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  checkpoints,
  deliveryBriefOverview,
  deliveryStats,
  followUpNotes,
  milestones,
} from "./_data/delivery-brief-data";
import DeliveryBriefPage from "./page";

afterEach(() => {
  cleanup();
});

describe("DeliveryBriefPage", () => {
  it("renders the hero with primary heading, shipment metadata, and back link", () => {
    render(<DeliveryBriefPage />);

    expect(
      screen.getByText(deliveryBriefOverview.title, { selector: "h1" }),
    ).toBeInTheDocument();
    expect(screen.getByText(deliveryBriefOverview.shipmentId)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to overview/i }),
    ).toHaveAttribute("href", "/");
  });

  it("renders summary stats for delivery brief", () => {
    render(<DeliveryBriefPage />);

    const summarySection = screen.getByLabelText(/delivery brief summary/i);

    for (const stat of deliveryStats) {
      const statEl = within(summarySection).getByText(stat.label).closest("article");

      expect(statEl).toBeTruthy();
      expect(within(statEl as HTMLElement).getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders all milestones with their labels and statuses", () => {
    render(<DeliveryBriefPage />);

    const milestoneList = screen.getByRole("list", { name: /milestones/i });
    const milestoneItems = within(milestoneList).getAllByRole("listitem");

    expect(milestoneItems).toHaveLength(milestones.length);

    for (const milestone of milestones) {
      expect(within(milestoneList).getByText(milestone.label)).toBeInTheDocument();
      expect(within(milestoneList).getByText(milestone.summary)).toBeInTheDocument();
    }
  });

  it("renders all checkpoints with locations, carriers, and severity badges", () => {
    render(<DeliveryBriefPage />);

    const checkpointList = screen.getByRole("list", { name: /checkpoints/i });
    const checkpointItems = within(checkpointList).getAllByRole("listitem");

    expect(checkpointItems).toHaveLength(checkpoints.length);

    for (const checkpoint of checkpoints) {
      expect(within(checkpointList).getByText(checkpoint.location)).toBeInTheDocument();
      expect(within(checkpointList).getByText(checkpoint.carrier)).toBeInTheDocument();
      expect(within(checkpointList).getByText(checkpoint.timestamp)).toBeInTheDocument();
    }
  });

  it("renders follow-up notes with authors, timestamps, and priority badges", () => {
    render(<DeliveryBriefPage />);

    const notesSection = screen.getByLabelText(/follow-up notes$/i);
    const notesList = within(notesSection).getByRole("list", { name: /follow-up notes list/i });
    const noteItems = within(notesList).getAllByRole("listitem");

    expect(noteItems).toHaveLength(followUpNotes.length);

    for (const note of followUpNotes) {
      expect(within(notesList).getByText(note.author)).toBeInTheDocument();
      expect(within(notesList).getByText(note.timestamp)).toBeInTheDocument();
      expect(within(notesList).getByText(note.body)).toBeInTheDocument();
    }
  });
});
