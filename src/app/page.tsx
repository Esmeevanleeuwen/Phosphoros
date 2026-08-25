import Link from "next/link";

import Header from "@/components/Header";
import Mark from "@/components/Mark";
import { supabase } from "@/lib/supabase";

import styles from "./page.module.css";

type FeaturedCase = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  incident_date: string | null;
  public_date: string | null;
  victim_status: string | null;
  perpetrator_status: string | null;
  legal_status: string | null;
  consequence: string | null;
};

function formatPublicDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

export default async function HomePage() {
  const { data, error } = await supabase.from("phosphoros_cases").select("id, slug, title, location, incident_date, public_date, victim_status, perpetrator_status, legal_status, consequence").order("public_date", { ascending: false, nullsFirst: false }).limit(5);
  const cases = (data ?? []) as FeaturedCase[];
  const preview = cases[0];

  return <main className={styles.page}>
    <section className={styles.hero}>
      <Header />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1>SEE EVERYTHING.<br />DECIDE FOR<br />YOURSELF.</h1>
          <p>One public record. Every source.<br />No required conclusion.</p>
          <Link href="/record" className={styles.heroLink}>Enter the record <span>→</span></Link>
        </div>
        <div className={styles.heroImageWrap}>
          <img src="/glass-person.png" alt="Blurred figure behind frosted glass" className={styles.heroImage} />
        </div>
      </div>
      <div className={styles.heroMeta}><span className={styles.heroBadge}>N</span><p>Truth is shared. Judgment is personal.</p></div>
    </section>

    <section className={styles.intro}><div className={styles.transitionMark}><Mark /></div><div className={styles.introInner}><h2>THE SAME EVIDENCE<br />FOR EVERYONE.</h2><p>All sources are public. Missing information stays visible.<br />Contradictions remain on display.<br />You see the record exactly as it is.</p></div></section>

    <section className={styles.cases}>
      <div className={styles.featuredIntro}><p>PUBLIC RECORDS / SEXUAL VIOLENCE</p><h2>Verkrachting zonder rechtvaardigheid</h2><span>Vijf recente dossiers uit het beschikbare openbare overzicht.</span></div>
      <div className={styles.tableHead}><span>Zaak</span><span>Datum publiek</span><span>Status slachtoffer</span><span>Status verdachte / dader</span><span /></div>
      {error ? <div className={styles.emptyState}>De dossiers konden niet uit de database worden geladen.</div> : cases.length === 0 ? <div className={styles.emptyState}>Nog geen dossiers beschikbaar.</div> : cases.map((item, index) => <article className={styles.caseRow} key={item.id}><div className={styles.caseName}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{item.title}</strong>{item.location && <small>{item.location}</small>}{item.incident_date && <small>Incident: {formatPublicDate(item.incident_date)}</small>}</div></div><time>{formatPublicDate(item.public_date)}</time><p>{item.victim_status ?? "Unknown"}</p><p className={styles.suspectStatus}>{item.perpetrator_status ?? "Unknown"}</p><Link href={`/cases/${item.slug}`} className={styles.caseLink}>Open record <span>→</span></Link></article>)}
      <div className={styles.featuredFooter}><span>5 meest recente gevallen</span><Link href="/cases">Bekijk alle gevallen →</Link></div>
    </section>

    {preview && <section className={styles.recordShell}><div className={styles.recordTop}><div className={styles.recordBrand}><Mark small /><span>PHOSPHOROS</span></div><div className={styles.recordStates}><span>PUBLIC</span><span>KNOWN</span><span>UNKNOWN</span><span>OPEN</span></div></div><div className={styles.recordGrid}><div className={styles.recordSources}><h3>THE RECORD</h3><div className={styles.sourceRow}><div className={styles.sourceIcon} /><div className={styles.sourceCopy}><strong>{preview.title}</strong><span>{preview.location ?? "Public case record"}</span></div><small>{preview.legal_status ?? "OPEN"}</small></div><div className={styles.sourceRow}><div className={styles.sourceIcon} /><div className={styles.sourceCopy}><strong>Public date</strong><span>{formatPublicDate(preview.public_date)}</span></div><small>PUBLIC</small></div><div className={styles.sourceRow}><div className={styles.sourceIcon} /><div className={styles.sourceCopy}><strong>Consequence</strong><span>{preview.consequence ?? "No final consequence publicly recorded"}</span></div><small>STATUS</small></div><Link href={`/cases/${preview.slug}`} className={styles.sourcesLink}>Open full record <span>→</span></Link></div><div className={styles.judgment}><span>PUBLIC RECORD</span><h3>{preview.title}</h3><p>{preview.legal_status ?? "Legal status not yet publicly recorded."}</p><Link href={`/cases/${preview.slug}`}>View case →</Link></div></div></section>}

    <section className={styles.statement}><h2>TRUTH DOES NOT DECIDE FOR YOU.<br />IT MAKES YOUR DECISION ACCOUNTABLE.</h2><div className={styles.statementSteps}><span>Recognise harm</span><span>Locate responsibility</span><span>Choose a response</span></div></section>
    <section className={styles.bridge}><p>Meridian opens the question.<br />Phosphoros opens the record.</p><a href="https://perspectief-beta.vercel.app" target="_blank" rel="noreferrer">View context in Meridian <span>→</span></a></section>
    <footer className={styles.footer}><Mark /><h2>PHOSPHOROS</h2><p>Nothing hidden. Nothing decided for you.</p><Link href="/cases">Enter Phosphoros</Link></footer>
  </main>;
}
