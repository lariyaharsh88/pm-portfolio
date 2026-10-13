import { Callout } from "@/components/mdx/callout"
import { Compare } from "@/components/mdx/compare"
import { DataLayerDiagram } from "@/components/mdx/data-layer-diagram"
import { Figure } from "@/components/mdx/figure"
import { CaseH2 } from "@/components/mdx/heading"
import { Metric } from "@/components/mdx/metric"
import { Option, Options } from "@/components/mdx/options"
import { Section } from "@/components/mdx/section"
import { SessionsChart } from "@/components/mdx/sessions-chart"
import { StatusBreakdown } from "@/components/mdx/status-breakdown"
import { CaseTable, CaseTd, CaseTh } from "@/components/mdx/table"
import { Timeline } from "@/components/mdx/timeline"
import { WorkflowCompare } from "@/components/mdx/workflow-compare"

export const mdxComponents = {
  h2: CaseH2,
  table: CaseTable,
  th: CaseTh,
  td: CaseTd,
  Section,
  Callout,
  Metric,
  Compare,
  Options,
  Option,
  Figure,
  Timeline,
  WorkflowCompare,
  StatusBreakdown,
  DataLayerDiagram,
  SessionsChart,
}
