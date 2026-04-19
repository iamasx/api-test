"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";

const AUTO_PLAY_INTERVAL = 5500;

function wrapIndex(index: number) {
  if (index < 0) {
    return testimonials.length - 1;
  }

  if (index >= testimonials.length) {
    return 0;
  }

  return index;
}

export function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1));
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="glass-panel soft-grid overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)] md:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
          Trusted by teammates who care about craft.
        </h2>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">
          Recommendations from engineering, design, leadership, and open-source
          collaborators.
        </p>
      </div>

      <div
        className="mt-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          const nextTarget = event.relatedTarget as Node | null;

          if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
            setIsPaused(false);
          }
        }}
      >
        <div
          tabIndex={0}
          role="region"
          aria-label="Recommendations from collaborators"
          aria-roledescription="carousel"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              setActiveIndex((current) => wrapIndex(current + 1));
            }

            if (event.key === "ArrowLeft") {
              event.preventDefault();
              setActiveIndex((current) => wrapIndex(current - 1));
            }

            if (event.key === "Home") {
              event.preventDefault();
              setActiveIndex(0);
            }

            if (event.key === "End") {
              event.preventDefault();
              setActiveIndex(testimonials.length - 1);
            }
          }}
          className="outline-none"
        >
          <p className="sr-only" aria-live="polite">
            Showing recommendation {activeIndex + 1} of {testimonials.length}:{" "}
            {activeTestimonial.name}
          </p>

          <div className="overflow-hidden rounded-[1.75rem] border border-[rgba(20,32,51,0.08)] bg-white/85">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <article
                  key={testimonial.name}
                  aria-hidden={index !== activeIndex}
                  className="flex w-full shrink-0 flex-col gap-8 px-6 py-8 md:px-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(15,118,110,0.12)] text-lg font-semibold text-[var(--accent)]">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span className="rounded-full border border-[rgba(20,32,51,0.08)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                      {index + 1}/{testimonials.length}
                    </span>
                  </div>

                  <blockquote className="max-w-4xl text-xl leading-9 tracking-[-0.02em] text-[var(--ink)] sm:text-2xl">
                    “{testimonial.quote}”
                  </blockquote>

                  <footer className="mt-auto">
                    <p className="text-base font-semibold text-[var(--ink)]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {testimonial.title} @ {testimonial.company}
                    </p>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 rounded-full ${
                    index === activeIndex
                      ? "w-10 bg-[var(--accent)]"
                      : "w-3 bg-[rgba(20,32,51,0.18)] hover:bg-[rgba(20,32,51,0.32)]"
                  }`}
                  aria-label={`Show recommendation from ${testimonial.name}`}
                  aria-pressed={index === activeIndex}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveIndex((current) => wrapIndex(current - 1))}
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/75 px-4 py-2 text-sm font-medium text-[var(--ink)]"
                aria-label="Previous recommendation"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((current) => wrapIndex(current + 1))}
                className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-white"
                aria-label="Next recommendation"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
