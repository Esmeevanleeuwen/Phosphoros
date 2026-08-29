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
    .order("public_date", { ascending: true });

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
    .order("public_date", { ascending: false })
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
