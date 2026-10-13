import type { MetadataRoute } from "next"
import { getCaseStudies } from "@/lib/case-studies"
import { siteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  const drafts = getCaseStudies()
    .filter((study) => study.status === "draft")
    .map((study) => `/work/${study.slug}`)

  return {
    rules:
      drafts.length > 0
        ? { userAgent: "*", allow: "/", disallow: drafts }
        : { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
