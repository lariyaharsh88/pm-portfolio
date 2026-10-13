"use client"

import { m, useInView } from "motion/react"
import { useRef, useState } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/cn"

const outcomes = [
  { label: "Success", display: "37.57M", value: 37.57, color: "var(--study-accent)" },
  { label: "Duplicate", display: "22.98M", value: 22.98, color: "#818CF8" },
  { label: "Daily limit", display: "4.87M", value: 4.87, color: "#F59E0B" },
  { label: "Error", display: "4.53M", value: 4.53, color: "#F87171" },
  { label: "Killed", display: "3.63M", value: 3.63, color: "#94A3B8" },
  { label: "Pending", display: "2.52M", value: 2.52, color: "#38BDF8" },
  { label: "Unknown", display: "1.15M", value: 1.15, color: "#C4B5FD" },
  { label: "Failed", display: "0.73M", value: 0.73, color: "#FB7185" },
  { label: "Course mapping", display: "0.23M", value: 0.23, color: "#34D399" },
  { label: "Campaign limit", display: "0.08M", value: 0.08, color: "#FBBF24" },
] as const

const total = outcomes.reduce((sum, outcome) => sum + outcome.value, 0)

export function StatusBreakdown() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotionSafe()
  const shown = reduced || inView
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : outcomes[active]
  const tipLeft = current ? midpoint(active as number) : 0

  return (
    <figure ref={ref} className="not-prose my-8">
      <figcaption className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        Distribution outcomes
      </figcaption>
      <div className="relative mt-2 pt-9">
        {current ? (
          <p
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-full bg-fg px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-bg"
            style={{ left: `${Math.min(92, Math.max(8, tipLeft))}%` }}
          >
            {current.label} · {current.display}
          </p>
        ) : null}
        <m.div
          className="flex h-8 origin-left overflow-hidden rounded-full"
          initial={false}
          animate={{ scaleX: shown ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.7, ease }}
          aria-hidden
        >
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.label}
              className={cn("h-full min-w-[3px]", active === index && "brightness-125")}
              style={{ flexGrow: outcome.value, flexBasis: 0, background: outcome.color }}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </m.div>
      </div>
      <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <li key={outcome.label}>
            <button
              type="button"
              className={cn(
                "flex w-full items-baseline justify-between gap-3 rounded-lg px-1.5 py-1 text-left",
                active === index && "bg-bg",
              )}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
            >
              <span className="flex min-w-0 items-center gap-2 text-sm text-fg">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: outcome.color }}
                />
                <span className="truncate">{outcome.label}</span>
              </span>
              <span className="font-mono text-sm text-muted tabular-nums">{outcome.display}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">Status counts are system records, not unique leads.</p>
    </figure>
  )
}

function midpoint(index: number): number {
  const start = outcomes.slice(0, index).reduce((sum, outcome) => sum + outcome.value, 0)
  return ((start + outcomes[index].value / 2) / total) * 100
}
