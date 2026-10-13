import type { MetadataRoute } from "next"
import { getPublishedCaseStudies } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site"
import { getNotes } from "@/lib/writing"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/experience", "/products", "/about", "/resume", "/writing"]

  return [
    ...paths.map((path) => ({
      url: `${siteUrl}${path || "/"}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getPublishedCaseStudies().map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getNotes().map((note) => ({
      url: `${siteUrl}/writing/${note.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]
}
