import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import FieldGuideShell from "@/components/field-guide/field-guide-shell";

describe("FieldGuideShell", () => {
  it("filters saved playbooks and procedures with the richer library controls", () => {
    render(<FieldGuideShell />);

    fireEvent.change(screen.getByLabelText("Playbook status"), {
      target: { value: "Draft" },
    });
    fireEvent.change(screen.getByLabelText("Tags"), {
      target: { value: "downtime" },
    });

    expect(
      screen.getByRole("button", {
        name: "Review playbook: Specimen Intake Downtime Rehearsal",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Review playbook: Rooftop Link Recovery Drill",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Open procedure: Intake Downtime Handoff",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: "Open procedure: Dock Safety Sweep",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows a combined empty state when search removes procedures and playbooks", () => {
    render(<FieldGuideShell />);

    fireEvent.change(screen.getByLabelText("Search procedures"), {
      target: { value: "does-not-exist" },
    });

    expect(
      screen.getByText("No procedures or playbooks match the current search."),
    ).toBeInTheDocument();
  });

  it("tracks checklist completion for the selected procedure template", () => {
    render(<FieldGuideShell />);

    fireEvent.click(
      screen.getByRole("button", { name: "Open procedure: Sensor Mast Hot Swap" }),
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Inspect mast seal and tether line",
    });

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getAllByText("1 of 3 steps complete")).toHaveLength(2);
  });

  it("authors and saves a new draft playbook", async () => {
    render(<FieldGuideShell />);

    fireEvent.click(screen.getByRole("button", { name: "Authoring studio" }));
    fireEvent.change(screen.getByLabelText("Playbook title"), {
      target: { value: "Network Escalation Remix" },
    });
    fireEvent.change(screen.getByLabelText("Owner"), {
      target: { value: "Jordan Hale" },
    });
    fireEvent.change(screen.getByLabelText("Step 1 label"), {
      target: { value: "Stage comms bridge" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save draft" }));
    fireEvent.click(screen.getByRole("button", { name: "Field library" }));

    expect(
      await screen.findByRole("button", {
        name: "Review playbook: Network Escalation Remix",
      }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Review playbook: Network Escalation Remix",
      }),
    );

    expect(screen.getByText("Jordan Hale")).toBeInTheDocument();
    expect(screen.getByText(/Stage comms bridge/)).toBeInTheDocument();
  });

  it("publishes a playbook and shows the authored rehearsal preview", async () => {
    render(<FieldGuideShell />);

    fireEvent.click(screen.getByRole("button", { name: "Authoring studio" }));
    fireEvent.change(screen.getByLabelText("Playbook title"), {
      target: { value: "Telemetry Shadow Drill" },
    });
    fireEvent.change(screen.getByLabelText("Step 1 label"), {
      target: { value: "Brief comms and observers" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add rehearsal step" }));
    fireEvent.change(screen.getByLabelText("Step 4 label"), {
      target: { value: "Run final moderator recap" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish playbook" }));

    expect(
      await screen.findByRole("button", {
        name: "Review playbook: Telemetry Shadow Drill",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Ready to Rehearse").length).toBeGreaterThan(0);
    expect(screen.getByText(/Brief comms and observers/)).toBeInTheDocument();
    expect(screen.getByText(/Run final moderator recap/)).toBeInTheDocument();
  });
});
