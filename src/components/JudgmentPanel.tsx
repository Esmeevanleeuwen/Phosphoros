"use client";

import { useEffect, useState } from "react";

import styles from "./JudgmentPanel.module.css";

type Draft = {
  conclusion: string;
  evidence: string;
  change: string;
};

const emptyDraft: Draft = {
  conclusion: "",
  evidence: "",
  change: "",
};

export default function JudgmentPanel({ caseSlug }: { caseSlug: string }) {
  const storageKey = `phosphoros:judgment:${caseSlug}`;
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const existing = localStorage.getItem(storageKey);
      if (!existing) return;

      try {
        setDraft(JSON.parse(existing) as Draft);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  function update(key: keyof Draft, value: string) {
    setSaved(false);
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    setSaved(true);
  }

  return (
    <div className={styles.panel}>
      <header>
        <span>Your judgment</span>
        <span>Stored on this device</span>
      </header>

      <label>
        <span>My conclusion</span>
        <textarea
          rows={3}
          value={draft.conclusion}
          onChange={(event) => update("conclusion", event.target.value)}
        />
      </label>

      <label>
        <span>Evidence I used</span>
        <textarea
          rows={3}
          value={draft.evidence}
          onChange={(event) => update("evidence", event.target.value)}
        />
      </label>

      <label>
        <span>What would change my mind</span>
        <textarea
          rows={3}
          value={draft.change}
          onChange={(event) => update("change", event.target.value)}
        />
      </label>

      <button type="button" onClick={save}>
        Save judgment <span aria-hidden="true">→</span>
      </button>
      {saved && <p role="status">Saved on this device.</p>}
    </div>
  );
}
