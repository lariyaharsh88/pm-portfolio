"use client"

import type { CSSProperties, ReactNode } from "react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"

type MarqueeStyle = CSSProperties & {
  "--marquee-duration": string
}

type MarqueeProps = {
  children: ReactNode
  className?: string
  duration?: number
}

export function Marquee({ children, className, duration = 40 }: MarqueeProps) {
  const reduced = useReducedMotionSafe()

  if (reduced) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <div className="flex w-max items-center gap-8">{children}</div>
      </div>
    )
  }

  const style: MarqueeStyle = { "--marquee-duration": `${duration}s` }

  return (
    <div className={cn("group overflow-hidden", className)}>
      <div className="marquee-track flex w-max items-center" style={style}>
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
