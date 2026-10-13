import Link from "next/link"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/cn"

type Variant = "primary" | "secondary"

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-accent text-white hover:bg-[color-mix(in_srgb,#000_14%,var(--accent))]",
  secondary:
    "border border-border bg-transparent text-fg hover:border-accent/50 hover:bg-accent-soft",
}

type CommonProps = {
  variant?: Variant
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined
  }

type LinkButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string
  }

export function buttonClassName(variant: Variant = "primary", className?: string) {
  return cn(
    "relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium tracking-tight transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink disabled:pointer-events-none",
    variants[variant],
    className,
  )
}

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps | LinkButtonProps) {
  const classes = buttonClassName(variant, className)

  if (typeof href === "string") {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<LinkButtonProps, keyof CommonProps | "href">)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      {...(props as Omit<ButtonProps, keyof CommonProps | "href">)}
    >
      {children}
    </button>
  )
}
