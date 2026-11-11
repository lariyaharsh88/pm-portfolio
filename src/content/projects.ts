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
    slug: "rankflowhq-ai",
    title: "RankFlowHQ: building, guarding and auditing an AI writing product",
    outcome: "An 8-step grounded pipeline from keyword to cited article, with model fallbacks, a quality gate, cost limits, and an honest audit of what my evaluation was missing.",
    tags: ["AI Product Management", "LLM Evaluation", "0→1"],
    metrics: [
      { value: "~3 min", label: "keyword to researched, SEO-ready article" },
      { value: "7", label: "Gemini models in the automatic fallback chain" },
    ],
    href: "/work/rankflowhq",
    tint: "indigo",
  },
  {
    slug: "product-strategy",
    title: "Choosing what to build: my products as a portfolio of bets",
    outcome: "How I scored opportunities, launched the cheapest tests first, decided what not to build, and let real data change two roadmaps within days.",
    tags: ["Product Strategy", "Prioritisation", "Market Sizing"],
    metrics: [
      { value: "3", label: "new products launched in three days" },
      { value: "~900K", label: "monthly US searches behind the PayHours niche" },
    ],
    href: "/work/product-strategy",
    tint: "amber",
  },
  {
    slug: "products",
    title: "Products I've built and shipped",
    outcome: "Kundli Jyoti, AniLumi, PayHours Calc, RankFlowHQ Free Tools, the Education Hub, HarshOnRoads and RankFlowHQ. All seven are live.",
    tags: ["Applied AI", "Independent", "Live"],
    metrics: [
      { value: "7", label: "live products" },
      { value: "0→1", label: "idea to shipped, solo" },
    ],
    href: "/products",
    tint: "violet",
  },
] as const satisfies readonly Project[]
