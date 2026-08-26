import Link from "next/link";

import type { PhosphorosCase } from "@/lib/phosphoros/cases";
import { formatCaseDate } from "@/lib/phosphoros/format";

import styles from "./CaseRow.module.css";

type CaseRowProps = {
  item: PhosphorosCase;
  index: number;
};

export default function CaseRow({ item, index }: CaseRowProps) {
  return (
    <article className={styles.row}>
      <div className={styles.identity}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>{item.title}</h3>
          <p>{item.location ?? "Location not recorded"}</p>
        </div>
      </div>

      <dl className={styles.metadata}>
        <div>
          <dt>Date</dt>
          <dd>{formatCaseDate(item.incident_date ?? item.public_date)}</dd>
        </div>
        <div>
          <dt>Victim</dt>
          <dd>{item.victim_status ?? "Unknown"}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{item.legal_status ?? item.perpetrator_status ?? "Unknown"}</dd>
        </div>
      </dl>

      <Link href={`/cases/${item.slug}`} className={styles.link} aria-label={`Open ${item.title}`}>
        <span>Open record</span>
        <b aria-hidden="true">→</b>
      </Link>
    </article>
  );
}
