"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  readonly label: string;
  readonly value: number;
  readonly description: string;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly decimals?: number;
}

export function AnimatedCounter({
  label,
  value,
  description,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeoutId = window.setTimeout(() => setDisplayValue(value), 0);
      return () => window.clearTimeout(timeoutId);
    }

    let frameId = 0;
    const startedAt = performance.now();
    const duration = 1200;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted, value]);

  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <div
      ref={containerRef}
      className="rounded-3xl border border-zinc-200/70 bg-white/80 p-5 shadow-[0_18px_50px_-36px_rgba(15,23,42,0.9)] backdrop-blur"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
        {prefix}
        {formattedValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{description}</p>
    </div>
  );
}
