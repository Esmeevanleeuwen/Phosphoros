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

  if (!item) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Link
          href="/cases"
          className={styles.back}
        >
          ← All records
        </Link>

        <p className={styles.eyebrow}>
          PHOSPHOROS / CASE RECORD
        </p>

        <h1>{item.title}</h1>

        {item.location && (
          <p className={styles.location}>
            {item.location}
          </p>
        )}
      </section>

      <section className={styles.statusGrid}>
        <div>
          <span>INCIDENT</span>
          <strong>
            {formatDate(item.incident_date)}
          </strong>
        </div>

        <div>
          <span>PUBLIC RECORD</span>
          <strong>
            {formatDate(item.public_date)}
          </strong>
        </div>

        <div>
          <span>VICTIM STATUS</span>
          <strong>
            {item.victim_status}
          </strong>
        </div>

        <div>
          <span>PERPETRATOR STATUS</span>
          <strong>
            {item.perpetrator_status}
          </strong>
        </div>

        <div>
          <span>LEGAL STATUS</span>
          <strong>
            {item.legal_status}
          </strong>
        </div>

        <div>
          <span>CONSEQUENCE</span>
          <strong>
            {item.consequence ?? "Unknown"}
          </strong>
        </div>
      </section>

      <section className={styles.content}>
        {item.known_facts && (
          <article>
            <span>KNOWN FACTS</span>

            <p>
              {item.known_facts}
            </p>
          </article>
        )}

        {item.evidence_summary && (
          <article>
            <span>EVIDENCE</span>

            <p>
              {item.evidence_summary}
            </p>
          </article>
        )}

        {item.unknowns && (
          <article className={styles.unknown}>
            <span>WHAT REMAINS UNKNOWN</span>

            <p>
              {item.unknowns}
            </p>
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