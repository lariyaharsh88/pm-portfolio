"use client"

import type { PointerEvent, ReactNode } from "react"
import { cn } from "@/lib/cn"

/** Tilts up to `max` degrees toward a fine pointer; touch and reduced-motion users get a static card. */
export function Tilt({ children, className, max = 4 }: { children: ReactNode; className?: string; max?: number }) {
  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`)
    e.currentTarget.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`)
  }
  function onLeave(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty("--rx", "0deg")
    e.currentTarget.style.setProperty("--ry", "0deg")
  }
  return (
    <div className={cn("tilt rounded-2xl", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  )
}
