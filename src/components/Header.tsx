import Link from "next/link";
import Mark from "./Mark";
import styles from "./Header.module.css";

export default function Header({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`${styles.header} ${dark ? styles.dark : ""}`}>
      <Link href="/" className={styles.brand} aria-label="Phosphoros home">
        <Mark small />
        <span className={styles.brandCopy}>
          <strong>PHOSPHOROS</strong>
          <small>THE PUBLIC RECORD</small>
        </span>
      </Link>

      <nav className={styles.nav} aria-label="Primary navigation">
        <Link href="/cases">Cases</Link>
        <Link href="/record">Record</Link>
        <Link href="/method">Method</Link>
        <Link href="/open-a-case">Submit</Link>
      </nav>

      <Link href="/open-a-case" className={styles.action}>
        <span className={styles.lock} aria-hidden="true" />
        <span>Open a case</span>
      </Link>
    </header>
  );
}
