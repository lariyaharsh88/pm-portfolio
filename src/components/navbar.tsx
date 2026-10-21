"use client"

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"
import { Magnetic } from "@/components/motion/Magnetic"
import { ThemeToggle } from "@/components/theme-toggle"
import { ResumeLink } from "@/components/resume-link"
import { SocialLinks } from "@/components/social-links"
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe"
import { cn } from "@/lib/cn"
import { ease } from "@/lib/motion"
import { navLinks } from "@/lib/site"

export function Navbar({ hasResume = false }: { hasResume?: boolean }) {
  const pathname = usePathname()
  const reduced = useReducedMotionSafe()
  const lenis = useLenis()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40)
  })

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false
        openButtonRef.current?.focus()
      }
      return
    }

    wasOpen.current = true
    const html = document.documentElement
    const previous = html.style.overflow
    html.style.overflow = "hidden"
    lenis?.stop()
    const root = menuRef.current

    function focusable() {
      if (!root) return []
      return Array.from(
        root.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((node) => !node.hasAttribute("disabled"))
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        return
      }
      if (event.key !== "Tab" || !root) return
      const items = focusable()
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      const inside = active instanceof Node && root.contains(active)
      if (!inside) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
        return
      }
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia("(min-width: 768px)")
    function onBreakpoint() {
      if (desktop.matches) setOpen(false)
    }

    const frame = requestAnimationFrame(() => focusable()[0]?.focus())
    window.addEventListener("keydown", onKey)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      cancelAnimationFrame(frame)
      html.style.overflow = previous
      lenis?.start()
      window.removeEventListener("keydown", onKey)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open, lenis])

  return (
    <>
      <div inert={open} className="fixed inset-x-0 top-0 z-[66] flex justify-center">
        <nav
          aria-label="Primary"
          className={cn(
            "pointer-events-auto relative flex items-center gap-1 transition-[border-radius] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            scrolled
              ? "mt-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full border border-border bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] px-2 py-1.5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "w-full rounded-none border-b border-border bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] px-5 py-3 backdrop-blur-xl md:px-8",
          )}
        >
          <Link
            href="/"
            aria-label="Harsh Lariya, Product Manager · Applied AI. Home"
            className="group flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 text-fg"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--accent),#a78bfa)] font-mono text-[13px] font-semibold text-white shadow-[0_6px_20px_-8px_var(--accent)] transition-transform duration-300 group-hover:-rotate-6"
            >
              HL
            </span>
            <span className={cn("flex flex-col leading-tight", scrolled && "hidden sm:flex")}>
              <span className="text-sm font-semibold tracking-tight">Harsh Lariya</span>
              {!scrolled ? (
                <span className="hidden text-[11px] text-muted lg:block">Product Manager · Applied AI</span>
              ) : null}
            </span>
          </Link>

          <div
            className={cn(
              "hidden items-center md:flex",
              scrolled ? "" : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            )}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors duration-300",
                    active ? "text-fg" : "text-muted hover:text-fg",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {active ? (
                    <span className="absolute inset-0 rounded-full bg-fg/[0.06]" />
                  ) : null}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className={cn("flex items-center gap-1", scrolled ? "ml-1" : "ml-auto")}>
            <SocialLinks className="hidden md:flex" />
            <ThemeToggle />
            {hasResume ? (
              <Magnetic className="hidden md:inline-flex">
                <ResumeLink location="nav" data-cursor="view" className="h-10 px-4 text-[13px]">
                  Resume
                </ResumeLink>
              </Magnetic>
            ) : null}
            <button
              ref={openButtonRef}
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg transition-colors duration-300 hover:bg-accent-soft md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            ref={menuRef}
            id="site-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[68] flex flex-col bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease }}
          >
            <div className="flex justify-end px-5 py-4">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors duration-300 hover:bg-accent-soft"
                aria-label="Close menu"
                aria-controls="site-menu"
                onClick={() => setOpen(false)}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-heading text-4xl tracking-[-0.02em] transition-colors duration-300 hover:text-fg sm:text-5xl",
                      active ? "text-fg" : "text-muted",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-8 flex items-center gap-3">
                <SocialLinks />
                <ThemeToggle />
                {hasResume ? (
                  <ResumeLink
                    location="nav-menu"
                    className="h-10 px-4 text-[13px]"
                    onClick={() => setOpen(false)}
                  >
                    Resume
                  </ResumeLink>
                ) : null}
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
