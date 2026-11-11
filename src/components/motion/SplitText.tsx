"use client"

import { createElement, Fragment } from "react"
import { cn } from "@/lib/cn"
import { useEnterView } from "@/lib/use-enter-view"

type SplitTag = "h1" | "h2" | "h3" | "p" | "span"

type SplitTextProps = {
  text: string
  as?: SplitTag
  className?: string
  instant?: boolean
}

/**
 * Headline whose words rise from behind a mask as it scrolls into view.
 * Server HTML is the plain, fully visible text; only below-the-fold headings animate.
 */
export function SplitText({ text, as = "h2", className, instant }: SplitTextProps) {
  const [ref, state] = useEnterView<HTMLElement>(0.4)
  const base = cn("font-heading tracking-[-0.02em]", className)
  if (instant) return createElement(as, { className: base }, text)

  const words = text.split(" ")
  return createElement(
    as,
    { ref, className: base },
    words.map((word, i) => (
      <Fragment key={i}>
        <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className={cn(
              "inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              state === "waiting" && "translate-y-[110%]",
            )}
            style={state === "entered" ? { transitionDelay: `${i * 55}ms` } : undefined}
          >
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    )),
  )
}
