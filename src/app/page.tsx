import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Hero } from "@/components/home/hero"
import { SelectedWork } from "@/components/home/selected-work"
import { photoBlur } from "@/lib/photo-blur"
import { hasResume } from "@/lib/resume"
import { site } from "@/lib/site"

const Metrics = dynamic(() => import("@/components/home/metrics").then((mod) => mod.Metrics))
const LogoMarquee = dynamic(() =>
  import("@/components/home/logo-marquee").then((mod) => mod.LogoMarquee),
)
const Testimonials = dynamic(() =>
  import("@/components/home/testimonials").then((mod) => mod.Testimonials),
)
const HowIWork = dynamic(() => import("@/components/home/how-i-work").then((mod) => mod.HowIWork))
const CtaBand = dynamic(() => import("@/components/home/cta-band").then((mod) => mod.CtaBand))

export const metadata: Metadata = {
  description: site.description,
  alternates: { canonical: "/" },
}

export default async function Home() {
  const [headshotBlur, portraitBlur, resume] = await Promise.all([
    photoBlur("me-headshot.jpg"),
    photoBlur("me.jpg"),
    hasResume(),
  ])

  return (
    <main>
      <Hero hasResume={resume} headshotBlur={headshotBlur} portraitBlur={portraitBlur} />
      <Metrics />
      <LogoMarquee />
      <SelectedWork />
      <Testimonials />
      <HowIWork />
      <CtaBand />
    </main>
  )
}
