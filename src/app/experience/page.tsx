import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import dynamic from "next/dynamic"
import { ExperienceTimeline } from "@/components/experience/experience-timeline"

const SkillsBento = dynamic(() =>
  import("@/components/experience/skills-bento").then((mod) => mod.SkillsBento),
)

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "5 years of product roles at KollegeApply and Collegedunia: lead platforms (78M+ records), SEO and CMS systems (300K+ pages), and +43% conversion lift.",
  path: "/experience",
})

export default function ExperiencePage() {
  return (
    <main className="pb-16">
      <ExperienceTimeline />
      <SkillsBento />
    </main>
  )
}
