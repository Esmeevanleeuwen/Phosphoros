"use client";

import Link from "next/link";
import { useState } from "react";

import Mark from "./Mark";
import styles from "./Header.module.css";

const navigation = [
  { href: "/cases", label: "Cases" },
  { href: "/record", label: "Record" },
  { href: "/method", label: "Method" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={closeMenu}>
          <Mark small />
          <span>Phosphoros</span>
        </Link>

        <nav className={styles.navigation} aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/open-a-case" className={styles.action}>
          Open a case <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`${styles.mobileNavigation} ${menuOpen ? styles.open : ""}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item, index) => (
          <Link key={item.href} href={item.href} onClick={closeMenu}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
        <Link href="/open-a-case" onClick={closeMenu}>
          <span>04</span>
          Open a case
        </Link>
      </nav>
    </header>
  );
}
