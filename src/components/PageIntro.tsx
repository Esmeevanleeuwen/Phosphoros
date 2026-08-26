import type { ReactNode } from "react";

import styles from "./PageIntro.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export default function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p>{eyebrow}</p>
          <h1>{title}</h1>
        </div>

        <div className={styles.copy}>{children}</div>
      </div>
    </section>
  );
}
