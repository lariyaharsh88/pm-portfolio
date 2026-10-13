"use client"

import { animate, m, useMotionValue } from "motion/react"
import { useRef, type PointerEvent as ReactPointerEvent } from "react"
import { CountUp } from "@/components/motion/CountUp"
import { Container } from "@/components/ui/Container"
import { rankflowQuotes } from "@/content/rankflow"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

export function Discovery() {
  const reduced = useReducedMotionSafe()
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const x = useMotionValue(0)

  function limits() {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return { min: 0, max: 0, step: 320 }
    return {
      min: Math.min(0, viewport.clientWidth - track.scrollWidth),
      max: 0,
      step: Math.min(viewport.clientWidth * 0.85, 440),
    }
  }

  function nudge(direction: -1 | 1) {
    if (reduced) {
      viewportRef.current?.scrollBy({ left: direction * 360, behavior: "auto" })
      return
    }
    const { min, max, step } = limits()
    const next = Math.min(max, Math.max(min, x.get() - direction * step))
    animate(x, next, { duration: 0.3, ease })
  }

  function onPointerDown(event: ReactPointerEvent<HTMLUListElement>) {
    if (reduced || event.button !== 0) return
    const track = event.currentTarget
    const origin = x.get()
    const startX = event.clientX
    const { min, max } = limits()
    track.setPointerCapture(event.pointerId)

    function onMove(ev: PointerEvent) {
      x.set(Math.min(max, Math.max(min, origin + ev.clientX - startX)))
    }

    function onUp(ev: PointerEvent) {
      track.removeEventListener("pointermove", onMove)
      track.removeEventListener("pointerup", onUp)
      if (track.hasPointerCapture(ev.pointerId)) track.releasePointerCapture(ev.pointerId)
    }

    track.addEventListener("pointermove", onMove)
    track.addEventListener("pointerup", onUp)
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Discovery</p>
        <h2 className="mt-3 max-w-xl text-3xl text-fg md:text-5xl">What people said</h2>
        <div className="mt-8 flex items-end gap-4">
          <CountUp value="TODO" className="text-5xl text-fg md:text-6xl" />
          <p className="pb-2 text-sm text-muted">interviews · TODO</p>
        </div>
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors duration-300 hover:border-accent/50 hover:bg-accent-soft"
            onClick={() => nudge(-1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors duration-300 hover:border-accent/50 hover:bg-accent-soft"
            onClick={() => nudge(1)}
          >
            Next
          </button>
        </div>
        <div
          ref={viewportRef}
          className={reduced ? "mt-6 overflow-x-auto" : "mt-6 overflow-hidden"}
        >
          <m.ul
            ref={trackRef}
            style={reduced ? undefined : { x }}
            onPointerDown={reduced ? undefined : onPointerDown}
            className={
              reduced
                ? "flex w-max gap-4"
                : "flex w-max cursor-grab gap-4 active:cursor-grabbing"
            }
            aria-label="Interview quotes"
          >
            {rankflowQuotes.map((item) => (
              <li
                key={item.id}
                className="w-[min(80vw,420px)] shrink-0 rounded-3xl border border-border bg-bg-elevated p-6"
              >
                <p className="text-lg leading-relaxed text-fg">“{item.quote}”</p>
                <p className="mt-6 text-sm text-fg">{item.name}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {item.role}
                </p>
              </li>
            ))}
          </m.ul>
        </div>
      </Container>
    </section>
  )
}
