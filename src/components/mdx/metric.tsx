"use client"

import { CountUp } from "@/components/motion/CountUp"

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="not-prose my-6 inline-flex max-w-full flex-col rounded-2xl border px-5 py-4"
      style={{
        borderColor: "color-mix(in srgb, var(--study-accent) 50%, var(--border))",
        background: "color-mix(in srgb, var(--study-accent) 14%, var(--bg-elevated))",
      }}
    >
      <CountUp value={value} className="text-3xl text-fg md:text-4xl" />
      <p className="mt-1 max-w-xs text-sm text-muted">{label}</p>
    </div>
  )
}
