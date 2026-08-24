import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phosphoros",
  description: "One public record. Every source. No required conclusion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
