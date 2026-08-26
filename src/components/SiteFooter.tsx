import Link from "next/link";

import Mark from "./Mark";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <Mark />
          <div>
            <strong>Phosphoros</strong>
            <p>Nothing hidden. Nothing decided for you.</p>
          </div>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <span>Explore</span>
          <Link href="/cases">Cases</Link>
          <Link href="/record">The record</Link>
          <Link href="/method">Method</Link>
        </nav>

        <div className={styles.next}>
          <span>Start</span>
          <Link href="/open-a-case">Open a case ↗</Link>
          <a href="https://perspectief-beta.vercel.app" target="_blank" rel="noreferrer">
            View Meridian ↗
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>Independent public record</span>
        <span>Phosphoros © 2026</span>
      </div>
    </footer>
  );
}
