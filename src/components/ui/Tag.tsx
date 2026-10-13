import type { HTMLAttributes } from "react"
import { cn } from "@/lib/cn"

export function Tag({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-accent-soft px-2.5 py-1 font-mono text-[11px] tracking-[0.14em] text-fg/80 uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
