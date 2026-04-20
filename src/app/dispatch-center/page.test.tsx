import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DispatchCenterShell } from "./_components/dispatch-center-shell";
import { resolveDispatchCenterView } from "./_lib/dispatch-center";
import {
  dispatchAssignments,
  dispatchBuckets,
  dispatchQueues,
} from "./_lib/dispatch-data";

describe("DispatchCenterShell", () => {
  it("renders queue summaries, bucket sections, and a default selected detail panel", () => {
    const view = resolveDispatchCenterView();

    render(<DispatchCenterShell view={view} />);

    expect(
      screen.getByText(
        /balance assignment buckets, queue pressure, and owner follow-through from one route/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/queue pressure by release lane/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/bucketed assignments with visible ownership/i),
    ).toBeInTheDocument();

    for (const queue of dispatchQueues) {
      expect(screen.getAllByText(queue.name).length).toBeGreaterThan(0);
    }

    for (const bucket of dispatchBuckets) {
      expect(screen.getByText(bucket.title)).toBeInTheDocument();
      expect(
        screen.getByLabelText(new RegExp(`${bucket.title} assignments`, "i")),
      ).toBeInTheDocument();
    }

    const detail = screen.getByLabelText(/selected assignment detail/i);

    expect(
      within(detail).getByRole("heading", { name: dispatchAssignments[0].reference }),
    ).toBeInTheDocument();
    expect(within(detail).getByText(dispatchAssignments[0].statusLabel)).toBeInTheDocument();
    expect(within(detail).getByText(view.selectedAssignment.owner.name)).toBeInTheDocument();
  });

  it("marks the requested assignment card active and shows its detail content", () => {
    const chosenAssignment = dispatchAssignments[3];
    const view = resolveDispatchCenterView(chosenAssignment.id);

    render(<DispatchCenterShell view={view} />);

    const detail = screen.getByLabelText(/selected assignment detail/i);
    const activeLink = screen.getByRole("link", {
      name: new RegExp(`viewing detail for ${chosenAssignment.reference}`, "i"),
    });

    expect(
      within(detail).getByRole("heading", {
        name: chosenAssignment.reference,
      }),
    ).toBeInTheDocument();
    expect(within(detail).getByText(chosenAssignment.riskLabel)).toBeInTheDocument();
    expect(activeLink).toHaveAttribute(
      "href",
      `/dispatch-center?assignment=${chosenAssignment.id}`,
    );
    expect(activeLink).toHaveAttribute("aria-current", "page");
  });

  it("falls back to the default assignment and shows a status message for an unknown id", () => {
    const view = resolveDispatchCenterView("missing-assignment");

    render(<DispatchCenterShell view={view} />);

    expect(screen.getByRole("status")).toHaveTextContent(
      /missing-assignment.*not found/i,
    );

    const detail = screen.getByLabelText(/selected assignment detail/i);

    expect(
      within(detail).getByRole("heading", { name: dispatchAssignments[0].reference }),
    ).toBeInTheDocument();
  });
});
