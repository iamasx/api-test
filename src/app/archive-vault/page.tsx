import type { Metadata } from "next";
import { ArchiveVaultShell } from "@/components/archive-vault/archive-vault-shell";

export const metadata: Metadata = {
  title: "Archive Vault",
  description: "Mock snapshot browser with local compare and detail panels.",
};

export default function ArchiveVaultPage() {
  return <ArchiveVaultShell />;
}
