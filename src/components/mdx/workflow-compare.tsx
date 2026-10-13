"use client"

import { User } from "lucide-react"
import { m, useInView } from "motion/react"
import { useRef } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

const beforeSteps = ["Export", "Clean", "Filter", "Map", "Send", "Verify", "Report"]

const afterSteps = [
  "Lead sources",
  "LMS",
  "Config",
  "Auto-distribution",
  "Status & exceptions",
  "Logs/alerts",
  "Monitoring",
]

const stepVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease },
  },
}

const beforeMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } },
}

const afterMotion = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}

export function WorkflowCompare() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduced = useReducedMotionSafe()
  const shown = reduced || inView

  return (
    <div ref={ref} className="not-prose my-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Column
          title="Before"
          shown={shown}
          reduced={reduced}
          tone="muted"
          steps={beforeSteps}
        />
        <Column
          title="After"
          shown={shown}
          reduced={reduced}
          tone="accent"
          steps={afterSteps}
        />
      </div>
    </div>
  )
}

function Column({
  title,
  steps,
  shown,
  reduced,
  tone,
}: {
  title: string
  steps: string[]
  shown: boolean
  reduced: boolean
  tone: "muted" | "accent"
}) {
  const accent = tone === "accent"

  return (
    <div
      className="rounded-3xl border border-border bg-bg-elevated p-4"
      style={
        accent
          ? {
              borderColor: "color-mix(in srgb, var(--study-accent) 45%, var(--border))",
              background: "color-mix(in srgb, var(--study-accent) 8%, var(--bg-elevated))",
            }
          : undefined
      }
    >
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{title}</p>
      <div className="relative mt-4">
        {accent ? <AfterRail reduced={reduced} shown={shown} /> : null}
        <m.ol
          className={accent ? "relative space-y-2 pl-5" : "space-y-2"}
          variants={accent ? afterMotion : beforeMotion}
          initial={reduced ? "visible" : "hidden"}
          animate={shown ? "visible" : "hidden"}
        >
          {steps.map((step) => (
            <m.li
              key={step}
              variants={stepVariants}
              className="relative flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm"
              style={
                accent
                  ? {
                      borderColor: "color-mix(in srgb, var(--study-accent) 35%, var(--border))",
                      color: "var(--fg)",
                    }
                  : { borderColor: "var(--border)", color: "var(--muted)" }
              }
            >
              {accent ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-[-16px] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "var(--study-accent)" }}
                />
              ) : (
                <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
              )}
              {step}
            </m.li>
          ))}
        </m.ol>
      </div>
    </div>
  )
}

function AfterRail({ reduced, shown }: { reduced: boolean; shown: boolean }) {
  return (
    <div className="pointer-events-none absolute top-4 bottom-4 left-[7px]" aria-hidden>
      <div className="h-full w-px" style={{ background: "var(--study-accent)" }} />
      {shown && !reduced ? (
        <m.span
          className="absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full motion-reduce:hidden"
          style={{ background: "var(--study-accent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </div>
  )
}
