import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { pageMetadata } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "How I work",
  description:
    "Harsh Lariya's product playbook: how he finds problems, scores bets, writes specs, evaluates AI features, cleans data and decides what to keep, grow or stop. With links to the work that shows each step.",
  path: "/how-i-work",
})

// Each step links to the case study or note where it actually happened, so every claim has evidence.
const steps = [
  {
    n: "01",
    title: "Start where the time disappears",
    body: "Before writing a spec I sit with the people doing the work and trace it end to end: where hours go, where numbers disagree, which decision the product has to change. At KollegeApply that meant watching the ops team process leads and content by hand.",
    proof: { label: "Lead management platform", href: "/work/lead-management-platform" },
  },
  {
    n: "02",
    title: "Score every bet the same way",
    body: "Five questions before any code: is there proven demand, is the competition weak, do I have an edge, how fast can I get a signal, and is there a path to revenue? Ideas that can't answer them don't get built, however exciting they look.",
    proof: { label: "Choosing what to build", href: "/work/product-strategy" },
  },
  {
    n: "03",
    title: "Write down what we won't build",
    body: "Every plan has a \"not now\" list: no payments before traction, no sign-up wall unless it's needed, no new idea that steals time from one that's working. Saying no early is cheaper than unbuilding later.",
    proof: { label: "Kundli Jyoti: free pilot first", href: "/work/kundlijyoti" },
  },
  {
    n: "04",
    title: "Ship thin slices with an off switch",
    body: "Each slice has an owner, one metric and a way to turn it off. The CMS change that took processing from 4 hours to 10 minutes shipped as a narrow loop, not a platform rewrite.",
    proof: { label: "Content & growth platform", href: "/work/content-growth-platform" },
  },
  {
    n: "05",
    title: "Evaluate AI before users do",
    body: "Pass/fail criteria written before looking at outputs, a test set built from real inputs (typical, hard and adversarial), failure modes named, cost per good output tracked, and launch gates agreed up front.",
    proof: { label: "How I evaluate LLM features", href: "/writing/how-i-evaluate-llm-features" },
  },
  {
    n: "06",
    title: "Clean the numbers before trusting them",
    body: "I check what each tool actually counts, filter bots by engagement, and only act when two independent sources agree. On AniLumi that removed 22% of reported users and revealed the real audience.",
    proof: { label: "22% of my users were bots", href: "/writing/22-percent-of-my-users-were-bots" },
  },
  {
    n: "07",
    title: "Let users rewrite the roadmap",
    body: "I plan, then watch search queries, analytics and sign-ups. When they disagree with me, the roadmap moves. AniLumi was built for global fans; the data said Hindi-dub viewers in South Asia, so that's where the roadmap now starts.",
    proof: { label: "AniLumi case study", href: "/work/anilumi" },
  },
  {
    n: "08",
    title: "Keep, grow or stop after 60 days",
    body: "Early numbers lie, so no verdict before 60 days of clean data. Then each product gets one of three answers, and effort moves to whatever earned it, including stopping my own projects.",
    proof: { label: "Six launches in one month", href: "/writing/six-launches-one-month" },
  },
] as const

const tracks = [
  {
    role: "Data platform PM",
    why: "Systems that move millions of records reliably, used by internal teams every day.",
    links: [
      { label: "Lead management platform (78M+ records, 600+ clients)", href: "/work/lead-management-platform" },
      { label: "Content & growth platform (150K → 300K+ indexed pages)", href: "/work/content-growth-platform" },
      { label: "Cleaning analytics before trusting it", href: "/writing/22-percent-of-my-users-were-bots" },
    ],
  },
  {
    role: "Growth PM",
    why: "Search, funnels and experiments, measured with real data instead of vanity numbers.",
    links: [
      { label: "AniLumi: audience discovery and email funnel", href: "/work/anilumi" },
      { label: "Choosing what to build: a portfolio of bets", href: "/work/product-strategy" },
      { label: "The search engine I ignored", href: "/writing/the-search-engine-i-ignored" },
    ],
  },
  {
    role: "AI / applied-AI PM",
    why: "Grounded LLM products with guardrails, human review and an evaluation plan.",
    links: [
      { label: "RankFlowHQ: grounded AI writing pipeline", href: "/work/rankflowhq" },
      { label: "How I evaluate LLM features", href: "/writing/how-i-evaluate-llm-features" },
      { label: "PRD: LLM-assisted client mapping", href: "/writing/prd-llm-client-mapping" },
    ],
  },
] as const

export default function HowIWorkPage() {
  return (
    <main className="pt-36 pb-24 md:pt-44">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">How I work</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-balance text-fg md:text-6xl">
          The product playbook behind the work.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Eight habits I use at work and on my own products. Each one links to the place it actually happened, so you can
          check the evidence rather than take my word for it.
        </p>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.n} className="flex flex-col bg-bg-elevated p-6 md:p-8">
              <p className="font-mono text-xs text-accent-ink">{step.n}</p>
              <h2 className="mt-3 text-2xl text-fg">{step.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{step.body}</p>
              <Link
                href={step.proof.href}
                className="mt-5 inline-flex w-fit items-center rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                See it in: {step.proof.label} →
              </Link>
            </li>
          ))}
        </ol>

        <section className="mt-24">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Hiring for a specific role?</p>
          <h2 className="mt-4 max-w-3xl text-3xl text-fg md:text-5xl">Start with the three that matter to you.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {tracks.map((track) => (
              <div key={track.role} className="rounded-3xl border border-border bg-bg-elevated p-6">
                <h3 className="text-xl text-fg">{track.role}</h3>
                <p className="mt-2 text-sm text-muted">{track.why}</p>
                <ul className="mt-5 grid gap-3">
                  {track.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-fg underline decoration-border underline-offset-4 transition-colors hover:decoration-accent">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}
