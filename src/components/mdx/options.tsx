"use client"

import { Check } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export function Options({ children }: { children: ReactNode }) {
  return <ul className="not-prose my-8 grid gap-3">{children}</ul>
}

export function Option({
  title,
  chosen = false,
  children,
}: {
  title: string
  chosen?: boolean
  children?: ReactNode
}) {
  return (
    <li
      className={cn(
        "rounded-2xl border px-5 py-4",
        chosen ? "bg-bg-elevated" : "border-border bg-transparent opacity-80",
      )}
      style={
        chosen
          ? { borderColor: "color-mix(in srgb, var(--study-accent) 55%, var(--border))" }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            chosen ? "border-transparent text-white" : "border-border text-transparent",
          )}
          style={chosen ? { background: "var(--study-accent)" } : undefined}
          aria-hidden
        >
          <Check className="h-3 w-3" strokeWidth={2.5} />
        </span>
        <div>
          <h3 className="text-base text-fg">{title}</h3>
          {chosen ? (
            <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
              Chosen
            </p>
          ) : null}
          <div className="mt-2 text-sm leading-relaxed text-muted [&_p]:m-0 [&_p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </li>
  )
}
