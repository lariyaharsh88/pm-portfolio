import type { TimelineItem } from "@/components/mdx/timeline"
import type { EvalRow } from "@/components/rankflow/eval-table"

export const rankflowQuotes = [
  { id: "quote-1", quote: "TODO", name: "TODO", role: "TODO" },
  { id: "quote-2", quote: "TODO", name: "TODO", role: "TODO" },
  { id: "quote-3", quote: "TODO", name: "TODO", role: "TODO" },
] as const

export const mvpIn = ["TODO", "TODO", "TODO", "TODO"] as const
export const mvpOut = ["TODO", "TODO", "TODO", "TODO"] as const

export const architectureSteps = [
  "Input URLs",
  "Search/Retrieval API",
  "LLM (structured output)",
  "Schema validation",
  "Brief + citations",
  "User feedback",
] as const

export const evalRows = [
  { label: "Test set size", value: "TODO" },
  { label: "Success rate", value: "TODO" },
  { label: "Unsupported-claim rate", value: "TODO" },
  { label: "Avg latency", value: "TODO" },
  { label: "Cost per brief", value: "TODO" },
] as const satisfies readonly EvalRow[]

export const failureModes = ["TODO", "TODO", "TODO"] as const

export const iterationLog = [
  { date: "TODO", title: "TODO", text: "TODO" },
  { date: "TODO", title: "TODO", text: "TODO" },
  { date: "TODO", title: "TODO", text: "TODO" },
] as const satisfies readonly TimelineItem[]

export const limitations = ["TODO", "TODO", "TODO"] as const
export const nextSteps = ["TODO", "TODO", "TODO"] as const
