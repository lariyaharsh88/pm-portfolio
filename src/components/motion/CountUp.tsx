"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { cn } from "@/lib/cn"
import { useEnterView } from "@/lib/use-enter-view"

type TextSegment = { kind: "text"; text: string }
type NumberSegment = { kind: "number"; value: number; decimals: number }
type Segment = TextSegment | NumberSegment

type CountUpProps = {
  value: number | string
  prefix?: string
  suffix?: string
  className?: string
}

function formatNumber(value: number, decimals: number): string {
  if (decimals <= 0) return Math.round(value).toString()
  return value.toFixed(decimals)
}

function decimalPlaces(raw: string): number {
  const fraction = raw.split(".")[1]
  return fraction ? fraction.length : 0
}

function parseMetric(value: number | string): Segment[] {
  if (typeof value === "number") {
    return [
      {
        kind: "number",
        value,
        decimals: decimalPlaces(String(value)),
      },
    ]
  }

  const segments: Segment[] = []
  const pattern = /-?\d+(?:\.\d+)?/g
  let cursor = 0

  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > cursor) {
      segments.push({ kind: "text", text: value.slice(cursor, index) })
    }
    const raw = match[0]
    segments.push({
      kind: "number",
      value: Number(raw),
      decimals: decimalPlaces(raw),
    })
    cursor = index + raw.length
  }

  if (cursor < value.length) {
    segments.push({ kind: "text", text: value.slice(cursor) })
  }

  return segments
}

export function CountUp({ value, prefix, suffix, className }: CountUpProps) {
  const segments = useMemo(() => parseMetric(value), [value])
  const [ref, state] = useEnterView<HTMLSpanElement>(0.5)
  // 1 = final value; server and above-the-fold renders never animate.
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    if (state === "waiting") setProgress(0)
    if (state !== "entered") return
    const duration = 1400
    let start: number | undefined
    let frame = requestAnimationFrame(function tick(now) {
      start ??= now
      const t = Math.min((now - start) / duration, 1)
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [state])

  const content: ReactNode[] = segments.map((segment, index) => {
    if (segment.kind === "text") {
      return <span key={index}>{segment.text}</span>
    }

    return <span key={index}>{formatNumber(segment.value * progress, segment.decimals)}</span>
  })

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {prefix}
      {content}
      {suffix}
    </span>
  )
}
