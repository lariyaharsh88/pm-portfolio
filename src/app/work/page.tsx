import type { Metadata } from "next"
import { WorkGrid } from "@/components/work/work-grid"
import { getPublishedCaseStudies, toCaseMeta } from "@/lib/case-studies"

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in EdTech, growth, and applied AI.",
  alternates: { canonical: "/work" },
}

export default function WorkPage() {
  const studies = getPublishedCaseStudies().map(toCaseMeta)
  return <WorkGrid studies={studies} />
}
