"use client"

import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"
import { useFinePointer } from "@/hooks/useFinePointer"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

type CursorMode = "default" | "hover" | "view"

const ringSize: Record<CursorMode, number> = {
  default: 28,
  hover: 44,
  view: 78,
}

function isTextEntry(target: EventTarget | null) {
  if (!(target instanceof Element)) return false
  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true'], [role='textbox']"),
  )
}

function modeFromTarget(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default"
  if (isTextEntry(target)) return "default"
  if (target.closest("[data-cursor='view']")) return "view"
  if (target.closest("a, button")) return "hover"
  return "default"
}

export function Cursor() {
  const finePointer = useFinePointer()
  const reduced = useReducedMotionSafe()
  const enabled = finePointer && !reduced
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 140, damping: 18, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 140, damping: 18, mass: 0.45 })
  const [mode, setMode] = useState<CursorMode>("default")
  const [active, setActive] = useState(false)
  const [overText, setOverText] = useState(false)

  useEffect(() => {
    if (!enabled) return

    function onMove(event: MouseEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
      setActive((current) => current || true)
    }

    function onOver(event: MouseEvent) {
      const text = isTextEntry(event.target)
      setOverText(text)
      setMode(modeFromTarget(event.target))
    }

    function onLeave() {
      setActive(false)
      setOverText(false)
      setMode("default")
    }

    document.documentElement.classList.add("custom-cursor")
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    document.addEventListener("mouseleave", onLeave)

    return () => {
      document.documentElement.classList.remove("custom-cursor")
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
      style={{ opacity: active && !overText ? 1 : 0 }}
    >
      <m.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <m.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border border-white"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: ringSize[mode], height: ringSize[mode] }}
        transition={{ duration: 0.35, ease }}
      >
        <AnimatePresence>
          {mode === "view" ? (
            <m.span
              key="view"
              className="text-[10px] font-medium tracking-[0.14em] text-white uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              View
            </m.span>
          ) : null}
        </AnimatePresence>
      </m.div>
    </div>
  )
}
