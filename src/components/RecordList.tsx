import type { PhosphorosCase } from "@/lib/phosphoros/cases";

import CaseRow from "./CaseRow";
import styles from "./RecordList.module.css";

type RecordListProps = {
  items: PhosphorosCase[];
  emptyMessage?: string;
};

export default function RecordList({ items, emptyMessage = "No public records available." }: RecordListProps) {
  return (
    <div className={styles.list}>
      <div className={styles.labels} aria-hidden="true">
        <span>Case</span>
        <div>
          <span>Public date</span>
          <span>Court</span>
          <span>Status</span>
        </div>
        <span>Open</span>
      </div>

      {items.map((item, index) => (
        <CaseRow key={item.id} item={item} index={index} />
      ))}

      {items.length === 0 && <p className={styles.empty}>{emptyMessage}</p>}
    </div>
  );
}
