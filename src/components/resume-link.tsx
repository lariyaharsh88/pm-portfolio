"use client"

import { track } from "@vercel/analytics"
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react"
import { buttonClassName } from "@/components/ui/Button"
import { cn } from "@/lib/cn"
import { resumeFile, resumeHref, type ResumeLocation } from "@/lib/resume-path"

function trackResume(location: ResumeLocation) {
  track("resume_download", { location })
}

export function ResumeLink({
  location,
  children,
  variant = "primary",
  download = false,
  className,
  onClick,
  ...props
}: {
  location: ResumeLocation
  children: ReactNode
  variant?: "primary" | "secondary"
  download?: boolean
  className?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "onClick" | "className">) {
  return (
    <a
      href={resumeHref}
      target="_blank"
      rel="noopener noreferrer"
      download={download ? resumeFile : undefined}
      className={buttonClassName(variant, className)}
      onClick={(event) => {
        trackResume(location)
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function ResumeTextLink({
  location,
  children,
  className,
}: {
  location: ResumeLocation
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={resumeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link-draw text-lg text-fg", className)}
      onClick={() => trackResume(location)}
    >
      {children}
    </a>
  )
}
