import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IncidentDeckShell } from "./incident-deck-shell";

describe("IncidentDeckShell", () => {
  it(
    "advances the active incident through containment and handoff stages",
    () => {
      render(<IncidentDeckShell />);

      expect(
        screen.queryByText("Follow-the-sun pod accepts recovery watch with rollback notes"),
      ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Advance to Containment" }),
    );

    expect(
      screen.getByText(
        "Transfer bridge packet and rollback notes to the follow-the-sun reliability pod",
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Advance to Handoff" }));

      expect(
        screen.getByText("Follow-the-sun pod accepts recovery watch with rollback notes"),
      ).toBeInTheDocument();
      expect(screen.getByText("Receiving owner acknowledgment")).toBeInTheDocument();
      expect(screen.getAllByText("Acknowledged").length).toBeGreaterThan(0);
    },
    15000,
  );

  it(
    "filters the deck by severity and narrows the timeline by responder focus",
    () => {
      render(<IncidentDeckShell />);

      fireEvent.click(screen.getByRole("button", { name: /Medium · 1/i }));

      expect(
        screen.getByText("Webhook replay queue grows after partner retry burst"),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Checkout token refresh failures spike in the primary lane"),
      ).not.toBeInTheDocument();

      expect(
        screen.getByText("Warm spare workers drain the oldest replay partition"),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: /Cameron Reeves · Comms lead/i }),
      );

      expect(
        screen.getByText("Merchant status hold is handed to partner success desk"),
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Warm spare workers drain the oldest replay partition"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("Partner lane acknowledgment")).toBeInTheDocument();
    },
    15000,
  );
});
