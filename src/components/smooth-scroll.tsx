"use client"

import "lenis/dist/lenis.css"
import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"
import { useFinePointer } from "@/hooks/useFinePointer"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe()
  const finePointer = useFinePointer()
  const enabled = finePointer && !reduced

  return (
    <ReactLenis
      root
      options={
        enabled
          ? { lerp: 0.12, autoRaf: true, smoothWheel: true, anchors: true }
          : { autoRaf: false, smoothWheel: false, anchors: true }
      }
    >
      {children}
    </ReactLenis>
  )
}
