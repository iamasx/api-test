import type { Metadata } from "next";
import { ArchiveVaultShell } from "@/components/archive-vault/archive-vault-shell";

export const metadata: Metadata = {
  title: "Archive Vault",
  description: "Mock snapshot diff explorer with local review exports and queue state.",
};

export default function ArchiveVaultPage() {
  return <ArchiveVaultShell />;
}
