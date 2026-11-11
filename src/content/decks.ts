// Product decks: one per product, using standard PM terms. Rendered as an in-page slide
// deck (components/products/product-deck.tsx) and as a printable PDF at /deck/<slug>.
// Keep metrics as what each product measures; only state results that are verified elsewhere.

export type Deck = {
  slug: string
  problem: string
  icp: string
  jtbd: string
  valueProp: string
  alternatives: readonly string[]
  northStar: { metric: string; why: string }
  kpis: readonly string[]
  gtm: readonly string[]
  monetisation: string
  decisions: readonly { title: string; tradeoff: string }[]
  roadmap: { now: string; next: string; later: string }
}

export const decks: readonly Deck[] = [
  {
    slug: "kundlijyoti",
    problem:
      "Astrology apps in India lead with fear and upsells. Users can't tell what was calculated and what was made up, and generic chatbots invent planetary placements.",
    icp: "Indian adults aged 20–40 checking marriage compatibility, families keeping profiles for parents and kids, and daily rashifal readers.",
    jtbd: "\"When I'm making a big decision, help me understand what my chart actually says, without scaring me into buying something.\"",
    valueProp: "Readings computed from real planetary positions, explained like a friend would. Free, private, no ₹5,000 gemstone upsell.",
    alternatives: ["AstroTalk-style paid chat apps", "Generic AI chatbots", "Family pandit"],
    northStar: { metric: "Weekly returning users", why: "Astrology is a habit product. Coming back for the daily rashifal shows trust better than one-off kundli downloads." },
    kpis: ["Kundli completion rate", "Day-7 return rate", "WhatsApp shares per 100 kundlis", "Report unlocks (after pilot)"],
    gtm: ["SEO: daily rashifal, panchang and festival pages", "WhatsApp sharing of results", "Installable PWA for repeat use"],
    monetisation: "Free pilot first. A ₹199 detailed kundli report is built (Razorpay) and switches on only once retention is proven.",
    decisions: [
      { title: "Compute first, AI only explains", tradeoff: "Less \"magical\" chat, but no invented placements." },
      { title: "Birth data stays on the device", tradeoff: "No cloud history, but privacy becomes the pitch." },
      { title: "Free pilot before payments", tradeoff: "Delays revenue so pricing rests on real retention." },
    ],
    roadmap: { now: "Measure return visits and shares", next: "Festival and muhurat pages ahead of each festival", later: "Turn on the ₹199 report and test price points" },
  },
  {
    slug: "anilumi",
    problem:
      "Fans juggle wikis, Reddit and streaming apps to answer simple questions: what airs tonight, what order to watch a franchise in, and where to watch it.",
    icp: "Anime fans on phones in South Asia, especially viewers looking for Hindi dubs, plus newcomers asking where to start a long franchise.",
    jtbd: "\"When I want to start or keep up with a show, tell me what to watch next, when it airs for me, and where I can watch it.\"",
    valueProp: "Every common fan question answered on one fast page: local-time schedules, auto-built watch orders, binge times and where to watch. No sign-up.",
    alternatives: ["MyAnimeList", "Fandom wikis", "Reddit threads", "Streaming app search"],
    northStar: { metric: "Weekly engaged visitors (2+ pages)", why: "Discovery sites win when one answer leads to the next question, not on single bounces from search." },
    kpis: ["Search clicks per page type", "Pages per visit", "Watchlist adds", "Share of mobile and Hindi-page traffic"],
    gtm: ["Long-tail SEO: watch order, binge time and parents' guide pages per show", "Hindi dub pages for the audience the data revealed", "Bing and Google discovery"],
    monetisation: "Affiliate links (manga and merchandise) once traffic is steady; display ads later. Measured as revenue per 1,000 visits.",
    decisions: [
      { title: "Two data sources with graceful failure", tradeoff: "More code, but an API outage never becomes a false 404." },
      { title: "Follow Google's rating rules", tradeoff: "Lost star snippets, kept search trust." },
      { title: "Paid edge hosting (~$5/mo)", tradeoff: "Small cost for fast pages close to users in India." },
    ],
    roadmap: { now: "Grow Hindi dub coverage", next: "Dub release alerts and a Hindi page per show", later: "Affiliate revenue and community features" },
  },
  {
    slug: "payhourscalc",
    problem:
      "People searching for a time card or overtime calculator land on slow, ad-stuffed pages that get edge cases wrong, like overnight shifts and state overtime rules.",
    icp: "US hourly workers checking a paycheck, shift managers, and small-business owners running payroll without software.",
    jtbd: "\"When I need to know what I'm owed or what to pay, give me the right number in seconds, with the rules for my state.\"",
    valueProp: "Fast, private calculators that get the edge cases right, with no account and pages that print clean.",
    alternatives: ["Calculator.net-style generic sites", "Payroll software free tools", "Spreadsheets"],
    northStar: { metric: "Calculations completed per week", why: "Each completed calculation is a solved job, and it maps directly to ad and affiliate revenue." },
    kpis: ["Search impressions and clicks", "Calculator completion rate", "Pages per visit", "Revenue per 1,000 visits (RPM)"],
    gtm: ["Programmatic SEO: 415 pages incl. \"$X an hour is how much a year\" and 2026 state tax pages", "Keyword-led page selection", "Outreach to state-specific publications"],
    monetisation: "Display ads plus a payroll-software affiliate (Gusto) for small-business owners. Target: high-RPM US traffic.",
    decisions: [
      { title: "Keyword data before code", tradeoff: "Slower start, but every page targets real demand (~900K searches/month)." },
      { title: "Fully static pages on the edge", tradeoff: "No saved history, but instant loads at near-zero cost." },
    ],
    roadmap: { now: "Index all 415 pages and track clicks", next: "Minimum wage by state and more tax pages", later: "Apply for ads and the Gusto affiliate at traffic threshold" },
  },
  {
    slug: "rankflowhq-tools",
    problem:
      "Paid acquisition is expensive in SEO software, but the same users search daily for small fixes, and most free tools hide results behind sign-ups and watermarks.",
    icp: "Bloggers, small-business owners, marketers and freelancers who run websites: the same people who need RankFlowHQ.",
    jtbd: "\"When I need a quick SEO or site check, let me do it now, for free, without creating an account.\"",
    valueProp: "15 genuinely free tools with no sign-up, no watermark and no limits. Most run in the browser, so nothing is uploaded.",
    alternatives: ["Ahrefs and Semrush free tools (sign-up walls)", "Small single-purpose tool sites"],
    northStar: { metric: "Tool runs per week", why: "A run means a solved problem, which is the trust that leads to RankFlowHQ trials." },
    kpis: ["Search clicks per tool page", "Runs per visit", "Click-through to RankFlowHQ", "Email sign-ups per 100 runs"],
    gtm: ["SEO: one guide-backed page per tool", "Shareable result links", "Cross-links from RankFlowHQ and the blog"],
    monetisation: "Free forever. The hub is a top-of-funnel channel; revenue comes from RankFlowHQ Pro ($49/mo).",
    decisions: [
      { title: "No sign-up wall, ever", tradeoff: "Fewer captured emails, far more trust and search traffic." },
      { title: "Rated v1 a 5.5/10, rebuilt in 5 phases", tradeoff: "A week of rework for a product worth ranking." },
    ],
    roadmap: { now: "Collect usage data per tool", next: "Double down on the most-used tools", later: "Saved reports that hand off into RankFlowHQ" },
  },
  {
    slug: "education-hub",
    problem:
      "Education news moves fast. Editorial teams check sources by hand, miss trending searches and publish too late to rank.",
    icp: "Education publishers and content editors in India.",
    jtbd: "\"When a big exam or admission update breaks, help me publish an accurate, search-ready story before competitors.\"",
    valueProp: "One workflow from source monitoring to an indexable, SEO-ready story, prioritised by what students are searching right now.",
    alternatives: ["Manual RSS readers and Google Alerts", "Generic AI writers"],
    northStar: { metric: "Stories indexed within 24 hours of the news", why: "News SEO rewards speed; a story indexed a day late rarely ranks." },
    kpis: ["Time from source to published page", "Indexing rate", "Search clicks per story", "Editor edits per story"],
    gtm: ["Live showcase of the RankFlowHQ pipeline", "SEO on education news pages", "Links to RankFlowHQ for publishers"],
    monetisation: "Showcase and lead source for RankFlowHQ; publisher plans later.",
    decisions: [
      { title: "Dogfood in a domain I know", tradeoff: "Narrow vertical, but expert-level quality judgement." },
      { title: "Trends drive the queue", tradeoff: "Skips some news, but focuses on what people search." },
    ],
    roadmap: { now: "Automated news and trends pages", next: "Editor review workflow", later: "Offer the stack to other publishers" },
  },
  {
    slug: "harshonroads",
    problem:
      "Generic AI trip planners invent places, timings and distances. Travellers need plans they can actually drive, within their days and budget.",
    icp: "Weekend travellers and road-trippers in India, especially from Delhi NCR: working professionals, students on a budget, and drivers.",
    jtbd: "\"When I have a free weekend, tell me where I can realistically go, how long it takes, and what it will cost.\"",
    valueProp: "Itineraries built from verified destination data first, with AI-researched plans clearly labelled. English and Hindi.",
    alternatives: ["ChatGPT trip plans", "Travel blogs and reels", "Tour operators"],
    northStar: { metric: "Trip plans generated and saved", why: "A saved plan means the user trusts it enough to use it." },
    kpis: ["Plans per visitor", "Plan-to-save rate", "Return visits before a long weekend", "Search clicks on destination pages"],
    gtm: ["My own travel content: 264+ YouTube Shorts and Instagram", "Destination and itinerary SEO", "Long-weekend finder as a recurring hook"],
    monetisation: "Hotel and travel affiliates once traffic reaches ~1K visits/day; own trips later.",
    decisions: [
      { title: "Verified data first, labelled AI fallback", tradeoff: "Slower coverage, but plans users can trust." },
      { title: "Content as the acquisition channel", tradeoff: "My time, not ad spend, but compounding reach." },
    ],
    roadmap: { now: "Two new destinations and two articles a week", next: "Affiliate links at 1K visits/day", later: "Run my own group trips" },
  },
  {
    slug: "rankflowhq",
    problem:
      "SEO writers stitch together prompts, keyword tools, SERP checks and docs. Chat tools write fluently but don't research what ranks, so drafts are generic and slow to fix.",
    icp: "Bloggers, small businesses and SaaS content teams, and agencies or freelancers writing for clients.",
    jtbd: "\"When I need an article that can rank, give me a researched, cited first draft so I only add my own expertise.\"",
    valueProp: "Type a keyword, get a researched, cited, SEO-packaged article in about 3 minutes, built from what already ranks on Google.",
    alternatives: ["ChatGPT", "Surfer SEO", "Jasper"],
    northStar: { metric: "Articles published by active users per week", why: "Publishing, not generating, shows the output was good enough to use." },
    kpis: ["Sign-up → first article (activation)", "Articles per active user", "Free → Pro conversion", "Edit distance before publishing"],
    gtm: ["Free tools hub as top of funnel", "Education Hub as a live showcase", "SEO blog"],
    monetisation: "Freemium: 5 free articles with no card, then Pro at $49/month for unlimited articles and deeper research.",
    decisions: [
      { title: "A pipeline, not a chat box", tradeoff: "Less flexible, but repeatable quality at volume." },
      { title: "Grounding with citations", tradeoff: "Slower and costlier per article, but fewer chances to invent facts." },
      { title: "One job on the homepage", tradeoff: "Hides other features, lifts first-run clarity." },
    ],
    roadmap: { now: "Measure activation and Pro conversion", next: "Publish an evaluation report (pass rate, cost per article)", later: "Learn from user edits to improve drafts" },
  },
]

export function getDeck(slug: string) {
  return decks.find((deck) => deck.slug === slug)
}
