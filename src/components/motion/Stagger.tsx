import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

type StaggerProps = {
  children: ReactNode
  className?: string
  staggerChildren?: number
}

export function Stagger({ children, className }: StaggerProps) {
  return <div className={cn(className)}>{children}</div>
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={cn(className)}>{children}</div>
}
