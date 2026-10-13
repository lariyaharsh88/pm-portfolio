"use client"

import { m, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"

export type TimelineItem = {
  date: string
  title: string
  text: string
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ol ref={ref} className="not-prose relative my-10 space-y-8 border-l border-border pl-8">
      <m.span
        aria-hidden
        className="absolute top-0 bottom-0 left-[-1px] w-px origin-top"
        style={{
          background: "var(--study-accent)",
          scaleY: reduced ? 1 : scaleY,
        }}
      />
      {items.map((item, index) => (
        <li key={`${item.date}-${item.title}-${index}`} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[37px] h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--study-accent)" }}
          />
          <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
            {item.date}
          </p>
          <h3 className="mt-1 text-lg text-fg">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  )
}
