"use client"

import { AnimatePresence, m } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { ease } from "@/lib/motion"

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark")
}

function getServerSnapshot() {
  return false
}

export function ThemeToggle({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe()
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { setTheme } = useTheme()
  const nextIsDark = !isDark

  return (
    <button
      type="button"
      className={cn(
        "relative grid h-10 w-10 place-items-center rounded-full border border-border text-fg transition-colors duration-300 hover:bg-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink",
        className,
      )}
      aria-label={nextIsDark ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(nextIsDark ? "dark" : "light")}
    >
      <AnimatePresence initial={false}>
        <m.span
          key={isDark ? "moon" : "sun"}
          className="absolute inset-0 grid place-items-center"
          initial={
            reduced ? { opacity: 0 } : { opacity: 0, rotate: -80, scale: 0.7 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 80, scale: 0.7 }}
          transition={{ duration: reduced ? 0 : 0.3, ease }}
        >
          {isDark ? (
            <Moon size={16} strokeWidth={1.5} />
          ) : (
            <Sun size={16} strokeWidth={1.5} />
          )}
        </m.span>
      </AnimatePresence>
    </button>
  )
}
