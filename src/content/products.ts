export type Product = {
  slug: string
  name: string
  url: string
  urlLabel: string
  tagline: string
  screenshot: string
  accent: string
  problem: string
  users: string
  flow: readonly string[]
  features: readonly string[]
  decisions: readonly { title: string; body: string }[]
}

// Only facts visible on the live products. Add real usage and eval numbers here once you can verify them.
export const products = [
  {
    slug: "rankflowhq",
    name: "RankFlowHQ",
    url: "https://rankflowhq.com/",
    urlLabel: "rankflowhq.com",
    tagline: "An AI SEO workflow that takes a keyword to a publish-ready, cited article in one guided pipeline.",
    screenshot: "/products/rankflowhq.jpg",
    accent: "#38bdf8",
    problem:
      "SEO teams stitch together chat prompts, keyword tools, optimizers and docs. Handoffs are slow, quality is inconsistent, and nothing scales past a few articles a week.",
    users: "Bloggers, SaaS content teams and SEO agencies.",
    flow: ["Keyword", "Clustering & intent", "SERP research", "Outline", "Cited draft", "SEO packaging"],
    features: [
      "No-signup interactive demo: one keyword in, a first result in seconds",
      "Full SEO article agent and a bulk article agent that saves drafts to the user's account",
      "Keyword clustering for topic and SERP planning",
      "Search visibility grader",
      "Output packaged with FAQs, internal links and SEO title/description",
    ],
    decisions: [
      {
        title: "A pipeline, not a chat box",
        body: "ChatGPT is great for brainstorming but has no repeatable process. I structured RankFlowHQ as fixed stages (research → outline → draft → audit) so every article meets the same standard and can be produced at volume.",
      },
      {
        title: "Time to value under a minute",
        body: "The homepage demo needs no signup: enter one keyword and see output straight away. For a new AI tool, trust comes from seeing a real result before handing over an email.",
      },
      {
        title: "Grounding over fluency",
        body: "Drafts are built from SERP and research inputs with citations, rather than the model's memory, to reduce confident-but-wrong content, the main failure mode of AI writing tools.",
      },
      {
        title: "Positioned against the workflow, not one feature",
        body: "Surfer scores a page and Jasper writes copy. RankFlowHQ's positioning is running the whole program, from research to published page.",
      },
    ],
  },
  {
    slug: "education-hub",
    name: "RankFlowHQ Education Hub",
    url: "https://education.rankflowhq.com/",
    urlLabel: "education.rankflowhq.com",
    tagline: "An automated news and trends stack that turns education headlines into indexable, SEO-ready stories.",
    screenshot: "/products/education.jpg",
    accent: "#818cf8",
    problem:
      "Education news moves fast. Editorial teams manually check sources, miss trending searches, and publish too late to rank.",
    users: "Education publishers and content editors. It is also a live showcase of RankFlowHQ's pipeline in a vertical I know well.",
    flow: ["Sitemaps & RSS", "Real-time scan", "News aggregator", "AI repurpose", "SEO publish"],
    features: [
      "News aggregator tracking established education domains via RSS and sitemaps",
      "Education Google Trends explorer with geo presets and trend windows",
      "Repurposed news published as crawlable, indexable pages under /news",
      "Editor workspace to bulk-create and manage blog drafts",
    ],
    decisions: [
      {
        title: "Dogfooding in my own domain",
        body: "I applied the RankFlowHQ engine to education, where I've spent 5 years building SEO and content platforms, so I could judge output quality like an expert instead of guessing.",
      },
      {
        title: "Trends drive the queue",
        body: "Pairing the aggregator with Google Trends means editors prioritize stories people are actively searching for, not just whatever was published most recently.",
      },
    ],
  },
  {
    slug: "harshonroads",
    name: "HarshOnRoads",
    url: "https://www.harshonroads.com/",
    urlLabel: "harshonroads.com",
    tagline: "An India road-trip planner that builds itineraries from verified destination data, not invented attractions.",
    screenshot: "/products/harshonroads.jpg",
    accent: "#d97706",
    problem:
      "Generic AI trip planners hallucinate places, timings and distances. Travelers need plans they can actually drive.",
    users: "Weekend travelers and road-trippers in India, especially from Delhi NCR.",
    flow: ["Budget, days & style", "Verified destination data", "Ranking & matching", "Day-by-day itinerary"],
    features: [
      "Trip planner that builds day-by-day itineraries from verified destination data",
      "Weekend finder ranking destinations by budget, days, distance, transport and travel style",
      "Interactive India map with seasons and quick facts",
      "Side-by-side destination comparison on distance, budget, season and editorial scores",
      "Curated itineraries and a season-by-season guide",
    ],
    decisions: [
      {
        title: "Constrain the AI to a curated dataset",
        body: "The planner composes itineraries only from destinations and data I've verified. Accepting less coverage was the trade-off for removing the hallucination problem entirely.",
      },
      {
        title: "Structured tools beside the AI",
        body: "Not every question needs an LLM. The weekend finder, map and compare tool are deterministic, so they're fast and predictable, with AI used where it adds value.",
      },
    ],
  },
] as const satisfies readonly Product[]
