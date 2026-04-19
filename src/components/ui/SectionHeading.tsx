import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingAlign = "left" | "center";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: SectionHeadingAlign;
}

const alignClasses: Record<SectionHeadingAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3", alignClasses[align], className)} {...props}>
      {eyebrow ? (
        <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <div className="space-y-3">
        <h2 className="max-w-3xl text-display font-semibold tracking-tight text-balance text-text">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-base leading-8 text-pretty text-muted">{description}</p>
        ) : null}
      </div>
    </div>
  );
}
