import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export type PhosphorosCase = {
  id: string;
  slug: string;
  title: string;
  location: string | null;

  incident_date: string | null;
  public_date: string | null;

  victim_status: string;
  perpetrator_status: string;

  legal_status: string;
  consequence: string | null;

  known_facts: string | null;
  evidence_summary: string | null;
  unknowns: string | null;

  ecli: string | null;

  source_level: string | null;

  is_featured: boolean;
  featured_position: number | null;

  created_at: string;
};

export async function getAllCases() {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select("*")
    .order("public_date", {
      ascending: false,
      nullsFirst: false,
    });

  if (error) {
    console.error("Error loading cases:", error);
    return [];
  }

  return data as PhosphorosCase[];
}

export async function getFeaturedCases(limit = 5) {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select("*")
    .eq("is_featured", true)
    .order("featured_position", {
      ascending: true,
      nullsFirst: false,
    })
    .limit(limit);

  if (error) {
    console.error("Error loading featured cases:", error);
    return [];
  }

  return data as PhosphorosCase[];
}

export async function getCaseBySlug(slug: string) {
  const { data, error } = await supabase
    .from("phosphoros_cases")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error loading case:", error);
    return null;
  }

  return data as PhosphorosCase;
}