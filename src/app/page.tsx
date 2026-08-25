import Link from "next/link";

import Header from "@/components/Header";
import Mark from "@/components/Mark";
import JudgmentPanel from "@/components/JudgmentPanel";
import { getFeaturedCases } from "@/lib/phosphoros/cases";

import styles from "./page.module.css";

export default async function HomePage() {
  const cases = await getFeaturedCases(5);
  const preview = cases[0];

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Header dark />

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>
              SEE EVERYTHING.
              <br />
              DECIDE FOR YOURSELF.
            </h1>

            <p>
              One public record. Every source.
              <br />
              No required conclusion.
            </p>

            <Link href="/record" className={styles.heroLink}>
              Enter the record
              <span>→</span>
            </Link>
          </div>

          <div className={styles.heroSymbol}>
            <Mark />
          </div>
        </div>

        <p className={styles.heroNote}>
          Truth is shared. Judgment is personal.
        </p>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.transitionMark}>
          <Mark />
        </div>

        <div className={styles.introInner}>
          <h2>
            THE SAME EVIDENCE
            <br />
            FOR EVERYONE.
          </h2>

          <p>
            All sources are public. Missing information stays visible.
            <br />
            Contradictions remain on display.
            <br />
            You see the record exactly as it is.
          </p>
        </div>
      </section>

      {/* CASES */}
      <section className={styles.cases}>
        {cases.map((item) => {
          const missingCount =
            item.missing.length +
            item.sources.filter(
              (source) => source.status === "missing"
            ).length;

          return (
            <article
              className={styles.caseRow}
              key={item.slug}
            >
              <div
                className={styles.caseImage}
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              />

              <div className={styles.caseContent}>
                <h3>{item.title}</h3>

                <div className={styles.caseStats}>
                  <div>
                    <span>SOURCES</span>
                    <strong>
                      {item.sources.length}
                    </strong>
                  </div>

                  <div>
                    <span>MISSING</span>
                    <strong className={styles.missing}>
                      {missingCount}
                    </strong>
                  </div>

                  <div>
                    <span>JUDGMENTS</span>
                    <strong>0</strong>
                  </div>
                </div>
              </div>

              <Link
                href={`/cases/${item.slug}`}
                className={styles.caseLink}
              >
                Open record
                <span>→</span>
              </Link>
            </article>
          );
        })}
      </section>

      {/* RECORD PREVIEW */}
      <section className={styles.recordShell}>
        <div className={styles.recordTop}>
          <div className={styles.recordBrand}>
            <Mark small />
            <span>PHOSPHOROS</span>
          </div>

          <div className={styles.recordStates}>
            <span>ESTABLISHED</span>
            <span>DISPUTED</span>
            <span>MISSING</span>
            <span>CONTRADICTED</span>
          </div>
        </div>

        <div className={styles.recordGrid}>
          <div className={styles.recordSources}>
            <h3>THE RECORD</h3>

            {preview.sources.map((source) => (
              <div
                className={styles.sourceRow}
                key={source.title}
              >
                <div className={styles.sourceIcon} />

                <div className={styles.sourceCopy}>
                  <strong>{source.title}</strong>
                  <span>{source.meta}</span>
                </div>

                <small>{source.format}</small>
              </div>
            ))}

            <Link
              href={`/cases/${preview.slug}`}
              className={styles.sourcesLink}
            >
              View all sources
              <span>→</span>
            </Link>
          </div>

          <div className={styles.judgment}>
            <JudgmentPanel
              caseSlug={preview.slug}
            />
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className={styles.statement}>
        <h2>
          TRUTH DOES NOT DECIDE FOR YOU.
          <br />
          IT MAKES YOUR DECISION ACCOUNTABLE.
        </h2>

        <div className={styles.statementSteps}>
          <span>Recognise harm</span>
          <span>Locate responsibility</span>
          <span>Choose a response</span>
        </div>
      </section>

      {/* MERIDIAN BRIDGE */}
      <section className={styles.bridge}>
        <p>
          Meridian opens the question.
          <br />
          Phosphoros opens the record.
        </p>

        <a
          href="https://perspectief-beta.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          View context in Meridian
          <span>→</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <Mark />

        <h2>PHOSPHOROS</h2>

        <p>
          Nothing hidden. Nothing decided for you.
        </p>

        <Link href="/cases">
          Enter Phosphoros
        </Link>
      </footer>
    </main>
  );
}