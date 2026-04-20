import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ParcelHubShell } from "./parcel-hub-shell";

describe("parcel hub shell", () => {
  it(
    "updates summary content when a balancing scenario is previewed",
    () => {
      render(<ParcelHubShell />);

      fireEvent.click(
        screen.getByRole("button", { name: /Protect priority SLA/i }),
      );

      expect(
        screen.getAllByText(
          "Best SLA improvement with a light new-risk footprint.",
        ),
      ).toHaveLength(2);
      expect(
        screen.getByText(
          "Protected cartons leave the Denver overflow and recover the biggest SLA slice in the hub.",
        ),
      ).toBeInTheDocument();
      expect(screen.getByText("26 rerouted")).toBeInTheDocument();
    },
    15000,
  );

  it(
    "shows introduced and cleared exception impacts before reassignment is applied",
    () => {
      render(<ParcelHubShell />);

      fireEvent.click(
        screen.getByRole("button", { name: /Protect priority SLA/i }),
      );

      fireEvent.click(
        screen.getByRole("button", { name: /Inspect MIA -> ATL lane/i }),
      );

      expect(screen.getByText("New risk in preview")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Diverted priority cartons need relabel verification at the ATL flex trailer",
        ),
      ).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole("button", { name: /Inspect DEN -> CHI lane/i }),
      );
      fireEvent.click(screen.getByRole("button", { name: "Resolved" }));

      expect(screen.getByText("Clears in preview")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Inbound cage 4 missed the final consolidation sweep",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Removes the highest-priority carton exposure from Denver.",
        ),
      ).toBeInTheDocument();
    },
    15000,
  );
});
