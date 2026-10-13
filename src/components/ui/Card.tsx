import type { HTMLAttributes } from "react"
import { cn } from "@/lib/cn"

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-bg-elevated p-6 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[color:color-mix(in_srgb,var(--accent)_50%,var(--border))] hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--accent)_35%,transparent),0_18px_40px_-24px_color-mix(in_srgb,var(--accent)_60%,transparent)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
