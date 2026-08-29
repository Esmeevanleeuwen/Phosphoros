import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import JudgmentPanel from "@/components/JudgmentPanel";
import SiteFooter from "@/components/SiteFooter";
import { getCaseBySlug } from "@/lib/phosphoros/cases";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  formatCaseDate,
  getCaseLocation,
  getCaseSummary,
  getCaseTitle,
  getCurrentDefendantStatus,
} from "@/lib/phosphoros/format";

import styles from "./page.module.css";

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) {
    return {
      title: "Dossier niet gevonden",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = getCaseTitle(item);
  const description = getCaseSummary(item);
  const url = `${SITE_URL}/cases/${item.slug}`;
  const publishedTime = item.public_date
    ? `${item.public_date}T12:00:00.000Z`
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "nl_NL",
      url,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime,
      modifiedTime: publishedTime,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) notFound();

  const title = getCaseTitle(item);
  const currentStatus = getCurrentDefendantStatus(item);
  const summary = getCaseSummary(item);
  const canonicalUrl = `${SITE_URL}/cases/${item.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    inLanguage: "nl-NL",
    datePublished: item.public_date || undefined,
    dateModified: item.public_date || undefined,
    mainEntityOfPage: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [item.crime_type, item.legal_outcome].filter(Boolean),
    contentLocation: item.city
      ? {
          "@type": "Place",
          name: item.city,
        }
      : undefined,
  };

  const facts = [
    item.known_facts && ["Known facts", item.known_facts],
    item.evidence_summary && ["Evidence summary", item.evidence_summary],
    item.consequence && ["Consequence or sentence", item.consequence],
    item.unknowns && ["What remains unknown", item.unknowns],
    item.ecli && ["Court record", item.ecli],
  ].filter(Boolean) as string[][];

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/cases" className={styles.back}>← All cases</Link>
          <p>Phosphoros / Case record</p>
          <h1>{title}</h1>
          <p className={styles.heroSummary}>{getCaseSummary(item)}</p>
          <span>{getCaseLocation(item)}</span>
        </div>
      </section>

      <section className={styles.statusSection}>
        <div className={styles.statusInner}>
          <article className={styles.currentStatus}>
            <header>
              <span>Status of the suspect / accused</span>
              <span>Current legal position</span>
            </header>

            <div className={styles.statusBody}>
              <div className={styles.statusHeading}>
                <span aria-hidden="true" />
                <div>
                  <p>Current status</p>
                  <h2>{currentStatus}</h2>
                </div>
              </div>

              <dl className={styles.statusMeta}>
                <div>
                  <dt>Legal outcome</dt>
                  <dd>{item.legal_outcome ?? "Unknown"}</dd>
                </div>
                <div>
                  <dt>Stage of proceedings</dt>
                  <dd>{item.court_level ?? "Unknown"}</dd>
                </div>
              </dl>

              <div className={styles.legalMeaning}>
                <p>What this means legally</p>
                <span>{item.legal_status ?? "No further legal status is publicly recorded."}</span>
              </div>
            </div>
          </article>

          <dl className={styles.statusGrid}>
            <div><dt>Incident</dt><dd>{formatCaseDate(item.incident_date, true)}</dd></div>
            <div><dt>Public record</dt><dd>{formatCaseDate(item.public_date, true)}</dd></div>
            <div><dt>City / region</dt><dd>{getCaseLocation(item)}</dd></div>
            <div><dt>Type of crime</dt><dd>{item.crime_type ?? "Unknown"}</dd></div>
            <div><dt>Victim status</dt><dd>{item.victim_status ?? "Unknown"}</dd></div>
            <div><dt>Source level</dt><dd>{item.source_level ?? "Unknown"}</dd></div>
          </dl>
        </div>
      </section>

      <section className={styles.record}>
        <div className={styles.recordInner}>
          <aside>
            <p>The record</p>
            <span>{facts.length} available sections</span>
          </aside>

          <div className={styles.facts}>
            {facts.map(([label, body], index) => (
              <article key={label}>
                <header>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{label}</h2>
                </header>
                <p>{body}</p>
              </article>
            ))}

            {facts.length === 0 && <p className={styles.empty}>No case details are public yet.</p>}
          </div>
        </div>
      </section>

      <section className={styles.judgment}>
        <div className={styles.judgmentInner}>
          <div className={styles.judgmentCopy}>
            <p>Your conclusion</p>
            <h2>Make the evidence behind your judgment visible.</h2>
            <span>Your notes stay on this device and can be revised later.</span>
          </div>
          <JudgmentPanel caseSlug={item.slug} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
