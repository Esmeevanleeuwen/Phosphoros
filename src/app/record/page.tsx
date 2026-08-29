import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import RecordList from "@/components/RecordList";
import SiteFooter from "@/components/SiteFooter";
import { getAllCases } from "@/lib/phosphoros/cases";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Het openbare dossier",
  description:
    "Een controleerbaar overzicht van feiten, bronnen, ontbrekende informatie en juridische uitkomsten.",
  alternates: {
    canonical: "/record",
  },
};

const standards = [
  ["01", "Source", "The origin of every public claim remains visible."],
  ["02", "Status", "Known, disputed and missing information stay separate."],
  ["03", "Revision", "A record changes when the available evidence changes."],
];

export default async function RecordPage() {
  const cases = await getAllCases();

  return (
    <main className={styles.page}>
      <Header />

      <PageIntro eyebrow="Phosphoros / The record" title="One standard.">
        <p>
          Sources remain separate from claims. Contradictions are not resolved by hiding one
          side, and missing information is shown as part of the record itself.
        </p>
      </PageIntro>

      <section className={styles.standard}>
        <div className={styles.standardInner}>
          <header>
            <p>How the record is organised</p>
            <h2>A structure that stays the same when the subject changes.</h2>
          </header>

          <div className={styles.standards}>
            {standards.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>

          <Link href="/method">Read the full method →</Link>
        </div>
      </section>

      <section className={styles.index}>
        <div className={styles.indexInner}>
          <header>
            <p>Record index</p>
            <span>{cases.length} available cases</span>
          </header>
          <RecordList items={cases} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
