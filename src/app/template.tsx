import type { ReactNode } from "react"

export default function Template({ children }: { children: ReactNode }) {
  return <div className="pt-24 print:pt-0">{children}</div>
}
