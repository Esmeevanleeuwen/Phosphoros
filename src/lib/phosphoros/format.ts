import type { PhosphorosCase } from "@/lib/phosphoros/cases";

export function formatCaseDate(date: string | null, long = false) {
  if (!date) return "Unknown";

  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: long ? "long" : "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function getCaseLocation(item: PhosphorosCase) {
  return item.city?.trim() || item.location?.trim() || "Location not recorded";
}

export function getCaseSummary(item: PhosphorosCase) {
  const source =
    item.known_facts?.trim() ||
    item.evidence_summary?.trim() ||
    item.legal_status?.trim() ||
    item.consequence?.trim();

  if (!source) return "No short public summary is available yet.";

  const firstSentence = source.split(/(?<=[.!?])\s+/)[0];
  return firstSentence.length > 220
    ? `${firstSentence.slice(0, 217).trimEnd()}…`
    : firstSentence;
}

function hasDescriptiveTitle(title: string) {
  return (
    title.trim().split(/\s+/).length >= 4 &&
    /convict|acquit|abuse|assault|rape|attempt|arson|robbery|theft|fraud|vandal|misbruik|seksueel|verkrach|aanrand|ontucht|poging|veroordeel|vrijspraak|brandsticht|overval|diefstal|fraude|verniel/i.test(
      title,
    )
  );
}

export function getCaseTitle(item: PhosphorosCase) {
  if (hasDescriptiveTitle(item.title)) return item.title;

  const crime = (item.crime_type || "case").toLocaleLowerCase("nl-NL");
  const place = getCaseLocation(item);

  switch (item.legal_outcome) {
    case "Veroordeeld":
      return `Conviction for ${crime} in ${place}`;
    case "Gedeeltelijk veroordeeld":
    case "Gedeeltelijk":
      return `Partial conviction in ${crime} case in ${place}`;
    case "Vrijgesproken":
      return `Acquittal in ${crime} case in ${place}`;
    case "Onderzoek loopt":
      return `Investigation into ${crime} in ${place}`;
    case "Vervolging loopt":
    case "Vervolging":
      return `Prosecution for ${crime} in ${place}`;
    case "Schuldig zonder straf":
      return `Guilty finding without punishment in ${place}`;
    case "Nog geen uitspraak":
      return `${crime} case in ${place} awaiting judgment`;
    default:
      return item.title || `Case in ${place}`;
  }
}

export function getCurrentDefendantStatus(item: PhosphorosCase) {
  const raw = item.perpetrator_status?.trim().toLocaleLowerCase("nl-NL");
  const translated: Record<string, string> = {
    accused: "Accused",
    charged: "Charged; prosecution ongoing",
    convicted: "Convicted",
    deceased: "Deceased",
    detained: "In pre-trial detention",
    investigated: "Suspect; investigation ongoing",
    suspect: "Suspect",
    acquitted: "Acquitted",
  };

  if (raw && raw !== "unknown") return translated[raw] || item.perpetrator_status;

  if (raw === "unknown" && item.legal_outcome === "Onderzoek loopt") {
    return "No identified suspect; investigation ongoing";
  }

  const fromOutcome: Record<string, string> = {
    Veroordeeld: "Convicted",
    "Gedeeltelijk veroordeeld": "Partly convicted",
    Gedeeltelijk: "Partly convicted",
    Vrijgesproken: "Acquitted",
    "Onderzoek loopt": "Suspect; investigation ongoing",
    "Vervolging loopt": "Charged; prosecution ongoing",
    Vervolging: "Charged; prosecution ongoing",
    "Nog geen uitspraak": "Case pending; no judgment yet",
    "Schuldig zonder straf": "Found guilty; no punishment imposed",
  };

  return fromOutcome[item.legal_outcome || ""] || "Not publicly established";
}
