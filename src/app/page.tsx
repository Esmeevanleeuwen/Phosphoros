import Link from "next/link";

import Header from "@/components/Header";
import Mark from "@/components/Mark";
import { supabase } from "@/lib/supabase";

import styles from "./page.module.css";

type FeaturedCase = {
  id: string;
  slug: string;
  case_label: string;
  person_label: string | null;
  incident_date_text: string | null;
  public_date: string | null;
  victim_status: string;
  suspect_status: string;
  legal_status: string | null;
  consequence: string | null;
};

function formatPublicDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export default async function HomePage() {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select(
      "id, slug, case_label, person_label, incident_date_text, public_date, victim_status, suspect_status, legal_status, consequence"
    )
    .eq("is_featured", true)
    .order("featured_position", { ascending: true })
    .limit(5);

  const cases = (data ?? []) as FeaturedCase[];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Header dark />

        <div className={styles.heroGrid}>
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

            <Link href="/record" className={styles.textLink}>
              Enter the record <span>→</span>
            </Link>
          </div>

          <div className={styles.heroSymbol}>
            <Mark />
          </div>
        </div>

        <p className={styles.note}>Truth is shared. Judgment is personal.</p>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.featuredIntro}>
          <p>PUBLIC RECORDS / SEXUAL VIOLENCE</p>
          <h2>Verkrachting zonder rechtvaardigheid</h2>
          <span>
            Vijf uitgelichte dossiers. Geen namen ingevuld waar het publieke
            dossier die niet geeft.
          </span>
        </div>

        <div className={styles.tableHead}>
          <span>Zaak</span>
          <span>Datum publiek</span>
          <span>Status slachtoffer</span>
          <span>Status verdachte / dader</span>
          <span />
        </div>

        <div className={styles.caseList}>
          {error ? (
            <div className={styles.emptyState}>
              Database nog niet ingericht. Voer eerst het SQL-bestand uit.
            </div>
          ) : (
            cases.map((item, index) => (
              <article className={styles.caseRow} key={item.id}>
                <div className={styles.caseName}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <div>
                    <strong>{item.case_label}</strong>
                    {item.incident_date_text && (
                      <small>Incident: {item.incident_date_text}</small>
                    )}
                  </div>
                </div>

                <time>{formatPublicDate(item.public_date)}</time>

                <p>{item.victim_status}</p>

                <p className={styles.suspectStatus}>{item.suspect_status}</p>

                <Link href={`/cases/${item.slug}`} aria-label={`Open ${item.case_label}`}>
                  →
                </Link>
              </article>
            ))
          )}
        </div>

        <div className={styles.featuredFooter}>
          <span>1–5 uitgelichte gevallen</span>
          <Link href="/cases">Bekijk alle gevallen →</Link>
        </div>
      </section>

      <section className={styles.statement}>
        <h2>
          TRUTH DOES NOT DECIDE FOR YOU.
          <br />
          IT MAKES YOUR DECISION ACCOUNTABLE.
        </h2>

        <div>
          <span>Recognise harm</span>
          <span>Locate responsibility</span>
          <span>Choose a response</span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <p>Meridian opens the question.</p>
          <p>Phosphoros opens the record.</p>
          <a href="https://perspectief-beta.vercel.app">View context in Meridian →</a>
        </div>

        <div className={styles.footerBrand}>
          <Mark />
          <strong>PHOSPHOROS</strong>
          <span>Nothing hidden. Nothing decided for you.</span>
        </div>

        <Link href="/cases">Enter Phosphoros →</Link>
      </footer>
    </main>
  );
}
