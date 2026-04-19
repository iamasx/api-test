export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export type ContactField = keyof ContactFormValues;

export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function toTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeContactForm(payload: unknown): ContactFormValues {
  if (!payload || typeof payload !== "object") {
    return emptyContactForm;
  }

  const record = payload as Partial<Record<ContactField, unknown>>;

  return {
    name: toTrimmedString(record.name),
    email: toTrimmedString(record.email),
    subject: toTrimmedString(record.subject),
    message: toTrimmedString(record.message),
  };
}

export function validateContactForm(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.subject.length < 4) {
    errors.subject = "Please add a more descriptive subject.";
  }

  if (values.message.length < 20) {
    errors.message = "Please share a little more context before sending.";
  }

  return errors;
}

export function hasContactErrors(errors: ContactErrors) {
  return Object.keys(errors).length > 0;
}
