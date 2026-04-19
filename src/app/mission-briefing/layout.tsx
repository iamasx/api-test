import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./mission-briefing.module.css";

export const metadata: Metadata = {
  title: "Mission Briefing",
  description:
    "Mock scenario planning workspace with timeline phases, readiness indicators, and local decision notes.",
};

export default function MissionBriefingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
