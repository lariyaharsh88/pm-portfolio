"use client"

import { AnimatePresence, m } from "motion/react"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { ease } from "@/lib/motion"

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  const [open, setOpen] = useState(false)
  const client = useIsClient()
  const reduced = useReducedMotionSafe()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const previously = document.activeElement
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
      }
    }
    const frame = requestAnimationFrame(() => closeRef.current?.focus())
    window.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("keydown", onKey)
      if (previously instanceof HTMLElement) previously.focus()
    }
  }, [open])

  return (
    <figure className="not-prose my-10">
      <button
        type="button"
        className="group block w-full text-left"
        onClick={() => setOpen(true)}
        data-cursor="view"
        aria-label={alt ? `Enlarge ${alt}` : "Enlarge image"}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-elevated">
          {/* Natural aspect ratio: screenshots are never cropped. Tall ones are capped and centred. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="mx-auto block h-auto max-h-[80vh] w-auto max-w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </button>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
      {client
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <m.div
                  className="fixed inset-0 z-[85] flex items-center justify-center bg-black/75 p-4 sm:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3, ease }}
                  onClick={() => setOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={alt || "Enlarged image"}
                >
                  <button
                    ref={closeRef}
                    type="button"
                    className="absolute top-4 right-4 rounded-full border border-white/30 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white/10"
                    aria-label="Close image"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                  <m.div
                    className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-bg-elevated"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: reduced ? 0 : 0.3, ease }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={alt} className="block h-auto max-h-[90vh] w-auto max-w-full object-contain" />
                  </m.div>
                </m.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </figure>
  )
}
