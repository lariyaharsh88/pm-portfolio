import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import { WorkGrid } from "@/components/work/work-grid"
import { getPublishedCaseStudies, toCaseMeta } from "@/lib/case-studies"

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Product case studies by Harsh Lariya: a lead platform that cut delivery from 1–2 hours to 5 minutes, and a content platform scaled to 300K+ indexed pages.",
  path: "/work",
})

export default function WorkPage() {
  const studies = getPublishedCaseStudies().map(toCaseMeta)
  return <WorkGrid studies={studies} />
}
