"use client"

import { Compass, Lightbulb, Scale, TrendingUp, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Reveal } from "@/components/motion/Reveal"

const kinds = {
  insight: { label: "Insight", icon: Lightbulb },
  decision: { label: "Decision", icon: Compass },
  tradeoff: { label: "Tradeoff", icon: Scale },
  result: { label: "Result", icon: TrendingUp },
} as const satisfies Record<string, { label: string; icon: LucideIcon }>

type CalloutType = keyof typeof kinds

export function Callout({
  type,
  children,
}: {
  type: CalloutType
  children: ReactNode
}) {
  const kind = kinds[type] ?? kinds.insight
  const Icon = kind.icon

  return (
    <Reveal amount={0.4}>
      <aside
        className="not-prose my-8 flex gap-4 rounded-2xl border border-border bg-bg-elevated px-5 py-4"
        style={{ borderLeftWidth: 2, borderLeftColor: "var(--study-accent)" }}
      >
        <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--study-accent)" }} aria-hidden />
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            {kind.label}
          </p>
          <div className="mt-1 text-sm leading-relaxed text-fg [&_p]:m-0">{children}</div>
        </div>
      </aside>
    </Reveal>
  )
}
