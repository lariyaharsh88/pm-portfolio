export type ExperienceRole = {
  company: string
  logo: string
  url: string
  title: string
  dates: string
  location?: string
  scope?: string
  bullets: readonly string[]
  tags: readonly string[]
}

export type Education = {
  school: string
  logo: string
  wordmark: string
  credential: string
  dates: string
}

export type SkillGroup = {
  title: string
  items: readonly string[]
}

export const roles = [
  {
    company: "KollegeApply",
    logo: "/logos/kollegeapply.svg",
    url: "https://kollegeapply.com",
    title: "Product Manager",
    dates: "Jan 2025–Present",
    location: "Gurugram",
    scope:
      "Own 6 product lines (SEO platform, lead management, B2B integrations, news portal, CMS) with a 12-person cross-functional team.",
    bullets: [
      "Built the website, CMS and technical SEO from scratch: indexed pages ~150K → 300K+; monthly sessions 94K → 339K peak (3.6×).",
      "78M+ lead-distribution records across 268K+ batches; delivery time cut from 1–2 hours to under 5 minutes; operations team reduced ~75% while clients grew from ~200 to 600+.",
      "Launched an SEO-first news portal: 500K+ sessions in 5 months; CMS automation cut content processing from 4 hours to 10 minutes.",
      "Shipped a B2B integration for 60+ enterprise clients (261K+ leads routed) at 99%+ uptime.",
    ],
    tags: ["SEO", "Leads", "B2B", "CMS"],
  },
  {
    company: "Collegedunia",
    logo: "/logos/collegedunia-icon.png",
    url: "https://collegedunia.com",
    title: "Product Manager",
    dates: "Aug 2023–Sep 2024",
    scope:
      "Drove 240+ initiatives across Collegedunia.com and Prepp.in with 16+ engineers and QA.",
    bullets: [
      "Launched rule-based college ranking pages reaching 98K+ monthly visitors; bounce rate down 40%.",
      "Lifted click-to-lead conversion from 1.94% to 2.78% (+43% relative), plus 3% uplift via cutoff/placement data integration.",
      "Auto-updating content system for 2,000+ colleges: update cycle from 2–3 days to under 1 hour.",
    ],
    tags: ["Rankings", "Conversion", "Content"],
  },
  {
    company: "Collegedunia",
    logo: "/logos/collegedunia-icon.png",
    url: "https://collegedunia.com",
    title: "Associate Product Manager",
    dates: "Mar 2022–Aug 2023",
    bullets: [
      "Promoted from Digital Content Analyst to APM in 7 months (fastest on the team).",
      "Cut manual data processing 50% with bulk-upload workflows; 110+ scrapers for real-time data aggregation.",
      "Google Trends–powered keyword uploader surfacing exam-keyword insights within 24 hours.",
    ],
    tags: ["Data", "Automation", "Keywords"],
  },
  {
    company: "Collegedunia",
    logo: "/logos/collegedunia-icon.png",
    url: "https://collegedunia.com",
    title: "Digital Content Analyst",
    dates: "Aug 2021–Feb 2022",
    bullets: [
      "Promoted to Associate Product Manager in 7 months; Q4 2021-22 Quarterly Performance Award.",
    ],
    tags: ["Content", "Analytics"],
  },
] as const satisfies readonly ExperienceRole[]

export const education = {
  school: "Delhi Technological University",
  logo: "/logos/dtu-icon.png",
  wordmark: "/logos/dtu-wordmark.jpg",
  credential: "B.Tech Electrical Engineering",
  dates: "2017–2021",
} as const satisfies Education

export const skillGroups = [
  {
    title: "Product",
    items: ["Roadmaps", "PRDs", "Experimentation", "OKRs"],
  },
  {
    title: "Technical",
    items: ["Python", "SQL", "Data pipelines", "APIs", "LLM APIs", "Evals"],
  },
  {
    title: "Tools",
    items: ["Jira", "Figma", "GA4", "Search Console", "GitHub", "Cursor"],
  },
] as const satisfies readonly SkillGroup[]
