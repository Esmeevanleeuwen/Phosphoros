import {notFound} from "next/navigation";
import Header from "@/components/Header";
import JudgmentPanel from "@/components/JudgmentPanel";
import {cases,getCaseBySlug} from "@/data/cases";
import styles from "./page.module.css";

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return cases.map(item=>({slug:item.slug}))}

export default async function CasePage({params}:Props){
  const {slug}=await params;
  const item=getCaseBySlug(slug);
  if(!item) notFound();

  return <main className={styles.page}>
    <Header dark/>
    <section className={styles.hero}>
      <p>PUBLIC RECORD</p>
      <h1>{item.title}</h1>
      <span>{item.subtitle}</span>
    </section>

    <section className={styles.statusBar}>
      {["established","disputed","missing","contradicted"].map(status=><span key={status}>{status.toUpperCase()}</span>)}
    </section>

    <section className={styles.grid}>
      <div className={styles.record}>
        <h2>THE RECORD</h2>
        {item.sources.map(source=><div className={styles.source} key={source.title}>
          <div><strong>{source.title}</strong><span>{source.meta}</span></div>
          <div className={styles.sourceRight}><small>{source.status.toUpperCase()}</small><b>{source.format}</b></div>
        </div>)}

        <h2 className={styles.sectionTitle}>CLAIMS</h2>
        {item.claims.map(claim=><article className={styles.claim} key={claim.title}>
          <span>{claim.status.toUpperCase()}</span>
          <h3>{claim.title}</h3>
          <p>{claim.body}</p>
        </article>)}

        <div className={styles.twoCol}>
          <div><h2>MISSING</h2>{item.missing.map(entry=><p key={entry}>{entry}</p>)}</div>
          <div><h2>CONTRADICTIONS</h2>{item.contradictions.map(entry=><p key={entry}>{entry}</p>)}</div>
        </div>
      </div>

      <aside className={styles.judgment}><JudgmentPanel caseSlug={item.slug}/></aside>
    </section>
  </main>
}
