"use client";

import { useState } from "react";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

import styles from "./page.module.css";

export default function OpenCasePage() {
  const [saved, setSaved] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    localStorage.setItem("phosphoros:case-draft", JSON.stringify(Object.fromEntries(data.entries())));
    setSaved(true);
  }

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.copy}>
            <p>Phosphoros / Open a case</p>
            <h1>Begin with a question, not a verdict.</h1>
            <span>
              A case begins with a clear question and at least one public source. This version
              stores the draft only on this device; nothing is submitted yet.
            </span>
          </div>

          <aside>
            <span>Before you begin</span>
            <ol>
              <li>Describe the central question.</li>
              <li>Separate public material from assumptions.</li>
              <li>Leave room for information that is still missing.</li>
            </ol>
          </aside>
        </div>
      </section>

      <section className={styles.formSection}>
        <form onSubmit={submit} className={styles.form} onChange={() => setSaved(false)}>
          <header>
            <span>New case draft</span>
            <span>Saved locally</span>
          </header>

          <label>
            <span>01 / Case title</span>
            <input name="title" placeholder="Give the record a clear name" required />
          </label>

          <label>
            <span>02 / Central question</span>
            <textarea
              name="question"
              rows={4}
              placeholder="What needs to be established?"
              required
            />
          </label>

          <label>
            <span>03 / Reason for opening</span>
            <textarea
              name="reason"
              rows={5}
              placeholder="Why should this become a public record?"
            />
          </label>

          <label>
            <span>04 / First public source</span>
            <input name="source" placeholder="URL or document title" inputMode="url" />
          </label>

          <div className={styles.formFooter}>
            <p>Your draft remains in this browser until submission becomes available.</p>
            <button type="submit">Save case draft <span aria-hidden="true">→</span></button>
          </div>

          {saved && <p className={styles.saved} role="status">Draft saved on this device.</p>}
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
