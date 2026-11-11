import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { decks, getDeck } from "@/content/decks"
import { products } from "@/content/products"
import { deckSlides, Slide } from "@/components/products/deck-slides"
import { Container } from "@/components/ui/Container"
import { pageMetadata } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return decks.map((deck) => ({ slug: deck.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  return pageMetadata({
    title: `${product?.name ?? "Product"} deck`,
    description: `${product?.name} in product terms: problem, ICP, JTBD, value proposition, North Star metric, KPIs, go-to-market, monetisation, decisions and roadmap.`,
    path: `/deck/${slug}`,
  })
}

/** Every slide stacked; prints one slide per landscape page (used to build /decks/<slug>.pdf). */
export default async function DeckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const deck = getDeck(slug)
  const product = products.find((p) => p.slug === slug)
  if (!deck || !product) notFound()
  const slides = deckSlides(deck, product)

  return (
    <main className="pb-24 print:p-0">
      <Container className="print:max-w-none print:p-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 print:hidden">
          <div>
            <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Product deck</p>
            <h1 className="mt-2 text-4xl text-fg md:text-5xl">{product.name}</h1>
          </div>
          <a href={`/decks/${slug}.pdf`} download className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
            Download PDF
          </a>
        </div>
        <div className="grid gap-6 text-[10px] sm:text-[14px] lg:text-[17px] print:block print:text-[29px]">
          {slides.map((s, i) => (
            <div key={i} className="deck-print-page">
              <Slide kicker={s.kicker} accent={product.accent} index={i} total={slides.length}>{s.body}</Slide>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}
