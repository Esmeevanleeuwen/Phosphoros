import Link from "next/link";

import Header from "@/components/Header";
import RecordList from "@/components/RecordList";
import SiteFooter from "@/components/SiteFooter";
import { getFeaturedCases } from "@/lib/phosphoros/cases";
import { formatCaseDate } from "@/lib/phosphoros/format";

import styles from "./page.module.css";

const principles = [
  ["01", "Sources", "Every claim remains connected to its origin."],
  ["02", "Absence", "Missing information remains part of the record."],
  ["03", "Judgment", "The conclusion stays with the person reading."],
];

export default async function HomePage() {
  const cases = await getFeaturedCases();
  const preview = cases[0];

  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Public record / Independent judgment</p>
            <h1>
              See everything.
              <em>Decide for yourself.</em>
            </h1>

            <div className={styles.heroFooter}>
              <p>
                One public record. Every source.
                <br />
                No required conclusion.
              </p>
              <Link href="/record">
                Enter the record <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div
            className={styles.heroMedia}
            role="img"
            aria-label="A person standing behind distorted glass"
          >
            <div className={styles.imageLabel}>
              <span>Observation 01</span>
              <span>Visibility is not the same as clarity</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.thesis}>
        <div className={styles.thesisInner}>
          <span className={styles.sectionNumber}>01</span>
          <div className={styles.thesisTitle}>
            <p>THE PRINCIPLE</p>
            <h2>The same evidence for everyone.</h2>
          </div>
          <p className={styles.thesisCopy}>
            All sources are public. Contradictions remain visible and missing information is
            never quietly replaced by certainty. What is known and what is assumed stay apart.
          </p>

          <div className={styles.principles}>
            {principles.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.latest}>
        <div className={styles.latestInner}>
          <header className={styles.sectionHeader}>
            <div>
              <p>Latest public records</p>
              <h2>Verkrachting zonder rechtvaardigheid</h2>
            </div>
            <p>Vijf recente dossiers uit het beschikbare openbare overzicht.</p>
          </header>

          <RecordList items={cases} emptyMessage="Nog geen dossiers beschikbaar." />

          <div className={styles.listFooter}>
            <span>{cases.length} recente dossiers</span>
            <Link href="/cases">View all cases →</Link>
          </div>
        </div>
      </section>

      <section className={styles.methodPreview}>
        <div className={styles.methodInner}>
          <header>
            <p>THE METHOD / 03 STEPS</p>
            <Link href="/method">View full method ↗</Link>
          </header>

          <h2>Evidence should make judgment possible, not replace it.</h2>

          <div className={styles.methodSteps}>
            {principles.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {preview && (
        <section className={styles.spotlight}>
          <div className={styles.spotlightInner}>
            <aside>
              <p>Inside the record</p>
              <span>One case, shown without a prescribed verdict.</span>
            </aside>

            <article>
              <p className={styles.recordLabel}>Most recent record</p>
              <h2>{preview.title}</h2>

              <dl>
                <div>
                  <dt>Public</dt>
                  <dd>{formatCaseDate(preview.public_date)}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{preview.location ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt>Legal status</dt>
                  <dd>{preview.legal_status ?? "Open"}</dd>
                </div>
              </dl>

              <p className={styles.consequence}>
                {preview.consequence ?? "No final consequence publicly recorded."}
              </p>
              <Link href={`/cases/${preview.slug}`}>Open full record →</Link>
            </article>
          </div>
        </section>
      )}

      <section className={styles.closing}>
        <div>
          <span>Phosphoros / Judgment</span>
          <h2>
            Truth does not decide for you.
            <em>It makes your decision accountable.</em>
          </h2>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
