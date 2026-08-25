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

export default async function RecordPage() {
  const cases = await getAllCases();

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <p>THE RECORD</p>
        <h1>ONE STANDARD FOR EVERY CASE.</h1>
        <span>
          Sources remain separate from claims. Missing information stays visible.
          Contradictions are not resolved by hiding one side.
        </span>
      </section>

      <section className={styles.table}>
        <div className={styles.head}>
          <span>CASE</span>
          <span>DATE</span>
          <span>VICTIM</span>
          <span>STATUS</span>
          <span>OPEN</span>
        </div>

        {cases.map((item) => (
          <div className={styles.row} key={item.id}>
            <div className={styles.case}>
              <strong>{item.title}</strong>
              {item.location && <small>{item.location}</small>}
            </div>

            <span>{formatDate(item.incident_date ?? item.public_date)}</span>
            <span>{item.victim_status ?? "—"}</span>
            <span>{item.legal_status ?? item.perpetrator_status ?? "—"}</span>

            <Link href={`/cases/${item.slug}`}>Open →</Link>
          </div>
        ))}

        {cases.length === 0 && (
          <div className={styles.empty}>No public records available.</div>
        )}
      </section>
    </main>
  );
}
