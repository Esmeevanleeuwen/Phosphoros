import Link from "next/link";
import Header from "@/components/Header";
import {cases} from "@/data/cases";
import styles from "./page.module.css";

export default function RecordPage(){return <main className={styles.page}><Header/><section className={styles.hero}><p>THE RECORD</p><h1>ONE STANDARD FOR EVERY CASE.</h1><span>Sources remain separate from claims. Missing information stays visible. Contradictions are not resolved by hiding one side.</span></section><section className={styles.table}><div className={styles.head}><span>CASE</span><span>SOURCES</span><span>MISSING</span><span>OPEN</span></div>{cases.map(item=><div className={styles.row} key={item.slug}><strong>{item.title}</strong><span>{item.sources.length}</span><span>{item.missing.length}</span><Link href={`/cases/${item.slug}`}>Open →</Link></div>)}</section></main>}
