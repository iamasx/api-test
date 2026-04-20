import type { Metadata } from "next";

import { FieldGuideShell } from "./_components/field-guide-shell";
import {
  fieldGuideCategories,
  fieldGuideProcedures,
} from "./_lib/field-guide-data";

export const metadata: Metadata = {
  title: "Field Guide",
  description:
    "Field guide route shell for searchable procedures, checklist execution detail, and reference notes.",
};

export default function FieldGuidePage() {
  return (
    <FieldGuideShell
      categories={fieldGuideCategories}
      procedures={fieldGuideProcedures}
    />
  );
}
