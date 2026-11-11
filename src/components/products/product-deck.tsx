"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Download, Maximize2 } from "lucide-react"
import { getDeck } from "@/content/decks"
import { products } from "@/content/products"
import { deckSlides, Slide } from "@/components/products/deck-slides"

/** Swipeable product deck: scroll-snap for touch, buttons and arrow keys for desktop. */
export function ProductDeck({ slug }: { slug: string }) {
  const deck = getDeck(slug)
  const product = products.find((p) => p.slug === slug)
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth))
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [])

  if (!deck || !product) return null
  const slides = deckSlides(deck, product)

  function go(to: number) {
    const track = trackRef.current
    if (!track) return
    const next = Math.max(0, Math.min(slides.length - 1, to))
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" })
  }

  return (
    <section aria-roledescription="carousel" aria-label={`${product.name} product deck`} className="not-prose my-12">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Product deck · {slides.length} slides</p>
          <p className="mt-1 text-lg text-fg">{product.name} in product terms</p>
        </div>
        <div className="flex gap-2 text-sm">
          <a href={`/deck/${slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-fg hover:bg-accent-soft">
            <Maximize2 className="size-3.5" /> Full screen
          </a>
          <a href={`/decks/${slug}.pdf`} download className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-fg hover:bg-accent-soft">
            <Download className="size-3.5" /> PDF
          </a>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1) }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1) }
        }}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl text-[11px] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-accent-ink sm:text-[13px] lg:text-[16px] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <div key={i} className="w-full shrink-0 snap-start" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
            <Slide kicker={s.kicker} accent={product.accent} index={i} total={slides.length}>{s.body}</Slide>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className="flex h-6 items-center px-0.5"
            >
              <span
                className="block h-1.5 rounded-full transition-all"
                style={{ width: i === index ? 24 : 8, background: i === index ? product.accent : "var(--muted)" }}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} disabled={index === 0} className="rounded-full border border-border p-2 text-fg disabled:opacity-30">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} disabled={index === slides.length - 1} className="rounded-full border border-border p-2 text-fg disabled:opacity-30">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
