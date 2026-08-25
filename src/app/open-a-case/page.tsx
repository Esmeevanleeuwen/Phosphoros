"use client";

import { useState } from "react";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function OpenCasePage() {
  const [saved, setSaved] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const draft = Object.fromEntries(data.entries());

    localStorage.setItem(
      "phosphoros:case-draft",
      JSON.stringify(draft)
    );

    setSaved(true);
  }

  return (
    <main className={styles.page}>
      <Header dark />

      <section className={styles.grid}>
        <div className={styles.copy}>
          <p>OPEN A CASE</p>

          <h1>
            BEGIN WITH A QUESTION, NOT A VERDICT.
          </h1>

          <span>
            This first version saves the draft only on your device.
            No submission is sent anywhere yet.
          </span>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <label>
            Case title
            <input name="title" required />
          </label>

          <label>
            Central question
            <textarea
              name="question"
              rows={5}
              required
            />
          </label>

          <label>
            Why should this record be opened?
            <textarea
              name="reason"
              rows={6}
            />
          </label>

          <label>
            First public source
            <input
              name="source"
              placeholder="URL or document title"
            />
          </label>

          <button type="submit">
            Save case draft
          </button>

          {saved && (
            <p>Draft saved on this device.</p>
          )}
        </form>
      </section>
    </main>
  );
}