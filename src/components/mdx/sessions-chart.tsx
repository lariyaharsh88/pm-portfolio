"use client"

import { m, useInView } from "motion/react"
import { useId, useRef } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

const points = [
  { month: "Jan", value: 94672 },
  { month: "Feb", value: 126026 },
  { month: "Mar", value: 169077 },
  { month: "Apr", value: 186861 },
  { month: "May", value: 289861 },
  { month: "Jun", value: 339061, peak: true },
  { month: "Jul", value: 241916 },
  { month: "Aug", value: 115123 },
  { month: "Sep", value: 137756 },
] as const

const width = 640
const height = 300
const pad = { l: 46, r: 16, t: 42, b: 32 }
const yMax = 380000
const ticks = [0, 100000, 200000, 300000]

function xAt(index: number) {
  const inner = width - pad.l - pad.r
  return pad.l + (index / (points.length - 1)) * inner
}

function yAt(value: number) {
  const inner = height - pad.t - pad.b
  return pad.t + (1 - value / yMax) * inner
}

function linePath() {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xAt(index).toFixed(1)} ${yAt(point.value).toFixed(1)}`)
    .join(" ")
}

function areaPath() {
  const baseline = yAt(0)
  const last = points.length - 1
  return `${linePath()} L ${xAt(last).toFixed(1)} ${baseline.toFixed(1)} L ${xAt(0).toFixed(1)} ${baseline.toFixed(1)} Z`
}

export function SessionsChart() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.45 })
  const reduced = useReducedMotionSafe()
  const shown = reduced || inView
  const titleId = useId()
  const peak = points.findIndex((point) => "peak" in point && point.peak)
  const peakPoint = points[peak]
  const peakX = xAt(peak)
  const peakY = yAt(peakPoint.value)

  return (
    <figure ref={ref} className="not-prose my-8">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>
          Monthly sessions from January to September, peaking in June at 339,061.
        </title>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.l}
              x2={width - pad.r}
              y1={yAt(tick)}
              y2={yAt(tick)}
              stroke="var(--border)"
            />
            <text
              x={pad.l - 8}
              y={yAt(tick) + 3}
              textAnchor="end"
              fill="var(--muted)"
              fontSize="11"
              fontFamily="var(--font-mono), ui-monospace, monospace"
            >
              {tick === 0 ? "0" : `${tick / 1000}k`}
            </text>
          </g>
        ))}
        <m.path
          d={areaPath()}
          fill="color-mix(in srgb, var(--study-accent) 16%, transparent)"
          initial={false}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.35, ease }}
        />
        <m.path
          d={linePath()}
          fill="none"
          stroke="var(--study-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 1.1, ease }}
        />
        {points.map((point, index) => (
          <text
            key={point.month}
            x={xAt(index)}
            y={height - 10}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize="11"
            fontFamily="var(--font-mono), ui-monospace, monospace"
          >
            {point.month}
          </text>
        ))}
        <m.g
          initial={false}
          animate={{ opacity: shown ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.85, ease }}
        >
          <circle cx={peakX} cy={peakY} r="4" fill="var(--study-accent)" />
          <text
            x={peakX}
            y={peakY - 28}
            textAnchor="middle"
            fill="var(--fg)"
            fontSize="11"
            fontFamily="var(--font-mono), ui-monospace, monospace"
          >
            June peak
          </text>
          <text
            x={peakX}
            y={peakY - 14}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize="11"
            fontFamily="var(--font-mono), ui-monospace, monospace"
          >
            339,061
          </text>
        </m.g>
      </svg>
    </figure>
  )
}
