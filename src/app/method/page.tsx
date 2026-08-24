import Header from "@/components/Header";
import styles from "./page.module.css";

const steps=[
["01","SEPARATE","Keep sources, claims and judgments distinct."],
["02","LABEL","Mark what is established, disputed, missing or contradicted."],
["03","SHOW ABSENCE","Missing information is part of the record."],
["04","PRESERVE CONFLICT","Contradictions remain visible until evidence resolves them."],
["05","JUDGE","The reader records a conclusion and the evidence used."],
["06","REVISE","A judgment is accountable only if it can change."]
];

export default function MethodPage(){return <main className={styles.page}><Header dark/><section className={styles.hero}><p>METHOD</p><h1>DO NOT ASK THE RECORD TO THINK FOR YOU.</h1><span>Phosphoros structures evidence so that judgment remains personal, visible and revisable.</span></section><section className={styles.steps}>{steps.map(([number,title,body])=><article key={number}><span>{number}</span><h2>{title}</h2><p>{body}</p></article>)}</section></main>}
