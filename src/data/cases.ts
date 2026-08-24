export type Status="established"|"disputed"|"missing"|"contradicted";
export type Source={title:string;meta:string;format:string;status:Status};
export type Claim={title:string;body:string;status:Status};
export type CaseItem={slug:string;title:string;subtitle:string;image:string;sources:Source[];claims:Claim[];missing:string[];contradictions:string[]};

export const cases:CaseItem[]=[
{slug:"when-does-protection-become-control",title:"WHEN DOES PROTECTION BECOME CONTROL?",subtitle:"Protection can reduce harm. It can also change who is allowed to decide.",image:"/images/protection.svg",sources:[
{title:"Official report",meta:"Government document · 2023",format:"DOC",status:"established"},
{title:"Court filing",meta:"Judicial document · 2023",format:"DOC",status:"established"},
{title:"Independent investigation",meta:"NGO report · 2023",format:"PDF",status:"disputed"},
{title:"Witness statement",meta:"Recorded · 2023",format:"TXT",status:"established"},
{title:"Financial disclosure",meta:"Public record · 2022",format:"XLS",status:"contradicted"}],
claims:[
{title:"The intervention reduced immediate risk.",body:"Supported by the public record, but the long-term effect remains disputed.",status:"established"},
{title:"The people affected had meaningful consent.",body:"The record does not establish this clearly.",status:"missing"},
{title:"The decision-makers had no conflict of interest.",body:"Two records point in different directions.",status:"contradicted"}],
missing:["Complete decision log before intervention","Independent account from all affected parties","Full financial disclosures for the relevant period"],
contradictions:["Official chronology differs from witness chronology","Public justification conflicts with an internal memo"]},
{slug:"can-power-investigate-itself",title:"CAN POWER INVESTIGATE ITSELF?",subtitle:"The question is not only whether an investigation exists, but who defines its limits.",image:"/images/power.svg",sources:[
{title:"Internal review",meta:"Institutional document · 2024",format:"PDF",status:"established"},
{title:"Oversight letter",meta:"Public correspondence · 2024",format:"DOC",status:"disputed"},
{title:"Independent audit",meta:"External review · 2024",format:"PDF",status:"established"}],
claims:[{title:"The investigation was independent.",body:"Independence is asserted, while appointment and scope remained internal.",status:"disputed"},{title:"All relevant evidence was available.",body:"Several requested records were not included.",status:"missing"}],
missing:["Selection criteria for investigators","Records excluded from the final review"],contradictions:["Public statement describes broader scope than the published mandate"]},
{slug:"who-carries-the-cost",title:"WHO CARRIES THE COST?",subtitle:"A decision can create value in one place and move its cost somewhere else.",image:"/images/cost.svg",sources:[
{title:"Budget report",meta:"Public finance · 2025",format:"XLS",status:"established"},
{title:"Impact assessment",meta:"Policy analysis · 2025",format:"PDF",status:"disputed"},
{title:"Community testimony",meta:"Public hearing · 2025",format:"TXT",status:"established"}],
claims:[{title:"The policy produced net public benefit.",body:"Aggregate benefit is reported, but distribution of cost is uneven.",status:"disputed"},{title:"Affected groups were compensated.",body:"No complete record of compensation is available.",status:"missing"}],
missing:["Distributional data by affected group","Long-term cost after the reporting period"],contradictions:["Aggregate savings rise while local costs increase"]}
];

export function getCaseBySlug(slug:string){return cases.find(item=>item.slug===slug)}
