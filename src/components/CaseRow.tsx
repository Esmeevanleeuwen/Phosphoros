import Link from "next/link";
import type { CaseItem } from "@/data/cases";
import styles from "./CaseRow.module.css";

export default function CaseRow({item}:{item:CaseItem}) {
  const missingCount=item.sources.filter(s=>s.status==="missing").length+item.missing.length;
  return <article className={styles.row}>
    <div className={styles.image} style={{backgroundImage:`url(${item.image})`}}/>
    <div className={styles.main}>
      <h3>{item.title}</h3>
      <div className={styles.stats}>
        <div><span>SOURCES</span><strong>{item.sources.length}</strong></div>
        <div><span>MISSING</span><strong className={styles.missing}>{missingCount}</strong></div>
        <div><span>JUDGMENTS</span><strong>0</strong></div>
      </div>
    </div>
    <Link href={`/cases/${item.slug}`} className={styles.link}>Open record <span>→</span></Link>
  </article>
}
