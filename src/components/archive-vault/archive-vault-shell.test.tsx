import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArchiveVaultShell } from "./archive-vault-shell";

describe("ArchiveVaultShell", () => {
  it("shows record-level diff details for selected snapshot pairs", () => {
    render(<ArchiveVaultShell />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select Aurelia Ledger for compare" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Select Orbit Permissions for compare" }),
    );

    expect(
      screen.getByText(
        "Both sealed archives hold steady and differ mostly in consent lineage depth.",
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Inspect diff for Consent lineage map" }),
    );

    const inspector = screen.getByLabelText("Selected diff detail");
    expect(
      within(inspector).getByText("Entitlement residue retained until legal release"),
    ).toBeInTheDocument();
    expect(within(inspector).getByText("Identity graph")).toBeInTheDocument();
  });

  it("requires review before queueing a comparison package", () => {
    render(<ArchiveVaultShell />);

    fireEvent.click(
      screen.getByRole("button", { name: "Select Helix Notes for compare" }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Select Kestrel Claims for compare" }),
    );

    const queueButton = screen.getByRole("button", { name: "Queue review package" });
    expect(queueButton).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Mark comparison reviewed" }));

    expect(queueButton).toBeEnabled();

    fireEvent.click(queueButton);

    const exportPanel = screen.getByLabelText("Export queue");
    expect(
      within(exportPanel).getByText("Helix Notes vs Kestrel Claims"),
    ).toBeInTheDocument();
    expect(within(exportPanel).getByText("queued")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Queued for export" }),
    ).toBeDisabled();
  });

  it("advances seeded queue packages through their export states", () => {
    render(<ArchiveVaultShell />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Advance package Ember Registry vs Quartz Session Tape",
      }),
    );

    const exportPanel = screen.getByLabelText("Export queue");
    const queueCard = within(exportPanel)
      .getByText("Ember Registry vs Quartz Session Tape")
      .closest("article");

    expect(queueCard).not.toBeNull();
    expect(within(queueCard!).getByText("ready")).toBeInTheDocument();
    expect(
      within(queueCard!).getByRole("button", {
        name: "Export package ready Ember Registry vs Quartz Session Tape",
      }),
    ).toBeDisabled();
  });
});
