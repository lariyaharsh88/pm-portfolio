export type Product = {
  slug: string
  name: string
  url: string
  urlLabel: string
  tagline: string
  screenshot: string
  caseStudy?: string
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
    tagline: "Type a keyword, get a researched, SEO-ready article: RankFlowHQ reads what already ranks on Google, then writes a cited long-form draft in about 3 minutes.",
    screenshot: "/products/rankflowhq.jpg",
    caseStudy: "/work/rankflowhq",
    accent: "#0369a1",
    problem:
      "SEO writers stitch together chat prompts, keyword tools, SERP checks and docs. A chat window writes fluently but doesn't research what ranks, so drafts are generic and slow to fix.",
    users: "Bloggers, small businesses and SaaS teams, and agencies or freelancers writing for clients.",
    flow: ["Keyword", "Read what ranks on Google", "Questions people ask", "Outline", "Cited draft", "SEO title & meta"],
    features: [
      "One-box homepage: enter a keyword and get a 1,500–2,500 word article with sources, FAQs, an SEO title and a meta description",
      "Free account with 5 articles and no card; Pro at $49/month for unlimited articles and deeper research",
      "Articles saved to a dashboard to edit, copy or download",
      "Bulk article agent and repurpose-from-URL",
      "Free AI SEO toolkit: keyword clustering, visibility grader, off-page and outreach tools",
    ],
    decisions: [
      {
        title: "A pipeline, not a chat box",
        body: "ChatGPT is great for brainstorming but doesn't research before it writes. RankFlowHQ reads the pages already ranking and the questions people ask, then plans the article around them, so every draft meets the same standard.",
      },
      {
        title: "One job on the homepage",
        body: "I cut the homepage from a platform pitch to a single keyword box and button. A full sample run sits below it, so visitors see real output before they start.",
      },
      {
        title: "Grounding over fluency",
        body: "Drafts are built from retrieved research with citations rather than the model's memory. That reduces confident-but-wrong content, the main failure of AI writing tools.",
      },
      {
        title: "Free tools as the acquisition channel",
        body: "The free SEO toolkit and the Education Hub's news pages bring in search traffic. Five free articles and a $49 Pro plan turn that traffic into users.",
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
    accent: "#4f46e5",
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
    tagline: "An India trip planner that builds itineraries from verified destination data first, and clearly labels anything AI-researched.",
    screenshot: "/products/harshonroads.jpg",
    caseStudy: "/work/harshonroads",
    accent: "#b45309",
    problem:
      "Generic AI trip planners hallucinate places, timings and distances. Travelers need plans they can actually drive.",
    users: "Weekend travelers and road-trippers in India, especially from Delhi NCR.",
    flow: ["Budget, days & style", "Verified destination data", "Ranking & matching", "Day-by-day itinerary"],
    features: [
      "AI trip planner: day-by-day itineraries from verified places (AI-researched plans for other cities are clearly labelled), with route map, drive times, plain-language edits, English and Hindi",
      "Weekend finder ranking destinations by budget, days, distance, transport and travel style",
      "Interactive India map with seasons and quick facts",
      "Side-by-side destination comparison on distance, budget, season and editorial scores",
      "Curated itineraries and a season-by-season guide",
      "Distribution through my own travel channels: 264+ YouTube Shorts and Instagram as @harshonroads",
    ],
    decisions: [
      {
        title: "Verified data first, labelled AI fallback",
        body: "For verified destinations, the planner may only use places in the verified database, so it can't invent an attraction. For other cities it still produces a plan, clearly marked as AI-researched, so users know how far to trust it.",
      },
      {
        title: "Content as the acquisition channel",
        body: "I create the travel content myself (264+ Shorts on YouTube and Instagram), so the product grows on its own distribution instead of paid acquisition. Every trip becomes both a video and a verified itinerary.",
      },
      {
        title: "Structured tools beside the AI",
        body: "Not every question needs an LLM. The weekend finder, map and compare tool are deterministic, so they're fast and predictable, with AI used where it adds value.",
      },
    ],
  },
  {
    slug: "kundlijyoti",
    name: "Kundli Jyoti",
    url: "https://kundlijyoti.com/",
    urlLabel: "kundlijyoti.com",
    tagline: "A Vedic astrology app that computes kundli, matching and dasha from real planetary positions, then explains them in plain language.",
    screenshot: "/products/kundlijyoti.jpg",
    accent: "#ea580c",
    problem:
      "Astrology apps in India lean on fear and upsells: a scary dosha, then a ₹5,000 gemstone. Users can't tell what was calculated and what was made up.",
    users: "Indian users who want a kundli, a marriage match or a daily rashifal without a sales pitch.",
    flow: ["Birth details", "Planetary computation", "Kundli & dasha", "Plain-language reading"],
    features: [
      "Free kundli, kundli matching and dasha timelines computed on the device",
      "Daily rashifal for 12 signs, panchang for 12 cities and 27 nakshatra pages, refreshed hourly",
      "Ask Jyoti chat backed by a rule-based astrologer, with an LLM layer when a provider is configured",
      "Detailed kundli report, free during the beta",
      "Installable PWA with family profiles and WhatsApp sharing",
    ],
    decisions: [
      {
        title: "Computed, not guessed",
        body: "Every reading starts from calculated planetary positions. The language model only explains the result, so it can't invent a placement.",
      },
      {
        title: "Free pilot before payments",
        body: "Razorpay checkout is built but switched off. I'm measuring reach and retention first, and will only charge once people come back on their own.",
      },
      {
        title: "Privacy as the pitch",
        body: "Birth details stay on the user's device. In a category known for upselling, that trust is the main point of difference.",
      },
    ],
  },
  {
    slug: "payhourscalc",
    name: "PayHours Calc",
    url: "https://payhourscalc.com/",
    urlLabel: "payhourscalc.com",
    tagline: "Fast, private calculators for US hourly workers and small-business payroll, built as a programmatic SEO site.",
    screenshot: "/products/payhours.jpg",
    accent: "#0d7354",
    problem:
      "People searching for a time card or overtime calculator land on slow, ad-stuffed pages that get edge cases wrong, like overnight shifts or state overtime rules.",
    users: "US hourly workers, shift managers and small-business owners running payroll.",
    flow: ["Keyword research", "Calculator", "Programmatic pages", "Search Console"],
    features: [
      "10 calculators: time card, hours, overtime, hourly↔salary, pay raise, military time and 2026 military pay",
      "Overtime rules for all 51 states and pay tables for 25 military grades",
      "200+ programmatic pages such as \"$25 an hour is how much a year\"",
      "300+ static pages served from Cloudflare's edge, no account and no upload needed",
    ],
    decisions: [
      {
        title: "Keyword data before code",
        body: "I picked the niche from Google Keyword Planner data: about 900K US searches a month across the cluster, low ad competition, and weak existing results for pages like the pay raise calculator.",
      },
      {
        title: "Static and fast",
        body: "Every page is pre-rendered and served from the edge, so the calculators load instantly and hosting costs almost nothing.",
      },
    ],
  },
  {
    slug: "anilumi",
    name: "AniLumi",
    url: "https://anilumi.in/",
    urlLabel: "anilumi.in",
    tagline: "An anime discovery site: airing schedule in your time zone, seasonal charts, auto-built watch orders and a binge planner.",
    screenshot: "/products/anilumi.jpg",
    accent: "#db2777",
    problem:
      "Fans juggle wikis, Reddit threads and streaming apps to answer simple questions: what airs tonight, what order to watch a franchise in, and how long it will take.",
    users: "Anime fans, from newcomers asking where to start to regulars tracking the current season.",
    flow: ["Kitsu + AniList data", "Hourly refresh", "Schedules & charts", "Watch orders & tools"],
    features: [
      "Weekly schedule in local time with next-episode countdowns",
      "Watch-order pages built from franchise relationships, with 53 editor notes",
      "Binge planner, \"what to watch tonight\" picker, tier lists and a watchlist that needs no sign-up",
      "Character, studio, voice-actor and genre-trend pages, plus RSS and iCal feeds",
    ],
    decisions: [
      {
        title: "Two data sources, graceful fallback",
        body: "Kitsu supplies the catalogue and AniList fills in airing times Kitsu lacks. When an upstream API goes down, the site degrades instead of showing false 404s.",
      },
      {
        title: "Long-tail pages as the growth engine",
        body: "Each title gets watch-order, how-long-to-watch, parents' guide and next-season pages, which match the questions fans actually search.",
      },
    ],
  },
] as const satisfies readonly Product[]
