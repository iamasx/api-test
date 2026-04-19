import { NextResponse } from "next/server";
import {
  hasContactErrors,
  normalizeContactForm,
  validateContactForm,
} from "@/lib/contact";

export async function POST(request: Request) {
  try {
    const payload = normalizeContactForm(await request.json());
    const errors = validateContactForm(payload);

    if (hasContactErrors(errors)) {
      return NextResponse.json(
        {
          message: "Please correct the invalid fields and try again.",
          errors,
        },
        { status: 400 },
      );
    }

    console.log("Contact form submission", payload);

    return NextResponse.json({
      message: "Thanks for reaching out. The message was captured successfully.",
    });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      {
        message: "Unexpected server error while processing the contact form.",
      },
      { status: 500 },
    );
  }
}
