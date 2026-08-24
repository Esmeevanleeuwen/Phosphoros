import Link from "next/link";
import Mark from "./Mark";
import styles from "./Header.module.css";

export default function Header({dark=false}:{dark?:boolean}) {
  return <header className={`${styles.header} ${dark?styles.dark:""}`}>
    <Link href="/" className={styles.brand}><Mark small/><span>PHOSPHOROS</span></Link>
    <nav className={styles.nav}>
      <Link href="/cases">Cases</Link><Link href="/record">Record</Link><Link href="/method">Method</Link>
      <Link href="/open-a-case" className={styles.cta}>Open a case</Link>
    </nav>
  </header>;
}
