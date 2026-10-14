import type { Metadata } from "next"
import { pageMetadata } from "@/lib/site"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/Reveal"
import { SplitText } from "@/components/motion/SplitText"
import { FlowDiagram } from "@/components/products/flow-diagram"
import { Container } from "@/components/ui/Container"
import { products, type Product } from "@/content/products"

export const metadata: Metadata = pageMetadata({
  title: "AI Products",
  description:
    "Independent AI products Harsh Lariya designed, built and shipped: RankFlowHQ (AI SEO workflow), its Education Hub, and HarshOnRoads (grounded trip planner).",
  path: "/products",
})

export default function ProductsPage() {
  return (
    <main className="pb-16">
      <Container>
        <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
          Independent products · built and shipped outside my full-time role
        </p>
        <SplitText
          text="Products I've built and shipped."
          className="mt-4 max-w-4xl text-4xl text-balance text-fg sm:text-6xl"
        />
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Three live products where I owned everything: the problem, positioning, scope, AI design and the build itself.
        </p>
        <nav aria-label="Products" className="mt-8 flex flex-wrap gap-2">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`#${product.slug}`}
              className="rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
            >
              {product.name}
            </a>
          ))}
        </nav>
      </Container>

      {products.map((product, index) => (
        <ProductSection key={product.slug} product={product} priority={index === 0} />
      ))}
    </main>
  )
}

function ProductSection({ product, priority }: { product: Product; priority: boolean }) {
  return (
    <section id={product.slug} className="scroll-mt-28 border-b border-border py-20 last:border-b-0 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-fg md:text-5xl">{product.name}</h2>
            <p className="mt-4 text-lg text-muted">{product.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {"caseStudy" in product && product.caseStudy ? (
              <Link
                href={product.caseStudy}
                className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                Read the case study
              </Link>
            ) : null}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: product.accent }}
            >
              Visit {product.urlLabel}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <Reveal>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group mt-10 block overflow-hidden rounded-2xl border border-border bg-bg-elevated shadow-[0_30px_80px_-48px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="mx-auto rounded-full bg-bg px-4 py-1 font-mono text-[11px] text-muted">
                {product.urlLabel}
              </span>
            </div>
            <Image
              src={product.screenshot}
              alt={`${product.name} homepage`}
              width={1440}
              height={900}
              priority={priority}
              sizes="(min-width: 1152px) 1088px, 100vw"
              className="w-full transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Problem</h3>
            <p className="mt-3 text-fg">{product.problem}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Who it&apos;s for</h3>
            <p className="mt-3 text-fg">{product.users}</p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">How it works</h3>
          <FlowDiagram steps={product.flow} className="mt-6" />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">What&apos;s live</h3>
            <ul className="mt-4 space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-fg">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: product.accent }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Product decisions</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {product.decisions.map((decision) => (
                <div
                  key={decision.title}
                  className="rounded-2xl border border-border bg-bg-elevated p-5"
                  style={{ borderLeftColor: product.accent, borderLeftWidth: 3 }}
                >
                  <p className="font-medium text-fg">{decision.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{decision.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
