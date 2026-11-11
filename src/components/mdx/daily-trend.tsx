"use client"

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { dailyCharts } from "@/content/charts"

const W = 680
const H = 280
const pad = { l: 48, r: 16, t: 36, b: 30 }
const fmt = new Intl.NumberFormat("en-IN")
const dateLabel = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" })

function niceMax(v: number) {
  if (v <= 0) return 1
  const p = 10 ** Math.floor(Math.log10(v))
  return [1, 2, 2.5, 5, 10].map((m) => m * p).find((m) => m >= v) ?? v
}

/** One metric at a time (no dual axis), crosshair + tooltip on hover and arrow keys, table fallback. */
export function DailyTrend({ data }: { data: string }) {
  const series = dailyCharts[data]
  const [metric, setMetric] = useState(series?.metrics[0].key ?? "")
  const [active, setActive] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const titleId = useId()
  if (!series) return null

  const pts = series.points
  const values = pts.map((p) => p.values[metric] ?? 0)
  const max = niceMax(Math.max(...values))
  const ticks = [0, max / 2, max]
  const x = (i: number) => pad.l + (i / (pts.length - 1)) * (W - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b)
  const line = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
  const area = `${line} L${x(pts.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`
  const metricLabel = series.metrics.find((m) => m.key === metric)?.label ?? metric
  const total = values.reduce((a, b) => a + b, 0)
  const peakIndex = values.indexOf(Math.max(...values))

  function onMove(e: PointerEvent<SVGSVGElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    const i = Math.round(((px - pad.l) / (W - pad.l - pad.r)) * (pts.length - 1))
    setActive(Math.max(0, Math.min(pts.length - 1, i)))
  }
  function onKey(e: KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
    e.preventDefault()
    setActive((a) => {
      const cur = a ?? (e.key === "ArrowRight" ? -1 : pts.length)
      return Math.max(0, Math.min(pts.length - 1, cur + (e.key === "ArrowRight" ? 1 : -1)))
    })
  }

  const a = active
  const tipLeft = a === null ? 0 : (x(a) / W) * 100

  return (
    <figure className="not-prose my-10 rounded-2xl border border-border bg-bg-elevated p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <figcaption id={titleId} className="text-base font-medium text-fg">{series.title}</figcaption>
          <p className="mt-1 text-sm text-muted">
            <span className="font-mono text-fg">{fmt.format(total)}</span> {metricLabel.toLowerCase()} · peak{" "}
            <span className="font-mono text-fg">{fmt.format(values[peakIndex])}</span> on {dateLabel(pts[peakIndex].date)}
          </p>
        </div>
        {series.metrics.length > 1 ? (
          <div role="radiogroup" aria-label="Metric" className="flex rounded-full border border-border p-0.5 text-sm">
            {series.metrics.map((m) => (
              <button
                key={m.key}
                type="button"
                role="radio"
                aria-checked={metric === m.key}
                onClick={() => setMetric(m.key)}
                className={`rounded-full px-3 py-1 transition-colors ${metric === m.key ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
              >
                {m.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-accent-ink"
          role="img"
          aria-labelledby={titleId}
          tabIndex={0}
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKey}
          onBlur={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
              <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono), monospace">
                {t >= 1000 ? `${+(t / 1000).toFixed(1)}k` : t}
              </text>
            </g>
          ))}
          {series.events?.map((ev) => {
            const i = pts.findIndex((p) => p.date === ev.date)
            if (i < 0) return null
            const right = i > pts.length * 0.6
            return (
              <g key={ev.date}>
                <line x1={x(i)} x2={x(i)} y1={pad.t - 14} y2={y(0)} stroke="var(--muted)" strokeDasharray="3 4" opacity="0.6" />
                <text x={x(i) + (right ? -6 : 6)} y={pad.t - 18} textAnchor={right ? "end" : "start"} fontSize="11" fill="var(--muted)">
                  {ev.label}
                </text>
              </g>
            )
          })}
          <path d={area} fill="color-mix(in srgb, var(--study-accent, var(--accent)) 14%, transparent)" />
          <path d={line} fill="none" stroke="var(--study-accent, var(--accent))" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {[0, Math.floor((pts.length - 1) / 2), pts.length - 1].map((i) => (
            <text key={i} x={x(i)} y={H - 8} textAnchor={i === 0 ? "start" : i === pts.length - 1 ? "end" : "middle"} fontSize="11" fill="var(--muted)" fontFamily="var(--font-mono), monospace">
              {dateLabel(pts[i].date)}
            </text>
          ))}
          {a !== null ? (
            <g>
              <line x1={x(a)} x2={x(a)} y1={pad.t} y2={y(0)} stroke="var(--fg)" strokeWidth="1" opacity="0.35" />
              <circle cx={x(a)} cy={y(values[a])} r="5" fill="var(--study-accent, var(--accent))" stroke="var(--bg-elevated)" strokeWidth="2" />
            </g>
          ) : null}
        </svg>

        {a !== null ? (
          <div
            className="pointer-events-none absolute top-10 z-10 rounded-lg border border-border bg-bg px-3 py-2 text-sm shadow-lg"
            style={{ left: `${tipLeft}%`, transform: `translateX(${tipLeft > 60 ? "-105%" : "5%"})` }}
            role="status"
          >
            <p className="text-xs text-muted">{dateLabel(pts[a].date)}</p>
            {series.metrics.map((m) => (
              <p key={m.key} className="mt-0.5 flex items-center gap-2">
                <span className="inline-block h-0.5 w-3 rounded" style={{ background: m.key === metric ? "var(--study-accent, var(--accent))" : "var(--muted)" }} />
                <span className="font-mono font-semibold text-fg">{fmt.format(pts[a].values[m.key] ?? 0)}</span>
                <span className="text-muted">{m.label.toLowerCase()}</span>
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>Source: {series.source}</span>
        <span className="hidden sm:inline">Hover or use ← → keys</span>
      </div>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-muted hover:text-fg">Show as table</summary>
        <div className="mt-2 max-h-64 overflow-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-muted">
                <th className="py-1 pr-3 font-normal">Date</th>
                {series.metrics.map((m) => <th key={m.key} className="py-1 pr-3 text-right font-normal">{m.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {pts.map((p) => (
                <tr key={p.date} className="border-t border-border text-fg">
                  <td className="py-1 pr-3">{dateLabel(p.date)}</td>
                  {series.metrics.map((m) => <td key={m.key} className="py-1 pr-3 text-right">{fmt.format(p.values[m.key] ?? 0)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  )
}
