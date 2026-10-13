import { createElement } from "react"
import { cn } from "@/lib/cn"

type SplitTag = "h1" | "h2" | "h3" | "p" | "span"

type SplitTextProps = {
  text: string
  as?: SplitTag
  className?: string
  instant?: boolean
}

export function SplitText({ text, as = "h2", className }: SplitTextProps) {
  return createElement(
    as,
    { className: cn("font-heading tracking-[-0.02em]", className) },
    text,
  )
}
