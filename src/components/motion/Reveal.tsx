import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  amount?: number
  from?: "up" | "left" | "right"
  instant?: boolean
}

export function Reveal({ children, className }: RevealProps) {
  return <div className={cn(className)}>{children}</div>
}
