import Header from "@/components/Header";
import CaseRow from "@/components/CaseRow";
import {cases} from "@/data/cases";
import styles from "./page.module.css";

export default function CasesPage(){return <main className={styles.page}><Header/><section className={styles.hero}><p>PUBLIC RECORDS</p><h1>CASES</h1><span>Each case separates what is established, disputed, missing and contradicted.</span></section><section className={styles.list}>{cases.map(item=><CaseRow key={item.slug} item={item}/>)}</section></main>}
