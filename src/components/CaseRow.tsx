import Link from "next/link";

import type { PhosphorosCase } from "@/lib/phosphoros/cases";
import {
  formatCaseDate,
  getCaseLocation,
  getCaseSummary,
  getCaseTitle,
  getCurrentDefendantStatus,
} from "@/lib/phosphoros/format";

import styles from "./CaseRow.module.css";

type CaseRowProps = {
  item: PhosphorosCase;
  index: number;
};

export default function CaseRow({ item, index }: CaseRowProps) {
  const title = getCaseTitle(item);

  return (
    <article className={styles.row}>
      <div className={styles.identity}>
        <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
        <div>
          <div className={styles.tags}>
            {item.crime_type && <span>{item.crime_type}</span>}
            {item.legal_outcome && <span>{item.legal_outcome}</span>}
          </div>
          <h3>{title}</h3>
          <p className={styles.summary}>{getCaseSummary(item)}</p>
          <p className={styles.location}>{getCaseLocation(item)}</p>
        </div>
      </div>

      <dl className={styles.metadata}>
        <div>
          <dt>Public record</dt>
          <dd>{formatCaseDate(item.public_date)}</dd>
        </div>
        <div>
          <dt>Court level</dt>
          <dd>{item.court_level ?? "Unknown"}</dd>
        </div>
        <div>
          <dt>Current status</dt>
          <dd className={styles.currentStatus}>{getCurrentDefendantStatus(item)}</dd>
        </div>
      </dl>

      <Link href={`/cases/${item.slug}`} className={styles.link} aria-label={`Open ${title}`}>
        <span>Open record</span>
        <b aria-hidden="true">→</b>
      </Link>
    </article>
  );
}
