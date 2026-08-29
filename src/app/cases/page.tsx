import type { Metadata } from "next";

import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import CaseBrowser from "@/components/CaseBrowser";
import SiteFooter from "@/components/SiteFooter";
import { getAllCases } from "@/lib/phosphoros/cases";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Openbare misdaaddossiers in Nederland",
  description:
    "Doorzoek openbare Nederlandse misdaaddossiers op stad, datum, soort misdaad en juridische uitkomst.",
  alternates: {
    canonical: "/cases",
  },
};

export default async function CasesPage() {
  const cases = await getAllCases();

  return (
    <main className={styles.page}>
      <Header />

      <PageIntro eyebrow="Phosphoros / Cases" title="Public cases.">
        <p>
          Every available case in one consistent structure. The record shows what is public,
          what remains unresolved and where information is still missing.
        </p>
      </PageIntro>

      <section className={styles.records}>
        <div className={styles.inner}>
          <div className={styles.summary}>
            <span>{String(cases.length).padStart(2, "0")}</span>
            <p>Cases currently available in the public record.</p>
          </div>
          <CaseBrowser items={cases} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
