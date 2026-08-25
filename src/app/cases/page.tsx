import Link from "next/link";

import Header from "@/components/Header";
import { getAllCases } from "@/lib/phosphoros/cases";

import styles from "./page.module.css";

function formatDate(date: string | null) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function CasesPage() {
  const cases = await getAllCases();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>PHOSPHOROS / RECORDS</p>
        <h1>THE RECORD</h1>
        <p>
          Every case available in the public record.
          <br />
          No conclusion is required.
        </p>
      </section>

      <section className={styles.records}>
        <div className={styles.header}>
          <span>CASE</span>
          <span>DATE</span>
          <span>VICTIM</span>
          <span>STATUS</span>
          <span />
        </div>

        {cases.map((item) => (
          <Link
            key={item.id}
            href={`/cases/${item.slug}`}
            className={styles.row}
          >
            <div className={styles.title}>
              <strong>{item.case_label}</strong>
              {item.location && <span>{item.location}</span>}
            </div>

            <span>{formatDate(item.incident_date ?? item.public_date)}</span>
            <span>{item.victim_status ?? "—"}</span>
            <span>{item.legal_status ?? item.suspect_status ?? "—"}</span>
            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </section>
    </main>
  );
}