import {
  ArrowUpDown,
  BadgeCheck,
  BarChart3,
  Bug,
  Cpu,
  Files,
  Flag,
  FileSearch,
  Globe,
  Handshake,
  LineChart,
  Network,
  Package,
  PenTool,
  Plug,
  RefreshCw,
  Scale,
  SearchCode,
  Server,
  SquareKanban,
  Bot,
  Braces,
  Brain,
  ClipboardCheck,
  Compass,
  Database,
  FileSpreadsheet,
  FlaskConical,
  Layers,
  ListChecks,
  Map,
  MessagesSquare,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import {
  siCursor,
  siFigma,
  siGithub,
  siGoogleanalytics,
  siGooglesearchconsole,
  siHtml5,
  siJira,
  siLooker,
  siPython,
  siSupabase,
  type SimpleIcon,
} from "simple-icons"

/** Icon shown in each skill-group header. */
export const groupIcons: Record<string, LucideIcon> = {
  Product: Compass,
  "AI & Data": Brain,
  "Leadership & Delivery": Users,
  "Growth & Platform": TrendingUp,
  Tools: Wrench,
}

/** Official brand marks (Simple Icons, CC0) for tools and languages. */
const brandIcons: Record<string, SimpleIcon> = {
  Python: siPython,
  HTML: siHtml5,
  Jira: siJira,
  Figma: siFigma,
  GA4: siGoogleanalytics,
  "Looker Studio": siLooker,
  "Search Console": siGooglesearchconsole,
  GitHub: siGithub,
  Cursor: siCursor,
  Supabase: siSupabase,
}

/** Generic icons for skills without a brand. */
const skillIcons: Record<string, LucideIcon> = {
  "Product roadmap": Map,
  "Product strategy": Target,
  "Product discovery": Search,
  "PRDs & user stories": ListChecks,
  "A/B testing & experimentation": FlaskConical,
  "Metrics & OKRs": BarChart3,
  "0→1 launches": Rocket,
  "LLM APIs": Bot,
  "Prompt design": Sparkles,
  "Structured outputs": Braces,
  "AI evals": ClipboardCheck,
  SQL: Database,
  "Data pipelines": Workflow,
  Excel: FileSpreadsheet,
  Communication: MessagesSquare,
  "CMS & workflow automation": Layers,
  "Product management": Package,
  "Technical product management": Cpu,
  "Product ownership": BadgeCheck,
  "Strategic planning": Flag,
  Prioritization: ArrowUpDown,
  "Product design & UX": PenTool,
  "Information architecture": Network,
  "Competitive analysis": Scale,
  RAG: FileSearch,
  "Web scraping": Globe,
  "Analytical skills": LineChart,
  "Team management": Users,
  "Stakeholder management": Handshake,
  "Project management": SquareKanban,
  "Agile / Scrum": RefreshCw,
  "Manual testing & UAT": Bug,
  "Technical SEO": SearchCode,
  "Programmatic SEO": Files,
  "APIs & integrations": Plug,
  "DevOps coordination": Server,
}

// Brand colors this dark disappear on a dark background, so they follow the text color instead.
const nearBlack = new Set(["000000", "181717", "191919"])

export function SkillIcon({ name }: { name: string }) {
  const brand = brandIcons[name]
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="size-4 shrink-0"
        fill={nearBlack.has(brand.hex) ? "currentColor" : `#${brand.hex}`}
      >
        <path d={brand.path} />
      </svg>
    )
  }
  const Icon = skillIcons[name]
  return Icon ? <Icon aria-hidden className="size-4 shrink-0 text-accent-ink" /> : null
}
