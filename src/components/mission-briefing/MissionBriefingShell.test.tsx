import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { missionScenarios } from "@/app/mission-briefing/mission-data";

import { MissionBriefingShell } from "./MissionBriefingShell";

describe("MissionBriefingShell", () => {
  it(
    "updates the selected scenario and keeps notes in local state",
    () => {
      render(<MissionBriefingShell scenarios={missionScenarios} />);

      fireEvent.click(screen.getByRole("button", { name: /harbor echo/i }));
      expect(
        screen.getByText(
          /Cargo timing is healthy, but pier access stays fragile/i,
        ),
      ).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/decision notes/i), {
        target: { value: "Delay insertion until the patrol overlap clears." },
      });

      fireEvent.click(screen.getByRole("button", { name: /polar relay/i }));
      fireEvent.click(screen.getByRole("button", { name: /harbor echo/i }));

      expect(screen.getByLabelText(/decision notes/i)).toHaveValue(
        "Delay insertion until the patrol overlap clears.",
      );
    },
    15000,
  );

  it(
    "shows empty-state copy for filtered and deselected views",
    () => {
      render(<MissionBriefingShell scenarios={missionScenarios} />);

      fireEvent.change(screen.getByLabelText(/search scenarios/i), {
        target: { value: "zz-no-match" },
      });

      expect(
        screen.getByText(/No scenarios match this filter\./i),
      ).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/search scenarios/i), {
        target: { value: "" },
      });

      fireEvent.click(screen.getByRole("button", { name: /clear focus/i }));

      expect(
        screen.getByText(
          /Select a scenario card to populate the briefing workspace\./i,
        ),
      ).toBeInTheDocument();
    },
    15000,
  );
});
