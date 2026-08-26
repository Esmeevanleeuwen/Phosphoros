import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import SiteFooter from "@/components/SiteFooter";

import styles from "./page.module.css";

const steps = [
  ["01", "Separate", "Keep sources, claims and judgments distinct."],
  ["02", "Label", "Mark what is established, disputed, missing or contradicted."],
  ["03", "Show absence", "Missing information is part of the record."],
  ["04", "Preserve conflict", "Contradictions remain visible until evidence resolves them."],
  ["05", "Judge", "The reader records a conclusion and the evidence used."],
  ["06", "Revise", "A judgment is accountable only if it can change."],
];

export default function MethodPage() {
  return (
    <main className={styles.page}>
      <Header />

      <PageIntro eyebrow="Phosphoros / Method" title="Read first. Judge second.">
        <p>
          Phosphoros structures evidence so judgment remains personal, visible and revisable.
          The record supports a decision without making it on the reader&apos;s behalf.
        </p>
      </PageIntro>

      <section className={styles.process}>
        <div className={styles.processInner}>
          <header>
            <p>Six fixed steps</p>
            <span>The order matters.</span>
          </header>

          <div className={styles.steps}>
            {steps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.statement}>
        <div>
          <p>THE LIMIT</p>
          <h2>The record can show what is there. It cannot remove responsibility from you.</h2>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
