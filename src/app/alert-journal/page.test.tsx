import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { alertJournalDays } from "./_lib/alert-journal-data";
import { resolveAlertJournalView } from "./_lib/alert-journal";
import AlertJournalPage from "./page";

describe("AlertJournalPage", () => {
  it(
    "renders multiple alert-day groups, recurring tags, and responsive layout hooks",
    async () => {
      const view = resolveAlertJournalView();

      render(await AlertJournalPage({ searchParams: Promise.resolve({}) }));

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /daily alert groups, repeated tags, and one focused resolution panel\./i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /alert journal at a glance/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /alert history grouped by day/i }),
      ).toBeInTheDocument();

      for (const group of view.dayGroups) {
        expect(
          screen.getByRole("heading", { name: group.day.label }),
        ).toBeInTheDocument();

        const alertList = screen.getByRole("list", {
          name: `${group.day.label} alerts`,
        });

        expect(within(alertList).getAllByRole("listitem")).toHaveLength(
          group.alerts.length,
        );
      }

      const tagSummaryList = screen.getByRole("list", {
        name: /recurring alert tags/i,
      });

      expect(within(tagSummaryList).getAllByRole("listitem")).toHaveLength(
        view.tagSummary.length,
      );

      const queueDepthCard = within(tagSummaryList)
        .getByText("#queue-depth")
        .closest('[role="listitem"]');

      expect(queueDepthCard).toHaveTextContent("3");
      expect(queueDepthCard).toHaveTextContent(
        "Warehouse ingest backlog crossed the watch threshold during intake overlap",
      );

      const detailPanel = screen.getByLabelText(/resolution detail/i);

      expect(
        within(detailPanel).getByRole("heading", {
          name: view.selectedAlert.title,
        }),
      ).toBeInTheDocument();
      expect(
        within(detailPanel).getByText(view.selectedAlert.resolution.nextStep),
      ).toBeInTheDocument();

      const panels = screen.getByTestId("alert-journal-panels");

      expect(panels.className).toContain(
        "xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]",
      );
      expect(alertJournalDays).toHaveLength(3);
    },
    15000,
  );

  it(
    "shows the requested alert in the resolution panel and marks its alert entry link",
    async () => {
      const chosenAlert = resolveAlertJournalView().dayGroups[1].alerts[1];

      render(
        await AlertJournalPage({
          searchParams: Promise.resolve({ alert: chosenAlert.id }),
        }),
      );

      const detailPanel = screen.getByLabelText(/resolution detail/i);
      const activeLink = screen.getByRole("link", {
        name: new RegExp(`viewing resolution for ${chosenAlert.title}`, "i"),
      });

      expect(
        within(detailPanel).getByRole("heading", { name: chosenAlert.title }),
      ).toBeInTheDocument();
      expect(
        within(detailPanel).getByText(chosenAlert.resolution.summary),
      ).toBeInTheDocument();
      expect(activeLink).toHaveAttribute(
        "href",
        `/alert-journal?alert=${chosenAlert.id}`,
      );
      expect(activeLink).toHaveAttribute("aria-current", "page");
    },
    15000,
  );

  it(
    "falls back to the latest alert for an unknown id and keeps recurring tag content visible",
    async () => {
      const view = resolveAlertJournalView();

      render(
        await AlertJournalPage({
          searchParams: Promise.resolve({ alert: "missing-alert-id" }),
        }),
      );

      const detailPanel = screen.getByLabelText(/resolution detail/i);
      const tagSummaryList = screen.getByRole("list", {
        name: /recurring alert tags/i,
      });
      const regionalDriftCard = within(tagSummaryList)
        .getByText("#regional-drift")
        .closest('[role="listitem"]');

      expect(
        screen.getByText(/missing-alert-id.*not found/i),
      ).toBeInTheDocument();
      expect(
        within(detailPanel).getByRole("heading", {
          name: view.selectedAlert.title,
        }),
      ).toBeInTheDocument();
      expect(
        regionalDriftCard,
      ).toBeInTheDocument();
      expect(regionalDriftCard).toHaveTextContent("alerts carried this tag");
    },
    15000,
  );
});
