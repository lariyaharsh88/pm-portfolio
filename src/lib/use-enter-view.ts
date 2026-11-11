"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Server-renders as "shown" so content never depends on JS. On mount, elements that are
 * still below the fold switch to "waiting" and flip to "shown" when they scroll into view.
 * Elements already on screen at mount (and reduced-motion users) never animate.
 */
export function useEnterView<T extends Element>(amount = 0.25) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<"shown" | "waiting" | "entered">("shown")

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setState("waiting")
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("entered")
          io.disconnect()
        }
      },
      // The huge top margin counts anything already scrolled past as "entered",
      // so a fast jump down the page never leaves content hidden above the viewport.
      { threshold: 0, rootMargin: `100000px 0px -${Math.round(amount * 40)}% 0px` },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount])

  return [ref, state] as const
}
