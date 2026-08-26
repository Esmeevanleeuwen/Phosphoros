import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import JudgmentPanel from "@/components/JudgmentPanel";
import SiteFooter from "@/components/SiteFooter";
import { getCaseBySlug } from "@/lib/phosphoros/cases";
import { formatCaseDate } from "@/lib/phosphoros/format";

import styles from "./page.module.css";

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) notFound();

  const facts = [
    item.known_facts && ["Known facts", item.known_facts],
    item.evidence_summary && ["Evidence", item.evidence_summary],
    item.unknowns && ["What remains unknown", item.unknowns],
    item.ecli && ["Court record", item.ecli],
  ].filter(Boolean) as string[][];

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/cases" className={styles.back}>← All cases</Link>
          <p>Phosphoros / Case record</p>
          <h1>{item.title}</h1>
          <span>{item.location ?? "Location not recorded"}</span>
        </div>
      </section>

      <section className={styles.statusSection}>
        <dl className={styles.statusGrid}>
          <div><dt>Incident</dt><dd>{formatCaseDate(item.incident_date, true)}</dd></div>
          <div><dt>Public record</dt><dd>{formatCaseDate(item.public_date, true)}</dd></div>
          <div><dt>Victim status</dt><dd>{item.victim_status ?? "Unknown"}</dd></div>
          <div><dt>Perpetrator status</dt><dd>{item.perpetrator_status ?? "Unknown"}</dd></div>
          <div><dt>Legal status</dt><dd>{item.legal_status ?? "Unknown"}</dd></div>
          <div><dt>Consequence</dt><dd>{item.consequence ?? "Unknown"}</dd></div>
        </dl>
      </section>

      <section className={styles.record}>
        <div className={styles.recordInner}>
          <aside>
            <p>The record</p>
            <span>{facts.length} available sections</span>
          </aside>

          <div className={styles.facts}>
            {facts.map(([label, body], index) => (
              <article key={label}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{label}</h2>
                </header>
                <p>{body}</p>
              </article>
            ))}

            {facts.length === 0 && <p className={styles.empty}>No case details are public yet.</p>}
          </div>
        </div>
      </section>

      <section className={styles.judgment}>
        <div className={styles.judgmentInner}>
          <div className={styles.judgmentCopy}>
            <p>Your conclusion</p>
            <h2>Make the evidence behind your judgment visible.</h2>
            <span>Your notes stay on this device and can be revised later.</span>
          </div>
          <JudgmentPanel caseSlug={item.slug} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
