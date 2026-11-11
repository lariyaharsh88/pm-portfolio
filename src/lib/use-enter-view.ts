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

    let done = false
    const enter = () => {
      if (done) return
      done = true
      setState("entered")
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) enter()
      },
      // The huge top margin counts anything already scrolled past as "entered",
      // so a fast jump down the page never leaves content hidden above the viewport.
      { threshold: 0, rootMargin: `100000px 0px -${Math.round(amount * 40)}% 0px` },
    )
    // Safety net: observers can be paused (background tabs, embedded views), so a plain
    // scroll check also reveals anything that has reached the screen.
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * (1 - amount * 0.4)) enter()
    }
    io.observe(el)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [amount])

  return [ref, state] as const
}
