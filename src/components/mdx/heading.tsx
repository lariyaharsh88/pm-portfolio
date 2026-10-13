import { isValidElement, type ComponentProps, type ReactNode } from "react"
import { slugify } from "@/lib/slug"
import { cn } from "@/lib/cn"

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children)
  return ""
}

export function CaseH2({ children, className, id, ...props }: ComponentProps<"h2">) {
  const headingId = id || slugify(nodeText(children))

  return (
    <h2 {...props} id={headingId} className={cn("scroll-mt-28", className)}>
      {children}
    </h2>
  )
}
