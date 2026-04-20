import type { Metadata } from "next";
import type { ReactNode } from "react";

import styles from "./mission-briefing.module.css";

export const metadata: Metadata = {
  title: "Mission Briefing",
  description:
    "Mock mission briefing workspace with scenario planning, outcome scoring, review controls, and local decision notes.",
};

export default function MissionBriefingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={styles.body}>{children}</div>;
}
