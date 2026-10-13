"use client"

import { m, useScroll, useSpring } from "motion/react"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { spring } from "@/lib/motion"

export function ScrollProgress() {
  const reduced = useReducedMotionSafe()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: spring.stiffness,
    damping: spring.damping,
    restDelta: 0.001,
  })

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
    />
  )
}
