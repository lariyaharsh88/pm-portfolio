"use client"

import { m, useInView } from "motion/react"
import { useRef } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease, stagger } from "@/lib/motion"

const stages = [
  "Structured data",
  "CMS + validation",
  "Templates",
  "Student tools",
  "SEO & discovery",
]

const flows = [
  { label: "College", color: "var(--study-accent)", delay: 0 },
  { label: "Exam", color: "#38BDF8", delay: 0.7 },
  { label: "Course", color: "#A78BFA", delay: 1.4 },
]

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

export function DataLayerDiagram() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotionSafe()
  const shown = reduced || inView

  return (
    <figure ref={ref} className="not-prose my-8">
      <figcaption className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        Data layer
      </figcaption>
      <div className="mt-4">
        <div className="grid grid-cols-[4.5rem_repeat(5,minmax(0,1fr))] gap-x-2">
          <div />
          {stages.map((stage) => (
            <p key={stage} className="min-w-0 text-center text-[11px] leading-tight text-fg md:text-xs">
              {stage}
            </p>
          ))}
        </div>
        <m.div
          className="mt-3 space-y-3"
          variants={stagger(0.1)}
          initial="hidden"
          animate={shown ? "visible" : "hidden"}
        >
          {flows.map((flow) => (
            <m.div
              key={flow.label}
              variants={rowVariants}
              className="grid grid-cols-[4.5rem_repeat(5,minmax(0,1fr))] items-center gap-x-2"
            >
              <p className="text-sm text-fg">{flow.label}</p>
              <FlowLine color={flow.color} delay={flow.delay} reduced={reduced} shown={shown} />
            </m.div>
          ))}
        </m.div>
      </div>
    </figure>
  )
}

function FlowLine({
  color,
  delay,
  reduced,
  shown,
}: {
  color: string
  delay: number
  reduced: boolean
  shown: boolean
}) {
  return (
    <div className="relative col-span-5 h-8">
      <div
        className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2"
        style={{ background: color, opacity: 0.45 }}
      />
      {stages.map((stage, index) => (
        <span
          key={stage}
          aria-hidden
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-bg-elevated"
          style={{
            left: `${((index + 0.5) / stages.length) * 100}%`,
            borderColor: color,
          }}
        />
      ))}
      {shown && !reduced ? (
        <m.span
          aria-hidden
          className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full motion-reduce:hidden"
          style={{ background: color }}
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 4.2, delay, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  )
}
