import Link from "next/link";
import styles from "./CaseRow.module.css";
import type { PhosphorosCase } from "@/lib/phosphoros/cases";

export default function CaseRow({ item }: { item: PhosphorosCase }) {
  return (
    <article className={styles.row}>
      <div className={styles.image} aria-hidden="true" />

      <div className={styles.main}>
        <h3>{item.title}</h3>
        <div className={styles.stats}>
          <div>
            <span>DATE</span>
            <strong>{item.public_date ?? "—"}</strong>
          </div>
          <div>
            <span>VICTIM</span>
            <strong>{item.victim_status ?? "—"}</strong>
          </div>
          <div>
            <span>STATUS</span>
            <strong>{item.legal_status ?? item.perpetrator_status ?? "—"}</strong>
          </div>
        </div>
      </div>

      <Link href={`/cases/${item.slug}`} className={styles.link}>
        Open record <span>→</span>
      </Link>
    </article>
  );
}
