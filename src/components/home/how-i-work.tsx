"use client"

import { Stagger, StaggerItem } from "@/components/motion/Stagger"
import { Container } from "@/components/ui/Container"

const principles = [
  {
    title: "Start from the data",
    icon: "M4 17V11M9 17V7M14 17V4",
    body: [
      "I trace the workflow first: where time disappears, where the numbers disagree, and which decision the product has to change.",
      "At KollegeApply the constraints were traffic quality, lead volume, and content throughput, so the roadmap started there.",
    ],
  },
  {
    title: "Ship in thin slices",
    icon: "M4 7h12M6 12h10M8 17h8",
    body: [
      "The CMS change that took processing from 4 hours to 10 minutes shipped as a narrow loop, not a platform rewrite.",
      "Each slice had an owner, a metric, and a way to turn it off if the number moved the wrong way.",
    ],
  },
  {
    title: "Measure what matters",
    icon: "M12 4a8 8 0 1 0 0.01 0M12 8v4l3 2",
    body: [
      "A 3.6x traffic chart only counts if those sessions become qualified demand, not just more pages in analytics.",
      "I keep the growth number next to the operational one: records processed, clients live, minutes saved.",
    ],
  },
] as const

export function HowIWork() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          How I work
        </p>
        <Stagger className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {principles.map((principle) => (
            <StaggerItem key={principle.title}>
              <DrawIcon d={principle.icon} />
              <h3 className="mt-5 text-2xl text-fg">{principle.title}</h3>
              {principle.body.map((sentence) => (
                <p key={sentence} className="mt-3 text-sm leading-relaxed text-muted">
                  {sentence}
                </p>
              ))}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

function DrawIcon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  )
}
