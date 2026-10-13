"use client"

import { m, useMotionValue, useSpring } from "motion/react"
import type { MouseEvent, ReactNode } from "react"
import { useFinePointer } from "@/hooks/useFinePointer"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { spring } from "@/lib/motion"

const MAGNET_RANGE = 12

type MagneticProps = {
  children: ReactNode
  className?: string
}

export function Magnetic({ children, className }: MagneticProps) {
  const reduced = useReducedMotionSafe()
  const finePointer = useFinePointer()
  const enabled = finePointer && !reduced
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, {
    stiffness: spring.stiffness,
    damping: spring.damping,
  })
  const springY = useSpring(y, {
    stiffness: spring.stiffness,
    damping: spring.damping,
  })

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!enabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const deltaX = event.clientX - (rect.left + rect.width / 2)
    const deltaY = event.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(deltaX, deltaY)
    if (distance === 0) {
      x.set(0)
      y.set(0)
      return
    }
    const pull = Math.min(distance, MAGNET_RANGE) / distance
    x.set(deltaX * pull)
    y.set(deltaY * pull)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      className={cn("inline-flex", className)}
      style={enabled ? { x: springX, y: springY } : undefined}
      onMouseMove={enabled ? onMouseMove : undefined}
      onMouseLeave={enabled ? onMouseLeave : undefined}
    >
      {children}
    </m.div>
  )
}
