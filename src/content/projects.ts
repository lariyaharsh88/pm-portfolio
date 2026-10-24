export type ProjectMetric = {
  value: string
  label: string
}

export type ProjectTint = "indigo" | "emerald" | "violet" | "amber"

export type Project = {
  slug: string
  title: string
  outcome: string
  tags: readonly string[]
  metrics: readonly [ProjectMetric, ProjectMetric]
  href?: string
  comingSoon?: boolean
  tint: ProjectTint
}

export const projects = [
  {
    slug: "lead-management-platform",
    title: "From 50 people and spreadsheets to a self-running lead platform",
    outcome: "Delivery dropped from 1–2 hours to under 5 minutes, with about 75% fewer people running ops.",
    tags: ["B2B Platform", "Automation", "Data Systems", "0→1"],
    metrics: [
      { value: "1–2h → 5m", label: "client delivery time" },
      { value: "~75%", label: "fewer people needed to run ops (40–50 → 10–12)" },
    ],
    href: "/work/lead-management-platform",
    tint: "indigo",
  },
  {
    slug: "content-growth-platform",
    title: "Building a content & growth platform from scratch",
    outcome: "Indexed pages doubled to 300K+, and content processing dropped from 4 hours to 10 minutes.",
    tags: ["0→1", "CMS", "Growth / SEO", "Structured Data"],
    metrics: [
      { value: "150K → 300K+", label: "indexed pages" },
      { value: "339K", label: "peak monthly sessions (June)" },
    ],
    href: "/work/content-growth-platform",
    tint: "emerald",
  },
  {
    slug: "products",
    title: "Products I've built and shipped",
    outcome: "RankFlowHQ (AI SEO workflow), its Education Hub, HarshOnRoads (grounded AI trip planner), Kundli Jyoti, PayHours Calc and AniLumi. All six are live.",
    tags: ["Applied AI", "Independent", "Live"],
    metrics: [
      { value: "6", label: "live products" },
      { value: "0→1", label: "idea to shipped, solo" },
    ],
    href: "/products",
    tint: "violet",
  },
] as const satisfies readonly Project[]
