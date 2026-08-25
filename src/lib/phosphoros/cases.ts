import { supabase } from "@/lib/supabase";

export type PhosphorosCase = {
  id: string;
  slug: string;
  theme: string;
  case_label: string;
  person_label: string | null;
  location: string | null;
  incident_date: string | null;
  incident_date_text: string | null;
  public_date: string | null;
  victim_status: string | null;
  suspect_status: string | null;
  legal_status: string | null;
  consequence: string | null;
  ecli: string | null;
  summary: string | null;
  evidence_notes: string | null;
  unknowns: string | null;
  source_level: string | null;
  is_featured: boolean;
  featured_position: number | null;
};

const columns = `
  id,
  slug,
  theme,
  case_label,
  person_label,
  location,
  incident_date,
  incident_date_text,
  public_date,
  victim_status,
  suspect_status,
  legal_status,
  consequence,
  ecli,
  summary,
  evidence_notes,
  unknowns,
  source_level,
  is_featured,
  featured_position
`;

export async function getAllCases(): Promise<PhosphorosCase[]> {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select(columns)
    .order("public_date", { ascending: false });

  if (error) {
    console.error("Error loading Phosphoros cases:", error);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedCases(): Promise<PhosphorosCase[]> {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select(columns)
    .eq("is_featured", true)
    .order("featured_position", { ascending: true })
    .limit(5);

  if (error) {
    console.error("Error loading featured Phosphoros cases:", error);
    return [];
  }

  return data ?? [];
}

export async function getCaseBySlug(
  slug: string
): Promise<PhosphorosCase | null> {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select(columns)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error loading Phosphoros case:", error);
    return null;
  }

  return data;
}
