"use client"

import { useState } from "react"
import { useEnterView } from "@/lib/use-enter-view"
import { barCharts } from "@/content/charts"

const fmt = new Intl.NumberFormat("en-IN")

/** Ranked horizontal bars with the value as a direct label; the hovered row lifts, the rest recede. */
export function BarList({ data }: { data: string }) {
  const series = barCharts[data]
  const [hover, setHover] = useState<number | null>(null)
  const [ref, state] = useEnterView<HTMLUListElement>(0.3)
  if (!series) return null
  const max = Math.max(...series.items.map((i) => i.value))
  const total = series.items.reduce((s, i) => s + i.value, 0)

  return (
    <figure className="not-prose my-10 rounded-2xl border border-border bg-bg-elevated p-4 sm:p-6">
      <figcaption className="text-base font-medium text-fg">{series.title}</figcaption>
      <p className="mt-1 text-sm text-muted">By {series.unit}</p>
      <ul ref={ref} className="mt-4 grid gap-2" onPointerLeave={() => setHover(null)}>
        {series.items.map((item, i) => {
          const share = Math.round((item.value / total) * 100)
          return (
            <li
              key={item.label}
              tabIndex={0}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="relative rounded-lg outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-accent-ink"
              style={{ opacity: hover === null || hover === i ? 1 : 0.45 }}
              aria-label={`${item.label}: ${fmt.format(item.value)} ${series.unit}, ${share}% of shown`}
            >
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate text-fg">{item.label}</span>
                <span className="shrink-0 font-mono text-fg">
                  {fmt.format(item.value)}
                  <span className={`ml-2 text-xs text-muted transition-opacity ${hover === i ? "opacity-100" : "opacity-0"}`}>{share}%</span>
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-border/60">
                <div
                  className="h-2 rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: state === "waiting" ? "0%" : `${(item.value / max) * 100}%`,
                    transitionDelay: state === "entered" ? `${i * 60}ms` : undefined,
                    background: "var(--study-accent, var(--accent))",
                  }}
                />
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-4 text-xs text-muted">Source: {series.source}</p>
    </figure>
  )
}
