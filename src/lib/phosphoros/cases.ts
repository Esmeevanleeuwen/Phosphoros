import { supabase } from "@/lib/supabase";

export type PhosphorosCase = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  city: string | null;
  incident_date: string | null;
  public_date: string | null;
  crime_type: string | null;
  legal_outcome: string | null;
  court_level: string | null;
  school_role: string | null;
  other_youth_role: string | null;
  victim_relationship: string | null;
  connected_locations: string | null;
  first_signal: string | null;
  earlier_signals: string | null;
  number_of_reporters: number | null;
  evidence_status: string | null;
  proceeding_stage: string | null;
  occupational_ban: string | null;
  connections_summary: string | null;
  last_verified_at: string | null;
  source_title: string | null;
  source_url: string | null;
  victim_status: string | null;
  perpetrator_status: string | null;
  legal_status: string | null;
  consequence: string | null;
  known_facts: string | null;
  evidence_summary: string | null;
  unknowns: string | null;
  ecli: string | null;
  source_level: string | null;
};

export async function getAllCases(): Promise<PhosphorosCase[]> {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select("*")
    .order("public_date", { ascending: false, nullsFirst: false });

  if (error) {
    console.error("Error loading Phosphoros cases:", error);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedCases(): Promise<PhosphorosCase[]> {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select("*")
    .order("public_date", { ascending: false, nullsFirst: false })
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
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error loading Phosphoros case:", error);
    return null;
  }

  return data;
}
