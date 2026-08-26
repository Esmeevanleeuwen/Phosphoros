"use client";

import Link from "next/link";
import { useState } from "react";

import Mark from "./Mark";
import styles from "./Header.module.css";

export default function Header({ dark = false }: { dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} ${dark ? styles.dark : ""}`}>
      <Link href="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
        <Mark small />
        <span>PHOSPHOROS</span>
      </Link>

      <nav className={styles.nav} aria-label="Primary navigation">
        <Link href="/cases">Cases</Link>
        <Link href="/record">Record</Link>
        <Link href="/method">Method</Link>
        <Link href="/open-a-case" className={styles.cta}>
          Open a case
        </Link>
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <Link href="/cases" onClick={() => setMenuOpen(false)}>
          <span>01</span> Cases
        </Link>
        <Link href="/record" onClick={() => setMenuOpen(false)}>
          <span>02</span> Record
        </Link>
        <Link href="/method" onClick={() => setMenuOpen(false)}>
          <span>03</span> Method
        </Link>
        <Link href="/open-a-case" onClick={() => setMenuOpen(false)}>
          <span>04</span> Open a case
        </Link>
      </nav>
    </header>
  );
}
