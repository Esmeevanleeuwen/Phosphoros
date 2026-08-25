import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import { getCaseBySlug } from "@/lib/phosphoros/cases";

import styles from "./page.module.css";

function formatDate(date: string | null) {
  if (!date) return "Unknown";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) notFound();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Link href="/cases" className={styles.back}>
          ← All records
        </Link>

        <p className={styles.eyebrow}>PHOSPHOROS / CASE RECORD</p>
        <h1>{item.case_label}</h1>

        {item.location && <p className={styles.location}>{item.location}</p>}
      </section>

      <section className={styles.statusGrid}>
        <div>
          <span>INCIDENT</span>
          <strong>{formatDate(item.incident_date)}</strong>
        </div>
        <div>
          <span>PUBLIC RECORD</span>
          <strong>{formatDate(item.public_date)}</strong>
        </div>
        <div>
          <span>VICTIM STATUS</span>
          <strong>{item.victim_status ?? "Unknown"}</strong>
        </div>
        <div>
          <span>PERPETRATOR STATUS</span>
          <strong>{item.suspect_status ?? "Unknown"}</strong>
        </div>
        <div>
          <span>LEGAL STATUS</span>
          <strong>{item.legal_status ?? "Unknown"}</strong>
        </div>
        <div>
          <span>CONSEQUENCE</span>
          <strong>{item.consequence ?? "Unknown"}</strong>
        </div>
      </section>

      <section className={styles.content}>
        {item.summary && (
          <article>
            <span>KNOWN FACTS</span>
            <p>{item.summary}</p>
          </article>
        )}

        {item.evidence_notes && (
          <article>
            <span>EVIDENCE</span>
            <p>{item.evidence_notes}</p>
          </article>
        )}

        {item.unknowns && (
          <article className={styles.unknown}>
            <span>WHAT REMAINS UNKNOWN</span>
            <p>{item.unknowns}</p>
          </article>
        )}

        {item.ecli && (
          <article>
            <span>COURT RECORD</span>
            <p>{item.ecli}</p>
          </article>
        )}
      </section>
    </main>
  );
}