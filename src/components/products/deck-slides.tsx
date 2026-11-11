import type { ReactNode } from "react"
import type { Deck } from "@/content/decks"
import type { Product } from "@/content/products"

type SlideDef = { kicker: string; body: ReactNode }

function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.62em] tracking-[0.14em] uppercase opacity-60">{label}</p>
      <div className="mt-[0.35em]">{children}</div>
    </div>
  )
}

/** The slides for one product, as plain content so both the carousel and the print page can lay them out. */
export function deckSlides(deck: Deck, product: Product): SlideDef[] {
  return [
    {
      kicker: "Product deck",
      body: (
        <div className="flex h-full flex-col justify-end">
          <p className="font-heading text-[2.6em] leading-[1] font-semibold tracking-[-0.03em]">{product.name}</p>
          <p className="mt-[0.6em] max-w-[34em] text-[1.05em] opacity-80">{product.tagline}</p>
          <p className="mt-[1.2em] font-mono text-[0.7em] opacity-60">{product.urlLabel} · Harsh Lariya</p>
        </div>
      ),
    },
    {
      kicker: "01 · Problem",
      body: <p className="max-w-[30em] text-[1.45em] leading-snug font-medium">{deck.problem}</p>,
    },
    {
      kicker: "02 · Who it's for",
      body: (
        <div className="grid gap-[1.4em]">
          <Term label="Ideal customer profile (ICP)"><p className="text-[1.1em]">{deck.icp}</p></Term>
          <Term label="Job to be done (JTBD)"><p className="font-serif text-[1.45em] italic leading-snug">{deck.jtbd}</p></Term>
        </div>
      ),
    },
    {
      kicker: "03 · Value proposition",
      body: (
        <div className="grid gap-[1.4em]">
          <p className="max-w-[30em] text-[1.35em] leading-snug font-medium">{deck.valueProp}</p>
          <Term label="Alternatives users have today">
            <div className="flex flex-wrap gap-[0.5em]">
              {deck.alternatives.map((alt) => (
                <span key={alt} className="rounded-full border border-current/25 px-[0.8em] py-[0.25em] text-[0.85em]">{alt}</span>
              ))}
            </div>
          </Term>
        </div>
      ),
    },
    {
      kicker: "04 · How it works",
      body: (
        <ol className="flex flex-wrap items-center gap-[0.5em]">
          {product.flow.map((step, i) => (
            <li key={step} className="flex items-center gap-[0.5em]">
              <span className="rounded-xl border border-current/20 bg-white/10 px-[0.9em] py-[0.6em] text-[0.95em]">
                <span className="mr-[0.4em] font-mono text-[0.75em] opacity-60">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </span>
              {i < product.flow.length - 1 ? <span className="opacity-50">→</span> : null}
            </li>
          ))}
        </ol>
      ),
    },
    {
      kicker: "05 · Metrics",
      body: (
        <div className="grid gap-[1.3em] md:grid-cols-[1.1fr_1fr]">
          <Term label="North Star metric">
            <p className="font-heading text-[1.7em] leading-tight font-semibold">{deck.northStar.metric}</p>
            <p className="mt-[0.5em] text-[0.9em] opacity-80">{deck.northStar.why}</p>
          </Term>
          <Term label="Input KPIs">
            <ul className="grid gap-[0.4em] text-[0.95em]">
              {deck.kpis.map((kpi) => <li key={kpi}>• {kpi}</li>)}
            </ul>
          </Term>
        </div>
      ),
    },
    {
      kicker: "06 · Go-to-market & monetisation",
      body: (
        <div className="grid gap-[1.3em] md:grid-cols-2">
          <Term label="Go-to-market (GTM)">
            <ul className="grid gap-[0.4em] text-[0.95em]">
              {deck.gtm.map((item) => <li key={item}>• {item}</li>)}
            </ul>
          </Term>
          <Term label="Monetisation"><p className="text-[0.95em]">{deck.monetisation}</p></Term>
        </div>
      ),
    },
    {
      kicker: "07 · Key decisions & trade-offs",
      body: (
        <div className="grid gap-[0.8em]">
          {deck.decisions.map((d) => (
            <div key={d.title} className="rounded-xl border border-current/15 bg-white/5 px-[1em] py-[0.7em]">
              <p className="font-semibold">{d.title}</p>
              <p className="mt-[0.2em] text-[0.88em] opacity-75">Trade-off: {d.tradeoff}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      kicker: "08 · Roadmap",
      body: (
        <div className="grid gap-[0.8em] md:grid-cols-3">
          {(["now", "next", "later"] as const).map((k) => (
            <div key={k} className="rounded-xl border border-current/15 bg-white/5 p-[1em]">
              <p className="font-mono text-[0.65em] tracking-[0.14em] uppercase opacity-60">{k}</p>
              <p className="mt-[0.4em] text-[1em] leading-snug">{deck.roadmap[k]}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]
}

/** One 16:9 slide. Sized in em so it scales with the container's font size. */
export function Slide({ kicker, children, accent, index, total }: { kicker: string; children: ReactNode; accent: string; index: number; total: number }) {
  return (
    <div
      className="relative flex h-full min-h-[56vw] w-full flex-col overflow-hidden rounded-2xl p-[2.2em] pb-[3em] text-white sm:aspect-video sm:min-h-0"
      style={{ background: `radial-gradient(110% 120% at 100% 0%, color-mix(in srgb, ${accent} 85%, #0b1020), #0b1020 62%)` }}
    >
      <p className="font-mono text-[0.68em] tracking-[0.16em] uppercase opacity-70">{kicker}</p>
      <div className="mt-[1.2em] flex-1">{children}</div>
      <p className="absolute right-[2.2em] bottom-[1.4em] font-mono text-[0.62em] opacity-50">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  )
}
