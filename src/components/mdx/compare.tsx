"use client"

import { m, useInView } from "motion/react"
import { useRef } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

function magnitude(value: string): number {
  const cleaned = value.trim().toLowerCase().replace(/,/g, "")
  const range = cleaned.match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)(?:\s*([kmb]))?/)
  let amount = 1
  let suffix: string | undefined

  if (range) {
    amount = (Number(range[1]) + Number(range[2])) / 2
    suffix = range[3]
  } else {
    const single = cleaned.match(/(\d+(?:\.\d+)?)(?:\s*([kmb]))?/)
    if (single) {
      amount = Number(single[1])
      suffix = single[2]
    }
  }

  if (suffix === "k") amount *= 1_000
  else if (suffix === "m") amount *= 1_000_000
  else if (suffix === "b") amount *= 1_000_000_000

  if (/\bdays?\b/.test(cleaned)) amount *= 24 * 60
  else if (/\bhours?\b/.test(cleaned)) amount *= 60
  else if (/\bseconds?\b/.test(cleaned)) amount /= 60

  return Number.isFinite(amount) && amount > 0 ? amount : 1
}

function barWidth(value: number, max: number): string {
  const share = Math.min(1, Math.max(value / max, 0.06))
  return `${share * 100}%`
}

export function Compare({
  before,
  after,
  label,
}: {
  before: string
  after: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotionSafe()
  const beforeValue = magnitude(before)
  const afterValue = magnitude(after)
  const max = Math.max(beforeValue, afterValue, 1)
  const shown = reduced || inView

  return (
    <div ref={ref} className="not-prose my-8">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <div className="mt-4 space-y-3">
        <Bar
          name="Before"
          value={before}
          width={barWidth(beforeValue, max)}
          shown={shown}
          delay={0}
          instant={reduced}
          tone="muted"
        />
        <Bar
          name="After"
          value={after}
          width={barWidth(afterValue, max)}
          shown={shown}
          delay={0.18}
          instant={reduced}
          tone="accent"
        />
      </div>
    </div>
  )
}

function Bar({
  name,
  value,
  width,
  shown,
  delay,
  instant,
  tone,
}: {
  name: string
  value: string
  width: string
  shown: boolean
  delay: number
  instant: boolean
  tone: "muted" | "accent"
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-4 text-sm">
        <span className="text-muted">{name}</span>
        <span className="font-mono text-fg">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border/70">
        <m.span
          className="block h-full origin-left rounded-full"
          style={{
            width,
            originX: 0,
            background:
              tone === "accent" ? "var(--study-accent)" : "color-mix(in srgb, var(--fg) 28%, transparent)",
          }}
          initial={false}
          animate={{ scaleX: shown ? 1 : 0 }}
          transition={{
            duration: shown && !instant ? 0.45 : 0,
            ease,
            delay: shown && !instant ? delay : 0,
          }}
        />
      </div>
    </div>
  )
}
