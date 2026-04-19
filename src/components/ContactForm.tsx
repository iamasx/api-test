"use client";

import { useCallback, useEffect, useState } from "react";
import {
  emptyContactForm,
  hasContactErrors,
  normalizeContactForm,
  validateContactForm,
  type ContactErrors,
  type ContactField,
  type ContactFormValues,
} from "@/lib/contact";
import { siteConfig } from "@/lib/site";

interface ToastMessage {
  readonly id: number;
  readonly message: string;
  readonly tone: "success" | "error";
}

interface ToastCardProps {
  readonly toast: ToastMessage;
  readonly onDismiss: (id: number) => void;
}

function ToastCard({ toast, onDismiss }: ToastCardProps) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 4200);

    return () => window.clearTimeout(timer);
  }, [onDismiss, toast.id]);

  return (
    <div
      role={toast.tone === "error" ? "alert" : "status"}
      className={`min-w-72 rounded-[1.25rem] border px-4 py-3 shadow-[0_18px_45px_rgba(20,32,51,0.16)] ${
        toast.tone === "success"
          ? "border-[rgba(15,118,110,0.18)] bg-[rgba(236,253,245,0.94)] text-[var(--ink)]"
          : "border-[rgba(249,115,22,0.2)] bg-[rgba(255,247,237,0.96)] text-[var(--ink)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            {toast.tone === "success" ? "Success" : "Error"}
          </p>
          <p className="mt-2 text-sm leading-6">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="rounded-full p-1 text-[var(--muted)]"
          aria-label="Dismiss notification"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
            <path
              d="M4 4 12 12M12 4 4 12"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function getFieldId(field: ContactField) {
  return `contact-${field}`;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pushToast = useCallback((tone: ToastMessage["tone"], message: string) => {
    setToasts((current) => [...current, { id: Date.now() + Math.random(), tone, message }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const handleFieldBlur = (field: ContactField) => {
    const normalized = normalizeContactForm(values);
    setValues(normalized);
    setErrors((current) => ({
      ...current,
      [field]: validateContactForm(normalized)[field],
    }));
  };

  return (
    <>
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastCard toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>

      <div className="glass-panel soft-grid overflow-hidden rounded-[2rem] border border-[var(--border)] px-6 py-8 shadow-[var(--shadow)] md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--ink)] sm:text-4xl">
              Bring the next project into focus.
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              Use the form for project inquiries, product collaborations, or engineering
              consulting. Submissions hit a local API route for now, so this is safe for
              portfolio demos and review environments.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.5rem] border border-[rgba(20,32,51,0.08)] bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  Email
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-flex text-lg font-semibold text-[var(--ink)]"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="rounded-[1.5rem] border border-[rgba(20,32,51,0.08)] bg-white/80 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                  Working style
                </p>
                <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--muted)]">
                  <li>Clear scope, fast prototypes, and accessible defaults.</li>
                  <li>Strong communication with design, product, and platform teams.</li>
                  <li>{siteConfig.location} with async-friendly collaboration.</li>
                </ul>
              </div>
            </div>
          </div>

          <form
            noValidate
            className="rounded-[1.75rem] border border-[rgba(20,32,51,0.08)] bg-white/85 p-5 shadow-[0_18px_50px_rgba(20,32,51,0.08)] sm:p-6"
            onSubmit={async (event) => {
              event.preventDefault();

              const normalized = normalizeContactForm(values);
              const validationErrors = validateContactForm(normalized);

              setValues(normalized);
              setErrors(validationErrors);

              if (hasContactErrors(validationErrors)) {
                pushToast("error", "Please fix the highlighted fields before sending.");
                return;
              }

              setIsSubmitting(true);

              try {
                const response = await fetch("/api/contact", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(normalized),
                });

                const payload = (await response.json().catch(() => null)) as
                  | { errors?: ContactErrors; message?: string }
                  | null;

                if (!response.ok) {
                  if (payload?.errors) {
                    setErrors(payload.errors);
                  }

                  pushToast(
                    "error",
                    payload?.message ?? "Something went wrong while sending the message.",
                  );
                  return;
                }

                setValues(emptyContactForm);
                setErrors({});
                pushToast(
                  "success",
                  payload?.message ?? "Message received. Alex will respond soon.",
                );
              } catch {
                pushToast(
                  "error",
                  "Network issue detected. Please try the form again in a moment.",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-[var(--ink)]">Name</span>
                <input
                  id={getFieldId("name")}
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, name: event.target.value }))
                  }
                  onBlur={() => handleFieldBlur("name")}
                  className={`w-full rounded-[1rem] border px-4 py-3 text-sm text-[var(--ink)] ${
                    errors.name
                      ? "border-[rgba(249,115,22,0.5)] bg-[rgba(255,247,237,0.8)]"
                      : "border-[rgba(20,32,51,0.12)] bg-white"
                  }`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${getFieldId("name")}-error` : undefined}
                  placeholder="Ada Lovelace"
                />
                {errors.name && (
                  <p id={`${getFieldId("name")}-error`} className="text-sm text-[#c2410c]">
                    {errors.name}
                  </p>
                )}
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[var(--ink)]">Email</span>
                <input
                  id={getFieldId("email")}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, email: event.target.value }))
                  }
                  onBlur={() => handleFieldBlur("email")}
                  className={`w-full rounded-[1rem] border px-4 py-3 text-sm text-[var(--ink)] ${
                    errors.email
                      ? "border-[rgba(249,115,22,0.5)] bg-[rgba(255,247,237,0.8)]"
                      : "border-[rgba(20,32,51,0.12)] bg-white"
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${getFieldId("email")}-error` : undefined}
                  placeholder="hello@team.com"
                />
                {errors.email && (
                  <p id={`${getFieldId("email")}-error`} className="text-sm text-[#c2410c]">
                    {errors.email}
                  </p>
                )}
              </label>
            </div>

            <label className="mt-5 block space-y-2">
              <span className="text-sm font-medium text-[var(--ink)]">Subject</span>
              <input
                id={getFieldId("subject")}
                name="subject"
                value={values.subject}
                onChange={(event) =>
                  setValues((current) => ({ ...current, subject: event.target.value }))
                }
                onBlur={() => handleFieldBlur("subject")}
                className={`w-full rounded-[1rem] border px-4 py-3 text-sm text-[var(--ink)] ${
                  errors.subject
                    ? "border-[rgba(249,115,22,0.5)] bg-[rgba(255,247,237,0.8)]"
                    : "border-[rgba(20,32,51,0.12)] bg-white"
                }`}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? `${getFieldId("subject")}-error` : undefined}
                placeholder="New product sprint, frontend rebuild, performance audit..."
              />
              {errors.subject && (
                <p id={`${getFieldId("subject")}-error`} className="text-sm text-[#c2410c]">
                  {errors.subject}
                </p>
              )}
            </label>

            <label className="mt-5 block space-y-2">
              <span className="text-sm font-medium text-[var(--ink)]">Message</span>
              <textarea
                id={getFieldId("message")}
                name="message"
                rows={6}
                value={values.message}
                onChange={(event) =>
                  setValues((current) => ({ ...current, message: event.target.value }))
                }
                onBlur={() => handleFieldBlur("message")}
                className={`w-full rounded-[1rem] border px-4 py-3 text-sm text-[var(--ink)] ${
                  errors.message
                    ? "border-[rgba(249,115,22,0.5)] bg-[rgba(255,247,237,0.8)]"
                    : "border-[rgba(20,32,51,0.12)] bg-white"
                }`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${getFieldId("message")}-error` : undefined}
                placeholder="Tell me about the product, timeline, and where engineering needs the most leverage."
              />
              {errors.message && (
                <p id={`${getFieldId("message")}-error`} className="text-sm text-[#c2410c]">
                  {errors.message}
                </p>
              )}
            </label>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-[var(--muted)]">
                Demo route only. The submission is validated, logged server-side, and returns a
                JSON response.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
