import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"

const SkillsBento = dynamic(() =>
  import("@/components/experience/skills-bento").then((mod) => mod.SkillsBento),
)

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Product roles at KollegeApply and Collegedunia, across SEO, leads, rankings, and content systems.",
  alternates: { canonical: "/experience" },
}

export default function ExperiencePage() {
  return (
    <main className="pb-16">
      <ExperienceTimeline />
      <SkillsBento />
    </main>
  )
}
