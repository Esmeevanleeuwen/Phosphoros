"use client";
import {useEffect,useState} from "react";
import styles from "./JudgmentPanel.module.css";
type Draft={conclusion:string;evidence:string;change:string};
const emptyDraft:Draft={conclusion:"",evidence:"",change:""};

export default function JudgmentPanel({caseSlug}:{caseSlug:string}) {
  const storageKey=`phosphoros:judgment:${caseSlug}`;
  const [draft,setDraft]=useState<Draft>(emptyDraft);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{const existing=localStorage.getItem(storageKey);if(existing){try{setDraft(JSON.parse(existing))}catch{}}},[storageKey]);

  function update(key:keyof Draft,value:string){setSaved(false);setDraft(current=>({...current,[key]:value}))}
  function save(){localStorage.setItem(storageKey,JSON.stringify(draft));setSaved(true)}

  return <div className={styles.panel}>
    <h3>YOUR JUDGMENT</h3>
    <label>My conclusion<textarea value={draft.conclusion} onChange={e=>update("conclusion",e.target.value)}/></label>
    <label>Evidence I used<textarea value={draft.evidence} onChange={e=>update("evidence",e.target.value)}/></label>
    <label>What would change my mind<textarea value={draft.change} onChange={e=>update("change",e.target.value)}/></label>
    <button onClick={save}>Save judgment locally</button>
    {saved&&<p>Saved on this device.</p>}
  </div>
}
