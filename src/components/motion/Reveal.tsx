"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/cn"
import { useEnterView } from "@/lib/use-enter-view"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  from?: "up" | "left" | "right"
  instant?: boolean
}

const offset = { up: "translate-y-6", left: "-translate-x-6", right: "translate-x-6" } as const

export function Reveal({ children, className, delay = 0, amount, from = "up", instant }: RevealProps) {
  const [ref, state] = useEnterView<HTMLDivElement>(amount)
  if (instant) return <div className={cn(className)}>{children}</div>
  return (
    <div
      ref={ref}
      style={state === "entered" && delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(
        "transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        state === "waiting" && cn("opacity-0", offset[from]),
        className,
      )}
    >
      {children}
    </div>
  )
}
