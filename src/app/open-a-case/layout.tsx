import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Een dossier aanmelden",
  description:
    "Meld een gedocumenteerde Nederlandse misdaadzaak aan voor redactionele en juridische controle.",
  alternates: {
    canonical: "/open-a-case",
  },
};

export default function OpenCaseLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
