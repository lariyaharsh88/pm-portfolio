"use client"

import { Marquee } from "@/components/motion/Marquee"

const line =
  "KollegeApply · Collegedunia · Prepp · SEO Platforms · Lead Systems · B2B Integrations · CMS Automation · Applied AI ·"

export function LogoMarquee() {
  return (
    <section aria-label="Domains" className="border-y border-border py-8 md:py-10">
      <Marquee duration={36}>
        <span className="font-heading text-4xl tracking-[-0.02em] text-muted/80 md:text-6xl">
          {line}
        </span>
      </Marquee>
    </section>
  )
}
