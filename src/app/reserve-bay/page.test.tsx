import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  reserveBayAllocations,
  reserveBayAvailability,
  reserveBayReservations,
} from "./_data/reserve-bay-data";
import ReserveBayPage from "./page";

afterEach(() => {
  cleanup();
});

describe("ReserveBayPage", () => {
  it("renders the reserve bay shell independently from the home page", () => {
    render(<ReserveBayPage />);

    expect(
      screen.getByRole("heading", {
        name: /manage dock reservations and bay allocation across facilities\./i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /availability snapshot/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /reservations/i }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /allocation summary/i }),
    ).toBeTruthy();
    expect(
      screen.queryByText(/to get started, edit the page\.tsx file\./i),
    ).toBeNull();
  });

  it("renders each availability zone from mock content", () => {
    render(<ReserveBayPage />);

    const zoneList = screen.getByRole("list", {
      name: /availability zones/i,
    });
    expect(within(zoneList).getAllByRole("listitem")).toHaveLength(
      reserveBayAvailability.length,
    );

    for (const snapshot of reserveBayAvailability) {
      expect(screen.getByText(snapshot.zone)).toBeTruthy();
    }
  });

  it("renders reservation cards and allocation panel with responsive layout hooks", () => {
    render(<ReserveBayPage />);

    const reservationList = screen.getByRole("list", {
      name: /reservations/i,
    });
    const allocationList = screen.getByRole("list", {
      name: /allocation breakdown/i,
    });
    const panels = screen.getByTestId("reserve-bay-panels");

    expect(within(reservationList).getAllByRole("listitem")).toHaveLength(
      reserveBayReservations.length,
    );
    expect(within(allocationList).getAllByRole("listitem")).toHaveLength(
      reserveBayAllocations.length,
    );
    expect(
      screen.getByText(reserveBayReservations[0].carrier),
    ).toBeTruthy();
    expect(
      screen.getByText(reserveBayAllocations[0].label),
    ).toBeTruthy();
    expect(panels.className).toContain(
      "xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)]",
    );
  });
});
