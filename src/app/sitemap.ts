import type { MetadataRoute } from "next";

import { getAllCases } from "@/lib/phosphoros/cases";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cases = await getAllCases();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/cases`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/record`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/method`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/open-a-case`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const casePages: MetadataRoute.Sitemap = cases.map((item) => ({
    url: `${SITE_URL}/cases/${item.slug}`,
    lastModified: item.public_date
      ? new Date(`${item.public_date}T12:00:00Z`)
      : undefined,
    changeFrequency: item.legal_outcome === "Onderzoek loopt" ? "weekly" : "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...casePages];
}
